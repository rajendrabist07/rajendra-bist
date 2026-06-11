import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-dot': 'pulse 2s infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'blink': {
          '0%, 49%, 100%': { opacity: '1' },
          '50%, 99%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow': '0 20px 80px rgba(99,102,241,0.18)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(99,102,241,0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(168,85,247,0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

