'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const values = [
  { title: 'Speed without sacrifice', body: "We move fast because we've done this before. Two-week sprints, not six-month engagements.", color: '#FF2020' },
  { title: 'Built to last', body: 'No black boxes. Every system we deploy is documented, monitored, and yours to own.', color: '#0055FF' },
  { title: 'Outcomes over outputs', body: 'We measure success the same way you do — revenue, efficiency, time saved.', color: '#00BB44' },
  { title: 'AI-native, not AI-adjacent', body: 'Every person on our team lives at the frontier. We use what we build.', color: '#FF2020' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef(null)
  const manifestoRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px 0px' })
  const manifestoInView = useInView(manifestoRef, { once: true, margin: '-60px 0px' })

  return (
    <section id="about" className="section-padding bg-bg relative overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} ref={sectionRef}>
      <motion.div
        className="pointer-events-none absolute inset-0 grid-dark"
        style={{ y: bgY }}
        aria-hidden
      />

      {/* Blue accent top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-72 h-72"
        aria-hidden
        style={{ background: 'radial-gradient(circle at top right, rgba(0,85,255,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">

          {/* Left: Manifesto */}
          <div ref={manifestoRef}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={manifestoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-8"
              style={{ color: '#0055FF' }}
            >
              Our manifesto
            </motion.p>

            {/* Title — word-by-word clip reveal */}
            <div className="mb-9">
              {'AI is the new infrastructure. Not a feature — the foundation.'.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                  <motion.span
                    className="inline-block font-display font-bold text-[clamp(2rem,3.8vw,3.2rem)] leading-tight tracking-tight text-white"
                    initial={{ y: '110%' }}
                    animate={manifestoInView ? { y: 0 } : {}}
                    transition={{ duration: 0.65, delay: i * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={manifestoInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="space-y-5 border-l-2 pl-6"
              style={{ borderColor: 'rgba(0,85,255,0.5)' }}
            >
              {[
                "Every decade, a new layer of infrastructure reshapes what's possible in business. The internet changed distribution. The cloud changed scale. AI is changing cognition. The companies that build on AI now won't just move faster — they'll operate in an entirely different dimension from those that don't.",
                "Vaese AI exists to close that gap for ambitious teams. We're not here to automate tasks. We're here to build the autonomous layer that makes your entire operation more intelligent — so you can focus on decisions that actually require humans.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 16 }}
                  animate={manifestoInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.65 + i * 0.2 }}
                  className="font-body text-sm text-text-muted-dark leading-[1.85]"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={manifestoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="w-8 h-px" style={{ background: '#0055FF' }} aria-hidden />
              <span className="eyebrow text-text-muted-dark">
                Founded to make AI the default, not the exception.
              </span>
            </motion.div>
          </div>

          {/* Right: Values */}
          <div ref={valuesRef} className="space-y-0 pt-2">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? 32 : -32 }}
                animate={valuesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, type: 'spring', stiffness: 90, damping: 14 }}
                className="flex gap-5 py-7 border-b group relative overflow-hidden"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {/* Number index */}
                <span
                  className="font-display font-bold text-2xl leading-none select-none w-8 flex-shrink-0 text-right mt-0.5"
                  style={{ color: `${item.color}30` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} aria-hidden />
                    <h3 className="font-display font-bold text-sm text-white">{item.title}</h3>
                  </div>
                  <p className="font-body text-xs text-text-muted-dark leading-[1.8]">{item.body}</p>
                </div>

                {/* Hover fill */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `${item.color}05`, opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
