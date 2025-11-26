'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LaptopMockupProps {
  children: ReactNode
}

export function LaptopMockup({ children }: LaptopMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto max-w-4xl scale-90 md:scale-100"
      style={{ perspective: '2000px' }}
    >
      {/* Laptop Screen */}
      <div className="relative">
        <motion.div
          initial={{ rotateX: 15 }}
          whileInView={{ rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Screen Bezel - Theme colors */}
          <div className="relative rounded-2xl bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-900 p-2.5 shadow-2xl transition-colors duration-300 border border-indigo-700/30 dark:border-indigo-500/30">
            {/* Camera Notch - MacBook Pro style */}
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
              <div className="relative flex h-6 w-40 items-center justify-center rounded-b-3xl bg-indigo-950 dark:bg-indigo-900 shadow-lg transition-colors duration-300 border-b border-indigo-800/50 dark:border-indigo-600/50">
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-b-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] dark:shadow-[inset_0_2px_4px_rgba(129,140,248,0.2)]"></div>
                
                {/* Camera */}
                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 ring-1 ring-indigo-500/50 dark:ring-indigo-300/50 transition-colors duration-300"></div>
                  {/* Speaker grille */}
                  <div className="flex gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1.5 w-0.5 rounded-full bg-indigo-700/60 dark:bg-indigo-400/60 transition-colors duration-300"></div>
                    ))}
                  </div>
                </div>
                
                {/* Subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-b-3xl bg-gradient-to-b from-indigo-500/20 dark:from-indigo-400/20 to-transparent transition-colors duration-300"></div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-inner transition-colors duration-300">
              {/* macOS-style Traffic Lights */}
              <div className="absolute left-2.5 top-2.5 z-10 flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-sm"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm"></div>
              </div>
              
              {/* Content Area - Professional height for better image display */}
              <div className="h-[420px] md:h-[480px] lg:h-[500px] overflow-hidden">
                {children}
              </div>
            </div>
          </div>

          {/* Screen Reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent dark:from-indigo-400/5"></div>
        </motion.div>

        {/* Laptop Base (bottom stand) - Theme colors */}
        <motion.div
          initial={{ scaleX: 0.8, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mx-auto mt-1 h-2.5 w-[75%] rounded-b-2xl bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-600 dark:from-indigo-600 dark:via-purple-600 dark:to-indigo-500 shadow-lg transition-colors duration-300 border border-indigo-600/30 dark:border-indigo-400/30"
          style={{ transformOrigin: 'top' }}
        ></motion.div>
      </div>

      {/* Shadow under laptop - Theme color */}
      <div className="absolute -bottom-2 left-1/2 h-12 w-[60%] -translate-x-1/2 rounded-full bg-indigo-900/20 blur-2xl dark:bg-indigo-800/30"></div>
    </motion.div>
  )
}