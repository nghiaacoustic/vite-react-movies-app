/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,css}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        black: {
          primary: '#141414',
          secondary: '#1414142e',
          opacity: '#00000080'
        },
        red: {
          primary: '#E33E3E',
          hover: '#A81A1A'
        },
        white: {
          primary: '#ffffff',
          secondary: '#E5E5E5',
          hover: '#B3B3B3'
        }
      },
      fontFamily: {
        sans: ['Comfortaa', 'Arial', 'sans-serif']
      }
    },
    screens: {
      mobile: '320px',

      tablet: '1024px',

      desktop: '1280px',

      monitor: '1920px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
