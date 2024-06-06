import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components'

describe('Footer component', () => {
  it('should match snapshot', () => {
    render(<Footer />)
    expect(screen).matchSnapshot()
  })

  it('Copyright message should be display when rendering', () => {
    render(<Footer />)
    const copyrightElement = screen.getByText('© FPT Software, Inc.')
    expect(copyrightElement).toHaveTextContent('© FPT Software, Inc.')
  })
})
