import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Floating torus knot
function TorusKnot({ position, speed, scale }) {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * speed * 0.3
    mesh.current.rotation.y = t * speed * 0.5
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.4) * 0.3
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusKnotGeometry args={[1, 0.3, 200, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
}

// Floating icosahedron
function Icosahedron({ position, speed, scale }) {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * speed * 0.4
    mesh.current.rotation.z = t * speed * 0.2
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.35 + 1) * 0.4
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.07}
      />
    </mesh>
  )
}

// Floating octahedron
function Octahedron({ position, speed, scale }) {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = t * speed * 0.6
    mesh.current.rotation.x = t * speed * 0.3
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.5 + 2) * 0.25
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

// Star field
function StarField() {
  const ref = useRef()
  const count = 4000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.005
    ref.current.rotation.y = t * 0.007
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Slowly rotating grid plane
function GridPlane() {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = -0.4 + Math.sin(t * 0.08) * 0.05
  })
  return (
    <mesh ref={mesh} position={[0, -3, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[40, 40, 30, 30]} />
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.05}
      />
    </mesh>
  )
}

// Moving camera rig
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.5
    state.camera.position.y = Math.cos(state.clock.getElapsedTime() * 0.08) * 0.3
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

      <StarField />
      <GridPlane />

      <TorusKnot position={[3.5, 0.5, -2]} speed={0.4} scale={1.2} />
      <TorusKnot position={[-4, -1, -3]} speed={0.3} scale={0.8} />

      <Icosahedron position={[-3, 1.5, -1]} speed={0.5} scale={1.0} />
      <Icosahedron position={[4, -2, -2]} speed={0.35} scale={0.7} />

      <Octahedron position={[1.5, -1.5, -1]} speed={0.6} scale={0.9} />
      <Octahedron position={[-2, -0.5, -3]} speed={0.45} scale={1.3} />

      <CameraRig />
    </Canvas>
  )
}
