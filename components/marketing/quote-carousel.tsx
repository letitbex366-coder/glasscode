"use client"

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion'
import clsx from 'clsx'
 
type QuoteLogo = {
  src: string
  alt: string
}
 
export type QuoteHighlight = {
  headline: string
  body: string
  sourceName: string
  sourceMeta: string
  logos: QuoteLogo[]
  glowClass: string
  iconComponent?: React.ReactNode
}
 
// Responsive card dimensions
const CARD_WIDTH_MOBILE = 280
const CARD_WIDTH_TABLET = 300
const CARD_WIDTH_DESKTOP = 320
const CARD_GAP_MOBILE = 16
const CARD_GAP_TABLET = 20
const CARD_GAP_DESKTOP = 24
const CARDS_PER_VIEW_MOBILE = 1
const CARDS_PER_VIEW_TABLET = 2
const CARDS_PER_VIEW_DESKTOP = 3

interface QuoteCarouselProps {
  quotes: QuoteHighlight[]
}
 
export function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const [activeSetIndex, setActiveSetIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DESKTOP)
  const [cardGap, setCardGap] = useState(CARD_GAP_DESKTOP)
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW_DESKTOP)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate number of sets based on cards per view
  const totalSets = useMemo(() => {
    return Math.ceil(quotes.length / cardsPerView)
  }, [quotes.length, cardsPerView])

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth
        const containerW = containerRef.current.offsetWidth
        
        if (width < 640) {
          // Mobile
          setCardWidth(CARD_WIDTH_MOBILE)
          setCardGap(CARD_GAP_MOBILE)
          setCardsPerView(CARDS_PER_VIEW_MOBILE)
        } else if (width < 1024) {
          // Tablet
          setCardWidth(CARD_WIDTH_TABLET)
          setCardGap(CARD_GAP_TABLET)
          setCardsPerView(CARDS_PER_VIEW_TABLET)
        } else {
          // Desktop
          setCardWidth(CARD_WIDTH_DESKTOP)
          setCardGap(CARD_GAP_DESKTOP)
          setCardsPerView(CARDS_PER_VIEW_DESKTOP)
        }
        setContainerWidth(containerW)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Smooth spring animation
  const springConfig = { damping: 35, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  
  // Start from left - no centering offset
  const centeredX = useTransform(xSpring, (value) => value)

  // Calculate the x position for a given set index
  const getSetXPosition = useCallback((setIndex: number) => {
    const setWidth = cardsPerView * cardWidth + (cardsPerView - 1) * cardGap
    return -setIndex * (setWidth + cardGap)
  }, [cardsPerView, cardWidth, cardGap])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    let didNavigate = false
    const setWidth = cardsPerView * cardWidth + (cardsPerView - 1) * cardGap

    if (Math.abs(velocity) >= 500) {
      if (velocity > 0 && activeSetIndex > 0) {
        setActiveSetIndex(activeSetIndex - 1)
        didNavigate = true
      } else if (velocity < 0 && activeSetIndex < totalSets - 1) {
        setActiveSetIndex(activeSetIndex + 1)
        didNavigate = true
      }
    } else if (Math.abs(offset) > setWidth / 3) {
      if (offset > 0 && activeSetIndex > 0) {
        setActiveSetIndex(activeSetIndex - 1)
        didNavigate = true
      } else if (offset < 0 && activeSetIndex < totalSets - 1) {
        setActiveSetIndex(activeSetIndex + 1)
        didNavigate = true
      }
    } else {
      // Snap back to current active set
      const targetX = getSetXPosition(activeSetIndex)
      x.set(targetX)
    }

    // Pause auto-rotation if user interacted
    if (didNavigate) {
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
    }
  }

  const handleDotClick = (setIndex: number) => {
    setActiveSetIndex(setIndex)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
  }

  // Auto-rotate quotes - rotate between sets
  useEffect(() => {
    if (isPaused || isHovered || totalSets <= 1) return
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets)
    }, 5000) // Rotate every 5 seconds
    return () => clearInterval(interval)
  }, [isPaused, isHovered, totalSets])

  useEffect(() => {
    // Position carousel so active set is visible
    // Start from left (position 0) to show first 3 cards
    const timer = setTimeout(() => {
      if (activeSetIndex === 0) {
        x.set(0) // Start from left
      } else {
        const targetX = getSetXPosition(activeSetIndex)
        x.set(targetX)
      }
    }, 10)
    return () => clearTimeout(timer)
  }, [activeSetIndex, cardWidth, cardGap, cardsPerView, x, getSetXPosition])

  const slideWrapperClass = useMemo(
    () => [
      'group flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border p-6 sm:p-8 lg:p-10 backdrop-blur-2xl transition-all duration-300',
      'border-white/30 bg-white/30 shadow-[0_20px_48px_rgba(15,23,42,0.15)]',
      'dark:border-white/8 dark:backdrop-blur-[24px]',
      'dark:bg-[rgba(22,26,56,0.25)]',
      'dark:shadow-[0_22px_48px_rgba(10,12,32,0.45),0_0_0_1px_rgba(148,163,184,0.08)_inset]',
      'relative cursor-grab active:cursor-grabbing',
      // Glassmorphic glow effect
      'before:absolute before:inset-0 before:-z-10 before:rounded-2xl sm:before:rounded-3xl before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7)_0,rgba(255,255,255,0)_65%)]',
      'before:opacity-70 before:blur-xl',
      'dark:before:bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.22)_0,rgba(20,24,55,0)_65%)] dark:before:opacity-70',
    ].join(' '),
    []
  )
  
  const canGoNext = activeSetIndex < totalSets - 1

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Glass background container - transparent to show theme background */}
      <div className="relative -mx-6 lg:-mx-8 rounded-3xl overflow-hidden">
        {/* Transparent glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6" />

        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Carousel Container - Shows multiple cards */}
          <div 
            ref={containerRef}
            className="relative h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px] w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel track */}
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={{
                left: getSetXPosition(totalSets - 1),
                right: 0
              }}
              dragElastic={0.2}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={handleDragEnd}
              style={{ 
                x: centeredX,
                display: 'flex',
                gap: `${cardGap}px`,
                height: '100%',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
              }}
              className="will-change-transform"
            >
                {quotes.map((quote, index) => {
                  return (
                    <motion.article
                      key={`${quote.sourceName}-${quote.headline}`}
                      style={{
                        width: `${cardWidth}px`,
                        flexShrink: 0,
                      }}
                      className={slideWrapperClass}
                    >
                    {/* Subtle inner gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/65 via-white/15 to-transparent dark:bg-transparent" />
                    <div className="relative z-10 space-y-4 transition-colors duration-300">
                      {/* Icon - show if iconComponent is provided */}
                      {quote.iconComponent && (
                        <div className="mb-4 inline-flex items-center justify-center text-indigo-700 dark:text-indigo-200">
                          <div className="p-2">
                            {quote.iconComponent}
                          </div>
                        </div>
                      )}
                      {/* Show logos if available, otherwise show headline */}
                      {quote.logos.length > 0 ? (
                        <>
                          <blockquote className="space-y-4">
                            <p className="text-xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-2xl transition-colors duration-300" 
                              style={{ letterSpacing: '-0.02em' }}>
                              {quote.headline}
                            </p>
                            <p className="text-xs text-slate-800 dark:text-white/80 sm:text-sm transition-colors duration-300 leading-relaxed">
                              {quote.body}
                            </p>
                          </blockquote>
                          <div className="mt-6 flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {quote.logos.map((logo) => (
                                <div
                                  key={`${quote.sourceName}-${logo.src}`}
                                  className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border p-1.5 backdrop-blur-xl border-white/30 bg-white/16 dark:border-white/15 dark:bg-white/10"
                                >
                                  <Image src={logo.src} alt={logo.alt} fill sizes="36px" className="object-contain" />
                                </div>
                              ))}
                            </div>
                            <div className="transition-colors duration-300">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white transition-colors duration-300" style={{ letterSpacing: '-0.01em' }}>
                                {quote.sourceName}
                              </p>
                              <p className="text-[0.65rem] text-slate-600 dark:text-white/70 transition-colors duration-300">
                                {quote.sourceMeta}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-2xl transition-colors duration-300" 
                            style={{ letterSpacing: '-0.02em' }}>
                            {quote.headline}
                          </h3>
                          <p className="text-xs text-slate-800 dark:text-white/80 sm:text-sm transition-colors duration-300 leading-relaxed">
                            {quote.body}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Hint Indicator */}
      {canGoNext && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-4"
        >
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 text-black/60 dark:text-[#9ca3af] text-sm"
          >
            <span className="hidden sm:inline">Swipe or drag to see more</span>
            <span className="sm:hidden">Swipe to see more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Pagination Dots - One dot per set */}
      <div className="flex justify-center gap-2 transition-colors duration-300 px-4 sm:px-6 lg:px-8 mt-4">
        {Array.from({ length: totalSets }).map((_, setIndex) => (
          <motion.button
            key={setIndex}
            type="button"
            onClick={() => handleDotClick(setIndex)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={clsx(
              'h-1.5 rounded-full transition-all duration-300',
              setIndex === activeSetIndex 
                ? 'w-8 bg-black/80 dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.5),0_0_20px_rgba(99,102,241,0.3)]' 
                : 'w-1.5 bg-black/30 dark:bg-white/30 dark:backdrop-blur-sm dark:hover:bg-white/50 dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
            )}
            aria-label={`Show set ${setIndex + 1}`}
          />
        ))}
      </div>
     </div>
   )
}