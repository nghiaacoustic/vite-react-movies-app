import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'

describe('ScrollToTop component', () => {
  it('should scroll to top when pathname changes', () => {
    window.scrollTo = vi.fn() as any

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='*' element={<ScrollToTop />} />
        </Routes>
      </MemoryRouter>
    )

    expect(window.scrollTo).toHaveBeenCalled()
  })
})
