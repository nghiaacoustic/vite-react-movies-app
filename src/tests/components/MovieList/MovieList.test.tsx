import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MovieList } from '@/components'
import { Movie } from '@/models'
import { customRender, MOVIE_LIST_MOCK } from '@/tests/mocks'
import { Route } from 'react-router-dom'

describe('MovieList component', () => {
  const movies: Movie[] = MOVIE_LIST_MOCK.results

  const renderComponent = () => {
    return customRender(
      <Route
        path='/'
        element={<MovieList movies={movies} isLoading={true} title='popular' />}
      />,
      ['/']
    )
  }
  it('should match snapshot', () => {
    renderComponent()
    expect(screen).matchSnapshot()
  })

  it('should initial display banner skeleton', async () => {
    render(<MovieList movies={movies} isLoading={true} title='popular' />)
    await waitFor(() => {
      expect(screen.queryByTestId('list-card-skeleton')).toBeInTheDocument()
    })
  })
  it('should render correct title', () => {
    render(<MovieList movies={[]} isLoading={false} title='popular' />)

    expect(screen.getByText('Popular Movies')).toBeInTheDocument()
  })
})
