import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        'bg-white': '#FFFFFF',
        'bg-off': '#F7F7F5',
        'bg-card-dark': '#111111',
        'bg-card-white': '#FFFFFF',
        red: '#FF2020',
        'red-dim': 'rgba(255,32,32,0.1)',
        blue: '#0055FF',
        'blue-dim': 'rgba(0,85,255,0.1)',
        green: '#00BB44',
        'green-dim': 'rgba(0,187,68,0.1)',
        'text-dark': 'rgba(10,10,10,0.92)',
        'text-muted': 'rgba(10,10,10,0.48)',
        'text-light': 'rgba(255,255,255,0.92)',
        'text-muted-dark': 'rgba(255,255,255,0.45)',
        'border-dark': 'rgba(10,10,10,0.09)',
        'border-light': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'floatY 7s ease-in-out infinite',
        'float-delayed': 'floatY 7s ease-in-out infinite 2s',
        'draw-x': 'drawX 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drawX: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left center' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left center' },
        },
      },
      boxShadow: {
        'red-glow': '0 0 40px rgba(255,32,32,0.2), 0 0 80px rgba(255,32,32,0.08)',
        'blue-glow': '0 0 40px rgba(0,85,255,0.2)',
        'green-glow': '0 0 40px rgba(0,187,68,0.2)',
        'card-lift': '0 24px 64px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.06)',
        'card-lift-dark': '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
