import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  reducedMotion: boolean
}

type ModuleSpec = {
  position: [number, number, number]
  scale: [number, number, number]
  accent?: boolean
}

const modules: ModuleSpec[] = [
  { position: [-1.55, 1.08, 0.18], scale: [1.35, 0.42, 0.72] },
  { position: [0.15, 0.82, -0.35], scale: [1.62, 0.48, 0.86] },
  { position: [-0.55, 0.02, 0.55], scale: [1.9, 0.5, 0.92], accent: true },
  { position: [1.1, -0.55, -0.22], scale: [1.52, 0.46, 0.78] },
  { position: [-0.2, -1.28, 0.1], scale: [1.7, 0.5, 0.88] },
]

function ParticleField({ reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 280
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 11
      data[i * 3 + 1] = (Math.random() - 0.5) * 8
      data[i * 3 + 2] = (Math.random() - 0.5) * 6
    }

    return data
  }, [])

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += delta * 0.008
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9ab2aa"
        size={0.018}
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function ConnectionGrid() {
  const positions = useMemo(() => {
    const vertices: number[] = []

    const connect = (a: ModuleSpec, b: ModuleSpec) => {
      vertices.push(...a.position, ...b.position)
    }

    connect(modules[0], modules[1])
    connect(modules[0], modules[2])
    connect(modules[1], modules[2])
    connect(modules[1], modules[3])
    connect(modules[2], modules[3])
    connect(modules[2], modules[4])
    connect(modules[3], modules[4])

    return new Float32Array(vertices)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#638b7e" transparent opacity={0.34} />
    </lineSegments>
  )
}

function ArchitectureSystem({ reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const frame = useRef<THREE.Mesh>(null)
  const accent = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current || !frame.current || !accent.current) return

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.3)
    const mouseX = reducedMotion ? 0 : state.pointer.x
    const mouseY = reducedMotion ? 0 : state.pointer.y

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      -0.18 + mouseX * 0.18 + scroll * 0.44,
      0.035,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.08 - mouseY * 0.1 + scroll * 0.12,
      0.035,
    )
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 1.2 + scroll * 0.35, 0.03)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scroll * 0.9, 0.03)
    group.current.scale.setScalar(1 + scroll * 0.11)

    modules.forEach((module, index) => {
      const child = group.current?.children[index]
      if (!child) return
      const spread = scroll * 0.42
      child.position.z = module.position[2] + spread * (index - 2)
    })

    if (!reducedMotion) {
      frame.current.rotation.z += delta * 0.035
      accent.current.rotation.y -= delta * 0.08
      accent.current.rotation.x += delta * 0.045
    }
  })

  return (
    <group ref={group} position={[1.2, 0, 0]}>
      {modules.map((module, index) => (
        <mesh
          key={index}
          position={module.position}
          scale={module.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color={module.accent ? '#8bb8a4' : '#2f4e46'}
            emissive={module.accent ? '#14392f' : '#0a1714'}
            emissiveIntensity={module.accent ? 1.3 : 0.65}
            metalness={0.74}
            roughness={0.24}
            transparent
            opacity={module.accent ? 0.42 : 0.24}
            wireframe
          />
        </mesh>
      ))}

      <ConnectionGrid />

      <mesh ref={frame} rotation={[0.15, 0.28, 0.32]}>
        <boxGeometry args={[5.2, 4.05, 2.25]} />
        <meshBasicMaterial
          color="#6d887f"
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>

      <mesh ref={accent} position={[0.25, 0.05, 0.22]}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#d9573f"
          emissive="#7b1e13"
          emissiveIntensity={1.7}
          metalness={0.66}
          roughness={0.2}
        />
      </mesh>

      <pointLight position={[0.25, 0.05, 1]} color="#d9573f" intensity={7} distance={3.6} />
      <pointLight position={[-0.4, 0.1, 2]} color="#7fb8a2" intensity={16} distance={6.5} />
    </group>
  )
}

export default function SystemScene({ reducedMotion }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.55]}
      camera={{ position: [0, 0, 7.2], fov: 39 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.16} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#d8e1dc" />
      <directionalLight position={[-4, -3, 1]} intensity={1.1} color="#446b60" />
      <ParticleField reducedMotion={reducedMotion} />
      <ArchitectureSystem reducedMotion={reducedMotion} />
    </Canvas>
  )
}
