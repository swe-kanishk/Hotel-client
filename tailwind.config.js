/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      screens: {
        xs: { 'max': '500px' },
        tiny: { 'max': '420px' },
      },
      boxShadow: { 
        'btn': '0 0 15px 5px white', // Corrected boxShadow definition
        'reserve': '0 0 10px gray', // Corrected boxShadow definition
        'host': '6px 10px 15px black', // Corrected boxShadow definition
      },
    },
  },
  plugins: [],
}
