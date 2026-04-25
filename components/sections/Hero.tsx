'use client'

import { useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

// Living geometric grid background
function GeometricGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const CELL = 72
    const cols = Math.ceil(W / CELL) + 2
    const rows = Math.ceil(H / CELL) + 2
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const RADIUS = 220
    const t = Date.now() * 0.0003

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.038)'
    ctx.lineWidth = 0.5

    for (let c = 0; c < cols; c++) {
      const x = c * CELL
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
    }
    for (let r = 0; r < rows; r++) {
      const y = r * CELL
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }

    // Draw intersection nodes
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const baseX = c * CELL
        const baseY = r * CELL

        const dx = baseX - mx
        const dy = baseY - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = dist < RADIUS ? 1 - dist / RADIUS : 0

        // Tiny displacement from mouse
        const ox = influence * (dx / (dist + 1)) * -14
        const oy = influence * (dy / (dist + 1)) * -14

        const nx = baseX + ox
        const ny = baseY + oy

        // Pulsing nodes at every 3rd intersection
        if ((c + r) % 3 === 0) {
          const phase = (c * 0.4 + r * 0.3 + t * 2.5) % (Math.PI * 2)
          const pulse = (Math.sin(phase) + 1) * 0.5
          const alpha = influence > 0
            ? 0.15 + influence * 0.7 + pulse * 0.2
            : 0.06 + pulse * 0.08
          const radius = influence > 0 ? 1.8 + influence * 3 : 1.2 + pulse * 0.6

          if (influence > 0.2) {
            // Electric blue glow near cursor
            ctx.beginPath()
            ctx.arc(nx, ny, radius * 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0,102,255,${influence * 0.12})`
            ctx.fill()

            ctx.beginPath()
            ctx.arc(nx, ny, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0,102,255,${alpha})`
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.arc(nx, ny, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${alpha})`
            ctx.fill()
          }
        }
      }
    }

    // Cursor spotlight
    if (mx > 0) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS)
      gradient.addColorStop(0, 'rgba(0,102,255,0.05)')
      gradient.addColorStop(1, 'rgba(0,102,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)
    }

    frameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    window.addEventListener('mousemove', onMouseMove)
    frameRef.current = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden
    />
  )
}

// Character-by-character reveal
function CharReveal({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const chars = text.split('')
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.028,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, -50])
  const opacity = useTransform(scrollY, [0, 350], [1, 0])

  // Magnetic CTA effect
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const springX = useSpring(magnetX, { stiffness: 150, damping: 18 })
  const springY = useSpring(magnetY, { stiffness: 150, damping: 18 })

  const handleMagnet = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    magnetX.set((e.clientX - cx) * 0.35)
    magnetY.set((e.clientY - cy) * 0.35)
  }

  const resetMagnet = () => {
    magnetX.set(0)
    magnetY.set(0)
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      aria-label="Hero"
      ref={containerRef}
    >
      {/* Living geometric grid background */}
      {!reducedMotion && <GeometricGrid />}

      {/* Static grid fallback / base layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(5,5,5,0.7) 100%)',
        }}
      />

      {/* Electric blue ambient — top left */}
      <div
        className="pointer-events-none absolute z-[1]"
        aria-hidden
        style={{
          width: '40vw',
          height: '40vw',
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-8 lg:gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* Left: text */}
          <motion.div
            style={reducedMotion ? {} : { y: parallaxY, opacity }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="block w-8 h-px" style={{ background: '#0066FF' }} aria-hidden />
              <span className="font-body text-[0.65rem] font-medium tracking-[0.22em] uppercase text-text-muted">
                AI Agency — Building the autonomous layer
              </span>
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#0066FF' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
            </motion.div>

            {/* Main headline — character by character */}
            <div className="overflow-visible">
              <h1 className="font-display font-light text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-white block">
                {reducedMotion ? (
                  'Intelligence,'
                ) : (
                  <CharReveal text="Intelligence," delay={0.1} />
                )}
              </h1>
              <h1 className="font-display font-light italic text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] block mt-1"
                style={{ color: '#0066FF' }}>
                {reducedMotion ? (
                  'deployed.'
                ) : (
                  <CharReveal text="deployed." delay={0.28} />
                )}
              </h1>
            </div>

            {/* Horizontal accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-px origin-left"
              style={{ background: 'rgba(255,255,255,0.1)', maxWidth: '480px' }}
              aria-hidden
            />

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-base text-text-muted font-body leading-[1.75] max-w-md"
            >
              We build AI systems that run your workflows, answer your calls, and close your deals —
              autonomously, around the clock.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {/* Magnetic primary CTA */}
              <motion.div
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                style={{ x: springX, y: springY }}
              >
                <Button variant="primary" size="lg" glow href="#contact" className="group">
                  Book a strategy call
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </motion.div>
              <Button variant="secondary" size="lg" href="#services">
                See what we build
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border border-white/10"
                    style={{ background: `hsl(${215 + i * 20}, 70%, 35%)` }}
                  />
                ))}
              </div>
              <p className="text-xs text-text-muted font-body">
                Trusted by{' '}
                <span className="text-white font-medium">20+ forward-thinking teams</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Three.js scene */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[440px] lg:h-[640px] flex items-center justify-center"
          >
            <div className="absolute inset-0" aria-hidden>
              <HeroScene />
            </div>

            {/* Floating stat — top right */}
            <motion.div
              animate={reducedMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[12%] right-[4%] z-10 border border-border-subtle"
              style={{ background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(12px)', padding: '12px 16px' }}
            >
              <p className="text-[0.6rem] font-body uppercase tracking-[0.18em] text-text-muted">Avg. deployment</p>
              <p className="text-lg font-display font-medium text-white mt-0.5">14 days</p>
            </motion.div>

            {/* Floating stat — bottom left */}
            <motion.div
              animate={reducedMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-[18%] left-[2%] z-10 border border-border-subtle"
              style={{ background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(12px)', padding: '12px 16px' }}
            >
              <p className="text-[0.6rem] font-body uppercase tracking-[0.18em] text-text-muted">Workflow speed</p>
              <p className="text-lg font-display font-medium mt-0.5" style={{ color: '#0066FF' }}>10× faster</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          aria-hidden
        >
          <span className="font-body text-[0.58rem] tracking-[0.28em] text-text-muted uppercase">Scroll</span>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
