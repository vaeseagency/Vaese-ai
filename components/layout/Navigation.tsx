'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)

  useEffect(() => {
    return scrollY.on('change', (v) => {
      setScrolled(v > 40)
      if (v > lastScrollY.current && v > 120) setHidden(true)
      else if (v < lastScrollY.current) setHidden(false)
      lastScrollY.current = v
    })
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      animate={{ y: hidden && !mobileOpen ? -80 : 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="flex items-center gap-1.5" aria-label="Vaese AI home">
            <span className="font-display font-bold text-2xl tracking-tight text-white select-none">
              VAESE
            </span>
            <span className="font-body font-semibold text-[0.6rem] tracking-[0.3em] uppercase select-none self-end mb-[3px]" style={{ color: '#FF2020' }}>
              AI
            </span>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex items-center gap-9"
          role="list"
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={link.href}
                className="nav-link font-body text-xs font-medium tracking-widest uppercase text-text-muted-dark hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <Button variant="red" size="sm" href="#contact" magnetic>
            Book a call
          </Button>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span className="block w-5 h-px bg-white"
            animate={mobileOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span className="block w-5 h-px bg-white"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.18 }}
          />
          <motion.span className="block w-5 h-px bg-white"
            animate={mobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t"
            style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(24px)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="px-6 py-8 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 border-b font-body text-sm font-medium tracking-widest uppercase text-text-muted-dark hover:text-white transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="mt-6"
              >
                <Button variant="red" size="md" href="#contact" className="w-full" onClick={() => setMobileOpen(false)}>
                  Book a call
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
