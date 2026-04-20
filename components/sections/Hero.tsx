'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedText from '@/components/ui/AnimatedText'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Headline options (active: option 1):
// 1. "Intelligence, deployed."
// 2. "The mind behind your business."
// 3. "AI that thinks. Systems that act."

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

const eyebrowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 + 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, -60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
      ref={containerRef}
    >
      {/* Ambient background gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(124,92,255,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(34,211,238,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Animated gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 animated-gradient"
        aria-hidden
      />

      {/* Grid lines overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,92,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* Left: text */}
          <motion.div
            style={reducedMotion ? {} : { y: parallaxY, opacity }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <motion.div
              variants={eyebrowVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-widest uppercase text-cyan border border-cyan/20"
                style={{ background: 'rgba(34,211,238,0.06)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
                AI Agency — Building the autonomous layer
              </span>
            </motion.div>

            {/* Main headline */}
            <AnimatedText
              text="Intelligence,"
              tag="h1"
              mode="words"
              delay={0.1}
              className="font-display font-semibold text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-tight gradient-text block"
            />
            <AnimatedText
              text="deployed."
              tag="h1"
              mode="words"
              delay={0.22}
              className="font-display font-semibold text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-white block"
            />

            {/* Sub-headline */}
            <motion.p
              custom={0}
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 text-lg text-text-muted font-body leading-relaxed max-w-md"
            >
              We build AI systems that run your workflows, answer your calls, and close your deals —
              autonomously, around the clock.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={1}
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href="https://calendar.app.google/omt8abRcd1YYqDcv5" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" glow className="group">
                  Book a strategy call
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </a>
              <Button variant="secondary" size="lg">
                See what we build
              </Button>
            </motion.div>

            {/* Social proof hint */}
            <motion.div
              custom={2}
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-bg glass"
                    style={{
                      background: `hsl(${240 + i * 25}, 60%, 40%)`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-text-muted">
                Trusted by{' '}
                <span className="text-white font-medium">20+ forward-thinking teams</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Three.js scene */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[680px] flex items-center justify-center"
          >
            {/* Scene glow backdrop */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)',
              }}
              aria-hidden
            />

            {/* Three.js canvas */}
            <div className="absolute inset-0" aria-hidden>
              <HeroScene />
            </div>

            {/* Floating stat chips */}
            <motion.div
              animate={reducedMotion ? {} : { y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[15%] right-[5%] glass border border-border-subtle rounded-2xl px-4 py-3 z-10"
            >
              <p className="text-xs text-text-muted font-body">Avg. deployment</p>
              <p className="text-lg font-display font-semibold text-white">14 days</p>
            </motion.div>

            <motion.div
              animate={reducedMotion ? {} : { y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[20%] left-[3%] glass border border-border-subtle rounded-2xl px-4 py-3 z-10"
            >
              <p className="text-xs text-text-muted font-body">Workflow speed</p>
              <p className="text-lg font-display font-semibold gradient-text-primary">10× faster</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-xs tracking-widest text-text-muted uppercase font-body">Scroll</span>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={14} className="text-text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
