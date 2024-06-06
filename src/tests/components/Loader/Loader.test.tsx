import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Loader } from '@/components'
import { Route } from 'react-router-dom'
import { customRender } from '@/tests/mocks'

describe('Loader component', () => {
  const renderComponent = () => {
    return customRender(<Route path='/' element={<Loader />} />, ['/'])
  }
  it('should match snapshot', () => {
    renderComponent()
    expect(screen).matchSnapshot()
  })
  it('should render loading text and spinner', () => {
    render(<Loader />)

    const loadingText = screen.getByText(/loading/i)
    expect(loadingText).toBeInTheDocument()

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })
})
