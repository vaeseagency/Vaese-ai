'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Mouse position shared via ref to avoid re-renders
function useGlobalMouse() {
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return mouse
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = 1800

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6

      // Mix red (#FF2020), blue (#0055FF), white — multi-color accents
      const mix = Math.random()
      const palette = Math.random()
      if (palette < 0.33) {
        // red
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.125; col[i * 3 + 2] = 0.125
      } else if (palette < 0.66) {
        // blue
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.33; col[i * 3 + 2] = 1.0
      } else {
        // white (most particles)
        col[i * 3] = 1.0 - mix * 0.3; col[i * 3 + 1] = 1.0 - mix * 0.3; col[i * 3 + 2] = 1.0 - mix * 0.3
      }
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.025
    ref.current.rotation.x = Math.sin(t * 0.01) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

function WireframeOrb({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    const targetX = mouse.current.y * 0.35
    const targetY = t * 0.18 + mouse.current.x * 0.35

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.18
  })

  return (
    <group ref={groupRef}>
      {/* Core wireframe — white/near-white */}
      <mesh>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner shell */}
      <mesh>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#FF2020" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Outer icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Ring 1 — red */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, 120]} />
        <meshBasicMaterial color="#FF2020" transparent opacity={0.5} />
      </mesh>

      {/* Ring 2 — blue */}
      <mesh rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
        <torusGeometry args={[2.85, 0.005, 16, 120]} />
        <meshBasicMaterial color="#0055FF" transparent opacity={0.4} />
      </mesh>

      {/* Ring 3 — green */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 8]}>
        <torusGeometry args={[3.1, 0.004, 16, 120]} />
        <meshBasicMaterial color="#00BB44" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function SceneContent() {
  const mouse = useGlobalMouse()
  return (
    <>
      <ParticleField />
      <WireframeOrb mouse={mouse} />
    </>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <SceneContent />
    </Canvas>
  )
}
