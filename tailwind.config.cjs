/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,tsx,ts,js}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'bug-appear': {
          '0%':   { opacity: '0', transform: 'translate(-50%, -50%) scale(0.2) rotate(-20deg)' },
          '60%':  { transform: 'translate(-50%, -50%) scale(1.2) rotate(6deg)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
        },
        'splat': {
          '0%':   { opacity: '1', transform: 'translate(-50%, -50%) scale(0.4)' },
          '40%':  { opacity: '1', transform: 'translate(-50%, -50%) scale(1.4)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -50%) scale(1.1)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'translate(-50%, -50%) rotate(-8deg)' },
          '50%':      { transform: 'translate(-50%, -50%) rotate(8deg)' },
        },
      },
      animation: {
        'slide-up':    'slide-up 0.3s ease forwards',
        'bug-appear':  'bug-appear 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'splat':       'splat 0.6s ease-out forwards',
        'wiggle':      'wiggle 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
