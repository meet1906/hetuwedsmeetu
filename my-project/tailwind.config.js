/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'from-pink-300',
    'from-purple-300',
    'from-green-300',
    'to-cream',
    'to-pink-300',
    'to-blue-300',
    'bg-gradient-to-br',
    'from-green-100', 'via-emerald-50', 'to-teal-100',
    'from-yellow-100', 'via-orange-50', 'to-pink-100',
    'from-red-100', 'via-orange-50', 'to-yellow-100',
    'from-indigo-100', 'via-purple-100', 'to-pink-100',
    'from-red-100', 'via-cream', 'to-red-50'
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        cream: '#F6F3F0',
        gold: '#EBDCCB',
        peach: {
          50: '#fef7f0',
          100: '#feecdc',
          200: '#fcd9bd',
          300: '#fdba8c',
          400: '#ff8a4c',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}