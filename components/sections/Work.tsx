'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    industry: 'E-commerce',
    name: 'Autonomous Support Layer',
    result: '62% reduction in support tickets handled by humans',
    metric: '62%',
    metricLabel: 'Less human support',
    description: 'Built a multi-channel AI system handling 3,000+ daily customer interactions — returns, order status, product questions — with zero escalation for standard requests.',
    tags: ['AI Chatbot', 'Voice Agent', 'Integration'],
    accentColor: '#FF2020',
    entryX: -60,
  },
  {
    industry: 'B2B SaaS',
    name: 'AI-Powered SDR System',
    result: '2.4x more demos booked with no headcount increase',
    metric: '2.4×',
    metricLabel: 'Demo conversion',
    description: 'Deployed an AI sales agent that researches leads, crafts personalized outreach, handles objections via email, and books meetings directly into calendar — all autonomously.',
    tags: ['AI Sales Agent', 'RAG', 'Automation'],
    accentColor: '#0055FF',
    entryX: 0,
  },
  {
    industry: 'Real Estate',
    name: 'Inbound Voice Intelligence',
    result: '$210K annual savings in receptionist & admin costs',
    metric: '$210K',
    metricLabel: 'Annual savings',
    description: 'A voice AI agent handling 400+ daily inbound calls — qualifying leads, scheduling viewings, answering property questions — with a human-indistinguishable voice.',
    tags: ['Voice Agent', 'Lead Qualification', 'Custom App'],
    accentColor: '#00BB44',
    entryX: 60,
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <motion.article
      ref={ref}
      // Each card enters from a different X direction
      initial={{ opacity: 0, x: project.entryX, rotateY: index === 1 ? 0 : index === 0 ? -6 : 6 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.95, delay: index * 0.15, type: 'spring', stiffness: 75, damping: 14 }}
      style={{ perspective: '1200px' }}
      className="group card-dark-el relative overflow-hidden"
    >
      {/* Parallax header area */}
      <motion.div
        style={{ y: parallaxY, borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        className="relative p-7 border-b overflow-hidden"
      >
        {/* Animated grid in header */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.05,
          }}
          animate={{ backgroundPositionX: ['0px', '28px'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
              className="eyebrow mb-3 block"
              style={{ color: project.accentColor }}
            >
              {project.industry}
            </motion.span>

            {/* Metric — blur reveal */}
            <motion.div
              initial={{ filter: 'blur(14px)', opacity: 0 }}
              animate={inView ? { filter: 'blur(0px)', opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.75 }}
              className="font-display font-bold text-[3.5rem] leading-none tracking-tight"
              style={{ color: project.accentColor }}
            >
              {project.metric}
            </motion.div>
            <p className="font-body text-xs text-text-muted-dark mt-1.5">{project.metricLabel}</p>
          </div>

          <motion.div
            className="w-8 h-8 border flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{ borderColor: `${project.accentColor}50`, background: `${project.accentColor}0D` }}
            whileHover={{ scale: 1.15, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <ArrowUpRight size={13} style={{ color: project.accentColor }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-7">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.45, duration: 0.55 }}
          className="font-display font-bold text-xl text-white mb-3 tracking-tight"
        >
          {project.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ delay: index * 0.15 + 0.55, duration: 0.65 }}
          className="font-body text-sm text-text-muted-dark leading-[1.75] mb-6"
        >
          {project.description}
        </motion.p>

        {/* Tags — staggered left */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.6 + ti * 0.08, duration: 0.4 }}
              className="px-2.5 py-1 font-body text-[0.62rem] tracking-widest uppercase text-text-muted-dark border border-border-light"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="pt-5 border-t border-border-light">
          <p className="font-body text-xs text-text-muted-dark leading-relaxed">
            <span className="text-white font-semibold">Result: </span>
            {project.result}
          </p>
        </div>
      </div>

      {/* Left border accent — draws in on view */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] h-full origin-top"
        style={{ background: project.accentColor }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section-padding bg-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-text-muted-dark mb-5"
            >
              Selected work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] leading-tight tracking-tight text-white"
              >
                What we&apos;ve{' '}
                <span style={{ color: '#00BB44' }}>deployed.</span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="font-body text-sm text-text-muted-dark leading-[1.75] max-w-xs"
          >
            Real outcomes, real businesses. Every engagement starts with measurable goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1200px' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
