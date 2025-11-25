'use client';

import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(55,48,163,0.08) 55%, transparent 75%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.26) 0%, rgba(76,29,149,0.1) 55%, transparent 75%)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.25) 0%, rgba(76,29,149,0.1) 55%, transparent 75%)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,10,23,0.95)] via-[rgba(14,17,37,0.7)] to-[rgba(7,9,22,0.95)] opacity-80" />
    </div>
  );
}
