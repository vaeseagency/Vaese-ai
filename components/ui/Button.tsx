'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: Variant
  size?: Size
  glow?: boolean
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 380, damping: 22 },
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  glow = false,
  href,
  children,
  ...props
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2.5 font-body font-medium tracking-wide rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:pointer-events-none overflow-hidden select-none'

  const variants: Record<Variant, string> = {
    primary:
      'bg-accent text-white hover:bg-[#0052CC] border border-accent/60',
    secondary:
      'bg-transparent text-white border border-white/15 hover:border-accent/50 hover:bg-accent/06',
    ghost:
      'bg-transparent text-text-muted hover:text-white hover:bg-white/05',
  }

  // Dark section secondary variant — override for light sections
  const sizes: Record<Size, string> = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-7 py-3 text-sm',
    lg: 'px-10 py-4 text-sm',
  }

  const glowEl = glow && variant === 'primary' && (
    <span
      className="pointer-events-none absolute inset-0 animate-precision-pulse rounded-sm"
      style={{ boxShadow: '0 0 0 8px rgba(0,102,255,0.1), 0 0 0 24px rgba(0,102,255,0.04)' }}
      aria-hidden
    />
  )

  const combinedClass = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        className={combinedClass}
        onClick={props.onClick}
        aria-label={props['aria-label']}
      >
        {children}
        {glowEl}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
      className={combinedClass}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type ?? 'button'}
      aria-label={props['aria-label']}
    >
      {children}
      {glowEl}
    </motion.button>
  )
}
