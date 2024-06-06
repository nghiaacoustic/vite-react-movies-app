import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Banner } from '@/components/Banner'
import { Movie } from '@/models'
import { MovieListMock } from '@/tests/mocks'

vi.mock('@/utils/index.utils', () => ({
  formatDate: vi.fn((date: string) => date),
  getImage: vi.fn((path: string) => path),
  roundedNumber: vi.fn((num: number) => num.toFixed(1))
}))

describe('Banner component', () => {
  const renderComponent = (movie?: Movie, isLoading: boolean = false) => {
    render(
      <BrowserRouter>
        <Banner movie={movie} isLoading={isLoading} />
      </BrowserRouter>
    )
  }
  it('should initial display banner skeleton', async () => {
    renderComponent(MovieListMock.results[0], true)
    await waitFor(() => {
      expect(screen.queryByTestId('banner-skeleton')).toBeInTheDocument()
    })
  })

  it('should display movie details when not loading', () => {
    renderComponent(MovieListMock.results[0], false)

    expect(
      screen.getByText('Kingdom of the Planet of the Apes')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.`
      )
    ).toBeInTheDocument()
  })

  it('should navigate to movie details when "More Info" button is clicked', () => {
    renderComponent(MovieListMock.results[0], false)

    const moreInfoButton = screen.getByText('More Info')
    expect(moreInfoButton).toBeInTheDocument()

    fireEvent.click(moreInfoButton)
  })

  it('should match snapshot when loading', () => {
    renderComponent(undefined, true)
    expect(screen).toMatchSnapshot()
  })

  it('should match snapshot with movie details', () => {
    renderComponent(MovieListMock.results[0], false)
    expect(screen).toMatchSnapshot()
  })
})
