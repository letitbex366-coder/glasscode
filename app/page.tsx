'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MockChatShowcaseInLaptop } from '@/components/marketing/mock-chat-showcase';
import { QuoteCarousel } from '@/components/marketing/quote-carousel';
import Background3D from '@/components/effects/Background3D';
import ChatBackground3D from '@/components/effects/ChatBackground3D';
import EnergyWave from '@/components/effects/EnergyWave';
import { LaptopMockup } from '@/components/ui/laptop-mockup';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

/* ====================== Utilities ====================== */
const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ');

/* ====================== Theme Toggle ====================== */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" 
        d="M12 3v2m0 14v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
    </svg>
  );

  const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" 
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    const activeDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(activeDark);
    
    if (!document.documentElement.classList.contains('theme-transitioning')) {
      document.documentElement.style.setProperty('color-scheme', activeDark ? 'dark' : 'light');
    }
    document.documentElement.classList.toggle('dark', activeDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.add('theme-transitioning');
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.style.setProperty('color-scheme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cx(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300",
        "border-black/10 bg-white/60 backdrop-blur-xl text-black hover:bg-white/80",
        "dark:border-white/10 dark:backdrop-blur-[12px]",
        "dark:bg-[rgba(30,30,30,0.5)]",
        "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
        "dark:hover:bg-[rgba(40,40,40,0.6)]",
        "dark:hover:border-white/15",
        "dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.2)]"
      )}
    >
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
      <motion.span
        className="absolute"
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0, scale: isDark ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <MoonIcon className="h-4 w-4" />
      </motion.span>
      <motion.span
        className="absolute"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <SunIcon className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}

/* ====================== 3D Card Component ====================== */
function Card3D({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        y: -6, 
        scale: 1.01,
        transition: { duration: 0.3 }
      }}
      className={cx(
        'relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300',
        'border-black/10 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        'dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]',
        'transform-gpu',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ====================== Scroll to Section ====================== */
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* ====================== Typing Animation Component ====================== */
function TypingText({ 
  text, 
  className = '',
  typingSpeed = 100,
  delay = 0,
  showCaret = true,
  caretBlinkSpeed = 530,
  hideCaretAfter = true
}: { 
  text: string
  className?: string
  typingSpeed?: number
  delay?: number
  showCaret?: boolean
  caretBlinkSpeed?: number
  hideCaretAfter?: boolean
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCaretState, setShowCaretState] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  useEffect(() => {
    // Reset animation when component comes into view
    if (isInView) {
      setDisplayedText('')
      setShowCaretState(false)
      setIsTyping(false)
      setAnimationKey(prev => prev + 1)
    }
  }, [isInView])

  useEffect(() => {
    // Only start animation when in view
    if (!isInView) return

    // Initial delay - text starts hidden
    const delayTimer = setTimeout(() => {
      // Show caret first
      setShowCaretState(true)
      
      // Small delay before typing starts
      const caretDelay = setTimeout(() => {
        setIsTyping(true)
        
        // Type out the text letter by letter
        let currentIndex = 0
        const typingInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(typingInterval)
            setIsTyping(false)
            
            // Hide caret after typing completes (optional)
            if (hideCaretAfter && showCaret) {
              setTimeout(() => {
                setShowCaretState(false)
              }, 1000)
            }
          }
        }, typingSpeed)

        return () => clearInterval(typingInterval)
      }, 300) // Show caret for 300ms before typing starts

      return () => clearTimeout(caretDelay)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, typingSpeed, delay, showCaret, caretBlinkSpeed, hideCaretAfter, isInView, animationKey])

  return (
    <span ref={ref} className={cx("inline-block", className)}>
      <span className="inline-block" style={{ minHeight: '1em' }}>
        {displayedText}
      </span>
      {showCaret && showCaretState && (
        <motion.span
          key={`caret-${animationKey}`}
          className="inline-block align-middle bg-current"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: caretBlinkSpeed / 1000,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            width: '2px',
            height: '1.1em',
            marginLeft: '4px',
            verticalAlign: 'middle',
            display: 'inline-block'
          }}
        />
      )}
    </span>
  )
}

