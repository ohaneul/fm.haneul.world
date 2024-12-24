/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
    },
  },
  plugins: [],
};