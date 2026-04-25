'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

export default function ShinyButton({ children, href, className, onClick }: ShinyButtonProps) {
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
  }

  if (href) {
    return (
      <motion.a href={href} className={cn('shiny-cta', className)} onClick={onClick} {...motionProps}>
        <span>{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button className={cn('shiny-cta', className)} onClick={onClick} {...motionProps}>
      <span>{children}</span>
    </motion.button>
  )
}
