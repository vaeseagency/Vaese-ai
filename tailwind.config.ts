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
        bg: '#050505',
        'bg-section': '#F5F5F0',
        'bg-card': '#0C0C0C',
        'bg-card-hover': '#141414',
        accent: '#0066FF',
        'accent-dim': 'rgba(0,102,255,0.08)',
        'accent-border': 'rgba(0,102,255,0.22)',
        'accent-glow': 'rgba(0,102,255,0.35)',
        'text-muted': 'rgba(255,255,255,0.42)',
        'text-muted-light': 'rgba(5,5,5,0.52)',
        'border-subtle': 'rgba(255,255,255,0.07)',
        'border-light': 'rgba(5,5,5,0.1)',
        'border-accent': 'rgba(0,102,255,0.28)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-dark': "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        'grid-light': "linear-gradient(rgba(5,5,5,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.06) 1px, transparent 1px)",
      },
      animation: {
        'precision-pulse': 'precisionPulse 3s ease-in-out infinite',
        'float-subtle': 'floatSubtle 9s ease-in-out infinite',
        'float-subtle-delayed': 'floatSubtle 9s ease-in-out infinite 2s',
        'draw-line': 'drawLine 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
        'spin-slow': 'spin 35s linear infinite',
        'count-up': 'countUp 0.3s ease-out',
        'geo-drift': 'geoDrift 25s ease-in-out infinite',
      },
      keyframes: {
        precisionPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drawLine: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left center' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left center' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        geoDrift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(4px) translateY(-6px) rotate(0.5deg)' },
          '50%': { transform: 'translateX(-3px) translateY(-10px) rotate(-0.3deg)' },
          '75%': { transform: 'translateX(5px) translateY(-4px) rotate(0.4deg)' },
        },
      },
      boxShadow: {
        'accent': '0 0 60px rgba(0,102,255,0.15), 0 0 120px rgba(0,102,255,0.06)',
        'accent-sm': '0 0 24px rgba(0,102,255,0.22)',
        'card-dark': '0 0 0 1px rgba(255,255,255,0.06)',
        'card-lift-dark': '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
        'card-light': '0 0 0 1px rgba(5,5,5,0.09)',
        'card-lift-light': '0 20px 56px rgba(0,0,0,0.09), 0 0 0 1px rgba(5,5,5,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
