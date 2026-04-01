import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useAppStore } from './store/useAppStore'
import * as THREE from 'three'

function Stars() {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(2800 * 3)
    for (let i = 0; i < 2800; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 58
      arr[i * 3 + 1] = (Math.random() - 0.5) * 58
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.009
    ref.current.rotation.z = t * 0.005
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#a855f7" size={0.036} sizeAttenuation depthWrite={false} opacity={0.9} />
    </Points>
  )
}

function ElectricSparks() {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(1100 * 3)
    for (let i = 0; i < 1100; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 + 1.2
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.z = Math.sin(t * 0.45) * 0.05
    ref.current.rotation.x = Math.cos(t * 0.38) * 0.03
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#d946ef" size={0.06} sizeAttenuation depthWrite={false} opacity={0.95} />
    </Points>
  )
}

function ConstellationCluster({ center = [0, 0, -2], count = 12, spread = 1.9, color = '#8b5cf6', spin = 0.08 }) {
  const groupRef = useRef()
  const lineRefs = useRef([])
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const theta = Math.random() * Math.PI * 2
        const phi = (Math.random() - 0.5) * Math.PI
        const r = 0.45 + Math.random() * spread
        return [
          center[0] + r * Math.cos(theta) * Math.cos(phi),
          center[1] + r * Math.sin(phi),
          center[2] + r * Math.sin(theta) * Math.cos(phi),
        ]
      }),
    [center, count, spread],
  )

  const edges = useMemo(() => {
    const lines = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(...nodes[i].map((v, k) => v - nodes[j][k]))
        if (d < spread * 0.95) lines.push([new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j])])
      }
    }
    return lines
  }, [nodes, spread])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.05
    groupRef.current.rotation.y += spin * 0.002
    lineRefs.current.forEach((line, i) => {
      if (!line?.material) return
      const pulse = (Math.sin(t * 2.3 + i * 1.7) + 1) * 0.5
      const flare = pulse > 0.78 ? (pulse - 0.78) * 3.8 : 0
      line.material.opacity = 0.04 + flare
    })
  })

  return (
    <group ref={groupRef}>
      {edges.map((points, i) => (
        <Line
          key={i}
          ref={(el) => {
            lineRefs.current[i] = el
          }}
          points={points}
          color={color}
          transparent
          opacity={0.08}
          lineWidth={0.55}
        />
      ))}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} transparent opacity={0.98} />
        </mesh>
      ))}
    </group>
  )
}

function DataStream() {
  const ref = useRef()
  const count = 190
  const origin = new THREE.Vector3(-4.7, 1.5, -2.8)
  const target = new THREE.Vector3(5, -1.9, -2.3)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      const x = origin.x + (target.x - origin.x) * t + (Math.random() - 0.5) * 0.12
      const y = origin.y + (target.y - origin.y) * t + (Math.random() - 0.5) * 0.12
      const z = origin.z + (target.z - origin.z) * t + (Math.random() - 0.5) * 0.12
      arr[i * 3] = x
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = z
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.z = Math.sin(t * 0.32) * 0.04
    ref.current.position.y = Math.sin(t * 0.24) * 0.12
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#d8b4fe" size={0.024} sizeAttenuation depthWrite={false} opacity={0.58} />
    </Points>
  )
}

function OrbitFrame({ position = [0, 0, -2], radius = 2.4, speed = 0.22, color = '#38bdf8' }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={mesh} position={position} rotation={[Math.PI * 0.46, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 3, 220]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.38} />
    </mesh>
  )
}

function Debris({ position, scale, speed, color = '#a855f7', floatSpeed = 1 }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = t * speed * 0.8
    mesh.current.rotation.y = t * speed
  })
  return (
    <Float speed={floatSpeed} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  )
}

function SceneReady() {
  const setSceneLoaded = useAppStore((s) => s.setSceneLoaded)
  useEffect(() => {
    setSceneLoaded()
  }, [setSceneLoaded])
  return null
}

function Camera() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.06) * 0.34
    camera.position.y = Math.cos(t * 0.05) * 0.18
    camera.lookAt(0, -0.2, -2)
  })
  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 74 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#f4f7ff']} />
      <ambientLight intensity={0.18} />
      <pointLight position={[-6, 5, 4]} intensity={2.6} color="#8b5cf6" />
      <pointLight position={[6, -3, 4]} intensity={1.9} color="#a855f7" />
      <pointLight position={[0, 1, 6]} intensity={0.8} color="#ffffff" />

      <Suspense fallback={null}>
        <SceneReady />
        <Environment preset="dawn" />
      </Suspense>

      <Stars />
      <ElectricSparks />
      <ConstellationCluster center={[-3.3, 1.5, -2.2]} count={11} spread={1.8} color="#8b5cf6" spin={0.08} />
      <ConstellationCluster center={[3.8, -1.1, -2.4]} count={13} spread={2.1} color="#a855f7" spin={-0.07} />
      <ConstellationCluster center={[0.4, 2.7, -3]} count={9} spread={1.3} color="#d946ef" spin={0.05} />
      <OrbitFrame position={[-3.2, 1.4, -2.2]} radius={1.9} speed={0.19} color="#a78bfa" />
      <OrbitFrame position={[3.8, -1.1, -2.4]} radius={2.2} speed={-0.16} color="#c084fc" />
      <DataStream />
      <Debris position={[-4.9, 2.2, -1.6]} scale={0.085} speed={0.45} color="#8b5cf6" />
      <Debris position={[5.2, -2.2, -2.2]} scale={0.07} speed={0.42} color="#a855f7" />
      <Debris position={[1.4, 3.2, -2.8]} scale={0.06} speed={0.5} color="#c084fc" />
      <Debris position={[-0.8, -3.2, -1.6]} scale={0.065} speed={0.46} color="#14b8a6" />

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.34} />
      </EffectComposer>

      <Camera />
    </Canvas>
  )
}
