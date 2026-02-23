import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// ── Star field drifting diagonally ───────────────────────────────────────────
function Stars() {
  const ref = useRef()
  const count = 3500

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 60
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.01
    ref.current.rotation.z = t * 0.006
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#ffffff" size={0.018} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  )
}

// ── Core planet sphere ────────────────────────────────────────────────────────
function Planet() {
  const mesh = useRef()
  const glowMesh = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.04
    mesh.current.rotation.x = Math.sin(t * 0.02) * 0.05
    // Pulse the glow slightly
    const s = 1 + Math.sin(t * 0.5) * 0.008
    glowMesh.current.scale.setScalar(s * 1.18)
  })

  return (
    <group position={[2.2, 0, -2]}>
      {/* Outer atmosphere glow */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[1.18, 64, 64]} />
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          emissive="#7c3aed"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Planet surface */}
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#1a0533"
          emissive="#5b21b6"
          emissiveIntensity={0.4}
          distort={0.15}
          speed={0.8}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Bright polar cap glow */}
      <pointLight position={[0, 1.8, 0]} intensity={3} color="#a855f7" distance={5} />
      <pointLight position={[0, -1.5, 0.5]} intensity={1.5} color="#3b82f6" distance={4} />
    </group>
  )
}

// ── Orbital ring ─────────────────────────────────────────────────────────────
function Ring({ radius, tubeRadius, tilt, speed, color, opacity }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.getElapsedTime() * speed
  })

  return (
    <mesh
      ref={mesh}
      position={[2.2, 0, -2]}
      rotation={[tilt, 0, 0]}
    >
      <torusGeometry args={[radius, tubeRadius, 3, 200]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

// ── Floating particle dust around planet ─────────────────────────────────────
function PlanetDust() {
  const ref = useRef()
  const count = 600

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 1.4 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * 0.5
      positions[i * 3]     = 2.2 + r * Math.cos(theta) * Math.cos(phi)
      positions[i * 3 + 1] = r * Math.sin(phi)
      positions[i * 3 + 2] = -2 + r * Math.sin(theta) * Math.cos(phi)
      sizes[i] = Math.random()
    }
    return { positions, sizes }
  }, [])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.06
    ref.current.rotation.x = clock.getElapsedTime() * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#c084fc"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

// ── Small floating debris ─────────────────────────────────────────────────────
function Debris({ position, scale, speed }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = t * speed * 0.7
    mesh.current.rotation.y = t * speed
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.3
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#a855f7"
        emissiveIntensity={1.2}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

// ── Slow camera drift ─────────────────────────────────────────────────────────
function Camera() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.07) * 0.8
    camera.position.y = Math.cos(t * 0.05) * 0.4
    camera.lookAt(1, 0, 0)
  })
  return null
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 70 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      {/* Scene lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[-8, 4, 4]} intensity={4} color="#a855f7" />
      <pointLight position={[8, -4, 2]} intensity={2} color="#3b82f6" />
      <pointLight position={[0, 0, 6]} intensity={0.5} color="#ffffff" />

      <Stars />
      <Planet />

      {/* Rings at different tilts */}
      <Ring radius={1.55} tubeRadius={0.004} tilt={Math.PI * 0.45} speed={0.25}  color="#a855f7" opacity={0.7} />
      <Ring radius={1.85} tubeRadius={0.003} tilt={Math.PI * 0.38} speed={-0.18} color="#818cf8" opacity={0.4} />
      <Ring radius={2.15} tubeRadius={0.002} tilt={Math.PI * 0.52} speed={0.12}  color="#7c3aed" opacity={0.25} />

      <PlanetDust />

      {/* Floating fragments */}
      <Debris position={[-3.5, 1.5, -1]} scale={0.1}  speed={0.6} />
      <Debris position={[-2.5, -2,   0]} scale={0.07} speed={0.4} />
      <Debris position={[5,    2,   -3]} scale={0.12} speed={0.5} />
      <Debris position={[-1,   2.5, -2]} scale={0.06} speed={0.7} />

      {/* Bloom + Vignette post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>

      <Camera />
    </Canvas>
  )
}
