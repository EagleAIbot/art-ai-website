import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

function Stars() {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(2400 * 3)
    for (let i = 0; i < 2400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 65
      arr[i * 3 + 1] = (Math.random() - 0.5) * 65
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.008
    ref.current.rotation.z = t * 0.005
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#ffffff" size={0.016} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  )
}

function OrbitFrame({ pos, radius, tubeRadius, tilt, speed, color, opacity }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={mesh} position={pos} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, tubeRadius, 3, 180]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={opacity} />
    </mesh>
  )
}

function ConstellationCluster({ center, count = 10, spread = 1.5, color = '#c084fc', speed = 0.06 }) {
  const groupRef = useRef()
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
    groupRef.current.rotation.y += speed * 0.0015
    groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.16) * 0.04
  })

  return (
    <group ref={groupRef}>
      {edges.map((points, i) => (
        <Line key={i} points={points} color={color} transparent opacity={0.18} lineWidth={0.3} />
      ))}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Debris({ position, scale, speed, color = '#a855f7' }) {
  const mesh = useRef()
  const startY = position[1]
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = t * speed * 0.8
    mesh.current.rotation.y = t * speed
    mesh.current.position.y = startY + Math.sin(t * speed * 0.5) * 0.3
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} wireframe transparent opacity={0.55} />
    </mesh>
  )
}

function Camera() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.05) * 0.4
    camera.position.y = Math.cos(t * 0.04) * 0.2
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function StatsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 80 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.12} />
      <pointLight position={[-10, 5, 4]} intensity={2.2} color="#a855f7" />
      <pointLight position={[10, -3, 3]} intensity={1.4} color="#06b6d4" />

      <Stars />
      <ConstellationCluster center={[-5.3, 1, -4]} count={9} spread={1.4} color="#c084fc" speed={0.06} />
      <OrbitFrame pos={[-5.3, 1, -4]} radius={1.15} tubeRadius={0.004} tilt={Math.PI * 0.42} speed={0.2} color="#a855f7" opacity={0.65} />
      <OrbitFrame pos={[-5.3, 1, -4]} radius={1.4} tubeRadius={0.002} tilt={Math.PI * 0.35} speed={-0.13} color="#818cf8" opacity={0.35} />
      <ConstellationCluster center={[5.2, -0.8, -3]} count={8} spread={1.15} color="#67e8f9" speed={-0.08} />
      <OrbitFrame pos={[5.2, -0.8, -3]} radius={0.78} tubeRadius={0.004} tilt={Math.PI * 0.45} speed={0.28} color="#06b6d4" opacity={0.6} />
      <OrbitFrame pos={[5.2, -0.8, -3]} radius={0.98} tubeRadius={0.002} tilt={Math.PI * 0.55} speed={-0.18} color="#67e8f9" opacity={0.3} />
      <Debris position={[1.5, 2.5, -2]} scale={0.07} speed={0.5} color="#a855f7" />
      <Debris position={[-1.5, -2.5, -1.5]} scale={0.065} speed={0.45} color="#06b6d4" />
      <Debris position={[0, 3, -3]} scale={0.055} speed={0.6} color="#c084fc" />

      <EffectComposer>
        <Bloom intensity={1.65} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.65} />
      </EffectComposer>

      <Camera />
    </Canvas>
  )
}
