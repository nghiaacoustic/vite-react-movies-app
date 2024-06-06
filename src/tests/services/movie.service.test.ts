import {
  fetchMoviesByCategory,
  fetchMovieDetail,
  fetchPeopleDetail,
  handleCategoryRequest
} from '@/services/movie.service'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { MockListMovieService } from '../mocks'
import { Category } from '@/models'

describe('fetchMoviesByCategory', () => {
  it('fetches movies by category successfully', async () => {
    const category = 'popular'
    const page = 1
    const responseData = MockListMovieService
    const expectedData = MockListMovieService

    const mock = new MockAdapter(axios)
    mock.onGet('/discover/movie').reply(200, responseData)

    const data = await fetchMoviesByCategory(category, page)

    expect(data.results.length).toEqual(expectedData.results.length)
    expect(data.results[0]).toEqual(expectedData.results[0])
  })

  it('throws an error if category is not provided', async () => {
    await expect(fetchMoviesByCategory(null as any, 1)).rejects.toThrow(
      'Movie category is required'
    )
  })

  it('handles API errors gracefully', async () => {
    const category = 'popular'
    const errorMessage = 'Request failed with status code 400'

    const mock = new MockAdapter(axios)
    mock.onGet('/discover/movie').reply(400, { message: errorMessage })

    await expect(fetchMoviesByCategory(category, 1000)).rejects.toThrow(
      `Failed to fetch movies: ${errorMessage}`
    )
  })
})

describe('fetchMovieDetail', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  const mock = new MockAdapter(axios)

  it('throws an error when movie ID is not provided', async () => {
    await expect(fetchMovieDetail('')).rejects.toThrow('Movie ID is required')
  })

  it('throws an error when movie is not found', async () => {
    const movieId = 'wrong-id'

    mock.onGet(`/movie/${movieId}`).reply(404)

    await expect(fetchMovieDetail(movieId)).rejects.toThrow(
      `Failed to fetch movie with ID ${movieId}: Request failed with status code 404`
    )
  })
})

describe('fetchPeopleDetail', () => {
  const mock = new MockAdapter(axios)

  afterEach(() => {
    mock.reset()
  })

  it('throws an error when profile ID is not provided', async () => {
    await expect(fetchPeopleDetail('')).rejects.toThrow(
      'Profile ID is required'
    )
  })
})

describe('handleCategoryRequest function', () => {
  it('returns the correct request params for "popular" category', () => {
    const category: Category = 'popular'
    const expectedParams = {
      include_adult: false,
      include_video: false,
      'primary_release_date.lte': expect.any(String),
      sort_by: 'popularity.desc'
    }
    expect(handleCategoryRequest(category)).toEqual(expectedParams)
  })

  it('returns the correct request params for "now_playing" category', () => {
    const category: Category = 'now_playing'
    const expectedParams = {
      include_adult: false,
      include_video: false,
      'primary_release_date.lte': expect.any(String),
      sort_by: 'popularity.desc',
      with_release_type: 2
    }
    expect(handleCategoryRequest(category)).toEqual(expectedParams)
  })

  it('returns the correct request params for "latest" category', () => {
    const category: Category = 'latest'
    const expectedParams = {
      include_adult: false,
      include_video: false,
      'primary_release_date.lte': expect.any(String),
      sort_by: 'primary_release_date.desc'
    }
    expect(handleCategoryRequest(category)).toEqual(expectedParams)
  })
})
