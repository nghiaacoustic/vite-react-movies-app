import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import HomePage from '@/pages/Home'

vi.mock('@/services/movie.service', () => ({
  fetchMoviesByCategory: vi.fn()
}))

const mockMovieData = {
  id: 1,
  title: 'Movie Title',
  overview: 'Movie Overview',
  poster_path: '/path/to/poster.jpg'
}

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mock('react-router-dom', () => ({
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
      Router: vi.fn(),
      HashRouter: vi.fn(),
      Switch: vi.fn()
    }))

    vi.mock('@tanstack/react-query', () => ({
      useQuery: vi.fn()
    }))

    vi.mock('@/components', async (importOriginal) => {
      const actual = await importOriginal()
      return {
        ...(actual as Mock),
        Banner: vi.fn(() => <div>Banner Mock</div>),
        MovieCard: vi.fn(() => <div>{mockMovieData.title}</div>),
        ToastError: vi.fn(() => <div>ToastError Mock</div>),
        ListCardSkeleton: vi.fn(() => <div>ListCardSkeleton Mock</div>)
      }
    })
  })

  it('renders the component with valid data', async () => {
    vi.mock('@tanstack/react-query', () => ({
      useQuery: () => ({
        isLoading: false,
        error: null,
        data: { results: [mockMovieData] }
      })
    }))

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText(/Banner Mock/i)).toBeInTheDocument()
      expect(screen.getByText(/Popular/i)).toBeInTheDocument()
      expect(screen.getByText(/Now Playing/i)).toBeInTheDocument()
      expect(screen.getByText(/Latest/i)).toBeInTheDocument()
    })
  })

  it('renders the component with error message if fetching data fails', async () => {
    vi.mock('@tanstack/react-query', () => ({
      useQuery: () => ({
        isLoading: false,
        error: new Error('Failed to fetch data'),
        data: null
      })
    }))

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.findByTestId('toast-error')).toBeTruthy()
    })
  })
})
