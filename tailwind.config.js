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
        third: { DEFAULT: '#999999', light: '#E5E5E5', dark: '#919191' },
      },
      textColor: (theme) => ({ ...theme('colors') }),
      boxShadow: {
        xxs: '0px 0px 4px rgba(0, 0, 0, 0.1)', // 기존보다 작게
        xs: '0px -4px 6px rgba(0, 0, 0, 0.08)', // 기존보다 작게
        m: '0px -2px 4px rgba(0, 0, 0, 0.1)', // 기존보다 작게
        l: '0px 0px 4px rgba(0, 0, 0, 0.15)', // 기존보다 작게
      },
      keyframes: {
        main_marker_glow: {
          '0%': { boxShadow: '0 0 3px 3px rgba(160, 229, 229, 0.5)' }, // 크기 축소
          '50%': { boxShadow: '0 0 8px 8px rgba(0, 0, 0, 0.3)' }, // 크기 축소
          '100%': { boxShadow: '0 0 3px 3px rgba(160, 229, 229, 0.5)' }, // 크기 축소
        },
      },
      animation: {
        main_marker_glow: 'main_marker_glow 2s infinite',
      },
    },
  },
  plugins: [],
};
