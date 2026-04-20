'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CardProps {
  className?: string
  children: React.ReactNode
  tilt?: boolean
  glow?: boolean
}

export default function Card({ className, children, tilt = true, glow = true }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig)
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      style={tilt && !reducedMotion ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'relative rounded-2xl border border-border-subtle glass overflow-hidden group',
        'hover:border-primary-border transition-colors duration-500',
        className
      )}
    >
      {/* Gradient glow that follows cursor */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(200px circle at ${gx}% ${gy}%, rgba(124,92,255,0.12), transparent 70%)`
            ),
          }}
          aria-hidden
        />
      )}

      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />

      {children}
    </motion.div>
  )
}
