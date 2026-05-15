/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ancient': {
          'paper': '#faf6f0',
          'paper-dark': '#f5efe6',
          'paper-light': '#fefdfb',
          'ink': '#2a2a2a',
          'ink-light': '#4a4a4a',
          'ink-dark': '#1a1a1a',
          'cinnabar': '#b84a3c',
          'cinnabar-light': '#d4655a',
          'cinnabar-dark': '#9e3d31',
          'gold': '#c9a96e',
          'gold-light': '#dbb87a',
          'gold-dark': '#a88a54',
          'gold-rich': '#f0d890',
          'vermilion': '#d4452f',
          'indigo': '#3a5a8c',
          'indigo-dark': '#2a4066',
          'jade': '#5a8a6c',
          'jade-light': '#6a9a7c',
          'bronze': '#8a7a5a',
          'bronze-light': '#9a8a6a',
          'border': '#d4c9b8',
          'border-dark': '#b8a898',
          'shadow': 'rgba(42, 42, 42, 0.15)',
        }
      },
      fontFamily: {
        'ancient': ['ZCOOL XiaoWei', 'STKaiti', 'KaiTi', 'serif'],
        'title': ['ZCOOL KuaiLe', 'Ma Shan Zheng', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'flow': 'flow 4s ease-in-out infinite',
        'unfurl': 'unfurl 0.8s ease-out forwards',
        'stamp': 'stamp 0.3s ease-out',
        'ink-spread': 'ink-spread 1s ease-out forwards',
        'scroll-reveal': 'scroll-reveal 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.2)' },
        },
        'flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'unfurl': {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        'stamp': {
          '0%': { transform: 'scale(1.5)', opacity: '0' },
          '50%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'ink-spread': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
        'scroll-reveal': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'ancient': '0 4px 20px rgba(42, 42, 42, 0.15)',
        'ancient-light': '0 2px 10px rgba(42, 42, 42, 0.1)',
        'ancient-heavy': '0 8px 40px rgba(42, 42, 42, 0.25)',
        'gold': '0 0 30px rgba(201, 169, 110, 0.4)',
        'gold-inset': 'inset 0 0 30px rgba(201, 169, 110, 0.1)',
        'vermilion': '0 0 20px rgba(212, 69, 47, 0.4)',
        'cinnabar': '0 0 15px rgba(184, 74, 60, 0.3)',
      },
      backgroundImage: {
        'paper-texture': 'linear-gradient(135deg, rgba(250, 246, 240, 0.9) 0%, rgba(245, 239, 230, 0.95) 100%)',
        'ink-wash': 'radial-gradient(ellipse at center, rgba(74, 74, 74, 0.05) 0%, rgba(42, 42, 42, 0.15) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a96e 0%, #dbb87a 50%, #c9a96e 100%)',
        'vermilion-gradient': 'linear-gradient(135deg, #d4452f 0%, #e56555 50%, #d4452f 100%)',
      },
    },
  },
  plugins: [],
}
