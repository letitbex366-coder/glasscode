"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ChatBackground3DProps {
  isDark: boolean;
}

// Animated chat bubbles floating in 3D space
function FloatingChatBubbles({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const bubbles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        rotation: Math.random() * Math.PI,
        scale: 0.3 + Math.random() * 0.5,
        speed: 0.1 + Math.random() * 0.2,
        delay: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      bubbles.forEach((bubble, i) => {
        const mesh = groupRef.current!.children[i];
        if (mesh) {
          mesh.position.y = bubble.position[1] + Math.sin(clock.getElapsedTime() * bubble.speed + bubble.delay) * 1.5;
          mesh.rotation.z = bubble.rotation + clock.getElapsedTime() * 0.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((bubble, i) => (
        <mesh key={i} position={bubble.position} scale={bubble.scale}>
          <boxGeometry args={[2, 1, 0.2]} />
          <meshStandardMaterial
            color={isDark ? '#7c3aed' : '#000000'}
            transparent
            opacity={isDark ? 0.06 : 0.03}
            emissive={isDark ? '#5b21b6' : '#000000'}
            emissiveIntensity={isDark ? 0.12 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated message dots (typing indicator style)
function MessageDots({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((dot, i) => {
        const offset = (i * Math.PI) / 1.5;
        dot.position.y = Math.sin(clock.getElapsedTime() * 2 + offset) * 0.3;
      });
    }
  });

  const dots = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[dot.scale, 16, 16]} />
          <meshStandardMaterial
            color={isDark ? '#818cf8' : '#000000'}
            transparent
            opacity={isDark ? 0.15 : 0.08}
            emissive={isDark ? '#4c1d95' : '#000000'}
            emissiveIntensity={isDark ? 0.18 : 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Phone/device shapes
function PhoneShapes({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const phones = useMemo(() => {
    return [
      { position: [-8, 5, -5], rotation: 0.3, scale: 0.8 },
      { position: [8, -4, -4], rotation: -0.4, scale: 0.7 },
      { position: [-6, -6, -6], rotation: 0.5, scale: 0.6 },
      { position: [7, 6, -7], rotation: -0.2, scale: 0.75 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {phones.map((phone, i) => (
        <mesh
          key={i}
          position={phone.position as [number, number, number]}
          rotation={[phone.rotation, phone.rotation * 0.5, 0]}
        >
          <boxGeometry args={[1.5 * phone.scale, 3 * phone.scale, 0.1]} />
          <meshStandardMaterial
            color={isDark ? '#6366f1' : '#000000'}
            transparent
            opacity={isDark ? 0.08 : 0.04}
            emissive={isDark ? '#4338ca' : '#000000'}
            emissiveIntensity={isDark ? 0.1 : 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated connection lines between elements
function ConnectionLine({ points, isDark }: { points: THREE.Vector3[]; isDark: boolean }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    const geometry = geometryRef.current;
    if (geometry) {
      geometry.setFromPoints(points);
    }

    return () => {
      geometry?.dispose();
    };
  }, [points]);

  return (
    <line>
      <bufferGeometry ref={geometryRef} attach="geometry" />
      <lineBasicMaterial
        attach="material"
        color={isDark ? '#6366f1' : '#000000'}
        transparent
        opacity={isDark ? 0.08 : 0.05}
      />
    </line>
  );
}

function ConnectionLines({ isDark }: { isDark: boolean }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.05 + Math.sin(clock.getElapsedTime() + i) * 0.03;
      });
    }
  });

  const lines = useMemo(() => {
    const lineData = [];
    for (let i = 0; i < 8; i++) {
      const points = [
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8
        ),
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8
        ),
      ];
      lineData.push(points);
    }
    return lineData;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((points, i) => (
        <ConnectionLine key={i} points={points} isDark={isDark} />
      ))}
    </group>
  );
}

export default function ChatBackground3D({ isDark }: ChatBackground3DProps) {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <FloatingChatBubbles isDark={isDark} />
        <MessageDots isDark={isDark} />
        <PhoneShapes isDark={isDark} />
        <ConnectionLines isDark={isDark} />
      </Canvas>
    </div>
  );
}

