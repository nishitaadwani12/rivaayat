/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // A warm, traditional Indian palette.
      colors: {
        ivory: '#FBF3E6',
        maroon: '#7A1F2B',
        marigold: '#E4A11B',
        teal: '#1F5C57',
        rose: '#C97B84',
        ink: '#2B2320',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Mukta"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 34px -14px rgba(43, 35, 32, 0.4)',
        lift: '0 26px 55px -20px rgba(43, 35, 32, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
