'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Outer ring — lags with spring physics
  const ringX = useSpring(mouseX, { damping: 18, stiffness: 160, mass: 0.6 })
  const ringY = useSpring(mouseY, { damping: 18, stiffness: 160, mass: 0.6 })

  // Inner dot — snaps immediately
  const dotX = useSpring(mouseX, { damping: 45, stiffness: 600 })
  const dotY = useSpring(mouseY, { damping: 45, stiffness: 600 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') !== null ||
        el.closest('button') !== null
      )
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring — electric blue, lags */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 56 : clicking ? 28 : 40,
          height: hovering ? 56 : clicking ? 28 : 40,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{
            borderColor: hovering
              ? 'rgba(0,102,255,0.9)'
              : 'rgba(0,102,255,0.55)',
            boxShadow: hovering
              ? '0 0 16px rgba(0,102,255,0.5), inset 0 0 16px rgba(0,102,255,0.08)'
              : '0 0 8px rgba(0,102,255,0.3)',
            background: hovering ? 'rgba(0,102,255,0.06)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Inner dot — white, precise */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background: hovering ? '#0066FF' : '#ffffff',
        }}
        animate={{
          width: hovering ? 6 : clicking ? 3 : 4,
          height: hovering ? 6 : clicking ? 3 : 4,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </>
  )
}
