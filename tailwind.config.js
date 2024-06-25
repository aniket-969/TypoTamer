/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { 
    extend: {
      colors: {
        'bg-color': 'var(--bg-color)',
        'main-color': 'var(--main-color)',
        'caret-color': 'var(--caret-color)',
        'sub-color': 'var(--sub-color)',
        'sub-alt-color': 'var(--sub-alt-color)',
        'text-color': 'var(--text-color)',
        'error-color': 'var(--error-color)',
        'error-extra-color': 'var(--error-extra-color)',
        'colorful-error-color': 'var(--colorful-error-color)',
        'colorful-error-extra-color': 'var(--colorful-error-extra-color)',
      },
    },
  },
  plugins: [],
}