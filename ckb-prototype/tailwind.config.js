/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        nav: '#0F1117',
        'content-bg': '#F8F9FC',
        'primary-blue': '#0057FF',
        'ai-accent': '#FF3366',
        'copilot-bg': '#1A1D2E',
      },
    },
  },
  plugins: [],
}
