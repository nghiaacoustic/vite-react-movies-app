import { CONFIG } from '@/constants/config.constant'
import { Category, MovieRequestParams } from '@/models'
import { ListMovieSchema, MovieSchema } from '@/schemas/movie.schema'
import { getCurrentDateFormatted } from '@/utils/index.utils'
import axios from 'axios'

const api = axios.create({
  baseURL: CONFIG.baseUrlAPI,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const handleCategoryRequest = (category: Category) => {
  const requestParam: MovieRequestParams = {
    include_adult: false,
    include_video: false,
    'primary_release_date.lte': getCurrentDateFormatted()
  }
  switch (category) {
    case 'popular':
      requestParam.sort_by = 'popularity.desc'
      break
    case 'now_playing':
      requestParam.sort_by = 'popularity.desc'
      requestParam.with_release_type = 2
      break
    case 'latest':
      requestParam.sort_by = 'primary_release_date.desc'
      break
  }
  return requestParam
}

export const fetchMoviesByCategory = async (
  category: Category,
  page: number = 1
) => {
  if (!category) {
    throw new Error('Movie category is required')
  }
  const requestParams = handleCategoryRequest(category)
  try {
    const response = await api.get(`/discover/movie`, {
      params: {
        api_key: CONFIG.apiKey,
        page,
        ...requestParams
      }
    })
    const data = ListMovieSchema.parse(response.data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while fetching movies')
    }
  }
}

export const fetchMovieDetail = async (id: string) => {
  if (!id) {
    throw new Error('Movie ID is required')
  }

  const requestParams = {
    append_to_response: 'videos,credits',
    language: 'en-US'
  }
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        api_key: CONFIG.apiKey,
        ...requestParams
      }
    })
    const data = MovieSchema.parse(response.data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie with ID ${id}: ${error.message}`)
    } else {
      throw new Error(
        `An unknown error occurred while fetching movie with ID ${id}`
      )
    }
  }
}

export const fetchPeopleDetail = async (id: string) => {
  if (!id) {
    throw new Error('Profile ID is required')
  }

  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        api_key: CONFIG.apiKey
      }
    })
    const data = MovieSchema.parse(response.data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch profile with ID ${id}: ${error.message}`)
    } else {
      throw new Error(
        `An unknown error occurred while fetching profile with ID ${id}`
      )
    }
  }
}
