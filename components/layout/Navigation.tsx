'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 40))
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(5,6,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Vaese AI home">
          <span className="font-display font-semibold text-[2.2rem] leading-none tracking-tight select-none">
            <span className="gradient-text">VAESE</span>
            <span className="text-primary ml-[0.2em]">AI</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative font-body text-sm text-text-muted hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="#contact">
            <Button variant="primary" size="sm" glow>
              Book a call
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-text-muted hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-px bg-current transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-xl border-t border-border-subtle"
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-base text-text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="block mt-2" onClick={() => setMobileOpen(false)}>
            <Button variant="primary" size="sm" className="w-full" glow>
              Book a call
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}
