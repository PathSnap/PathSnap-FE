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
      },
      boxShadow: {
        xs: '0px -8px 12px rgba(0, 0, 0, 0.08)',
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
