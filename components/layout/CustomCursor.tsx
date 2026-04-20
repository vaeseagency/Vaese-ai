'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const dotConfig = { damping: 40, stiffness: 500 }
  const dotX = useSpring(mouseX, dotConfig)
  const dotY = useSpring(mouseY, dotConfig)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(
        el.tagName === 'A' ||
          el.tagName === 'BUTTON' ||
          el.closest('a') !== null ||
          el.closest('button') !== null
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', () => setVisible(false))

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className="w-full h-full rounded-full border border-primary/50"
          style={{
            boxShadow: '0 0 12px rgba(124,92,255,0.5), 0 0 24px rgba(124,92,255,0.2)',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          width: hovering ? 4 : 5,
          height: hovering ? 4 : 5,
        }}
      />
    </>
  )
}
