'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  mode?: 'words' | 'chars' | 'lines'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  mode = 'words',
  tag: Tag = 'p',
}: AnimatedTextProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <Tag ref={ref} className={cn('overflow-hidden', className)} aria-label={text}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  if (mode === 'chars') {
    const chars = text.split('')
    return (
      <Tag ref={ref} className={cn('overflow-hidden', className)} aria-label={text}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    </div>
  )
}
