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
        bg: '#05060A',
        'bg-card': '#0A0B14',
        'bg-card-hover': '#0E1020',
        primary: '#7C5CFF',
        'primary-dim': 'rgba(124,92,255,0.12)',
        'primary-border': 'rgba(124,92,255,0.2)',
        'primary-glow': 'rgba(124,92,255,0.4)',
        cyan: '#22D3EE',
        'cyan-dim': 'rgba(34,211,238,0.1)',
        'text-muted': 'rgba(200,200,230,0.55)',
        'border-subtle': 'rgba(255,255,255,0.06)',
        'border-primary': 'rgba(124,92,255,0.18)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'spin-slow': 'spin 25s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'count-up': 'countUp 0.3s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 80px rgba(124,92,255,0.2), 0 0 160px rgba(124,92,255,0.08)',
        'glow-primary-sm': '0 0 30px rgba(124,92,255,0.25)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.18)',
        'card': '0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.03)',
        'card-hover': '0 0 0 1px rgba(124,92,255,0.3), 0 20px 60px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

export default config
