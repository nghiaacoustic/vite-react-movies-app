import React, { Suspense } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, Mock } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Movies from '@/pages/Movies'
import { MOVIE_LIST_MOCK } from '@/tests/mocks'

vi.mock('@/services/movie.service', () => ({
  fetchMoviesByCategory: vi.fn()
}))

const mockMovies = MOVIE_LIST_MOCK
describe('Movies Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        useLocation: () => ({
          search: '',
          pathname: '/'
        }),
        matchPath: vi.fn(),
        withRouter: vi.fn(),
        useRouteMatch: vi.fn(),
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn()
      }
    })

    vi.mock('@/components', () => ({
      Banner: vi.fn(() => <div>Banner Mock</div>),
      MovieList: vi.fn(() => (
        <div>
          {mockMovies.results.map((movie) => (
            <div key={movie.id}>MovieCard Mock</div>
          ))}
        </div>
      )),
      MovieCard: vi.fn(() => <div>MovieCard Mock</div>),
      ToastError: vi.fn(() => <div>ToastError Mock</div>),
      ListCardSkeleton: vi.fn(() => <div>ListCardSkeleton Mock</div>)
    }))

    vi.mock('@tanstack/react-query', () => ({
      useQuery: vi.fn()
    }))

    vi.mock('@/services/movie.service', () => ({
      fetchMoviesByCategory: vi.fn()
    }))

    vi.mock('@/utils')
  })
  it('should match snapshot', () => {
    ;(useQuery as unknown as Mock).mockReturnValue({
      data: mockMovies,
      error: null,
      isLoading: true
    })
    ;(useParams as Mock).mockReturnValue({ category: 'popular' })

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Movies />
      </Suspense>
    )
    expect(screen).toMatchSnapshot()
  })

  it('renders the Movies component successfully with valid category', async () => {
    ;(useQuery as unknown as Mock).mockReturnValue({
      data: mockMovies,
      error: null,
      isLoading: false
    })
    ;(useParams as Mock).mockReturnValue({ category: 'popular' })

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Movies />
      </Suspense>
    )

    expect(screen.getByText('Banner Mock')).toBeInTheDocument()
    expect(screen.getAllByText('MovieCard Mock').length).toBe(
      mockMovies.results.length
    )

    const loadMoreButton = screen.getByRole('button', {
      name: /More Movies/i
    })

    expect(screen.getAllByText('MovieCard Mock').length).toBe(
      mockMovies.results.length
    )
    expect(loadMoreButton).toBeInTheDocument()
    await fireEvent.click(loadMoreButton)
    await waitFor(() => {
      expect(screen.getAllByText('MovieCard Mock').length).toBe(
        mockMovies.results.length
      )
    })
  })

  it('loads more movies when "More Movies" button is clicked', async () => {
    render(<Movies />)

    const loadMoreButton = screen.getByRole('button', { name: /More Movies/i })

    fireEvent.click(loadMoreButton)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.getAllByText('MovieCard Mock').length).toBe(
      mockMovies.results.length
    )
  })
})
