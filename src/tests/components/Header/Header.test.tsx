import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Route } from 'react-router-dom'
import { Header } from '@/components'
import { customRender } from '@/tests/mocks'

describe('Header component', () => {
  const renderComponent = () => {
    return customRender(<Route path='/' element={<Header />} />, ['/'])
  }

  it('should contain Home and Movies menu items', () => {
    renderComponent()

    const navHome = screen.getByText('Home')
    const navMovies = screen.getByText('Movies')

    expect(navHome).toBeInTheDocument()
    expect(navMovies).toBeInTheDocument()
  })

  it('should have correct class names for menu items', () => {
    renderComponent()

    const navHomeClass = screen.getByText('Home').getAttribute('class')
    const navMoviesClass = screen.getByText('Movies').getAttribute('class')

    expect(navHomeClass).toBe(
      'font-bold text-white-primary text-xl text-white-secondary hover:text-white-hover'
    )
    expect(navMoviesClass).toBe(
      'font-thin text-white-secondary text-xl text-white-secondary hover:text-white-hover'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
