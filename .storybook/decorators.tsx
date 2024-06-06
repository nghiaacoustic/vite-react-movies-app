import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withReactRouter = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
)
