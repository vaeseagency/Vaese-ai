'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Mail, Phone } from 'lucide-react'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:agency@vaese.info', label: 'Email' },
  { icon: Phone, href: 'tel:+31687862661', label: 'Phone' },
]

export default function Footer() {
  return (
    <footer className="relative bg-bg border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,102,255,0.5) 40%, rgba(0,102,255,0.5) 60%, transparent 100%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Main footer row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-semibold text-[1.55rem] leading-none tracking-[0.06em] text-white">
                VAESE
              </span>
              <span
                className="font-body font-medium text-[0.62rem] tracking-[0.3em] uppercase self-end mb-[2px]"
                style={{ color: '#0066FF' }}
              >
                AI
              </span>
            </div>

            <p className="font-body text-xs text-text-muted leading-relaxed max-w-[220px] mb-5">
              Building the autonomous layer for the next era of business.
            </p>

            <div className="w-8 h-px mb-5" style={{ background: '#0066FF' }} aria-hidden />

            <div className="flex flex-col gap-2">
              <a
                href="mailto:agency@vaese.info"
                className="inline-flex items-center gap-2 font-body text-xs text-text-muted hover:text-white transition-colors duration-200"
              >
                <Mail size={11} style={{ color: '#0066FF' }} />
                agency@vaese.info
              </a>
              <a
                href="tel:+31687862661"
                className="inline-flex items-center gap-2 font-body text-xs text-text-muted hover:text-white transition-colors duration-200"
              >
                <Phone size={11} style={{ color: '#0066FF' }} />
                +31 6 87862661
              </a>
            </div>
          </motion.div>

          {/* Links */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-text-muted mb-5">Navigation</p>
            <ul className="flex flex-col gap-3.5" role="list">
              {footerLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-muted hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact + Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-text-muted mb-5">Connect</p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.35, duration: 0.4, type: 'spring' }}
                >
                  <Link
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center border border-border-subtle text-text-muted hover:text-white hover:border-accent-border transition-all duration-300 group"
                  >
                    <Icon size={13} className="group-hover:text-accent transition-colors duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
        >
          <p className="font-body text-[0.6rem] tracking-widest uppercase text-text-muted">
            © {new Date().getFullYear()} Vaese AI — Rotterdam
          </p>
          <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-text-muted">
            Automate. Grow. Dominate.
          </p>
        </div>
      </div>
    </footer>
  )
}
