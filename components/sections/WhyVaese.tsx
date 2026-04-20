'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'

const stats = [
  {
    value: 10,
    suffix: 'x',
    label: 'Faster workflows',
    description: 'Average speed improvement across automated processes',
    color: '#7C5CFF',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Always operational',
    description: 'AI agents that never clock out, never miss a beat',
    color: '#22D3EE',
  },
  {
    value: 0,
    suffix: '',
    label: 'Human bottlenecks',
    description: 'Critical paths where manual approval causes delay',
    color: '#7C5CFF',
  },
  {
    value: 14,
    suffix: ' days',
    label: 'Average deployment',
    description: 'From kickoff to production-ready AI system',
    color: '#22D3EE',
  },
]

function CountUp({
  target,
  suffix,
  isInView,
}: {
  target: number
  suffix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
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
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-border-subtle glass group hover:border-primary-border transition-colors duration-500"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${stat.color}0A, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Stat value */}
      <div
        className="font-display font-bold text-[clamp(3rem,6vw,4.5rem)] leading-none mb-3 tabular-nums"
        style={{ color: stat.color }}
      >
        <CountUp target={stat.value} suffix={stat.suffix} isInView={inView} />
      </div>

      <h3 className="font-display font-semibold text-base text-white mb-2">{stat.label}</h3>
      <p className="font-body text-sm text-text-muted leading-relaxed">{stat.description}</p>
    </motion.div>
  )
}

export default function WhyVaese() {
  return (
    <section className="section-padding relative">
      {/* Background treatment */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(124,92,255,0.04) 40%, rgba(34,211,238,0.02) 60%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body font-medium tracking-widest uppercase text-primary mb-4"
          >
            Why Vaese AI
          </motion.p>

          <AnimatedText
            text="Outcomes that compound."
            tag="h2"
            mode="words"
            className="font-display font-semibold text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base text-text-muted font-body max-w-xl mx-auto"
          >
            These aren't promises. They're the baseline results our clients see once AI is
            running their most critical workflows.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-border-subtle flex flex-wrap items-center justify-center gap-8"
        >
          {['E-commerce', 'SaaS', 'Real Estate', 'Finance', 'Healthcare', 'Logistics'].map((industry) => (
            <span key={industry} className="text-xs font-body font-medium tracking-widest uppercase text-text-muted">
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
