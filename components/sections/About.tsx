'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const infoRef = useRef(null)
  const inView = useInView(infoRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Parallax background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(124,92,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 70% 50%, rgba(34,211,238,0.05) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">

          {/* Left: Manifesto */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-body font-medium tracking-widest uppercase text-primary mb-8"
            >
              Our manifesto
            </motion.p>

            <AnimatedText
              text="AI is the new infrastructure. Not a feature — the foundation."
              tag="h2"
              mode="words"
              delay={0.05}
              className="font-display font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-white mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-5"
            >
              <p className="font-body text-base text-text-muted leading-relaxed">
                Every decade, a new layer of infrastructure reshapes what&apos;s possible in business.
                The internet changed distribution. The cloud changed scale. AI is changing cognition.
                The companies that build on AI now won&apos;t just move faster — they&apos;ll operate in an entirely
                different dimension from those that don&apos;t.
              </p>
              <p className="font-body text-base text-text-muted leading-relaxed">
                Vaese AI exists to close that gap for ambitious teams. We&apos;re not here to automate
                tasks. We&apos;re here to build the autonomous layer that makes your entire operation more
                intelligent — so you can focus on decisions that actually require humans.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 inline-flex items-center gap-3 text-sm font-body font-medium text-primary"
            >
              <span
                className="w-8 h-px"
                style={{ background: 'linear-gradient(90deg, #7C5CFF, #22D3EE)' }}
              />
              Founded to make AI the default, not the exception.
            </motion.div>
          </div>

          {/* Right: Values */}
          <div ref={infoRef} className="space-y-5">
            {[
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
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 p-5 rounded-xl border border-border-subtle glass group hover:border-primary-border transition-colors duration-400"
              >
                <div
                  className="w-1 flex-shrink-0 rounded-full"
                  style={{ background: i % 2 === 0 ? '#7C5CFF' : '#22D3EE' }}
                />
                <div>
                  <h3 className="font-display font-semibold text-sm text-white mb-1.5">{item.title}</h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
