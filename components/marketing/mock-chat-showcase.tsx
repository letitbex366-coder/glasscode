'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassButton } from '@/components/ui/glass-button'
import {
  SCRIPTED_SCENARIOS,
  type ChatEntry,
  type Scenario,
} from '@/components/api-client/mock-chat-experience'

const INITIAL_TURNS = 2

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ')

// Component for use inside laptop mockup
export function MockChatShowcaseInLaptop() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    SCRIPTED_SCENARIOS[0]?.id ?? ''
  )

  const scenario: Scenario =
    useMemo(
      () => SCRIPTED_SCENARIOS.find((item) => item.id === activeScenarioId),
      [activeScenarioId]
    ) ?? SCRIPTED_SCENARIOS[0]

  const scriptLength = scenario.script.length
  const [visibleTurns, setVisibleTurns] = useState(
    Math.min(INITIAL_TURNS, scriptLength)
  )
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showNextHint, setShowNextHint] = useState(false)
  const [showWhyPopup, setShowWhyPopup] = useState<number | null>(null)

  useEffect(() => {
    setVisibleTurns(Math.min(INITIAL_TURNS, scriptLength))
    setShowNextHint(scriptLength > INITIAL_TURNS)
  }, [scriptLength, scenario.id])

  useEffect(() => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [visibleTurns, scenario.id])

  const visibleEntries = scenario.script.slice(0, visibleTurns)

  const handleNextTurn = () => {
    setVisibleTurns((prev) => Math.min(scriptLength, prev + 1))
    setShowNextHint(false)
  }

  const handleRestart = () => {
    setVisibleTurns(Math.min(INITIAL_TURNS, scriptLength))
    setShowNextHint(scriptLength > INITIAL_TURNS)
  }

  const renderEntry = (entry: ChatEntry, index: number) => {
    if (entry.type === 'ad') {
      return (
        <motion.div
          key={`ad-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex justify-start"
        >
          <div className="relative w-full max-w-lg rounded-lg border px-3 py-3 text-xs leading-relaxed shadow-sm transition-all duration-300
                          border-indigo-300/30 bg-indigo-50/80 backdrop-blur-xl
                          dark:border-indigo-500/40 dark:bg-indigo-900/50 dark:text-white">
            {/* Why Popup */}
            <AnimatePresence>
              {showWhyPopup === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute -top-2 right-0 z-50 w-[200px] rounded-lg border p-3 text-[0.6rem] leading-relaxed shadow-xl backdrop-blur-xl
                             border-black/10 bg-white/95 text-black
                             dark:border-white/20 dark:bg-slate-800/95 dark:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-1.5 font-semibold text-[0.65rem]">Why this ad?</div>
                  <p className="mb-1.5">
                    You&rsquo;re seeing this ad based on the context of the page you&rsquo;re viewing.
                  </p>
                  <p className="mb-1.5">
                    It&rsquo;s not personalized — it was selected because the content matches the topic or keywords related to this ad.
                  </p>
                  <p className="text-black/70 dark:text-white/70">
                    We don&rsquo;t use your personal data or browsing history. It&rsquo;s displayed only because it&rsquo;s relevant to the content.
                  </p>
                  <button
                    onClick={() => setShowWhyPopup(null)}
                    className="mt-2 text-[0.6rem] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Got it
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider
                               border-indigo-500/30 bg-indigo-500/20 text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/30 dark:text-indigo-100">
                Sponsored
              </span>
              <button
                onClick={() => setShowWhyPopup(showWhyPopup === index ? null : index)}
                className="text-[0.6rem] font-medium text-indigo-600 dark:text-indigo-300 cursor-pointer hover:text-indigo-800 dark:hover:text-indigo-200"
              >
                Why? ↗
              </button>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-black dark:text-white">{entry.ad.headline}</div>
              <p className="whitespace-pre-line text-[0.65rem] text-black/70 dark:text-white/70 leading-relaxed">{entry.ad.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {entry.ad.callToAction && (
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1 text-[0.65rem] font-semibold text-white hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600">
                  {entry.ad.callToAction}
                </button>
              )}
              {entry.ad.targetUrl && (
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium text-indigo-700 underline underline-offset-2 dark:text-indigo-300 hover:opacity-70 cursor-pointer">
                  {entry.ad.targetUrl} <span aria-hidden>↗</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )
    }

    const isUser = entry.type === 'user'

    return (
      <motion.div
        key={`${entry.type}-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div className={cx(
          'max-w-lg rounded-lg border px-3 py-2 text-xs leading-relaxed shadow-sm transition-all duration-300',
          isUser
            ? 'bg-indigo-500/20 border-indigo-400/30 text-black dark:bg-indigo-600/30 dark:border-indigo-400/40 dark:text-white'
            : 'bg-white/95 border-indigo-200/20 text-black/90 backdrop-blur-xl dark:bg-indigo-950/40 dark:border-indigo-500/30 dark:text-white/90'
        )}>
          <div className="mb-1 text-[0.6rem] uppercase tracking-wider font-semibold text-indigo-700 dark:text-indigo-300">
            {isUser ? 'User' : 'Assistant'}
          </div>
          <div className="whitespace-pre-line text-[0.7rem] text-black dark:text-white">{entry.content}</div>
        </div>
      </motion.div>
    )
  }

  const showNext = visibleTurns < scriptLength

  useEffect(() => {
    if (!showNextHint) return
    const id = window.setTimeout(() => setShowNextHint(false), 6000)
    return () => window.clearTimeout(id)
  }, [showNextHint])

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header with scenario buttons */}
      <div className="border-b px-4 pt-8 pb-6 border-indigo-200/30 bg-indigo-50/60 backdrop-blur-sm dark:border-indigo-500/30 dark:bg-indigo-950/60 transition-colors duration-300">
        <div className="flex flex-wrap gap-2">
          {SCRIPTED_SCENARIOS.map((item) => {
            const isActive = item.id === scenario.id
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveScenarioId(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cx(
                  'px-2.5 py-1 text-[0.65rem] font-semibold rounded-md transition-all duration-300',
                  isActive
                    ? 'border-2 border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500 dark:text-white shadow-md'
                    : 'border border-indigo-300/30 bg-indigo-100/60 text-indigo-900 hover:bg-indigo-200/80 dark:border-indigo-500/30 dark:bg-indigo-900/40 dark:text-indigo-100 dark:hover:bg-indigo-800/50'
                )}
              >
                {item.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Chat messages - scrollable area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-3 p-4 bg-gradient-to-b from-indigo-50/30 to-white/95 dark:from-indigo-950/30 dark:to-gray-900/95 transition-colors duration-300"
      >
        <AnimatePresence mode="popLayout">
          {visibleEntries.map((entry, index) => renderEntry(entry, index))}
        </AnimatePresence>
      </div>

      {/* Footer with controls */}
      <div className="border-t px-4 py-3 border-indigo-200/30 bg-indigo-50/60 backdrop-blur-sm dark:border-indigo-500/30 dark:bg-indigo-950/60 transition-colors duration-300">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[0.6rem] text-black/60 dark:text-white/60 font-medium">
            Sponsored at natural moments
          </div>
          <div className="flex gap-1.5 items-center relative">
            <AnimatePresence>
              {showNext && showNextHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute -top-14 right-0 z-20 w-[180px] rounded-lg border px-3 py-2 text-[0.6rem] shadow-xl backdrop-blur-xl
                             border-black/10 bg-white/95 text-black
                             dark:border-white/20 dark:bg-white/20 dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                    <span className="font-semibold leading-tight">Click &quot;Next Turn&quot;</span>
                  </div>
                  <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-r border-b border-black/10 bg-white/95 dark:border-white/20 dark:bg-white/20" />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={handleNextTurn}
              disabled={!showNext}
              whileHover={showNext ? { scale: 1.05 } : {}}
              whileTap={showNext ? { scale: 0.95 } : {}}
              onMouseEnter={() => setShowNextHint(false)}
              className={cx(
                'px-3 py-1.5 text-[0.65rem] font-semibold rounded-md transition-all duration-300 relative',
                'border border-indigo-300/30 bg-indigo-100/60 text-indigo-900 hover:bg-indigo-200/80',
                'dark:border-indigo-500/30 dark:bg-indigo-900/40 dark:text-indigo-100 dark:hover:bg-indigo-800/50',
                showNext && showNextHint ? 'animate-pulse' : '',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-100/60 dark:disabled:hover:bg-indigo-900/40'
              )}
            >
              {showNext ? 'Next Turn' : 'Complete'}
            </motion.button>
            <motion.button
              onClick={handleRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 text-[0.65rem] font-semibold rounded-md transition-all duration-300 border border-indigo-300/30 bg-indigo-100/60 text-indigo-900 hover:bg-indigo-200/80 dark:border-indigo-500/30 dark:bg-indigo-900/40 dark:text-indigo-100 dark:hover:bg-indigo-800/50"
            >
              Restart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Standard component (kept for backwards compatibility)
export default function MockChatShowcase() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    SCRIPTED_SCENARIOS[0]?.id ?? ''
  )

  const scenario: Scenario =
    useMemo(
      () => SCRIPTED_SCENARIOS.find((item) => item.id === activeScenarioId),
      [activeScenarioId]
    ) ?? SCRIPTED_SCENARIOS[0]

  const scriptLength = scenario.script.length
  const [visibleTurns, setVisibleTurns] = useState(
    Math.min(INITIAL_TURNS, scriptLength)
  )
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showNextHint, setShowNextHint] = useState(false)
  const [showWhyPopup, setShowWhyPopup] = useState<number | null>(null)

  useEffect(() => {
    setVisibleTurns(Math.min(INITIAL_TURNS, scriptLength))
    setShowNextHint(scriptLength > INITIAL_TURNS)
  }, [scriptLength, scenario.id])

  useEffect(() => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [visibleTurns, scenario.id])

  const visibleEntries = scenario.script.slice(0, visibleTurns)

  const handleNextTurn = () => {
    setVisibleTurns((prev) => Math.min(scriptLength, prev + 1))
    setShowNextHint(false)
  }

  const handleRestart = () => {
    setVisibleTurns(Math.min(INITIAL_TURNS, scriptLength))
    setShowNextHint(scriptLength > INITIAL_TURNS)
  }

  const renderEntry = (entry: ChatEntry, index: number) => {
    if (entry.type === 'ad') {
      return (
        <motion.div
          key={`ad-${index}`}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex justify-start"
        >
          <motion.div 
            whileHover={{ scale: 1.01, y: -1 }}
            className="relative w-full max-w-xl rounded-xl border px-4 py-4 text-sm leading-relaxed shadow-md transition-all duration-300
                          border-black/10 bg-white/80 backdrop-blur-xl
                          dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {/* Why Popup */}
            <AnimatePresence>
              {showWhyPopup === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute -top-3 right-0 z-50 w-[280px] rounded-xl border p-4 text-xs leading-relaxed shadow-2xl backdrop-blur-xl
                             border-black/10 bg-white/95 text-black
                             dark:border-white/20 dark:bg-slate-800/95 dark:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-2 font-semibold text-sm">Why this ad?</div>
                  <p className="mb-2">
                    You&rsquo;re seeing this ad based on the context of the page you&rsquo;re viewing.
                  </p>
                  <p className="mb-2">
                    It&rsquo;s not personalized — it was selected because the content matches the topic or keywords related to this ad.
                  </p>
                  <p className="text-black/70 dark:text-white/70">
                    We don&rsquo;t use your personal data or browsing history. It&rsquo;s displayed only because it&rsquo;s relevant to the content.
                  </p>
                  <button
                    onClick={() => setShowWhyPopup(null)}
                    className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Got it
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-br from-black/3 via-transparent to-transparent dark:from-white/3 rounded-xl pointer-events-none" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider transition-colors duration-300
                                 border-black/20 bg-black/10 text-black
                                 dark:border-white/20 dark:bg-white/10 dark:text-white">
                  Sponsored
                </span>
                <button
                  onClick={() => setShowWhyPopup(showWhyPopup === index ? null : index)}
                  className="text-[0.65rem] font-medium text-black/50 dark:text-white/50 transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  Why? <span className="font-bold">↗</span>
                </button>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black dark:text-white transition-colors duration-300" style={{ letterSpacing: '-0.01em' }}>
                  {entry.ad.headline}
                </div>
                <p className="whitespace-pre-line text-xs text-black/70 dark:text-white/70 transition-colors duration-300 leading-relaxed">
                  {entry.ad.body}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                {entry.ad.callToAction && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                  >
                    {entry.ad.callToAction}
                  </motion.button>
                )}
                {entry.ad.targetUrl && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-black underline underline-offset-2 transition-colors duration-300 dark:text-white hover:opacity-70">
                    {entry.ad.targetUrl}
                    <span aria-hidden>↗</span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    }

    const isUser = entry.type === 'user'

    return (
      <motion.div
        key={`${entry.type}-${index}`}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <motion.div
          whileHover={{ scale: 1.01, y: -1 }}
          className={cx(
            'max-w-xl rounded-xl border px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-all duration-300',
            isUser
              ? 'bg-black/10 border-black/20 text-black dark:bg-white/10 dark:border-white/20 dark:text-white'
              : 'bg-white/80 border-black/10 text-black/90 backdrop-blur-xl dark:bg-white/5 dark:border-white/10 dark:text-white/90'
          )}
        >
          <div className="mb-1 text-[0.65rem] uppercase tracking-wider font-semibold text-black/50 dark:text-white/50 transition-colors duration-300">
            {isUser ? 'User' : 'Assistant'}
          </div>
          <div className="whitespace-pre-line text-xs text-black dark:text-white">{entry.content}</div>
        </motion.div>
      </motion.div>
    )
  }

  const showNext = visibleTurns < scriptLength
  
  useEffect(() => {
    if (!showNextHint) return
    const id = window.setTimeout(() => setShowNextHint(false), 6000)
    return () => window.clearTimeout(id)
  }, [showNextHint])

  return (
    <div className="space-y-6">
      <div className="space-y-2.5 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300 sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>
          See Our Work in Action
        </h2>
        <p className="text-sm text-black/70 dark:text-white/70 transition-colors duration-300 leading-relaxed max-w-2xl">
          Step through a real chat storyline to watch how sponsored suggestions
          appear only when the context makes sense.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SCRIPTED_SCENARIOS.map((item) => {
          const isActive = item.id === scenario.id
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveScenarioId(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cx(
                'px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300',
                isActive
                  ? 'border-2 border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md'
                  : 'border border-black/10 bg-white/60 backdrop-blur-sm text-black hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
              )}
            >
              {item.label}
            </motion.button>
          )
        })}
      </div>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border p-4 text-xs transition-all duration-300 border-black/10 bg-white/60 backdrop-blur-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
        >
          {scenario.summary}
        </motion.div>

        <div className="rounded-xl border shadow-lg transition-all duration-300 border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div
            ref={scrollContainerRef}
            className="max-h-[24rem] overflow-y-auto space-y-4 p-5"
          >
            <AnimatePresence mode="popLayout">
              {visibleEntries.map((entry, index) => renderEntry(entry, index))}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3.5 transition-all duration-300 border-black/10 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div className="text-[0.65rem] text-black/60 dark:text-white/60 transition-colors duration-300 font-medium">
              Sponsored content appears at natural breakpoints—never every turn.
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative inline-flex">
                <AnimatePresence>
                  {showNext && showNextHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      role="status"
                      aria-live="polite"
                      className="absolute -top-16 right-0 z-10 w-[220px] rounded-lg border px-3.5 py-2.5 text-[0.65rem] shadow-xl backdrop-blur-xl transition-all duration-300
                                 border-black/10 bg-white/95 text-black
                                 dark:border-white/20 dark:bg-white/20 dark:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 flex-shrink-0 text-black/70 dark:text-white/70" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                        </svg>
                        <span className="font-semibold leading-tight">Click &quot;Next Turn&quot;</span>
                      </div>
                      <div className="absolute -bottom-1.5 right-6 h-2.5 w-2.5 rotate-45 border-r border-b transition-colors duration-300 border-black/10 bg-white/95 dark:border-white/20 dark:bg-white/20" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <GlassButton
                  size="sm"
                  onClick={handleNextTurn}
                  disabled={!showNext}
                  className={showNext && showNextHint ? 'animate-pulse' : ''}
                  onMouseEnter={() => setShowNextHint(false)}
                >
                  {showNext ? 'Next Turn' : 'Complete'}
                </GlassButton>
              </div>
              <motion.button
                type="button"
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-300 border-black/10 bg-white/60 backdrop-blur-sm text-black hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Restart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}