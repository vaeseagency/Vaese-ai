'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  delay?: number
  stagger?: boolean
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
}

export default function Section({
  id,
  className,
  children,
  delay = 0,
  stagger = false,
}: SectionProps) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  if (stagger) {
    return (
      <motion.section
        id={id}
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView || reducedMotion ? 'visible' : 'hidden'}
        className={cn('section-padding', className)}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      animate={inView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('section-padding', className)}
    >
      {children}
    </motion.section>
  )
}
