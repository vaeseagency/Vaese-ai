'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    industry: 'E-commerce',
    name: 'Autonomous Support Layer',
    result: '62% reduction in support tickets handled by humans',
    metric: '62%',
    metricLabel: 'Less human support',
    description:
      'Built a multi-channel AI system handling 3,000+ daily customer interactions — returns, order status, product questions — with zero escalation for standard requests.',
    tags: ['AI Chatbot', 'Voice Agent', 'Integration'],
  },
  {
    industry: 'B2B SaaS',
    name: 'AI-Powered SDR System',
    result: '2.4x more demos booked with no headcount increase',
    metric: '2.4×',
    metricLabel: 'Demo conversion',
    description:
      'Deployed an AI sales agent that researches leads, crafts personalized outreach, handles objections via email, and books meetings directly into calendar — all autonomously.',
    tags: ['AI Sales Agent', 'RAG', 'Automation'],
  },
  {
    industry: 'Real Estate',
    name: 'Inbound Voice Intelligence',
    result: '$210K annual savings in receptionist & admin costs',
    metric: '$210K',
    metricLabel: 'Annual savings',
    description:
      'A voice AI agent handling 400+ daily inbound calls — qualifying leads, scheduling viewings, answering property questions — with a human-indistinguishable voice.',
    tags: ['Voice Agent', 'Lead Qualification', 'Custom App'],
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        x: index === 0 ? -40 : index === 2 ? 40 : 0,
        y: index === 1 ? 40 : 0,
      }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative card-dark overflow-hidden"
    >
      {/* Header area with metric */}
      <div
        className="relative p-7 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {/* Geometric grid in header */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage: 'linear-gradient(rgba(0,102,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span
              className="font-body text-[0.6rem] font-medium tracking-[0.22em] uppercase mb-3 block"
              style={{ color: '#0066FF' }}
            >
              {project.industry}
            </span>
            <div
              className="font-display font-light text-[3.8rem] leading-none tracking-tight"
              style={{ color: '#0066FF' }}
            >
              {project.metric}
            </div>
            <p className="font-body text-xs text-text-muted mt-1.5">{project.metricLabel}</p>
          </div>

          <motion.div
            className="w-8 h-8 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: 'rgba(0,102,255,0.4)', background: 'rgba(0,102,255,0.08)' }}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight size={13} style={{ color: '#0066FF' }} />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="font-display font-medium text-xl text-white mb-3 tracking-tight">{project.name}</h3>
        <p className="font-body text-sm text-text-muted leading-[1.75] mb-6">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 font-body text-[0.62rem] tracking-widest uppercase text-text-muted border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Result */}
        <div className="pt-5 border-t border-border-subtle">
          <p className="font-body text-xs text-text-muted leading-relaxed">
            <span className="text-white font-medium">Result: </span>
            {project.result}
          </p>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] w-full origin-left"
        style={{ background: '#0066FF' }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section-padding bg-bg relative overflow-hidden">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header — asymmetric two-column */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              Selected work
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em] text-white"
            >
              What we&apos;ve{' '}
              <span className="italic" style={{ color: '#0066FF' }}>deployed.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-body text-sm text-text-muted leading-[1.75] max-w-xs"
          >
            Real outcomes, real businesses. Every engagement starts with measurable goals.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
