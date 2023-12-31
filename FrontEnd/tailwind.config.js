/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary': '#1e1e1e',
      'white': '#ffffff',
      'primarygray': '#454545',
      'primaryblue': '#0085ff',
      'hoverblue': '#69b4ff'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}