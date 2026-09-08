import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment } from '@react-three/drei'

// A central thread spool wound with fine strands, surrounded by softly folded
// "fabric" panels. All primitive geometry, so it stays light and fast.

const WRAP_COUNT = 16
function Spool({ color = '#E4A11B', body = '#7A1F2B' }) {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.55, 0.55, 1.3, 40]} />
        <meshStandardMaterial color={body} roughness={0.9} />
      </mesh>
      {Array.from({ length: WRAP_COUNT }, (_, i) => {
        const y = -0.55 + (i / (WRAP_COUNT - 1)) * 1.1
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.57, 0.045, 8, 48]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
        )
      })}
      {/* End caps */}
      {[0.72, -0.72].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.08, 40]} />
          <meshStandardMaterial color={body} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Panel({ pos, rot, color }) {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh position={pos} rotation={rot} castShadow>
        {/* A thin rounded box reads as a neatly folded set. */}
        <boxGeometry args={[1.1, 1.4, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const group = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.5 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-pointer.y * 0.25 - group.current.rotation.x) * 0.05
  })

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Spool />
      </Float>
      <Panel pos={[-2, 0.3, -0.5]} rot={[0.1, 0.5, 0.12]} color="#1F5C57" />
      <Panel pos={[2, -0.2, -0.6]} rot={[-0.1, -0.5, -0.14]} color="#C97B84" />
      <Panel pos={[1.4, 1.1, -1]} rot={[0.2, -0.3, 0.2]} color="#274060" />
    </group>
  )
}

export default function Hero3D({ animate = true }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.15} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#E4A11B" />
      <Suspense fallback={null}>
        <Scene />
        <ContactShadows position={[0, -1.9, 0]} opacity={0.35} scale={11} blur={2.6} far={4} color="#2B2320" />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  )
}
