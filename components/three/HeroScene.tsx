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

      // Mix violet and cyan
      const mix = Math.random()
      col[i * 3] = 0.48 * (1 - mix) + 0.13 * mix       // R
      col[i * 3 + 1] = 0.36 * (1 - mix) + 0.83 * mix   // G
      col[i * 3 + 2] = 1.0 * (1 - mix) + 0.93 * mix    // B
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
      {/* Core wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.32} />
      </mesh>

      {/* Semi-transparent inner shell */}
      <mesh>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#7C5CFF" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Outer icosahedron for depth */}
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Orbital ring 1 — equatorial */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.007, 16, 120]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.45} />
      </mesh>

      {/* Orbital ring 2 — tilted */}
      <mesh rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
        <torusGeometry args={[2.85, 0.005, 16, 120]} />
        <meshBasicMaterial color="#7C5CFF" transparent opacity={0.28} />
      </mesh>

      {/* Orbital ring 3 — counter-tilted */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 8]}>
        <torusGeometry args={[3.1, 0.004, 16, 120]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.15} />
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
