'use client'

import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ParticleTextEffect = dynamic(
  () => import('@/components/ui/interactive-text-particle').then(m => m.ParticleTextEffect),
  { ssr: false }
)

export default function ParticleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative bg-bg overflow-hidden border-t"
      style={{ borderColor: 'rgba(255,255,255,0.08)', height: 'clamp(300px, 35vw, 520px)' }}
      aria-label="Interactive visual"
    >
      <div className="pointer-events-none absolute inset-0 grid-dark" aria-hidden />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <span className="eyebrow text-text-muted-dark">Hover to interact</span>
      </motion.div>

      {/* Particle canvas */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ParticleTextEffect
          text="VAESE AI"
          colors={['FF2020', 'ff5555', 'ff9999', 'ffffff', 'cccccc', '8888ff', '0055FF']}
          animationForce={90}
          particleDensity={3}
        />
      </motion.div>
    </section>
  )
}
