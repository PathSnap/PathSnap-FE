/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#77CEBD',
        primaryLight: '#a0e5e5',
        primaryDark: '#44b8b8',
        borderLight: '#e6f9f9',
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
      keyframes: {
        main_marker_glow: {
          '0%': { boxShadow: '0 0 5px 5px rgba(160, 229, 229, 0.5)' },
          '50%': { boxShadow: '0 0 15px 15px rgba(0, 0, 0, 0.3)' },
          '100%': { boxShadow: '0 0 5px 5px rgba(160, 229, 229, 0.5)' },
        },
      },
      animation: {
        main_marker_glow: 'main_marker_glow 2s infinite',
      },
    },
  },
  plugins: [],
};
