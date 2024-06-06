import { render } from '@testing-library/react'
import { MemoryRouter, Routes } from 'react-router-dom'

export const customRender = (
  component: React.JSX.Element,
  initialEntries = ['/']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>{component}</Routes>
    </MemoryRouter>
  )
}
