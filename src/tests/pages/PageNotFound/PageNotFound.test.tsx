import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Route } from 'react-router-dom'
import { customRender } from '@/tests/mocks'
import PageNotFound from '@/pages/PageNotFound'

describe('PageNotFound Component', () => {
  const renderComponent = () => {
    return customRender(<Route path='/' element={<PageNotFound />} />, ['/'])
  }

  it('should match snapshot', () => {
    renderComponent()
    expect(screen).matchSnapshot()
  })

  it('PageNotFound will contain title', () => {
    renderComponent()

    const title = screen.getByText(404)
    expect(title).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByLabelText('back to homepage')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('back to homepage'))
  })
})
