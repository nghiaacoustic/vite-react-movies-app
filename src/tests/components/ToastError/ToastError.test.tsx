import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ToastError from '@/components/ToastError'

describe('ToastError component', () => {
  it('should show the toast message when errorMessage is provided', () => {
    render(<ToastError errorMessage='This is an error' />)

    const toastMessage = screen.getByText(/this is an error/i)
    expect(toastMessage).toBeInTheDocument()
  })

  it('should hide the toast message after 5 seconds', () => {
    vi.useFakeTimers()

    render(<ToastError errorMessage='This is an error' />)

    const toastMessage = screen.getByText(/this is an error/i)
    expect(toastMessage).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.queryByText(/this is an error/i)).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  it('should not show the toast message when errorMessage is not provided', () => {
    render(<ToastError errorMessage='' />)

    const toastMessage = screen.queryByText(/this is an error/i)
    expect(toastMessage).not.toBeInTheDocument()
  })
})
