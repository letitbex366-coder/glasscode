'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface EnergyWaveProps {
  isDark: boolean;
}

export default function EnergyWave({ isDark }: EnergyWaveProps) {
  // Generate multiple wave layers
  const waves = [
    { duration: 20, delay: 0, opacity: 0.15 },
    { duration: 25, delay: 2, opacity: 0.1 },
    { duration: 30, delay: 4, opacity: 0.12 },
  ];

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(120% 120% at 50% 35%, rgba(76, 29, 149, 0.35) 0%, rgba(28, 24, 64, 0.88) 55%, rgba(8, 10, 24, 0.96) 100%)'
            : 'radial-gradient(115% 115% at 50% 35%, rgba(219, 234, 254, 0.7) 0%, rgba(224, 231, 255, 0.45) 40%, rgba(233, 213, 255, 0.25) 70%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      {/* Animated Wave Layers */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#6d28d9" : "#818cf8"} stopOpacity={isDark ? "0.28" : "0.3"} />
            <stop offset="100%" stopColor={isDark ? "#7c3aed" : "#a78bfa"} stopOpacity={isDark ? "0.18" : "0.1"} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#7c3aed" : "#a78bfa"} stopOpacity={isDark ? "0.24" : "0.2"} />
            <stop offset="100%" stopColor={isDark ? "#6450f5" : "#f0abfc"} stopOpacity={isDark ? "0.16" : "0.1"} />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#6d28d9" : "#c7d2fe"} stopOpacity={isDark ? "0.26" : "0.25"} />
            <stop offset="100%" stopColor={isDark ? "#4c1d95" : "#ddd6fe"} stopOpacity={isDark ? "0.12" : "0.05"} />
          </linearGradient>
        </defs>

        {waves.map((wave, index) => (
          <motion.path
            key={index}
            d={`M0,${200 + index * 50} Q360,${150 + index * 40} 720,${200 + index * 50} T1440,${200 + index * 50} V800 H0 Z`}
            fill={`url(#waveGradient${index + 1})`}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: wave.opacity,
            }}
            transition={{
              duration: wave.duration,
              delay: wave.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark ? 'bg-[rgba(124,58,237,0.4)]' : 'bg-indigo-600/30'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: isDark ? '0 0 10px rgba(124, 58, 237, 0.35)' : 'none',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Energy Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(76, 29, 149, 0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(76, 29, 149, 0.14) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid Lines Effect */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-20'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(rgba(129, 140, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.2) 1px, transparent 1px)'
              : 'linear-gradient(rgba(129, 140, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.25), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(199, 210, 254, 0.3), transparent)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

