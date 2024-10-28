/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#77CEBD',
      },
      boxShadow: {
        xs: '0px -8px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
