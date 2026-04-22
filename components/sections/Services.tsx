'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mic, Check, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import AnimatedText from '@/components/ui/AnimatedText'
import Button from '@/components/ui/Button'

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
    color: '#7C5CFF',
    cta: 'Get your free website',
    ctaHref: '#contact',
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
    color: '#22D3EE',
    cta: 'Book a strategy call',
    ctaHref: '#contact',
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card className="h-full p-8 lg:p-10 flex flex-col">
        {/* Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium border"
            style={{
              color: service.color,
              borderColor: `${service.color}30`,
              background: `${service.color}0D`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: service.color }}
              aria-hidden
            />
            {service.tag}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}
          >
            <service.icon size={26} style={{ color: service.color }} strokeWidth={1.4} />
          </div>
          <div>
            <h3 className="font-display font-bold text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-sm font-body leading-relaxed" style={{ color: service.color }}>
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-base text-text-muted leading-relaxed mb-7">
          {service.description}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-7"
          style={{
            background: `linear-gradient(90deg, ${service.color}30, transparent)`,
          }}
          aria-hidden
        />

        {/* Bullets */}
        <ul className="space-y-3 mb-8 flex-1">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <Check
                size={15}
                className="flex-shrink-0 mt-0.5"
                style={{ color: service.color }}
                strokeWidth={2.5}
              />
              <span className="font-body text-sm text-text-muted leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={index === 0 ? 'primary' : 'secondary'}
          size="md"
          glow={index === 0}
          href={service.ctaHref}
          className="w-full group mt-auto"
        >
          {service.cta}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
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
            What we offer
          </motion.p>

          <AnimatedText
            text="Two offers. Both exceptional."
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
            We keep our focus tight so we can deliver at the highest level. A free website to
            start the relationship — and an AI voice agent to transform how you handle every call.
          </motion.p>
        </div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
