'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We audit your current workflows, data landscape, and automation opportunities. Every system, every bottleneck mapped.',
    color: '#0055FF',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We architect the AI stack — models, agents, pipelines, and integrations — tailored exactly to your operation.',
    color: '#0055FF',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Rapid development of AI agents, automations, and custom tools. Iterative sprints with weekly demos.',
    color: '#00BB44',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Production launch with monitoring, alerting, and full handoff documentation. Zero downtime, zero surprises.',
    color: '#00BB44',
  },
  {
    number: '05',
    title: 'Scale',
    description: 'Expand AI coverage across your organization. Continuous optimization as your business grows.',
    color: '#FF2020',
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      // Alternating entry direction for visual tension
      initial={{ opacity: 0, y: 50, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.14,
        type: 'spring',
        stiffness: 90,
        damping: 14,
      }}
      style={{ perspective: '800px' }}
      className="relative flex flex-col group"
    >
      {/* Ghost number */}
      <div className="overflow-hidden mb-3">
        <motion.span
          initial={{ y: '110%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ delay: index * 0.14 + 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[4rem] leading-none tracking-tight select-none block"
          style={{ color: `${step.color}15` }}
        >
          {step.number}
        </motion.span>
      </div>

      {/* Colored step dot + title */}
      <div className="flex items-center gap-2.5 mb-3">
        <motion.span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: step.color }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.14 + 0.35, type: 'spring', stiffness: 400, damping: 18 }}
          aria-hidden
        />
        <h3 className="font-display font-bold text-lg text-white tracking-tight group-hover:text-opacity-90 transition-colors">
          {step.title}
        </h3>
      </div>

      <p className="font-body text-sm text-text-muted-dark leading-[1.75] pl-[calc(0.5rem+0.625rem)]">
        {step.description}
      </p>

      {/* Bottom line that draws on hover */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px origin-left"
        style={{ background: step.color, opacity: 0.4 }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGPathElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 55%'],
  })
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative bg-bg overflow-hidden" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      {/* Red accent glow — top center */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,32,32,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-text-muted-dark mb-5"
            >
              How we work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] leading-tight tracking-tight text-white"
              >
                From zero to{' '}
                <span style={{ color: '#00BB44' }}>autonomous</span>{' '}
                in weeks.
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex flex-col items-end gap-1.5"
          >
            {['Discover', 'Design', 'Build', 'Deploy', 'Scale'].map((s, i) => (
              <span key={s} className="eyebrow text-text-muted-dark" style={{ opacity: 1 - i * 0.15 }}>{s}</span>
            ))}
          </motion.div>
        </div>

        {/* Animated connecting line — desktop */}
        <div className="hidden lg:block relative mb-16">
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <motion.div
            ref={lineRef}
            className="absolute inset-y-0 left-0 h-px"
            style={{
              scaleX: lineScaleX,
              transformOrigin: 'left center',
              background: 'linear-gradient(90deg, #FF2020, #0055FF, #00BB44)',
              boxShadow: '0 0 12px rgba(255,32,32,0.5)',
            }}
          />

          {/* Glowing head that travels along the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              x: useTransform(lineScaleX, v => `calc(${v * 100}% - 6px)`),
              background: '#FF2020',
              boxShadow: '0 0 12px rgba(255,32,32,0.9)',
              display: lineInView ? 'block' : 'none',
            }}
            aria-hidden
          />

          {/* Step nodes */}
          <div className="absolute -top-[5px] inset-x-0 flex justify-between px-[9%]">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="w-[10px] h-[10px] rounded-full border-2 bg-bg"
                style={{ borderColor: step.color }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.22 + 0.5, type: 'spring', stiffness: 400, damping: 18 }}
              />
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
