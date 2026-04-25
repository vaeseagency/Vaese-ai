'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'red' | 'blue' | 'green' | 'ghost' | 'outline-dark' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: Variant
  size?: Size
  magnetic?: boolean
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

export default function Button({
  className,
  variant = 'red',
  size = 'md',
  magnetic = false,
  href,
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null)

  // Magnetic effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMagnet = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }
  const resetMagnet = () => { x.set(0); y.set(0) }

  const base =
    'relative inline-flex items-center justify-center gap-2.5 font-display font-semibold tracking-tight overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<Variant, string> = {
    red: 'bg-red text-white border-0 transition-all duration-200 hover:brightness-110',
    blue: 'bg-blue text-white border-0 transition-all duration-200 hover:brightness-110',
    green: 'bg-green text-white border-0 transition-all duration-200 hover:brightness-110',
    ghost: 'bg-transparent text-text-muted-dark hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200',
    'outline-dark': 'bg-transparent text-text-dark border border-border-dark hover:border-black/30 hover:bg-black/04 transition-all duration-200',
    'outline-light': 'bg-transparent text-white border border-white/15 hover:border-white/35 transition-all duration-200',
  }

  const sizes: Record<Size, string> = {
    sm: 'px-5 py-2 text-xs rounded-sm',
    md: 'px-8 py-3.5 text-sm rounded-sm',
    lg: 'px-10 py-4.5 text-sm rounded-sm',
  }

  // Liquid fill hover element (for red/blue/green)
  const isColored = ['red', 'blue', 'green'].includes(variant)

  const combinedClass = cn(base, variants[variant], sizes[size], className)

  const motionAttrs = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
    ...(magnetic && { style: { x: springX, y: springY } }),
    ...(magnetic && { onMouseMove: handleMagnet, onMouseLeave: resetMagnet }),
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...motionAttrs}
        className={combinedClass}
        onClick={props.onClick}
        aria-label={props['aria-label']}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...motionAttrs}
      className={combinedClass}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type ?? 'button'}
      aria-label={props['aria-label']}
    >
      {children}
    </motion.button>
  )
}
