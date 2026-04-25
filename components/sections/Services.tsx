'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mic, Check, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Globe,
    tag: 'Free — No catch',
    tagColor: '#0055FF',
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
    accentColor: '#0055FF',
    checkColor: '#0055FF',
    cta: 'Get your free website',
    ctaHref: '#contact',
  },
  {
    icon: Mic,
    tag: 'Always on — 24/7',
    tagColor: '#00BB44',
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
    accentColor: '#00BB44',
    checkColor: '#00BB44',
    cta: 'Book a strategy call',
    ctaHref: '#contact',
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: -75, y: -30 }}
      animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{
        duration: 1.0,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 75,
        damping: 14,
      }}
      style={{ perspective: '1400px', transformOrigin: 'top center' }}
      className="h-full"
    >
      <div className="card-white h-full flex flex-col p-8 lg:p-10 relative overflow-hidden">
        {/* Accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: service.accentColor }}
          aria-hidden
        />

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.45, duration: 0.5 }}
          className="flex items-center gap-2 mb-7"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: service.tagColor }}
            animate={inView ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden
          />
          <span className="eyebrow" style={{ color: service.tagColor }}>
            {service.tag}
          </span>
        </motion.div>

        {/* Icon + Title */}
        <div className="flex items-start gap-5 mb-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-12 h-12 flex items-center justify-center flex-shrink-0 border"
            style={{ borderColor: `${service.accentColor}30`, background: `${service.accentColor}08` }}
          >
            <service.icon size={22} style={{ color: service.accentColor }} strokeWidth={1.6} />
          </motion.div>
          <div className="pt-1">
            <h3 className="font-display font-bold text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-text-dark tracking-tight">
              {service.title}
            </h3>
            <p className="mt-1.5 text-sm font-body leading-relaxed text-text-muted">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ filter: 'blur(8px)', opacity: 0 }}
          animate={inView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.75 }}
          className="font-body text-sm text-text-muted leading-[1.8] mb-7"
        >
          {service.description}
        </motion.p>

        <div className="w-full h-px mb-7" style={{ background: `${service.accentColor}18` }} aria-hidden />

        {/* Bullets */}
        <ul className="space-y-3 mb-9 flex-1">
          {service.bullets.map((bullet, bi) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.55 + bi * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3"
            >
              <Check size={13} className="flex-shrink-0 mt-[3px]" style={{ color: service.checkColor }} strokeWidth={2.5} />
              <span className="font-body text-sm text-text-muted leading-relaxed">{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href={service.ctaHref}
          className="group inline-flex items-center gap-2.5 mt-auto font-display font-semibold text-sm"
          style={{ color: service.accentColor }}
          whileHover={{ x: 5 }}
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
    <section id="services" className="section-padding bg-bg relative overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      {/* Blue accent glow */}
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-[400px] h-[300px]"
        aria-hidden
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,85,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-18">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
            style={{ color: '#0055FF' }}
          >
            What we offer
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(2.8rem,5.5vw,4.8rem)] leading-tight tracking-tight text-white"
            >
              Two offers.{' '}
              <span style={{ color: '#0055FF' }}>Both exceptional.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-sm text-text-muted-dark font-body leading-[1.8] max-w-md"
          >
            We keep our focus tight so we can deliver at the highest level. A free website to
            start the relationship — and an AI voice agent to transform how you handle every call.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" style={{ perspective: '1600px' }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