/* ====================== Page ====================== */
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const featureCards = [
    {
      title: 'MERN Stack Experts',
      description: 'Custom dashboards, admin panels, workflow systems, portals, and SaaS products built with modern MERN stack.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'AI-Powered Automation',
      description: 'AI chatbots, workflow automation, AI assistants, and integration with OpenAI/LLM for intelligent solutions.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Transparent Delivery',
      description: 'Clear communication, regular updates, and transparent processes throughout your project lifecycle.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Scalable Architecture',
      description: 'Build for growth with cloud-native architectures, microservices, and infrastructure that scales with your business.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      title: '24/7 Support Hotline',
      description: 'Round-the-clock support to ensure your systems run smoothly and your team stays productive.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'High-Converting Landing Pages',
      description: 'Custom landing pages designed to convert visitors into customers. Optimized for local businesses with lead capture, booking systems, and mobile-first design.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const quoteHighlights = [
    {
      headline: '"Copilot users click ads 73% more and convert 16% higher."',
      body: 'Conversational search moments deliver higher-intent engagement than traditional SERPs.',
      sourceName: 'Microsoft Advertising',
      sourceMeta: 'Copilot Insights, 2025',
      glowClass: 'bg-white/10',
    },
    {
      headline: '"In-chat ads shorten the path to purchase by 33%."',
      body: 'Brands running AI chatbots see 23% higher conversion rates than those without (Glassix, 2025).',
      sourceName: 'Microsoft Copilot Study',
      sourceMeta: 'Conversational Commerce, 2025',
      glowClass: 'bg-white/10',
    },
    {
      headline: '"AI adoption among businesses climbed to 72% in 2024."',
      body: 'Personalization and real-time engagement are making AI the default customer journey strategy.',
      sourceName: 'McKinsey',
      sourceMeta: 'State of AI, 2024',
      glowClass: 'bg-white/10',
    },
    {
      headline: '"95% of customer-service interactions will be AI-powered by 2025."',
      body: 'Support leaders are rebuilding playbooks around AI agents before the next buying cycle.',
      sourceName: 'Gartner',
      sourceMeta: 'Future of Customer Service, 2025',
      glowClass: 'bg-white/10',
    },
    {
      headline: '"Over 80% of Fortune 500 brands now deploy large language models."',
      body: 'Enterprise teams are automating and personalizing conversations at scale with LLMs.',
      sourceName: 'OpenAI',
      sourceMeta: 'Internal Data, 2025',
      glowClass: 'bg-white/10',
    },
    {
      headline: '"20M people spend 2+ hours per session with AI companions."',
      body: 'The AI companion app market hit 220M downloads and $220M in annual spend, growing 64% YoY.',
      sourceName: 'AppFigures & AppMagic',
      sourceMeta: 'Usage & Revenue Data, 2025',
      glowClass: 'bg-white/10',
    },
  ];

  const [isDark, setIsDarkState] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkState(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGradientAnimation
        containerClassName={cx(
          "absolute inset-0 -z-30",
          "[--gradient-background-start:rgba(238,242,255,1)]",
          "[--gradient-background-end:rgba(199,210,254,1)]",
          isDark && "[--gradient-background-start:rgba(8,10,20,1)] [--gradient-background-end:rgba(26,14,61,1)]"
        )}
        className="hidden"
        firstColor={isDark ? "129, 140, 248" : "59, 130, 246"}
        secondColor={isDark ? "88, 28, 135" : "99, 102, 241"}
        thirdColor={isDark ? "14, 165, 233" : "125, 211, 252"}
        fourthColor={isDark ? "45, 55, 72" : "180, 190, 255"}
        fifthColor={isDark ? "80, 63, 205" : "248, 250, 252"}
        pointerColor={isDark ? "129, 140, 248" : "59, 130, 246"}
        blendingValue="screen"
      />

      <main
        className={cx(
          'relative z-10 min-h-screen overflow-hidden transition-colors duration-300',
          'text-black',
          'dark:text-[#cbd5e1]'
        )}
      >
      {/* 3D Background */}
      <Background3D isDark={isDark} />
 
      {/* Dotted overlay accents */}
      <div className="dot-mask hidden lg:block -z-10" aria-hidden />
      <div className="dot-mask dot-mask--dark hidden dark:block -z-10" aria-hidden />

      {/* Glassmorphic Fixed Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          // Light mode: brighter background when scrolled for better visibility
          isScrolled ? "bg-white/85 backdrop-blur-3xl shadow-sm" : "bg-white/18 backdrop-blur-3xl",
          "dark:backdrop-blur-[28px]",
          "dark:bg-[rgba(12,17,33,0.58)]",
          isScrolled 
            ? "supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-[rgba(12,17,33,0.58)]"
            : "supports-[backdrop-filter]:bg-white/12 dark:supports-[backdrop-filter]:bg-[rgba(12,17,33,0.58)]"
        )}
      >
        <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
          {/* Left: Logo */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-2.5 min-w-[100px] sm:min-w-[140px]"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg overflow-hidden bg-white dark:bg-black shadow-md">
              <img 
                    src="/images/logo.png"
                alt="Glasscode Innovations Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight text-black dark:text-white">
              Glasscode Innovations
            </span>
          </motion.div>

          {/* Center: Circular Glass Navigation Container - Hidden on mobile, shown on md+ */}
          <nav className={cx(
            "hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-300",
            "border-white/25 bg-white/12 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-2xl",
            "dark:border-white/10 dark:bg-[rgba(16,24,40,0.55)] dark:shadow-[0_14px_36px_rgba(2,6,23,0.65)] dark:backdrop-blur-[22px]"
          )}>
            <motion.button
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cx(
                "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                "text-black/70 hover:text-black/90",
                "dark:text-[#cbd5e1] dark:hover:text-white"
              )}
            >
              About
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('what-we-build')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cx(
                "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                "text-black/70 hover:text-black/90",
                "dark:text-[#cbd5e1] dark:hover:text-white"
              )}
            >
              Our Services
            </motion.button>
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cx(
                  "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                  "text-black/70 hover:text-black/90",
                  "dark:text-[#cbd5e1] dark:hover:text-white"
                )}
              >
                Portfolio
              </motion.button>
            </Link>
          </nav>

          {/* Right: Waitlist + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-[80px] sm:min-w-[140px] justify-end">
            {/* ========================================================
                LOGIN LOGIC COMMENTED OUT - NO AUTHENTICATION REQUIRED
                "Contact Us" button navigates to /contactus page
                Form submits directly to Google Sheets (no login)
                ======================================================== */}
            {/* Commented out Login button - replaced with Waitlist */}
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
              <Link
                href="/sign-in"
                className={cx(
                  "px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full inline-block",
                  "text-black/70 hover:text-black hover:bg-black/5",
                  "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                  "dark:hover:bg-[rgba(255,255,255,0.12)]",
                  "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                )}
              >
                Login
              </Link>
            </motion.div> */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              <Link
                href="/contactus"
                className={cx(
                  "px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-full inline-block",
                  "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                  "dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:text-indigo-200",
                  "border-2 border-indigo-500/40 dark:border-indigo-400/50",
                  "shadow-[0_6px_20px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.2)]",
                  "dark:shadow-[0_8px_24px_rgba(99,102,241,0.5),0_0_35px_rgba(99,102,241,0.3)]",
                  "transform scale-105"
                )}
              >
                Contact Us
              </Link>
            </motion.div>
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cx(
                "md:hidden flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-300",
                "text-black/70 hover:text-black hover:bg-black/5",
                "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                "dark:hover:bg-[rgba(255,255,255,0.12)]",
                "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              )}
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          initial={false}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cx(
            "md:hidden overflow-hidden",
            "border-t border-white/20 dark:border-white/10",
            "dark:bg-[rgba(18,18,18,0.5)] dark:backdrop-blur-[16px]"
          )}
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            <motion.button
              onClick={() => {
                scrollToSection('about');
                setMobileMenuOpen(false);
              }}
              whileTap={{ scale: 0.98 }}
              className={cx(
                "px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg text-left",
                "text-black/70 hover:text-black hover:bg-black/5",
                "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                "dark:hover:bg-[rgba(255,255,255,0.12)]",
                "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              )}
            >
              About
            </motion.button>
            <motion.button
              onClick={() => {
                scrollToSection('what-we-build');
                setMobileMenuOpen(false);
              }}
              whileTap={{ scale: 0.98 }}
              className={cx(
                "px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg text-left",
                "text-black/70 hover:text-black hover:bg-black/5",
                "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                "dark:hover:bg-[rgba(255,255,255,0.12)]",
                "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              )}
            >
              Our Services
            </motion.button>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className={cx(
                "px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg text-left",
                "text-black/70 hover:text-black hover:bg-black/5",
                "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                "dark:hover:bg-[rgba(255,255,255,0.12)]",
                "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              )}
            >
              Portfolio
            </Link>
            {/* Commented out Login - replaced with Waitlist */}
            {/* <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className={cx(
                "px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg",
                "text-black/70 hover:text-black hover:bg-black/5",
                "dark:text-[#cbd5e1] dark:hover:text-[#e5e7eb]",
                "dark:hover:bg-[rgba(255,255,255,0.12)]",
                "dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              )}
            >
              Login
            </Link> */}
            <Link
              href="/contactus"
              onClick={() => setMobileMenuOpen(false)}
              className={cx(
                "px-5 py-3 text-sm font-semibold transition-all duration-300 rounded-lg text-left w-full inline-block",
                "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                "dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:text-indigo-200",
                "border-2 border-indigo-500/40 dark:border-indigo-400/50",
                "shadow-[0_6px_20px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.2)]",
                "dark:shadow-[0_8px_24px_rgba(99,102,241,0.5),0_0_35px_rgba(99,102,241,0.3)]",
                "transform scale-105"
              )}
            >
              Contact Us
            </Link>
          </nav>
        </motion.div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-28 lg:px-8">
        {/* Hero with Energy Wave Background */}
        <div className="relative -mx-6 lg:-mx-8">
          {/* Energy Wave Background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <EnergyWave isDark={isDark} />
          </div>
          
          {/* Brighter overlay for better visibility */}
          <div className={cx(
            "absolute inset-0 rounded-3xl",
            "bg-gradient-to-br from-white/85 via-slate-100/45 to-sky-50/40",
            "dark:from-slate-900/55 dark:via-slate-900/45 dark:to-slate-950/60"
          )} />
          
          <motion.section
            style={{ opacity, scale }}
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 text-center py-8 px-6 lg:px-8 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 hidden dark:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.25),rgba(8,10,24,0)_70%)] blur-[160px]" />
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(99,102,241,0.3)",
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cx(
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer",
                "border-indigo-500/35 bg-transparent text-indigo-700",
                "dark:border-transparent dark:bg-[rgba(129,140,248,0.18)] dark:text-white",
                "shadow-[0_0_20px_rgba(99,102,241,0.16)] dark:shadow-[0_0_32px_rgba(129,140,248,0.35)]",
                "hover:border-indigo-500/60 dark:hover:bg-[rgba(129,140,248,0.28)] dark:hover:shadow-[0_0_40px_rgba(129,140,248,0.45)]"
              )}
            >
              {/* Star Icon with Animation */}
              <motion.svg
                className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1.2, 1.2, 1]
                }}
                transition={{ duration: 0.5 }}
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
              
              <span className="relative flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400"></span>
                </span>
                <span className="group-hover:text-indigo-800 dark:group-hover:text-indigo-100 transition-colors duration-300">
                  Modern Web Development & AI Solutions
                </span>
              </span>
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cx(
                "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                "text-black dark:text-transparent",
                "bg-clip-text dark:bg-gradient-to-r dark:from-indigo-200 dark:via-indigo-100 dark:to-purple-100",
                "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_22px_rgba(129,140,248,0.35)]"
              )}
              style={{ letterSpacing: '-0.02em' }}
            >
              Turn Ideas Into Web Apps Turn Workflows Into Automation
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cx(
                "text-base sm:text-lg max-w-2xl leading-relaxed",
                "text-black/80 dark:text-white/80",
                "font-normal tracking-normal",
                "drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              )}
            >
              Build Modern Web Apps & AI Automation That Scale Your Business
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cx(
                "text-sm sm:text-base max-w-2xl leading-relaxed",
                "text-black/70 dark:text-white/70",
                "font-normal tracking-normal",
                "drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              )}
            >
              We create fast, secure, and intelligent digital solutions using MERN Stack, AI Agents, and smart automation systems.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center justify-center mt-6"
            >
              <Link href="/contactus">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cx(
                    "px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-full inline-block",
                    "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                    "dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:text-indigo-200",
                    "border-2 border-indigo-500/40 dark:border-indigo-400/50",
                    "shadow-[0_6px_20px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.2)]",
                    "dark:shadow-[0_8px_24px_rgba(99,102,241,0.5),0_0_35px_rgba(99,102,241,0.3)]",
                    "transform scale-105"
                  )}
                >
                  Get a Free Consultation
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>
        </div>

        {/* Our Core Services Section */}
        <section id="what-we-build" className="relative scroll-mt-20 -mx-6 lg:-mx-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6 dark:from-[rgba(20,25,50,0.85)] dark:via-[rgba(30,25,70,0.7)] dark:to-[rgba(10,12,32,0.85)]" />
            
            <div className="relative z-10 px-6 py-12 lg:px-8 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl text-center space-y-4 mb-12"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium",
                    "border-indigo-500/35 bg-transparent text-indigo-700",
                    "dark:border-transparent dark:bg-[rgba(129,140,248,0.18)] dark:text-white"
                  )}
                >
                  🔥 Our Core Services
                </motion.span>
                <h2 className={cx(
                  "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                  "text-black dark:text-white"
                )} style={{ letterSpacing: '-0.02em' }}>
                  What We Build
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    title: 'MERN Stack Web App Development',
                    description: 'Custom dashboards, admin panels, workflow systems, portals, SaaS products.',
                    icon: '💻'
                  },
                  {
                    title: 'AI Automation & AI Agents',
                    description: 'AI chatbots, workflow automation, AI assistants, integration with OpenAI/LLM.',
                    icon: '🤖'
                  },
                  {
                    title: 'Enterprise Software Development',
                    description: 'Secure & compliant applications for government, corporate & startups.',
                    icon: '🏢'
                  },
                  {
                    title: 'API Development & Integrations',
                    description: 'REST, GraphQL, microservices, third-party integrations.',
                    icon: '🔌'
                  },
                  {
                    title: 'Cloud Deployment & DevOps',
                    description: 'CI/CD, scalable deployment, monitoring & optimization.',
                    icon: '☁️'
                  },
                  {
                    title: 'Product Prototyping & MVP',
                    description: 'Wireframes, UI/UX, full MVP in 30–60 days.',
                    icon: '🚀'
                  },
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cx(
                      "p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300",
                      "border-white/10 bg-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.03)]",
                      "dark:border-white/3 dark:bg-white/2 dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
                      "hover:bg-white/30 dark:hover:bg-white/3",
                      "hover:border-white/15 dark:hover:border-white/5"
                    )}
                  >
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proof points */}
        <div className="relative -mx-6 lg:-mx-8 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6" />

          <section className="relative z-10 space-y-10 px-6 lg:px-8 py-12 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center space-y-4"
          >
            {/* Badge similar to Conversation-first advertising */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(99,102,241,0.3)",
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cx(
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer",
                "border-indigo-500/35 bg-transparent text-indigo-700",
                "dark:border-transparent dark:bg-[rgba(129,140,248,0.18)] dark:text-white",
                "shadow-[0_0_20px_rgba(99,102,241,0.16)] dark:shadow-[0_0_32px_rgba(129,140,248,0.35)]",
                "hover:border-indigo-500/60 dark:hover:bg-[rgba(129,140,248,0.28)] dark:hover:shadow-[0_0_40px_rgba(129,140,248,0.45)]"
              )}
            >
              {/* Star Icon with Animation */}
              <motion.svg
                className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-900"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1.2, 1.2, 1]
                }}
                transition={{ duration: 0.5 }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
              
              <span className="relative flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-900"></span>
                </span>
                <span className="group-hover:text-indigo-800 dark:group-hover:text-indigo-50 transition-colors duration-300">
                  Why Choose Us
                </span>
              </span>
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cx(
                "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                "text-black dark:text-transparent",
                "bg-clip-text dark:bg-gradient-to-r dark:from-indigo-200 dark:via-indigo-100 dark:to-purple-100",
                "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_24px_rgba(129,140,248,0.35)]"
              )}
              style={{ letterSpacing: '-0.02em' }}
            >
              Why Choose Glasscode Innovations
            </motion.h2>
            <p className="text-sm text-black/60 dark:text-white/75 leading-relaxed sm:text-base">
              We combine cutting-edge MERN stack expertise with AI automation to deliver scalable, secure, and intelligent solutions that drive business growth.
            </p>
          </motion.div>
          <QuoteCarousel quotes={featureCards.map((card) => ({
            headline: card.title,
            body: card.description,
            sourceName: '',
            sourceMeta: '',
            logos: [],
            glowClass: 'bg-white/10',
            iconComponent: card.icon,
          }))} />
          </section>
        </div>

        {/* Conversation Demo in Laptop */}
        <section id="demo" className="relative scroll-mt-20">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              {/* Demo Badge similar to Conversation-first advertising */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(99,102,241,0.3)",
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cx(
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer",
                  "border-indigo-500/35 bg-transparent text-indigo-700",
                  "dark:border-indigo-300/40 dark:text-indigo-200",
                  "shadow-[0_0_20px_rgba(99,102,241,0.16)] dark:shadow-[0_0_24px_rgba(129,140,248,0.32)]",
                  "hover:border-indigo-500/60 dark:hover:border-indigo-200/70"
                )}
              >
                {/* Star Icon with Animation */}
                <motion.svg
                  className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: 0 }}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1.2, 1.2, 1]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
                
                <span className="relative flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/60 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400"></span>
                  </span>
                  <span className="group-hover:text-indigo-800 dark:group-hover:text-indigo-200 transition-colors duration-300">
                    Demo
                  </span>
                </span>
              </motion.span>

              <h2 className={cx(
                "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                "text-black dark:text-white",
                "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
              )} style={{ letterSpacing: '-0.02em' }}>
                <TypingText 
                  text="View Our Work"
                  typingSpeed={90}
                  delay={500}
                  showCaret={true}
                  caretBlinkSpeed={530}
                  hideCaretAfter={true}
                />
              </h2>
              <p className="text-sm text-black/70 dark:text-white/70 transition-colors duration-300 leading-relaxed max-w-2xl mx-auto">
                Explore our portfolio of modern web applications, AI automation systems, and enterprise solutions.
                See how we transform ideas into scalable digital products.
              </p>
            </motion.div>

            <LaptopMockup>
              <MockChatShowcaseInLaptop />
            </LaptopMockup>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="relative scroll-mt-20 -mx-6 lg:-mx-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6 dark:from-[rgba(20,25,50,0.85)] dark:via-[rgba(30,25,70,0.7)] dark:to-[rgba(10,12,32,0.85)]" />
            
            <div className="relative z-10 px-6 py-12 lg:px-8 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl text-center space-y-4 mb-12"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium",
                    "border-indigo-500/35 bg-transparent text-indigo-700",
                    "dark:border-transparent dark:bg-[rgba(129,140,248,0.18)] dark:text-white"
                  )}
                >
                  🔥 Featured Projects
                </motion.span>
                <h2 className={cx(
                  "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                  "text-black dark:text-white"
                )} style={{ letterSpacing: '-0.02em' }}>
                  Our Recent Work
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    title: 'SaaS CRM Dashboard',
                    description: 'Modern customer relationship management platform with real-time analytics.',
                    glow: 'from-blue-500/20 to-indigo-500/20'
                  },
                  {
                    title: 'Workflow Automation Tool',
                    description: 'AI-powered automation system for streamlining business processes.',
                    glow: 'from-purple-500/20 to-pink-500/20'
                  },
                  {
                    title: 'AI Chat Assistant',
                    description: 'Intelligent chatbot with natural language processing capabilities.',
                    glow: 'from-green-500/20 to-emerald-500/20'
                  },
                  {
                    title: 'Document Management System',
                    description: 'Secure enterprise document management with advanced search.',
                    glow: 'from-orange-500/20 to-red-500/20'
                  },
                  {
                    title: 'E-commerce Platform',
                    description: 'Full-featured online store with payment integration and inventory management.',
                    glow: 'from-cyan-500/20 to-blue-500/20'
                  },
                  {
                    title: 'Analytics Dashboard',
                    description: 'Real-time data visualization and business intelligence platform.',
                    glow: 'from-violet-500/20 to-purple-500/20'
                  },
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={cx(
                      "relative p-6 rounded-2xl border backdrop-blur-xl overflow-hidden",
                      "border-white/25 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                      "dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    )}
                  >
                    <div className={cx(
                      "absolute inset-0 bg-gradient-to-br opacity-50",
                      project.glow,
                      "dark:opacity-30"
                    )} />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-black/70 dark:text-white/70">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative scroll-mt-20 -mx-6 lg:-mx-8">
          {/* Glass background container - transparent to show theme background */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Transparent glass overlay - very subtle in both modes */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6 dark:from-[rgba(20,25,50,0.85)] dark:via-[rgba(30,25,70,0.7)] dark:to-[rgba(10,12,32,0.85)]" />

            {/* Content */}
            <div className="relative z-10 px-6 py-10 lg:px-8 lg:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-2xl text-center space-y-4"
              >
                {/* About Badge */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(99,102,241,0.3)",
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={cx(
                    "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer",
                    "border-indigo-500/35 bg-transparent text-indigo-700",
                    "dark:border-indigo-300/40 dark:bg-transparent dark:text-indigo-200",
                    "shadow-[0_0_20px_rgba(99,102,241,0.16)] dark:shadow-[0_0_24px_rgba(129,140,248,0.32)]",
                    "hover:border-indigo-500/60 dark:hover:border-indigo-200/70"
                  )}
                >
                  {/* Star Icon with Animation */}
                  <motion.svg
                    className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ rotate: 0 }}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.2, 1.2, 1.2, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                  
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/60 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400"></span>
                    </span>
                    <span className="group-hover:text-indigo-800 dark:group-hover:text-indigo-200 transition-colors duration-300">
                      About
                    </span>
                  </span>
                </motion.span>

                {/* Heading */}
                <motion.h2 
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cx(
                    "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                    "text-black dark:text-white",
                    "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
                  )}
                  style={{ letterSpacing: '-0.02em' }}
                >
                  About Glasscode Innovations
                </motion.h2>

                {/* Content */}
                <div className="space-y-3 text-sm text-black/70 dark:text-white/80 leading-relaxed sm:text-base max-w-xl mx-auto">
                  <p>
                    We are a next-generation software development company specializing in custom MERN web applications and AI automation systems.
                  </p>
                  <p>
                    Our mission is to help businesses operate smarter, faster, and more efficiently using modern web technology and intelligent AI workflows. We deliver excellence, transparency, innovation, and long-term partnerships.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 dark:border-white/10 dark:backdrop-blur-[16px] dark:bg-[rgba(18,18,18,0.3)] mt-16 pt-8 pb-6">
          <div className="max-w-7xl mx-auto px-6">
            {/* Waitlist CTA - Commented out Sign In */}
            {/* <div className="text-center mb-6 text-sm text-black/60 dark:text-[#9ca3af]">
          Already have an account?{' '}
              <Link href="/sign-in" className="font-semibold text-black dark:text-[#cbd5e1] underline underline-offset-2 hover:opacity-70 transition-opacity">
            Sign In
          </Link>
            </div> */}
            <div className="text-center mb-6">
              <Link href="/contactus">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cx(
                    "px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-full",
                    "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                    "dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:text-indigo-200",
                    "border-2 border-indigo-500/40 dark:border-indigo-400/50",
                    "shadow-[0_6px_20px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.2)]",
                    "dark:shadow-[0_8px_24px_rgba(99,102,241,0.5),0_0_35px_rgba(99,102,241,0.3)]",
                    "transform scale-105"
                  )}
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>

            {/* Footer Links and Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-black/60 dark:text-[#9ca3af]">
              <p className="text-black/60 dark:text-[#9ca3af]">
                Glasscode Innovations. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
);
}