/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wuxia': {
          'dark': '#0a0a0f',
          'darker': '#050508',
          'panel': '#12121a',
          'panel-light': '#1a1a25',
          'border': '#2a2a3a',
          'gold': '#d4a84b',
          'gold-light': '#f5d56a',
          'gold-dark': '#b8943d',
          'crimson': '#c92a2a',
          'crimson-light': '#e03131',
          'jade': '#2f9e44',
          'jade-light': '#37b24d',
          'azure': '#1971c2',
          'azure-light': '#2563eb',
          'purple': '#7e22ce',
          'purple-light': '#9333ea',
          'text': '#f0e6d2',
          'text-muted': '#9ca3af',
          'text-dark': '#6b7280',
          'paper': '#fef9c3',
          'paper-dark': '#fde047',
          'ink': '#1e1e2e',
        }
      },
      fontFamily: {
        'wuxia': ['Ma Shan Zheng', 'STKaiti', 'KaiTi', 'serif'],
        'title': ['ZCOOL KuaiLe', 'STKaiti', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'flow': 'flow 4s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 168, 75, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 168, 75, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.2)' },
        },
        'flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'shine': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 168, 75, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'gold-lg': '0 0 40px rgba(212, 168, 75, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        'crimson': '0 0 20px rgba(201, 42, 42, 0.4)',
        'jade': '0 0 20px rgba(47, 158, 68, 0.4)',
        'inner-gold': 'inset 0 0 30px rgba(212, 168, 75, 0.1)',
      },
      backgroundImage: {
        'scroll-paper': 'linear-gradient(135deg, rgba(254, 249, 195, 0.05) 0%, rgba(253, 224, 71, 0.03) 100%)',
        'ink-wash': 'radial-gradient(ellipse at center, rgba(30, 30, 46, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%)',
      },
    },
  },
  plugins: [],
}
