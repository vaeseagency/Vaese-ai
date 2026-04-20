'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  glow?: boolean
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 font-display font-medium tracking-wide rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:pointer-events-none overflow-hidden select-none'

  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90 border border-primary/30',
    secondary: 'bg-transparent text-white border border-white/10 hover:border-primary/40 hover:bg-primary/5',
    ghost: 'bg-transparent text-text-muted hover:text-white hover:bg-white/5',
  }

  const sizes: Record<Size, string> = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type ?? 'button'}
      aria-label={props['aria-label']}
    >
      {children}
      {glow && variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full animate-glow-pulse"
          style={{ boxShadow: '0 0 0 8px rgba(124,92,255,0.15), 0 0 0 24px rgba(124,92,255,0.05)' }}
          aria-hidden
        />
      )}
    </motion.button>
  )
}
