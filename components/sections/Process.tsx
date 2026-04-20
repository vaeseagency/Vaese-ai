'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'

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
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Number */}
      <span className="font-display text-[3rem] font-bold leading-none tracking-tight text-white/5 mb-4 select-none">
        {step.number}
      </span>

      {/* Title + accent line */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
        <h3 className="font-display font-semibold text-lg text-white">{step.title}</h3>
      </div>

      <p className="font-body text-sm text-text-muted leading-relaxed pl-[calc(0.375rem+0.75rem)]">
        {step.description}
      </p>

      {/* Active glow on hover */}
      <div className="absolute -inset-4 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.06), transparent 70%)' }}
        aria-hidden />
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  })

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section-padding relative" ref={sectionRef}>
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,92,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body font-medium tracking-widest uppercase text-primary mb-4"
          >
            How we work
          </motion.p>

          <AnimatedText
            text="From zero to autonomous in weeks."
            tag="h2"
            mode="words"
            className="font-display font-semibold text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
          />
        </div>

        {/* Animated connecting line (desktop) */}
        <div className="hidden lg:block relative mb-12">
          <div className="w-full h-px bg-border-subtle" />
          <motion.div
            ref={lineRef}
            className="absolute inset-y-0 left-0 h-px origin-left"
            style={{
              scaleX: lineScaleX,
              background: 'linear-gradient(90deg, #7C5CFF, #22D3EE)',
              boxShadow: '0 0 8px rgba(124,92,255,0.6)',
            }}
          />

          {/* Step dots along the line */}
          <div className="absolute -top-1.5 inset-x-0 flex justify-between px-[10%]">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full border-2 border-primary bg-bg"
                style={{ boxShadow: '0 0 8px rgba(124,92,255,0.6)' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
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
