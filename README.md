# Canal+

## Author

Nghia Truong Phuoc - NghiaTP1@fpt.com

## Description

Canal+ displays a list of popular movies, a list of latest movies, and allows users to view movie details.

## Features

1. Home Page: Displays lists of popular and latest movies with general information.
   ![home.png](src/assets/screencapture-home-page.png)

2. Movie Slider: Provides an interactive carousel for movie navigation.

3. Detail Page: Shows detailed information about a selected movie and credits.
   ![moviedetail.png](src/assets/screencapture-movie-detail.png)

4. Movie List Page:
   ![movielist.png](src/assets/screencapture-movies-page.png)

## Project Structure

The project follows a standard React project structure:

- `src/`: Contains the source code of the project.
  - `assets/`: Contains static assets such as images and styles.
  - `components/`: Contains React components used throughout the application.
  - `constants/`: Contains constant values used across the application.
  - `models/`: Contains data models and types used within the application.
  - `pages/`: Contains React components representing different pages/routes of the application.
  - `stories/`: Contains Storybook stories for components.
  - `styles/`: Contains global tailwind css styles.
  - `utils/`: Contains utility functions used across the application.
  - `tests/`: Contains unit tests for components, utility functions, and other modules.
  - `schema/`: Contains Zod schemas for data validation.
  - `services/`: Contains service modules for handling API requests (e.g., Axios and Tanstack React Query).

Each directory serves a specific purpose to keep the codebase organized and maintainable.

## Getting Started

### Prerequisites

Node.js (Recommended version: 18+)

### Installation

Navigate to the project directory.
Install dependencies: npm install

### Usage

To start the development server: npm start (UI available at http://localhost:3000/)
To run unit tests: npm test
To run Storybook: npm run storybook (UI available at http://localhost:5000/)

### Other Scripts:

- `npm run dev`: Starts the development server using Vite on port 3000.
- `npm run build`: Builds the project using TypeScript and Vite.
- `npm run lint`: Lints the codebase using ESLint with TypeScript support.
- `npm run preview`: Previews the build using Vite.
- `npm test`: Runs unit tests using Vitest with UI and coverage.
- `npm run storybook`: Starts Storybook development server on port 5000.
- `npm run build-storybook`: Builds Storybook.
- `npm run prettier-check`: Checks code formatting using Prettier.
- `npm run prettier-write`: Formats code using Prettier.

### Technologies Used

1. React
2. Tailwind CSS
3. Vite
4. Storybook
5. Vitest

#### Dependencies

- **@tanstack/react-query**: React hooks for fetching, caching, and updating asynchronous data.
- **axios**: Promise-based HTTP client for making API requests.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods that can be used at the top level of a web app to enable React components.
- **react-icons**: Library providing popular icon sets for React.
- **react-router-dom**: DOM bindings for React Router, allowing navigation in a React application.
- **zod**: TypeScript-first schema declaration and validation library.

#### DevDependencies

- **@storybook/addon-essentials**: Collection of essential addons for Storybook.
- **@storybook/addon-interactions**: Addon for interaction testing in Storybook.
- **@storybook/addon-links**: Addon for linking stories together in Storybook.
- **@storybook/addon-onboarding**: Addon for onboarding new users to Storybook.
- **@storybook/blocks**: Collection of design system components and patterns for Storybook.
- **@storybook/react**: UI development environment for building UI components in isolation.
- **@storybook/react-vite**: Vite integration for Storybook.
- **@storybook/testing-library**: Integration between Storybook and Testing Library.
- **@testing-library/jest-dom**: Custom jest matchers for asserting on DOM nodes.
- **@testing-library/react**: Simple and complete testing utilities for React.
- **@testing-library/user-event**: Simulate events for Testing Library.
- **@types/node**: Type definitions for Node.js.
- **@types/react**: Type definitions for React.
- **@types/react-dom**: Type definitions for React DOM.
- **@typescript-eslint/eslint-plugin**: TypeScript support for ESLint.
- **@typescript-eslint/parser**: TypeScript parser for ESLint.
- **@vitejs/plugin-react**: Official React plugin for Vite.
- **@vitest/coverage-istanbul**: Istanbul coverage reporter for Vitest.
- **@vitest/ui**: UI components for Vitest.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
- **axios-mock-adapter**: Axios adapter for mocking requests.
- **eslint**: Pluggable JavaScript linter.
- **eslint-config-airbnb**: Airbnb's ESLint config.
- **eslint-config-prettier**: Turns off all rules that are unnecessary or might conflict with Prettier.
- **eslint-plugin-import**: ESLint plugin with rules that help validate proper imports.
- **eslint-plugin-jsx-a11y**: ESLint plugin for accessibility rules on JSX elements.
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule.
- **eslint-plugin-react**: ESLint plugin for React-specific linting rules.
- **eslint-plugin-react-hooks**: ESLint plugin for React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Refresh.
- **eslint-plugin-storybook**: ESLint plugin for Storybook.
- **jsdom**: JavaScript implementation of the WHATWG DOM and HTML standards.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **prettier**: Opinionated code formatter.
- **prettier-plugin-tailwindcss**: Prettier plugin for formatting Tailwind CSS.
- **storybook**: UI development environment for building UI components in isolation.
- **tailwindcss**: Utility-first CSS framework for creating custom designs.
- **typescript**: Typed superset of JavaScript.
- **vite**: Next-generation frontend tooling.
- **vitest**: A simple and fast JavaScript test runner.

These dependencies and devDependencies provide a robust toolset for building, testing, and maintaining the React application.

This README provides essential information about the project, including its features, installation, usage, and technologies used. Feel free to expand upon it as needed.
