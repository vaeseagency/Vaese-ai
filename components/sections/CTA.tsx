'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import CalInline from '@/components/ui/CalInline'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.95])

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref} aria-label="Book a call">
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

      {/* Orbiting rings */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body font-medium tracking-widest uppercase text-cyan mb-6"
          >
            Let&apos;s talk
          </motion.p>

          <AnimatedText
            text="Book a Free Discovery Call"
            tag="h2"
            mode="words"
            className="font-display font-bold text-[clamp(2rem,5vw,3.75rem)] leading-tight gradient-text mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-text-muted font-body max-w-xl mx-auto"
          >
            Discover how Vaese AI can automate and grow your business.
            Pick a time that works for you.
          </motion.p>
        </div>

        {/* Cal.com inline embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="rounded-2xl overflow-hidden border border-border-subtle"
          style={{ background: 'rgba(10,11,20,0.5)' }}
        >
          <CalInline calLink="vaese-ai-x3fvop/30min" />
        </motion.div>

        {/* Contact fallback */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted font-body"
        >
          <span>Or reach us directly:</span>
          <a
            href="mailto:agency@vaese.info"
            className="hover:text-white transition-colors duration-200"
          >
            agency@vaese.info
          </a>
          <a
            href="tel:+31687862661"
            className="hover:text-white transition-colors duration-200"
          >
            +31 6 87862661
          </a>
        </motion.div>
      </div>
    </section>
  )
}
