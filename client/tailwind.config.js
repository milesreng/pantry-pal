/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['Work Sans', 'sans'],
        'content': ['Merriweather', 'sans']
      }
    },
  },
  plugins: [],
}

