'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We audit your current workflows, data landscape, and automation opportunities. Every system, every bottleneck mapped.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We architect the AI stack — models, agents, pipelines, and integrations — tailored exactly to your operation.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Rapid development of AI agents, automations, and custom tools. Iterative sprints with weekly demos.',
  },
  {
    number: '04',
    title: 'Deploy',
    description:
      'Production launch with monitoring, alerting, and full handoff documentation. Zero downtime, zero surprises.',
  },
  {
    number: '05',
    title: 'Scale',
    description:
      'Expand AI coverage across your organization. Continuous optimization as your business grows.',
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Step number — large, ghosted, Cormorant */}
      <span
        className="font-display font-light text-[4.5rem] leading-none tracking-tight select-none mb-4 block"
        style={{ color: 'rgba(255,255,255,0.055)' }}
      >
        {step.number}
      </span>

      {/* Accent dot + title */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-1.5 h-1.5 flex-shrink-0"
          style={{ background: '#0066FF' }}
          aria-hidden
        />
        <h3 className="font-display font-medium text-xl text-white tracking-tight">{step.title}</h3>
      </div>

      <p className="font-body text-sm text-text-muted leading-[1.75] pl-[calc(0.375rem+0.75rem)]">
        {step.description}
      </p>

      {/* Right border on all but last (desktop) */}
      {index < steps.length - 1 && (
        <div
          className="hidden lg:block absolute right-0 top-4 bottom-4 w-px"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          aria-hidden
        />
      )}
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 55%'],
  })

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section-padding relative bg-bg overflow-hidden" ref={sectionRef}>
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              How we work
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em] text-white"
            >
              From zero to{' '}
              <span className="italic" style={{ color: '#0066FF' }}>autonomous</span>{' '}
              in weeks.
            </motion.h2>
          </div>

          {/* Side accent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex flex-col items-end gap-2"
          >
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">Five steps.</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">Two weeks.</span>
            <div className="w-12 h-px" style={{ background: '#0066FF' }} />
          </motion.div>
        </div>

        {/* Animated connecting line (desktop) */}
        <div className="hidden lg:block relative mb-14">
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <motion.div
            className="absolute inset-y-0 left-0 h-px"
            style={{
              scaleX: lineScaleX,
              background: '#0066FF',
              transformOrigin: 'left center',
              boxShadow: '0 0 10px rgba(0,102,255,0.7)',
            }}
          />

          {/* Step nodes on line */}
          <div className="absolute -top-[5px] inset-x-0 flex justify-between px-[9%]">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="w-[10px] h-[10px] border-2 bg-bg"
                style={{ borderColor: '#0066FF' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 + 0.4, type: 'spring', stiffness: 280, damping: 18 }}
              />
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
