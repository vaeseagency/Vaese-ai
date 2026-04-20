'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'

const projects = [
  {
    industry: 'E-commerce',
    name: 'Autonomous Support Layer',
    result: '62% reduction in support tickets handled by humans',
    metric: '62%',
    metricLabel: 'Less human support',
    description:
      'Built a multi-channel AI system handling 3,000+ daily customer interactions — returns, order status, product questions — with zero escalation for standard requests.',
    gradient: 'from-violet-900/40 via-violet-800/20 to-transparent',
    accentColor: '#7C5CFF',
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
    gradient: 'from-cyan-900/30 via-cyan-800/15 to-transparent',
    accentColor: '#22D3EE',
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
    gradient: 'from-purple-900/30 via-indigo-900/20 to-transparent',
    accentColor: '#7C5CFF',
    tags: ['Voice Agent', 'Lead Qualification', 'Custom App'],
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border-subtle glass overflow-hidden hover:border-primary-border transition-colors duration-500"
    >
      {/* Gradient image area */}
      <div
        className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-end p-6 overflow-hidden`}
      >
        {/* Grid pattern in image area */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Large metric */}
        <div className="relative z-10">
          <span
            className="font-display font-bold text-5xl leading-none"
            style={{ color: project.accentColor }}
          >
            {project.metric}
          </span>
          <p className="text-sm text-white/60 font-body mt-1">{project.metricLabel}</p>
        </div>

        {/* Top-right arrow link */}
        <div
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary/40"
          style={{ background: `${project.accentColor}15` }}
        >
          <ArrowUpRight size={14} style={{ color: project.accentColor }} />
        </div>

        {/* Industry tag */}
        <span
          className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-body font-medium border"
          style={{
            color: project.accentColor,
            borderColor: `${project.accentColor}30`,
            background: `${project.accentColor}10`,
          }}
        >
          {project.industry}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <h3 className="font-display font-semibold text-lg text-white mb-3">{project.name}</h3>
        <p className="font-body text-sm text-text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-body text-text-muted border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Result bar */}
        <div className="mt-5 pt-5 border-t border-border-subtle">
          <p className="text-xs font-body text-text-muted">
            <span className="text-white font-medium">Result: </span>
            {project.result}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-body font-medium tracking-widest uppercase text-primary mb-4"
            >
              Selected work
            </motion.p>

            <AnimatedText
              text="What we've deployed."
              tag="h2"
              mode="words"
              className="font-display font-semibold text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-text-muted font-body max-w-xs"
          >
            Real outcomes, real businesses. Every engagement starts with measurable goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
