/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { configDefaults } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    exclude: [...configDefaults.exclude, 'src/tests/mocks/**/*'],
    coverage: {
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      exclude: [
        ...configDefaults.exclude,
        'src/tests/mocks/**/*',
        'src/stories/**/*',
        'src/pages/Layout.tsx',
        'src/pages/index.ts',
        '.storybook/**/*',
        '.eslintrc.cjs',
        'postcss.config.js',
        'tailwind.config.js',
        'src/App.tsx',
        'src/main.tsx',
        'src/services/index.ts',
        'src/services/queryClient.service.ts'
      ]
    },
    api: { port: 4000 },
    silent: true
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
})
