'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 10, suffix: 'x', label: 'Faster workflows', description: 'Average speed improvement across automated processes', color: '#FF2020' },
  { value: 24, suffix: '/7', label: 'Always operational', description: 'AI agents that never clock out, never miss a beat', color: '#0055FF' },
  { value: 0, suffix: '', label: 'Human bottlenecks', description: 'Critical paths where manual approval causes delay', color: '#00BB44' },
  { value: 14, suffix: ' days', label: 'Average deployment', description: 'From kickoff to production-ready AI system', color: '#FF2020' },
]

function MechanicalCounter({ target, suffix, color, isInView }: {
  target: number; suffix: string; color: string; isInView: boolean
}) {
  const [count, setCount] = useState(0)
  const [blurred, setBlurred] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2200
    const start = performance.now()

    // Start with blur
    setBlurred(true)
    const blurTimeout = setTimeout(() => setBlurred(false), duration * 0.7)

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Mechanical easing: fast start, then rhythmic ticking near end
      const eased = progress < 0.7
        ? 1 - Math.pow(1 - progress / 0.7, 3)
        : 0.7 + 0.3 * ((progress - 0.7) / 0.3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(blurTimeout) }
  }, [isInView, target])

  return (
    <motion.span
      style={{
        filter: blurred ? 'blur(8px)' : 'blur(0px)',
        color,
        transition: 'filter 0.6s ease',
      }}
    >
      {count}{suffix}
    </motion.span>
  )
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, type: 'spring', stiffness: 90, damping: 14 }}
      className="relative bg-bg-white border border-border-dark overflow-hidden group"
      style={{ borderColor: 'rgba(0,0,0,0.09)' }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-12 h-12"
        style={{
          background: `linear-gradient(225deg, ${stat.color}20, transparent 60%)`,
        }}
        aria-hidden
      />

      <div className="p-8 lg:p-10">
        {/* Huge number with mechanical blur counter */}
        <div className="font-display font-bold text-[clamp(3.5rem,6vw,5.5rem)] leading-none mb-4 tabular-nums tracking-tight">
          <MechanicalCounter target={stat.value} suffix={stat.suffix} color={stat.color} isInView={inView} />
        </div>

        <h3 className="font-display font-semibold text-sm text-text-dark mb-2 tracking-tight">{stat.label}</h3>
        <p className="font-body text-xs text-text-muted leading-relaxed">{stat.description}</p>
      </div>

      {/* Bottom fill bar — draws in on view */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ background: stat.color }}
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1.2, delay: index * 0.12 + 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      {/* Hover overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at 50% 100%, ${stat.color}07, transparent 70%)` }}
        aria-hidden
      />
    </motion.div>
  )
}

export default function WhyVaese() {
  return (
    <section className="section-padding relative bg-bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-white" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
              style={{ color: '#FF2020' }}
            >
              Why Vaese AI
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] leading-tight tracking-tight text-text-dark"
              >
                Outcomes that{' '}
                <span style={{ color: '#FF2020' }}>compound.</span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm text-text-muted leading-[1.8] max-w-xs lg:text-right"
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

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-14 pt-10 border-t border-border-dark flex flex-wrap items-center justify-between gap-6"
        >
          {['E-commerce', 'SaaS', 'Real Estate', 'Finance', 'Healthcare', 'Logistics'].map((industry, i) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 + i * 0.06, duration: 0.5 }}
              className="eyebrow text-text-muted"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
