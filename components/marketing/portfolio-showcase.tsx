'use client'

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ')

const demos = [
  {
    id: 'mern-dashboard',
    type: 'website',
    title: 'MERN Stack Dashboard',
    description: 'Custom admin panel with real-time analytics',
    image: '/images/wyn.png',
    features: ['React Dashboard', 'Node.js Backend', 'MongoDB Database', 'Real-time Updates']
  },
  {
    id: 'ai-chatbot',
    type: 'chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Intelligent AI-powered customer support',
    features: ['Natural Language Processing', 'Context Awareness', 'Multi-language Support', '24/7 Availability']
  },
  {
    id: 'enterprise-lms',
    type: 'website',
    title: 'Enterprise LMS System',
    description: 'Secure case management for government',
    image: '/images/lms2.png',
    features: ['Role-based Access', 'Audit Logging', 'Secure Authentication', 'Admin Dashboard']
  },
  {
    id: 'ai-career-coach',
    type: 'website',
    title: 'AI Career Platform',
    description: 'AI-powered career coaching and resume builder',
    image: '/images/AI carrer coach.png',
    features: ['Resume Generation', 'Interview Prep', 'AI Insights', 'Performance Tracking']
  }
]

// AI Chatbot Demo Component
function AIChatbotDemo() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I can help you with web development, AI automation, and enterprise solutions. What would you like to know?',
        'Great question! Our MERN stack solutions include custom dashboards, admin panels, and SaaS products.',
        'We specialize in AI chatbots, workflow automation, and integration with OpenAI/LLM models.',
        'For enterprise needs, we build secure, compliant applications with role-based access control.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', text: randomResponse }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-indigo-50 via-white to-gray-50 dark:from-indigo-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header - More Professional */}
      <div className="border-b px-3 sm:px-4 py-2.5 border-indigo-200/40 bg-gradient-to-b from-indigo-100/60 to-indigo-50/40 backdrop-blur-sm dark:border-indigo-500/40 dark:from-indigo-900/60 dark:to-indigo-950/40">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-sm"></div>
            <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-400 animate-ping opacity-75"></div>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-indigo-900 dark:text-indigo-100">AI Assistant</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-indigo-400 dark:bg-indigo-500"></div>
            <span className="text-[0.6rem] text-indigo-700 dark:text-indigo-300">Online</span>
          </div>
        </div>
      </div>

      {/* Messages - Better Spacing */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 sm:p-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={cx(
              'max-w-[85%] sm:max-w-[80%] rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm',
              msg.role === 'user'
                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                : 'bg-white/95 border border-indigo-200/40 text-gray-800 dark:bg-indigo-900/50 dark:border-indigo-500/40 dark:text-white backdrop-blur-sm'
            )}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/95 border border-indigo-200/40 rounded-xl px-3 sm:px-4 py-2.5 dark:bg-indigo-900/50 dark:border-indigo-500/40 backdrop-blur-sm shadow-sm">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input - Better Design */}
      <div className="border-t px-3 sm:px-4 py-2.5 sm:py-3 border-indigo-200/40 bg-gradient-to-b from-indigo-50/60 to-white/80 dark:border-indigo-500/40 dark:from-indigo-900/30 dark:to-gray-900/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-indigo-200/40 bg-white/90 px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:bg-indigo-950/50 dark:border-indigo-500/40 dark:text-white dark:placeholder-gray-400 shadow-sm"
          />
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md"
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Website Demo Component
function WebsiteDemo({ demo }: { demo: typeof demos[0] }) {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Browser Header - More Professional */}
      <div className="border-b px-3 py-2.5 border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-sm"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm"></div>
          </div>
          <div className="flex-1 min-w-0 mx-2 rounded-md bg-white/90 dark:bg-gray-700/90 px-3 py-1.5 text-[0.65rem] text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 shadow-sm truncate">
            {demo.title}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Content - Responsive Image Display */}
      <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-gray-950">
        {demo.image ? (
          <div className="relative h-full w-full flex items-center justify-center p-2">
            {/* Image with proper responsive handling - Complete image visible in landscape */}
            <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-sm">
              <Image
                src={demo.image}
                alt={demo.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={false}
                quality={85}
                loading="lazy"
                style={{ 
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
            
            {/* Professional Overlay with gradient - Subtle for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            
            {/* Content Overlay - Responsive positioning */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
              <div className="max-w-full">
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1 drop-shadow-lg">{demo.title}</h3>
                <p className="text-[0.65rem] sm:text-xs text-white/95 mb-3 drop-shadow-md leading-relaxed">{demo.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {demo.features.map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="px-2 py-1 rounded-md bg-white/25 backdrop-blur-md text-[0.6rem] sm:text-xs text-white border border-white/30 shadow-sm font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 p-4 sm:p-6">
            <div className="text-center max-w-md w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-2">{demo.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{demo.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demo.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-2 rounded-lg bg-white/90 dark:bg-indigo-900/50 text-xs text-gray-700 dark:text-white border border-indigo-200/40 dark:border-indigo-500/40 shadow-sm backdrop-blur-sm"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const PortfolioShowcaseInLaptop = memo(function PortfolioShowcaseInLaptop() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length)
    }, 5000) // Change demo every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentDemo = demos[activeDemo]

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header with demo selector - More Professional */}
      <div className="border-b px-3 sm:px-4 py-2.5 sm:py-3 border-indigo-200/40 bg-gradient-to-b from-indigo-50/70 to-indigo-50/40 backdrop-blur-sm dark:border-indigo-500/40 dark:from-indigo-950/70 dark:to-indigo-950/40">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs sm:text-sm font-semibold text-indigo-900 dark:text-indigo-100">Portfolio Showcase</span>
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[0.65rem] sm:text-xs text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 font-medium px-2 py-1 rounded-md hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 transition-colors"
          >
            {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
          </motion.button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {demos.map((demo, idx) => (
            <motion.button
              key={demo.id}
              onClick={() => {
                setActiveDemo(idx)
                setIsAutoPlaying(false)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cx(
                'px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-semibold rounded-md transition-all shadow-sm',
                activeDemo === idx
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-md'
                  : 'bg-indigo-100/70 text-indigo-900 hover:bg-indigo-200/90 dark:bg-indigo-900/50 dark:text-indigo-100 dark:hover:bg-indigo-800/60 border border-indigo-200/50 dark:border-indigo-700/50'
              )}
            >
              {demo.type === 'chatbot' ? '🤖 AI Chat' : '💻 ' + demo.title.split(' ')[0]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {currentDemo.type === 'chatbot' ? (
              <AIChatbotDemo />
            ) : (
              <WebsiteDemo demo={currentDemo} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer with progress indicator - More Professional */}
      <div className="border-t px-3 sm:px-4 py-2 border-indigo-200/40 bg-gradient-to-b from-indigo-50/60 to-white/80 dark:border-indigo-500/40 dark:from-indigo-950/60 dark:to-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1.5 bg-indigo-200/60 dark:bg-indigo-800/60 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: isAutoPlaying ? '100%' : '0%' }}
              transition={{ duration: 5, repeat: isAutoPlaying ? Infinity : 0, ease: 'linear' }}
            />
          </div>
          <span className="text-[0.65rem] sm:text-xs text-indigo-700 dark:text-indigo-300 font-medium min-w-[3rem] text-right">
            {activeDemo + 1} / {demos.length}
          </span>
        </div>
      </div>
    </div>
  )
})

