'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Book a call', href: '#contact', accent: true },
]

const EXPAND_THRESHOLD = 80

const containerVariants = {
  expanded: {
    opacity: 1,
    width: 'auto',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  collapsed: {
    opacity: 1,
    width: '3rem',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const logoVariants = {
  expanded: { opacity: 1, x: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  collapsed: { opacity: 0, x: -16, scale: 0.95, transition: { duration: 0.18 } },
}

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 300, delay: 0.18 } },
}

export default function Navigation() {
  const [isExpanded, setExpanded] = useState(true)
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)
  const scrollOnCollapse = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastScrollY.current
    if (isExpanded && latest > prev && latest > 150) {
      setExpanded(false)
      scrollOnCollapse.current = latest
    } else if (!isExpanded && latest < prev && scrollOnCollapse.current - latest > EXPAND_THRESHOLD) {
      setExpanded(true)
    }
    lastScrollY.current = latest
  })

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.93 } : {}}
        onClick={() => { if (!isExpanded) setExpanded(true) }}
        className={cn(
          'flex items-center overflow-hidden border h-12',
          !isExpanded && 'cursor-pointer justify-center'
        )}
        style={{
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderColor: 'rgba(255,255,255,0.14)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <motion.div variants={logoVariants} className="flex-shrink-0 flex items-center pl-5 pr-2 gap-1">
          <span className="font-display font-bold text-[0.95rem] tracking-tight text-white select-none">VAESE</span>
          <span
            className="font-body font-semibold text-[0.52rem] tracking-[0.3em] uppercase select-none self-end mb-[2px]"
            style={{ color: '#FF2020' }}
          >
            AI
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-px h-4 flex-shrink-0 mx-1"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        />

        {/* Links */}
        <motion.div
          className={cn('flex items-center pr-3', !isExpanded && 'pointer-events-none')}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'font-body text-[0.62rem] font-medium tracking-widest uppercase px-3 py-1.5 whitespace-nowrap transition-colors duration-200',
                item.accent
                  ? 'ml-1 border'
                  : 'text-text-muted-dark hover:text-white'
              )}
              style={item.accent
                ? { color: '#FF2020', borderColor: 'rgba(255,32,32,0.5)', background: 'rgba(255,32,32,0.06)' }
                : {}
              }
              whileHover={!item.accent ? {} : { backgroundColor: 'rgba(255,32,32,0.15)' }}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Collapsed hamburger icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? 'expanded' : 'collapsed'}>
            <Menu className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  )
}
