import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  reducedMotion: boolean
}

type BlockSpec = {
  position: [number, number, number]
  scale: [number, number, number]
  accent?: boolean
}

const blocks: BlockSpec[] = [
  { position: [-1.55, 1.2, 0.05], scale: [1.55, 0.32, 0.7] },
  { position: [0.4, 1.2, -0.35], scale: [1.3, 0.32, 0.7] },
  { position: [-0.85, 0.35, 0.35], scale: [2.05, 0.4, 0.82], accent: true },
  { position: [1.0, 0.15, -0.15], scale: [1.4, 0.38, 0.78] },
  { position: [-0.25, -0.7, 0.12], scale: [1.8, 0.42, 0.8] },
  { position: [0.85, -1.35, -0.42], scale: [1.1, 0.3, 0.62] },
]

function DustField({ reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 190
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 11
      data[i * 3 + 1] = (Math.random() - 0.5) * 7
      data[i * 3 + 2] = (Math.random() - 0.5) * 6
    }

    return data
  }, [])

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += delta * 0.004
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#90979b"
        size={0.018}
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function ConnectionRig() {
  const positions = useMemo(() => {
    const vertices: number[] = []

    const link = (a: BlockSpec, b: BlockSpec) => {
      vertices.push(...a.position, ...b.position)
    }

    link(blocks[0], blocks[1])
    link(blocks[0], blocks[2])
    link(blocks[1], blocks[3])
    link(blocks[2], blocks[3])
    link(blocks[2], blocks[4])
    link(blocks[3], blocks[5])
    link(blocks[4], blocks[5])

    return new Float32Array(vertices)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#8b9296" transparent opacity={0.34} />
    </lineSegments>
  )
}

function IndustrialAssembly({ reducedMotion }: SceneProps) {
  const assembly = useRef<THREE.Group>(null)
  const moduleGroup = useRef<THREE.Group>(null)
  const scanner = useRef<THREE.Mesh>(null)
  const centralCore = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!assembly.current || !moduleGroup.current || !scanner.current || !centralCore.current) return

    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.3)
    const pointerX = reducedMotion ? 0 : state.pointer.x
    const pointerY = reducedMotion ? 0 : state.pointer.y

    assembly.current.rotation.y = THREE.MathUtils.lerp(
      assembly.current.rotation.y,
      -0.32 + pointerX * 0.13 + scroll * 0.26,
      0.035,
    )

    assembly.current.rotation.x = THREE.MathUtils.lerp(
      assembly.current.rotation.x,
      -0.05 - pointerY * 0.08 + scroll * 0.08,
      0.035,
    )

    assembly.current.position.x = THREE.MathUtils.lerp(
      assembly.current.position.x,
      1.7 + scroll * 0.42,
      0.03,
    )

    assembly.current.position.z = THREE.MathUtils.lerp(
      assembly.current.position.z,
      scroll * 0.7,
      0.03,
    )

    blocks.forEach((block, index) => {
      const mesh = moduleGroup.current?.children[index]
      if (!mesh) return

      const spread = scroll * 0.48
      const direction = index % 2 === 0 ? -1 : 1

      mesh.position.x = block.position[0] + direction * spread * 0.55
      mesh.position.y = block.position[1] + (index - 2.5) * spread * 0.12
      mesh.position.z = block.position[2] + (index - 2.5) * spread
    })

    if (!reducedMotion) {
      scanner.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 1.75
      centralCore.current.rotation.x += delta * 0.07
      centralCore.current.rotation.y -= delta * 0.1
    }
  })

  return (
    <group ref={assembly} position={[1.7, 0, 0]}>
      <group ref={moduleGroup}>
        {blocks.map((block, index) => (
          <mesh key={index} position={block.position} scale={block.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={block.accent ? '#d66a2e' : '#687177'}
              emissive={block.accent ? '#53210c' : '#111416'}
              emissiveIntensity={block.accent ? 1.4 : 0.45}
              metalness={0.86}
              roughness={0.26}
              transparent
              opacity={block.accent ? 0.62 : 0.34}
              wireframe
            />
          </mesh>
        ))}
      </group>

      <ConnectionRig />

      <mesh position={[-2.55, 0, -0.2]} scale={[0.055, 3.8, 0.055]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#4f565a" transparent opacity={0.48} />
      </mesh>

      <mesh position={[2.6, 0, -0.2]} scale={[0.055, 3.8, 0.055]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#4f565a" transparent opacity={0.48} />
      </mesh>

      <mesh position={[0, 2.25, -0.25]} scale={[5.2, 0.045, 0.045]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#5f666a" transparent opacity={0.4} />
      </mesh>

      <mesh position={[0, -2.25, -0.25]} scale={[5.2, 0.045, 0.045]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#5f666a" transparent opacity={0.4} />
      </mesh>

      <mesh ref={scanner} position={[0, 0, 1]} scale={[5.1, 0.018, 0.018]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#e46f2d" transparent opacity={0.78} />
      </mesh>

      <mesh ref={centralCore} position={[0.1, 0.02, 0.62]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#f17a35"
          emissive="#7d2c09"
          emissiveIntensity={1.8}
          metalness={0.76}
          roughness={0.18}
        />
      </mesh>

      <gridHelper
        args={[12, 24, '#4e5559', '#202528']}
        position={[0, -2.48, -0.4]}
      />

      <pointLight position={[0.1, 0.2, 1.4]} color="#e46f2d" intensity={10} distance={4.5} />
      <pointLight position={[-1.2, 1.4, 2]} color="#aeb6bb" intensity={12} distance={6} />
    </group>
  )
}

export default function SystemScene({ reducedMotion }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.16} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} color="#e4e6e6" />
      <directionalLight position={[-4, -2, 1]} intensity={1.2} color="#666f74" />
      <DustField reducedMotion={reducedMotion} />
      <IndustrialAssembly reducedMotion={reducedMotion} />
    </Canvas>
  )
}
