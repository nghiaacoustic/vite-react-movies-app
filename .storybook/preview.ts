import type { Preview } from '@storybook/react'
import { withReactRouter } from './decorators'
import '@/styles/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}
export const decorators = [withReactRouter]
export default preview
