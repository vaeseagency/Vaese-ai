'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap, Mic, MessageSquare, Database, TrendingUp,
  Brain, Plug, Code, BarChart3, Sparkles,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import AnimatedText from '@/components/ui/AnimatedText'
import { itemVariants } from '@/components/ui/Section'

const services = [
  {
    icon: Zap,
    title: 'AI Automation',
    description:
      'End-to-end workflow automation across every tool in your stack. Eliminate manual work, reduce errors, and move at machine speed.',
    color: '#7C5CFF',
  },
  {
    icon: Mic,
    title: 'AI Voice Agents',
    description:
      'Inbound and outbound voice AI that sounds and responds like your best team member — 24 hours a day, at any call volume.',
    color: '#22D3EE',
  },
  {
    icon: MessageSquare,
    title: 'Custom AI Chatbots',
    description:
      'Trained on your data, branded to your voice, deployed anywhere. From website assistants to internal Slack bots.',
    color: '#7C5CFF',
  },
  {
    icon: Database,
    title: 'RAG & Knowledge Systems',
    description:
      'Private AI that knows everything about your business — docs, policies, history — and surfaces answers instantly.',
    color: '#22D3EE',
  },
  {
    icon: TrendingUp,
    title: 'AI Sales Agents',
    description:
      'Lead qualification, personalized outreach, and automated follow-up that runs your top-of-funnel on autopilot.',
    color: '#7C5CFF',
  },
  {
    icon: Brain,
    title: 'Process Intelligence',
    description:
      'AI that audits your operations, maps every workflow, and identifies exactly where automation will deliver ROI.',
    color: '#22D3EE',
  },
  {
    icon: Plug,
    title: 'AI Integrations',
    description:
      'Connect LLMs into your existing CRMs, ERPs, and platforms. Intelligence plugged directly into the tools you already use.',
    color: '#7C5CFF',
  },
  {
    icon: Code,
    title: 'Custom AI Apps',
    description:
      'Bespoke internal tools and AI-powered dashboards built around your workflows — not templated SaaS features.',
    color: '#22D3EE',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics',
    description:
      'Real-time intelligence dashboards that surface what matters. Stop reporting on the past; start predicting the future.',
    color: '#7C5CFF',
  },
  {
    icon: Sparkles,
    title: 'Model Fine-Tuning',
    description:
      'Custom LLMs trained on your proprietary data — smaller, faster, and dramatically more accurate for your domain.',
    color: '#22D3EE',
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: (index % 5) * 0.07 }}
    >
      <Card className="h-full p-6 lg:p-7">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${service.color}14`, border: `1px solid ${service.color}20` }}
        >
          <service.icon size={20} style={{ color: service.color }} strokeWidth={1.5} />
        </div>

        <h3 className="font-display font-semibold text-base text-white mb-3">{service.title}</h3>
        <p className="font-body text-sm text-text-muted leading-relaxed">{service.description}</p>

        {/* Learn more link */}
        <div className="mt-5 flex items-center gap-1.5 text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: service.color }}>
          Learn more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body font-medium tracking-widest uppercase text-primary mb-4"
          >
            What we build
          </motion.p>

          <AnimatedText
            text="Every layer of your AI stack."
            tag="h2"
            mode="words"
            className="font-display font-semibold text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base text-text-muted font-body leading-relaxed"
          >
            From first automation to fully autonomous operations — we design, build, and deploy the AI
            infrastructure that runs your business.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
