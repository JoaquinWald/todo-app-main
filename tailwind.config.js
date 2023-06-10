/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    letterSpacing: {
      more: '.5rem'
    },
    minWidth: {
      '1/2': '50%',
      '11/12': '300px'
    },
    extend: {},
  },
  plugins: [],
}