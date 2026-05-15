/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jianghu': {
          'dark': '#0d0d0d',
          'darker': '#0a0a0a',
          'panel': '#1a1a1a',
          'border': '#2d2d2d',
          'gold': '#d4af37',
          'gold-light': '#f4d03f',
          'red': '#c41e3a',
          'green': '#228b22',
          'blue': '#1e90ff',
          'purple': '#9932cc',
          'text': '#e0e0e0',
          'text-muted': '#888888',
        }
      },
      fontFamily: {
        'wuxia': ['STKaiti', 'KaiTi', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 50px rgba(212, 175, 55, 0.5)',
      },
    },
  },
  plugins: [],
}
