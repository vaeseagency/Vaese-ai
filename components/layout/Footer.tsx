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
  { icon: Twitter, href: '#', label: 'Twitter', color: '#0055FF' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0055FF' },
  { icon: Mail, href: 'mailto:agency@vaese.info', label: 'Email', color: '#FF2020' },
  { icon: Phone, href: 'tel:+31687862661', label: 'Phone', color: '#00BB44' },
]

export default function Footer() {
  return (
    <footer className="relative bg-bg">
      {/* Multi-color top border */}
      <div className="absolute inset-x-0 top-0 h-px" aria-hidden
        style={{ background: 'linear-gradient(90deg, #FF2020 0%, #0055FF 40%, #00BB44 70%, transparent 100%)' }}
      />

      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-1.5 mb-4">
              <span className="font-display font-bold text-2xl tracking-tight text-white select-none">VAESE</span>
              <span className="font-body font-semibold text-[0.6rem] tracking-[0.3em] uppercase select-none self-end mb-[2px]" style={{ color: '#FF2020' }}>AI</span>
            </div>
            <p className="font-body text-xs text-text-muted-dark leading-relaxed max-w-[200px] mb-5">
              Building the autonomous layer for the next era of business.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:agency@vaese.info" className="inline-flex items-center gap-2 font-body text-xs text-text-muted-dark hover:text-white transition-colors">
                <Mail size={11} style={{ color: '#FF2020' }} />agency@vaese.info
              </a>
              <a href="tel:+31687862661" className="inline-flex items-center gap-2 font-body text-xs text-text-muted-dark hover:text-white transition-colors">
                <Phone size={11} style={{ color: '#00BB44' }} />+31 6 87862661
              </a>
            </div>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            <p className="eyebrow text-text-muted-dark mb-5">Navigation</p>
            <ul className="flex flex-col gap-3.5" role="list">
              {footerLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.45 }}
                >
                  <Link href={link.href} className="font-body text-sm text-text-muted-dark hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="eyebrow text-text-muted-dark mb-5">Connect</p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 + 0.35, type: 'spring', stiffness: 350 }}
                >
                  <Link
                    href={href}
                    aria-label={label}
                    className="group w-9 h-9 flex items-center justify-center border border-border-light text-text-muted-dark hover:text-white transition-all duration-300"
                    style={{ '--hover-color': color } as React.CSSProperties}
                  >
                    <motion.span whileHover={{ scale: 1.2, color }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Icon size={13} />
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="eyebrow text-text-muted-dark">
            © {new Date().getFullYear()} Vaese AI — Rotterdam
          </p>
          <div className="flex items-center gap-2">
            {['Automate.', 'Grow.', 'Dominate.'].map((word, i) => (
              <span
                key={word}
                className="eyebrow"
                style={{ color: ['#FF2020', '#0055FF', '#00BB44'][i] }}
              >
                {word}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
