'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, Canvas, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 1000, isDark = false }: { count?: number; isDark?: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const particlesRef = useRef<Array<{ time: number; factor: number; speed: number; x: number; y: number; z: number }>>([])

  const sphere = useMemo(() => {
    if (particlesRef.current.length === 0) {
      const temp = []
      for (let i = 0; i < count; i++) {
        const time = Math.random() * 100
        const factor = 20 + Math.random() * 100
        const speed = 0.01 + Math.random() / 200
        const x = Math.random() * 200 - 100
        const y = Math.random() * 200 - 100
        const z = Math.random() * 200 - 100
        temp.push({ time, factor, speed, x, y, z })
      }
      particlesRef.current = temp
    }

    const positions = new Float32Array(count * 3)
    particlesRef.current.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })
    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      particlesRef.current.forEach((p, i) => {
        p.time += p.speed
        positions[i * 3] = p.x + Math.cos((p.time + p.factor) / 7) * p.factor
        positions[i * 3 + 1] = p.y + Math.sin((p.time + p.factor) / 5) * p.factor
        positions[i * 3 + 2] = p.z + Math.sin((p.time + p.factor) / 3) * p.factor
      })
      ref.current.geometry.attributes.position.needsUpdate = true
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#6366f1" : "#000000"}
        size={0.6}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.12 : 0.15}
      />
    </Points>
  )
}

function FloatingSpheres({ isDark = false }: { isDark?: boolean }) {
  const sphere1 = useRef<THREE.Mesh>(null)
  const sphere2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphere1.current) {
      sphere1.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 5
      sphere1.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 8
    }
    if (sphere2.current) {
      sphere2.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 4
      sphere2.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * -10
    }
  })

  return (
    <>
      <Sphere ref={sphere1} args={[3, 32, 32]} position={[15, 0, -40]}>
        <meshStandardMaterial
          color={isDark ? "#7c3aed" : "#000000"}
          transparent
          opacity={isDark ? 0.06 : 0.02}
          wireframe
        />
      </Sphere>
      <Sphere ref={sphere2} args={[2.5, 32, 32]} position={[-12, 5, -38]}>
        <meshStandardMaterial
          color={isDark ? "#6366f1" : "#000000"}
          transparent
          opacity={isDark ? 0.06 : 0.03}
          wireframe
        />
      </Sphere>
    </>
  )
}

function CameraController() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 3,
        y: -(e.clientY / window.innerHeight - 0.5) * 3,
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.025
    camera.position.y += (mouseRef.current.y - camera.position.y) * 0.025
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function Background3D({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        <CameraController />
        <FloatingParticles count={300} isDark={isDark} />
        <FloatingSpheres isDark={isDark} />
      </Canvas>
    </div>
  )
}