'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedText from '@/components/ui/AnimatedText'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.95])

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref} aria-label="Call to action">
      {/* Animated gradient background */}
      <motion.div
        className="pointer-events-none absolute inset-0 animated-gradient"
        style={{ scale: bgScale }}
        aria-hidden
      />

      {/* Radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(124,92,255,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(34,211,238,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Top edge glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(124,92,255,0.5) 30%, rgba(34,211,238,0.3) 60%, transparent)',
        }}
      />

      {/* Orbiting particle lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-body font-medium tracking-widest uppercase text-cyan mb-6"
        >
          Ready to start
        </motion.p>

        <AnimatedText
          text="Ready to deploy intelligence?"
          tag="h2"
          mode="words"
          className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-tight gradient-text mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg text-text-muted font-body max-w-xl mx-auto mb-12"
        >
          Book a strategy call. We&apos;ll map your highest-value automation opportunities and show
          you exactly what we&apos;d build — no pitch, just a plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 100 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="https://calendar.app.google/omt8abRcd1YYqDcv5" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" glow className="group min-w-[220px]">
              Book a strategy call
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </a>
          <a href="mailto:agency@vaese.info">
            <Button variant="secondary" size="lg">
              agency@vaese.info
            </Button>
          </a>
          <a href="tel:+31687862661">
            <Button variant="ghost" size="lg">
              +31 6 87862661
            </Button>
          </a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 text-sm text-text-muted font-body"
        >
          No commitment. 30-minute call. Walk away with a roadmap.
        </motion.p>
      </div>
    </section>
  )
}
