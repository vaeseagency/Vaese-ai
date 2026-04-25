'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import ShinyButton from '@/components/ui/ShinyButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

function useScramble(text: string, active: boolean, delayMs = 0, speed = 42) {
  const [output, setOutput] = useState(() => text.replace(/[^ ]/g, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
  const rafRef = useRef<number>(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!active || reducedMotion) { setOutput(text); return }

    const start = performance.now() + delayMs
    const SETTLE = speed
    let lastCycle = 0

    const tick = (now: number) => {
      if (now < start) { rafRef.current = requestAnimationFrame(tick); return }
      const elapsed = now - start
      const settled = Math.floor(elapsed / SETTLE)

      if (now - lastCycle > 36) {
        lastCycle = now
        const result = text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (char === ',') return i < settled ? ',' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          if (char === '.') return i < settled ? '.' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          return i < settled ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)].toLowerCase()
        }).join('')
        setOutput(result)
      }

      if (settled < text.length) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setOutput(text)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, text, delayMs, speed, reducedMotion])

  return output
}

function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const CELL = 80
    const cols = Math.ceil(W / CELL) + 2
    const rows = Math.ceil(H / CELL) + 2
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const RADIUS = 200
    const t = Date.now() * 0.00025

    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 0.5
    for (let c = 0; c < cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke()
    }
    for (let r = 0; r < rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke()
    }

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if ((c + r) % 2 !== 0) continue
        const bx = c * CELL, by = r * CELL
        const dx = bx - mx, dy = by - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const inf = dist < RADIUS ? 1 - dist / RADIUS : 0
        const nx = bx + inf * (dx / (dist + 1)) * -12
        const ny = by + inf * (dy / (dist + 1)) * -12
        const phase = (c * 0.5 + r * 0.4 + t * 3) % (Math.PI * 2)
        const pulse = (Math.sin(phase) + 1) * 0.5
        const alpha = inf > 0.3 ? 0.1 + inf * 0.7 : 0.05 + pulse * 0.07
        const radius = inf > 0.3 ? 1.5 + inf * 3 : 1 + pulse * 0.5

        if (inf > 0.3) {
          ctx.beginPath()
          ctx.arc(nx, ny, radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,32,32,${inf * 0.15})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(nx, ny, radius, 0, Math.PI * 2)
        ctx.fillStyle = inf > 0.3 ? `rgba(255,32,32,${alpha})` : `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
    }

    if (mx > 0) {
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS)
      g.addColorStop(0, 'rgba(255,32,32,0.04)')
      g.addColorStop(1, 'rgba(255,32,32,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    frameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouse)
    frameRef.current = requestAnimationFrame(draw)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('mousemove', onMouse); ro.disconnect() }
  }, [draw])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  const rawTilt = useTransform(scrollVelocity, [-2000, 0, 2000], [2, 0, -2])
  const tilt = useSpring(rawTilt, { stiffness: 80, damping: 30 })

  const parallaxY = useTransform(scrollY, [0, 600], [0, -60])
  const fadeOut = useTransform(scrollY, [0, 380], [1, 0])

  const line1 = useScramble('Intelligence,', mounted, 200, 46)
  const line2 = useScramble('deployed.', mounted, 900, 55)

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      aria-label="Hero"
      ref={containerRef}
    >
      {!reducedMotion && <HeroGrid />}
      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 35%, rgba(10,10,10,0.75) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-8 lg:gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* Left: text */}
          <motion.div
            style={reducedMotion ? {} : { y: parallaxY, opacity: fadeOut, rotateX: tilt }}
            className="flex flex-col justify-center"
            transformTemplate={({ rotateX, y }) =>
              `perspective(1200px) rotateX(${rotateX}) translateY(${y})`
            }
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-10"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#FF2020' }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                aria-hidden
              />
              <span className="eyebrow text-text-muted-dark">
                AI Agency — Building the autonomous layer
              </span>
            </motion.div>

            {/* Scramble headline — line 1 */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-[clamp(4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em] text-white scramble-text block"
              >
                {line1}
              </motion.h1>
            </div>

            {/* Scramble headline — line 2 in RED */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-[clamp(4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em] scramble-text block"
                style={{ color: '#FF2020' }}
              >
                {line2}
              </motion.h1>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 mb-9 h-px max-w-sm origin-left"
              style={{ background: 'rgba(255,255,255,0.18)' }}
              aria-hidden
            />

            {/* Sub-headline */}
            <motion.p
              initial={{ filter: 'blur(10px)', opacity: 0, y: 18 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-base text-text-muted-dark leading-[1.75] max-w-md"
            >
              We build AI systems that run your workflows, answer your calls, and close your deals —
              autonomously, around the clock.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <ShinyButton href="#contact">
                Book a strategy call
                <ArrowRight size={15} />
              </ShinyButton>
              <Button variant="outline-light" size="lg" href="#services">
                See what we build
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['215, 70%, 32%', '235, 65%, 38%', '195, 80%, 35%', '255, 60%, 40%'].map((hsl, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border border-white/10"
                    style={{ background: `hsl(${hsl})` }} />
                ))}
              </div>
              <p className="font-body text-xs text-text-muted-dark">
                Trusted by <span className="text-white font-medium">20+ forward-thinking teams</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right: 3D Scene */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.88, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '1200px' }}
            className="relative h-[440px] lg:h-[640px] flex items-center justify-center"
          >
            <div className="absolute inset-0" aria-hidden><HeroScene /></div>

            {/* Floating stats */}
            <motion.div
              animate={reducedMotion ? {} : { y: [-6, 6, -6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[12%] right-[4%] z-10 p-4 border"
              style={{ background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <p className="eyebrow text-text-muted-dark mb-1">Avg. deployment</p>
              <p className="font-display font-bold text-xl text-white">14 days</p>
              <div className="mt-1.5 h-0.5 w-full" style={{ background: '#FF2020' }} aria-hidden />
            </motion.div>

            <motion.div
              animate={reducedMotion ? {} : { y: [6, -6, 6] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-[18%] left-[2%] z-10 p-4 border"
              style={{ background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <p className="eyebrow text-text-muted-dark mb-1">Workflow speed</p>
              <p className="font-display font-bold text-xl" style={{ color: '#00BB44' }}>10× faster</p>
              <div className="mt-1.5 h-0.5 w-full" style={{ background: '#00BB44' }} aria-hidden />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          aria-hidden
        >
          <span className="eyebrow text-text-muted-dark">Scroll</span>
          <motion.div
            className="w-px h-10 origin-top"
            style={{ background: 'linear-gradient(180deg, rgba(255,32,32,0.8), transparent)' }}
            animate={reducedMotion ? {} : { scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
