import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  reducedMotion: boolean
}

function ParticleField({ reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 420
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const radius = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      data[i * 3 + 2] = radius * Math.cos(phi)
    }

    return data
  }, [])

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += delta * 0.018
    points.current.rotation.x -= delta * 0.006
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9bb4c9"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function SystemCore({ reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current || !shell.current || !ringA.current || !ringB.current) return

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.25)
    const mouseX = reducedMotion ? 0 : state.pointer.x
    const mouseY = reducedMotion ? 0 : state.pointer.y

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouseX * 0.26 + scroll * 0.72,
      0.035,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouseY * 0.18 + scroll * 0.16,
      0.035,
    )
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scroll * 1.3, 0.03)
    group.current.scale.setScalar(1 + scroll * 0.16)

    if (!reducedMotion) {
      shell.current.rotation.x += delta * 0.08
      shell.current.rotation.y += delta * 0.11
      ringA.current.rotation.z += delta * 0.16
      ringB.current.rotation.x -= delta * 0.13
    }
  })

  return (
    <group ref={group}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.34, 3]} />
        <meshPhysicalMaterial
          color="#8cc7ff"
          emissive="#0a2a42"
          emissiveIntensity={1.1}
          metalness={0.82}
          roughness={0.2}
          transmission={0.18}
          transparent
          opacity={0.38}
          wireframe
        />
      </mesh>

      <mesh scale={0.66}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          color="#dceeff"
          emissive="#2d7dad"
          emissiveIntensity={0.55}
          metalness={0.95}
          roughness={0.14}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.5, 0.35, 0]}>
        <torusGeometry args={[1.88, 0.012, 16, 180]} />
        <meshBasicMaterial color="#66baff" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ringB} rotation={[0.3, Math.PI / 2.1, 0.4]}>
        <torusGeometry args={[2.16, 0.008, 16, 180]} />
        <meshBasicMaterial color="#d2eaff" transparent opacity={0.24} />
      </mesh>

      <pointLight color="#77c5ff" intensity={28} distance={7} />
    </group>
  )
}

export default function SystemScene({ reducedMotion }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.24} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} color="#dbeeff" />
      <directionalLight position={[-4, -2, 2]} intensity={1.8} color="#1b6f9d" />
      <ParticleField reducedMotion={reducedMotion} />
      <SystemCore reducedMotion={reducedMotion} />
    </Canvas>
  )
}
