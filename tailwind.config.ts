import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(99,102,241,0.18)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top left, rgba(99,102,241,0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(168,85,247,0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
} satisfies Config
