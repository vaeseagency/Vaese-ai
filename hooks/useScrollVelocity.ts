'use client'

import { useVelocity, useScroll, useSpring, useTransform } from 'framer-motion'

export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  const tilt = useTransform(scrollVelocity, [-2500, 0, 2500], [2.5, 0, -2.5])
  const smoothTilt = useSpring(tilt, { stiffness: 80, damping: 28 })

  const skew = useTransform(scrollVelocity, [-2000, 0, 2000], [1.5, 0, -1.5])
  const smoothSkew = useSpring(skew, { stiffness: 60, damping: 25 })

  return { tilt: smoothTilt, skew: smoothSkew, velocity: scrollVelocity }
}
