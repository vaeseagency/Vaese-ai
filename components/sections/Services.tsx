'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mic, Check, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Globe,
    tag: 'Free — No catch',
    title: 'Your Website, Built Free.',
    tagline: 'A modern, high-converting website for your business — designed and built by us, at zero cost.',
    description:
      'Most agencies charge €3,000–€10,000 for what we deliver as our entry offer. We build it free because we believe the best way to show what AI-powered design looks like is to show you — not tell you.',
    bullets: [
      'Custom design tailored to your brand and industry',
      'Mobile-first, fast-loading, SEO-optimised',
      'Built with modern frameworks (Next.js / React)',
      'Contact forms, booking integrations, analytics',
      'Delivered within 2 weeks of kickoff',
      'No hidden fees, no ongoing contracts required',
    ],
    cta: 'Get your free website',
    ctaHref: '#contact',
    index: 0,
  },
  {
    icon: Mic,
    tag: 'Always on — 24/7',
    title: 'AI Voice Agent.',
    tagline: 'A voice AI that answers calls, qualifies leads, and books appointments — sounding indistinguishable from your best team member.',
    description:
      'Built on the latest conversational AI models, our voice agents handle inbound and outbound calls with natural pacing, interruption handling, and contextual memory. It never sleeps, never misses a call, and never has a bad day.',
    bullets: [
      'Handles inbound enquiries and outbound follow-up',
      'Qualifies leads with custom scripts and logic',
      'Books appointments directly into your calendar',
      'Connects to your CRM, sends summaries after every call',
      'Multilingual — deploy in any language',
      'Live in 7–14 days, fully customised to your business',
    ],
    cta: 'Book a strategy call',
    ctaHref: '#contact',
    index: 1,
  },
]

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 8 }}
      transition={{ duration: 0.8, delay: service.index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      className="h-full"
    >
      <div className="card-light h-full flex flex-col p-8 lg:p-10">
        {/* Tag */}
        <div className="flex items-center gap-2.5 mb-8">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] font-body font-medium tracking-widest uppercase border"
            style={{
              color: '#0066FF',
              borderColor: 'rgba(0,102,255,0.25)',
              background: 'rgba(0,102,255,0.05)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#0066FF' }}
              animate={inView ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: service.index * 0.5 }}
              aria-hidden
            />
            {service.tag}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-5 mb-7">
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0 border"
            style={{
              background: 'rgba(0,102,255,0.06)',
              borderColor: 'rgba(0,102,255,0.18)',
            }}
          >
            <service.icon size={22} style={{ color: '#0066FF' }} strokeWidth={1.4} />
          </div>
          <div className="pt-1">
            <h3 className="font-display font-medium text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-bg">
              {service.title}
            </h3>
            <p className="mt-2 text-sm font-body leading-relaxed text-text-muted-light">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-text-muted-light leading-[1.8] mb-7">
          {service.description}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-7"
          style={{ background: 'rgba(0,102,255,0.15)' }}
          aria-hidden
        />

        {/* Bullets */}
        <ul className="space-y-3 mb-9 flex-1">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <Check
                size={13}
                className="flex-shrink-0 mt-[3px]"
                style={{ color: '#0066FF' }}
                strokeWidth={2.5}
              />
              <span className="font-body text-sm text-text-muted-light leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href={service.ctaHref}
          className="group inline-flex items-center gap-2.5 mt-auto font-body text-sm font-medium"
          style={{ color: '#0066FF' }}
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {service.cta}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-bg-section">
      {/* Precise grid background on light section */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(5,5,5,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            What we offer
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em] text-bg"
          >
            Two offers.{' '}
            <span className="italic" style={{ color: '#0066FF' }}>Both exceptional.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-sm text-text-muted-light font-body leading-[1.8] max-w-md"
          >
            We keep our focus tight so we can deliver at the highest level. A free website to
            start the relationship — and an AI voice agent to transform how you handle every call.
          </motion.p>
        </div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
