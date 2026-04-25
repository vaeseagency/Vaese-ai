'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CalInline from '@/components/ui/CalInline'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section id="contact" className="section-padding relative bg-bg overflow-hidden" ref={ref} aria-label="Book a call">
      {/* Precise grid background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </motion.div>

      {/* Electric blue ambient — center */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,102,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Geometric corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 w-24 h-24 border-l border-t" style={{ borderColor: 'rgba(0,102,255,0.2)' }} aria-hidden />
      <div className="pointer-events-none absolute top-0 right-0 w-24 h-24 border-r border-t" style={{ borderColor: 'rgba(0,102,255,0.2)' }} aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 w-24 h-24 border-l border-b" style={{ borderColor: 'rgba(0,102,255,0.2)' }} aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 w-24 h-24 border-r border-b" style={{ borderColor: 'rgba(0,102,255,0.2)' }} aria-hidden />

      {/* Orbiting geometric rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
        {[280, 440, 600].map((size, i) => (
          <motion.div
            key={i}
            className="absolute border"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(0,102,255,${0.06 - i * 0.015})`,
            }}
            animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
            transition={{ duration: 22 + i * 12, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-7"
          >
            Let&apos;s talk
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-white mb-7"
          >
            Book a Free{' '}
            <span className="italic" style={{ color: '#0066FF' }}>Discovery Call</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="font-body text-sm text-text-muted leading-[1.8] max-w-lg mx-auto"
          >
            Discover how Vaese AI can automate and grow your business.
            Pick a time that works for you.
          </motion.p>
        </div>

        {/* Cal.com inline embed */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="border border-border-subtle"
          style={{ background: 'rgba(12,12,12,0.9)' }}
        >
          <CalInline calLink="vaese-ai-x3fvop/30min" />
        </motion.div>

        {/* Contact fallback */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 font-body text-xs text-text-muted"
        >
          <span className="tracking-widest uppercase text-[0.6rem]">Or reach us directly:</span>
          <a
            href="mailto:agency@vaese.info"
            className="hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/20"
          >
            agency@vaese.info
          </a>
          <a
            href="tel:+31687862661"
            className="hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/20"
          >
            +31 6 87862661
          </a>
        </motion.div>
      </div>
    </section>
  )
}
