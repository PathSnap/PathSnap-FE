/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#77CEBD',
        second: '#595959',
        third: '#999999',
      },
      textColor: (theme) => ({ ...theme('colors') }),
      boxShadow: {
        xxs: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        xs: '0px -8px 12px rgba(0, 0, 0, 0.08)',
        m: '0px -4px 8px rgba(0, 0, 0, 0.1)',
        l: '0px 0px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
