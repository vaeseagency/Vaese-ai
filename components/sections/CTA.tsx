'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CalInline from '@/components/ui/CalInline'
import Button from '@/components/ui/Button'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <section id="contact" className="section-padding relative bg-bg overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} ref={ref} aria-label="Book a call">
      <motion.div
        className="pointer-events-none absolute inset-0 grid-dark"
        style={{ y: bgY }}
        aria-hidden
      />

      {/* Multi-color ambient radials */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,32,32,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,85,255,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,187,68,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Geometric corner brackets */}
      {[
        { corner: 'top-0 left-0', borders: 'border-l border-t' },
        { corner: 'top-0 right-0', borders: 'border-r border-t' },
        { corner: 'bottom-0 left-0', borders: 'border-l border-b' },
        { corner: 'bottom-0 right-0', borders: 'border-r border-b' },
      ].map(({ corner, borders }, i) => (
        <motion.div
          key={corner}
          className={`pointer-events-none absolute ${corner} w-20 h-20 ${borders}`}
          style={{ borderColor: 'rgba(255,32,32,0.35)' }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-text-muted-dark mb-7"
          >
            Let&apos;s talk
          </motion.p>

          {/* Title — split word reveal */}
          <div className="mb-7 overflow-hidden">
            {'Book a Free Discovery Call'.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
                <motion.span
                  className="inline-block font-display font-bold text-[clamp(2.8rem,6.5vw,5rem)] leading-tight tracking-tight"
                  style={{ color: i === 3 ? '#FF2020' : '#ffffff' }}
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: i * 0.09 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.p
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="font-body text-sm text-text-muted-dark leading-[1.8] max-w-lg mx-auto"
          >
            Discover how Vaese AI can automate and grow your business.
            Pick a time that works for you.
          </motion.p>
        </div>

        {/* Cal.com embed */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="border"
          style={{ background: 'rgba(17,17,17,0.9)', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <CalInline calLink="vaese-ai-x3fvop/30min" />
        </motion.div>

        {/* Contact fallback */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 font-body text-xs text-text-muted-dark"
        >
          <span className="eyebrow text-text-muted-dark">Or reach us directly:</span>
          <a href="mailto:agency@vaese.info" className="hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/25 pb-px">
            agency@vaese.info
          </a>
          <a href="tel:+31687862661" className="hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/25 pb-px">
            +31 6 87862661
          </a>
        </motion.div>
      </div>
    </section>
  )
}
