'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: 10,
    suffix: 'x',
    label: 'Faster workflows',
    description: 'Average speed improvement across automated processes',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Always operational',
    description: 'AI agents that never clock out, never miss a beat',
  },
  {
    value: 0,
    suffix: '',
    label: 'Human bottlenecks',
    description: 'Critical paths where manual approval causes delay',
  },
  {
    value: 14,
    suffix: ' days',
    label: 'Average deployment',
    description: 'From kickoff to production-ready AI system',
  },
]

function CountUp({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Easing: cubic out — quick start, precise settle
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div
        className="h-full p-8 lg:p-10 border transition-all duration-500"
        style={{
          background: '#ffffff',
          borderColor: 'rgba(5,5,5,0.09)',
        }}
      >
        {/* Large number */}
        <div
          className="font-display font-light text-[clamp(4rem,7vw,6rem)] leading-none mb-5 tabular-nums tracking-[-0.02em]"
          style={{ color: inView ? '#0066FF' : 'rgba(0,102,255,0.3)' }}
        >
          <CountUp target={stat.value} suffix={stat.suffix} isInView={inView} />
        </div>

        {/* Label */}
        <h3 className="font-body font-semibold text-sm text-bg mb-2 tracking-tight">{stat.label}</h3>
        <p className="font-body text-xs text-text-muted-light leading-relaxed">{stat.description}</p>

        {/* Accent line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
          style={{ background: '#0066FF' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </div>
    </motion.div>
  )
}

export default function WhyVaese() {
  return (
    <section className="section-padding relative bg-bg-section overflow-hidden">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(5,5,5,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header — asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              Why Vaese AI
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em] text-bg"
            >
              Outcomes that{' '}
              <span className="italic" style={{ color: '#0066FF' }}>compound.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-sm text-text-muted-light leading-[1.8] max-w-xs lg:text-right"
          >
            These aren&apos;t promises. They&apos;re the baseline results our clients see once AI is
            running their most critical workflows.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Industry trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-14 pt-10 border-t flex flex-wrap items-center justify-between gap-6"
          style={{ borderColor: 'rgba(5,5,5,0.1)' }}
        >
          {['E-commerce', 'SaaS', 'Real Estate', 'Finance', 'Healthcare', 'Logistics'].map((industry, i) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + 0.5, duration: 0.5 }}
              className="font-body text-[0.6rem] font-medium tracking-[0.25em] uppercase text-text-muted-light"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
