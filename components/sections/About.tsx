'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const values = [
  {
    title: 'Speed without sacrifice',
    body: "We move fast because we've done this before. Two-week sprints, not six-month engagements.",
  },
  {
    title: 'Built to last',
    body: 'No black boxes. Every system we deploy is documented, monitored, and yours to own.',
  },
  {
    title: 'Outcomes over outputs',
    body: 'We measure success the same way you do — revenue, efficiency, time saved.',
  },
  {
    title: 'AI-native, not AI-adjacent',
    body: 'Every person on our team lives at the frontier. We use what we build.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  const inView = useInView(valuesRef, { once: true, margin: '-60px 0px' })

  return (
    <section id="about" className="section-padding bg-bg-section relative overflow-hidden" ref={sectionRef}>
      {/* Parallax grid */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(5,5,5,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>

      {/* Electric blue accent — top right corner */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-64 h-64"
        aria-hidden
        style={{
          background: 'radial-gradient(circle at top right, rgba(0,102,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">

          {/* Left: Manifesto */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-8"
            >
              Our manifesto
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.01em] text-bg mb-9"
            >
              AI is the new infrastructure.{' '}
              <span className="italic" style={{ color: '#0066FF' }}>
                Not a feature — the foundation.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="space-y-5 border-l-2 pl-6"
              style={{ borderColor: 'rgba(5,5,5,0.1)' }}
            >
              <p className="font-body text-sm text-text-muted-light leading-[1.85]">
                Every decade, a new layer of infrastructure reshapes what&apos;s possible in business.
                The internet changed distribution. The cloud changed scale. AI is changing cognition.
                The companies that build on AI now won&apos;t just move faster — they&apos;ll operate in an entirely
                different dimension from those that don&apos;t.
              </p>
              <p className="font-body text-sm text-text-muted-light leading-[1.85]">
                Vaese AI exists to close that gap for ambitious teams. We&apos;re not here to automate
                tasks. We&apos;re here to build the autonomous layer that makes your entire operation more
                intelligent — so you can focus on decisions that actually require humans.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="w-8 h-px" style={{ background: '#0066FF' }} aria-hidden />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted-light">
                Founded to make AI the default, not the exception.
              </span>
            </motion.div>
          </div>

          {/* Right: Values */}
          <div ref={valuesRef} className="space-y-0 pt-2">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 py-7 border-b group"
                style={{ borderColor: 'rgba(5,5,5,0.1)' }}
              >
                {/* Step number */}
                <span
                  className="font-display font-light text-3xl leading-none select-none w-8 flex-shrink-0 text-right"
                  style={{ color: 'rgba(0,102,255,0.25)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3
                    className="font-body font-semibold text-sm text-bg mb-2 group-hover:text-accent transition-colors duration-300"
                    style={{ '--accent-color': '#0066FF' } as React.CSSProperties}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-text-muted-light leading-[1.8]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
