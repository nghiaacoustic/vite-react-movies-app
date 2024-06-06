import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Slider } from '@/components/Slider'
import { MovieCard, ProfileCard } from '@/components'
import { Movie } from '@/models'
import { MOVIE_LIST_MOCK } from '@/tests/mocks'
import { PROFILE_LIST_MOCK } from '@/tests/mocks/data/profiles'

describe('Slider component', () => {
  const mockListMovies = MOVIE_LIST_MOCK.results
  const mockListProfiles = PROFILE_LIST_MOCK

  const renderComponent = (
    title: string,
    isExpanable: boolean = true,
    children: React.ReactNode = mockListMovies.map((movie: Movie) => (
      <MovieCard key={movie.id} movie={movie} isLoading={false} />
    ))
  ) => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Slider title={title} isExpanable={isExpanable}>
          {children}
        </Slider>
      </MemoryRouter>
    )
  }

  it('should match snapshot', () => {
    renderComponent('Popular')
    expect(screen).matchSnapshot()
  })

  it('renders correctly with movies', () => {
    renderComponent('Popular')
    mockListMovies.forEach((movie) => {
      expect(screen.queryAllByText(movie.title)[0]).toBeInTheDocument()
    })
  })

  it('should render the title', () => {
    renderComponent('Popular')
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('should render the explore link when expandable', () => {
    renderComponent('Popular', true)
    expect(screen.getByText('Explore All')).toBeInTheDocument()

    renderComponent(
      'Actors',
      true,
      mockListProfiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} isLoading={false} />
      ))
    )
    expect(screen.getByText('Actors')).toBeInTheDocument()

    renderComponent(
      'Producers',
      true,
      mockListProfiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} isLoading={false} />
      ))
    )
    expect(screen.getByText('Producers')).toBeInTheDocument()
  })

  it('should not render the explore link when not expandable', () => {
    renderComponent('Popular', false)
    expect(screen.queryByText('Explore All')).not.toBeInTheDocument()
  })

  it('should scroll left and right when button is clicked', () => {
    renderComponent('Popular', true)
    const slider = screen.getByTestId('slider')

    const scrollRightButton = screen.getByTestId('scroll-next')

    expect(scrollRightButton).toBeInTheDocument()
    expect(slider.scrollLeft).toBe(0)
    fireEvent.click(scrollRightButton)
    waitFor(() => {
      const scrollLeftButton = screen.getByTestId('scroll-back')
      expect(scrollLeftButton).toBeInTheDocument()
      expect(slider).toBeDefined()
      expect(slider.scrollLeft).toBeGreaterThan(0)
    })
  })

  it('should navigate to the correct URL when the explore link is clicked', () => {
    renderComponent('Popular', true)
    const exploreLink = screen.getByText('Explore All').closest('Popular')
    if (exploreLink) {
      fireEvent.click(exploreLink)
      expect(window.location.pathname).toBe('/')
    }
  })

  it('should show left and right buttons when needed', () => {
    renderComponent('Popular', true)

    const slider = screen.getByTestId('slider') as HTMLDivElement

    Object.defineProperty(slider, 'scrollLeft', {
      writable: true,
      value: 100
    })

    Object.defineProperty(slider, 'scrollWidth', {
      writable: true,
      value: 1000
    })

    Object.defineProperty(slider, 'clientWidth', {
      writable: true,
      value: 500
    })

    expect(screen.getByTestId('scroll-next')).toBeInTheDocument()
  })

  it('should call checkButtons when scrolled', () => {
    const checkButtonsMock = vi.fn()

    renderComponent('Popular', true)

    vi.spyOn(React, 'useRef').mockReturnValueOnce({
      current: { scrollLeft: 0, clientWidth: 200, scrollWidth: 500 }
    })
    vi.spyOn(React, 'useState')
    waitFor(() => {
      expect(checkButtonsMock).toHaveBeenCalled()
    })
  })
})
