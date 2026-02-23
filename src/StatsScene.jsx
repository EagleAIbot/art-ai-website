import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

function Stars() {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 70
      arr[i * 3 + 1] = (Math.random() - 0.5) * 70
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
      <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  )
}

// Medium planet — far left
function PlanetLeft() {
  const mesh = useRef()
  const atm  = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.04
    atm.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.009)
  })
  return (
    <group position={[-5.5, 1, -4]}>
      <mesh ref={atm} scale={1.2}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2}
          transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <MeshDistortMaterial color="#0f0320" emissive="#6d28d9" emissiveIntensity={0.45}
          distort={0.2} speed={0.8} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* city lights */}
      {[[0.35, 0.5, 0.2], [-0.4, 0.45, 0.25], [0.55, -0.3, 0.3], [-0.5, -0.35, 0.25]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial color="#e879f9" emissive="#e879f9" emissiveIntensity={7} />
        </mesh>
      ))}
      <pointLight position={[0, 1.5, 0.5]} intensity={4} color="#a855f7" distance={6} />
      <pointLight position={[0,-1,  0.5]} intensity={2} color="#3b82f6" distance={4} />
    </group>
  )
}

// Small planet — far right
function PlanetRight() {
  const mesh = useRef()
  const atm  = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.055
    atm.current.scale.setScalar(1 + Math.sin(t * 0.6 + 1) * 0.01)
  })
  return (
    <group position={[5.5, -0.8, -3]}>
      <mesh ref={atm} scale={1.22}>
        <sphereGeometry args={[0.58, 32, 32]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2.5}
          transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.48, 64, 64]} />
        <MeshDistortMaterial color="#031a1f" emissive="#0e7490" emissiveIntensity={0.5}
          distort={0.25} speed={1} roughness={0.75} metalness={0.1} />
      </mesh>
      {[[0.25, 0.32, 0.25], [-0.28, 0.35, 0.2], [0.36, -0.22, 0.25]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.014, 6, 6]} />
          <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={7} />
        </mesh>
      ))}
      <pointLight position={[0, 1, 0.5]} intensity={3}   color="#06b6d4" distance={4} />
      <pointLight position={[0,-1, 0.5]} intensity={1.5} color="#7c3aed" distance={3} />
    </group>
  )
}

function Ring({ pos, radius, tubeRadius, tilt, speed, color, opacity }) {
  const mesh = useRef()
  useFrame(({ clock }) => { mesh.current.rotation.z = clock.getElapsedTime() * speed })
  return (
    <mesh ref={mesh} position={pos} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, tubeRadius, 3, 180]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={opacity} />
    </mesh>
  )
}

// Particle dust around a planet
function Dust({ center, count = 400, minR = 1.0, maxR = 1.6, color = "#c084fc" }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = minR + Math.random() * (maxR - minR)
      const theta = Math.random() * Math.PI * 2
      const phi   = (Math.random() - 0.5) * 0.5
      arr[i * 3]     = center[0] + r * Math.cos(theta) * Math.cos(phi)
      arr[i * 3 + 1] = center[1] + r * Math.sin(phi)
      arr[i * 3 + 2] = center[2] + r * Math.sin(theta) * Math.cos(phi)
    }
    return arr
  }, [center, count, minR, maxR])
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color={color} size={0.018} sizeAttenuation depthWrite={false} opacity={0.45} />
    </Points>
  )
}

function Debris({ position, scale, speed, color = "#a855f7" }) {
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
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5}
        wireframe transparent opacity={0.55} />
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
      <ambientLight intensity={0.07} />
      <pointLight position={[-10, 5, 4]} intensity={3}   color="#a855f7" />
      <pointLight position={[ 10,-3, 3]} intensity={1.5} color="#06b6d4" />

      <Stars />

      <PlanetLeft />
      <Ring pos={[-5.5, 1, -4]} radius={1.05} tubeRadius={0.004} tilt={Math.PI * 0.42} speed={ 0.2}  color="#a855f7" opacity={0.65} />
      <Ring pos={[-5.5, 1, -4]} radius={1.3}  tubeRadius={0.002} tilt={Math.PI * 0.35} speed={-0.13} color="#818cf8" opacity={0.35} />
      <Dust center={[-5.5, 1, -4]} count={350} minR={0.9} maxR={1.5} color="#c084fc" />

      <PlanetRight />
      <Ring pos={[5.5, -0.8, -3]} radius={0.72} tubeRadius={0.004} tilt={Math.PI * 0.45} speed={ 0.28}  color="#06b6d4" opacity={0.6} />
      <Ring pos={[5.5, -0.8, -3]} radius={0.92} tubeRadius={0.002} tilt={Math.PI * 0.55} speed={-0.18} color="#67e8f9" opacity={0.3} />
      <Dust center={[5.5, -0.8, -3]} count={250} minR={0.6} maxR={1.1} color="#67e8f9" />

      <Debris position={[ 1.5,  2.5, -2]}  scale={0.07}  speed={0.5}  color="#a855f7" />
      <Debris position={[-1.5, -2.5, -1.5]} scale={0.065} speed={0.45} color="#06b6d4" />
      <Debris position={[ 0,    3,   -3]}  scale={0.055} speed={0.6}  color="#c084fc" />

      <EffectComposer>
        <Bloom intensity={2.2} luminanceThreshold={0.08} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.65} />
      </EffectComposer>

      <Camera />
    </Canvas>
  )
}
