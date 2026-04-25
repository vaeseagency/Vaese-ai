'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL_LENGTH = 14
const TRAIL_DECAY = 80 // ms until fully gone

type TrailPoint = { x: number; y: number; t: number }

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hoverColor, setHoverColor] = useState('#FF2020')

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  // Large outer ring — very laggy (feels like it's dragged through liquid)
  const outerX = useSpring(mouseX, { damping: 22, stiffness: 120, mass: 0.8 })
  const outerY = useSpring(mouseY, { damping: 22, stiffness: 120, mass: 0.8 })

  // Medium ring — medium lag
  const midX = useSpring(mouseX, { damping: 30, stiffness: 220 })
  const midY = useSpring(mouseY, { damping: 30, stiffness: 220 })

  // Dot — snaps instantly
  const dotX = useSpring(mouseX, { damping: 50, stiffness: 800 })
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 800 })

  // Canvas trail
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const frameRef = useRef<number>(0)
  const rawMouse = useRef({ x: -300, y: -300 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      rawMouse.current = { x: e.clientX, y: e.clientY }
      trailRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (trailRef.current.length > TRAIL_LENGTH * 3) {
        trailRef.current = trailRef.current.slice(-TRAIL_LENGTH * 3)
      }
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isInteractive =
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') !== null || el.closest('button') !== null

      setHovering(isInteractive)

      // Detect which color zone we're in
      const section = el.closest('section')
      if (section) {
        const bg = window.getComputedStyle(section).backgroundColor
        const isDark = bg.includes('10, 10, 10') || bg.includes('0, 0, 0') || bg === 'rgba(0, 0, 0, 0)'
        setHoverColor(isDark ? '#FF2020' : '#0055FF')
      }
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    // Canvas trail animation
    const drawTrail = (now: number) => {
      const canvas = canvasRef.current
      if (!canvas) { frameRef.current = requestAnimationFrame(drawTrail); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) { frameRef.current = requestAnimationFrame(drawTrail); return }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const active = trailRef.current.filter(p => now - p.t < TRAIL_DECAY * TRAIL_LENGTH)
      if (active.length > 1) {
        for (let i = 1; i < active.length; i++) {
          const p = active[i]
          const age = now - p.t
          const life = Math.max(0, 1 - age / (TRAIL_DECAY * TRAIL_LENGTH))
          const size = life * 4

          const color = hovering ? hoverColor : '#ffffff'
          const hex = color.replace('#', '')
          const r = parseInt(hex.slice(0, 2), 16)
          const g = parseInt(hex.slice(2, 4), 16)
          const b = parseInt(hex.slice(4, 6), 16)

          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(0.5, size), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${life * 0.6})`
          ctx.fill()
        }
      }

      frameRef.current = requestAnimationFrame(drawTrail)
    }

    frameRef.current = requestAnimationFrame(drawTrail)

    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [mouseX, mouseY, hovering, hoverColor])

  return (
    <>
      {/* Canvas trail layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 left-0 z-[99995]"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
        aria-hidden
      />

      {/* Outer ring — large, very laggy, changes color on hover */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99996] rounded-full"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? (hovering ? 0.9 : 0.45) : 0,
        }}
        animate={{
          width: hovering ? 64 : clicking ? 30 : 48,
          height: hovering ? 64 : clicking ? 30 : 48,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        <div
          className="w-full h-full rounded-full border transition-colors duration-300"
          style={{
            borderColor: hovering ? hoverColor : 'rgba(255,255,255,0.6)',
            background: hovering ? `${hoverColor}08` : 'transparent',
          }}
        />
      </motion.div>

      {/* Middle ring — medium lag, always visible */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99997] rounded-full"
        style={{
          x: midX,
          y: midY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 0.25 : 0,
          width: 24,
          height: 24,
        }}
      >
        <div
          className="w-full h-full rounded-full border transition-colors duration-300"
          style={{ borderColor: hovering ? hoverColor : 'rgba(255,255,255,0.4)' }}
        />
      </motion.div>

      {/* Inner dot — immediate snap */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background: hovering ? hoverColor : '#ffffff',
        }}
        animate={{
          width: hovering ? 7 : clicking ? 3 : 4.5,
          height: hovering ? 7 : clicking ? 3 : 4.5,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  )
}
