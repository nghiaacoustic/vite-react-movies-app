import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { useParams } from 'react-router-dom'
import MovieDetail from '@/pages/MovieDetail'
import { CreditProfileInterface } from '@/models'
import { getProfilesSortedByPopularity } from '@/utils/index.utils'
import { ProfileListMock } from '@/tests/mocks/data/profiles'

describe('MovieDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useParams as Mock).mockReturnValue({ id: '1' })

    vi.mock('@/services/movie.service', () => ({
      fetchMovieDetail: vi.fn()
    }))

    vi.mock('@tanstack/react-query', () => ({
      useQuery: vi.fn()
    }))

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

    vi.mock('@/components', async (importOriginal) => {
      const actual = await importOriginal()
      return {
        ...(actual as Mock),
        Banner: vi.fn(() => <div>Banner Mock</div>),
        ToastError: vi.fn(() => <div>ToastError Mock</div>),
        ListCardSkeleton: vi.fn(() => <div>ListCardSkeleton Mock</div>)
      }
    })
  })

  it('renders the component with error message if fetching data fails', async () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' })

    vi.mock('@tanstack/react-query', () => ({
      useQuery: () => ({
        isLoading: false,
        error: new Error('Failed to fetch data'),
        data: null
      })
    }))

    render(<MovieDetail />)

    await waitFor(() => {
      expect(screen.getByTestId('toast-error')).toBeInTheDocument()
    })
  })

  describe('getProfilesSortedByPopularity Function', () => {
    const profiles: CreditProfileInterface[] = ProfileListMock
    it('should map profiles to the desired structure', () => {
      const mappedProfiles = getProfilesSortedByPopularity(profiles, 'acting')

      expect(mappedProfiles).toEqual([
        {
          id: 2146942,
          name: 'Freya Allan',
          character: 'Nova / Mae',
          profilePath: undefined
        },
        {
          id: 79072,
          name: 'Kevin Durand',
          character: 'Proximus Caesar',
          profilePath: undefined
        }
      ])
    })

    it('should return an empty array if no profiles match the department', () => {
      const profiles = [
        {
          id: 1,
          name: 'Actor 1',
          popularity: 20,
          known_for_department: 'production'
        },
        {
          id: 2,
          name: 'Actor 2',
          popularity: 10,
          known_for_department: 'production'
        }
      ]
      const mappedProfiles = getProfilesSortedByPopularity(profiles, 'acting')

      expect(mappedProfiles).toEqual([])
    })

    it('should return an empty array if profiles are empty', () => {
      const profiles: any = null
      const mappedProfiles = getProfilesSortedByPopularity(profiles, 'acting')

      expect(mappedProfiles).toEqual([])
    })
  })
})
