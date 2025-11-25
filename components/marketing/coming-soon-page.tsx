'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Background3D from '@/components/effects/Background3D';
import EnergyWave from '@/components/effects/EnergyWave';
import { GlassCard } from '@/components/ui/glass-card';
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
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <MoonIcon className="h-4 w-4" />
      </motion.span>
      <motion.span
        className="absolute"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <SunIcon className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}

/* ====================== Coming Soon Page Component ====================== */
interface ComingSoonPageProps {
  pageTitle?: string;
}

export function ComingSoonPage({ pageTitle = 'Sign Up' }: ComingSoonPageProps) {
  const [isDark, setIsDarkState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkState(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Detect scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGradientAnimation
        containerClassName={cx(
          "absolute inset-0 -z-20",
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
            <Link href="/">
              <motion.div 
                className="flex items-center gap-2 sm:gap-2.5 min-w-[100px] sm:min-w-[140px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            </Link>

            {/* Right: Theme Toggle */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                className={cx(
                  "px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full inline-block",
                  "text-black/70 hover:text-black/85",
                  "dark:text-white/90 dark:hover:text-white"
                )}
              >
                Home
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative w-full max-w-2xl"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
              <EnergyWave isDark={isDark} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[36px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-slate-100/50 to-sky-50/45 dark:from-[rgba(10,14,30,0.85)] dark:via-[rgba(20,24,48,0.82)] dark:to-[rgba(9,12,28,0.9)]" />
              <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.35),rgba(12,16,36,0)_70%)] blur-[160px]" />
            </div>
            <GlassCard
              padding="clamp(2.75rem, 5vw, 3.5rem)"
              cornerRadius={36}
              blurAmount={0.0}
              displacementScale={0}
              shadowMode={false}
              className="relative w-full border-white/20 bg-white/75 dark:border-white/12 dark:bg-[rgba(12,16,36,0.82)] dark:shadow-[0_24px_65px_rgba(6,8,20,0.7)]"
            >
              <div className="pointer-events-none absolute inset-0 hidden dark:block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.28),rgba(8,10,26,0)_72%)] blur-[140px]" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(129,140,248,0.18) 0%,rgba(76,29,149,0.14) 45%,rgba(12,18,34,0.95) 100%)] mix-blend-screen opacity-90" />
              </div>
              <div className="relative z-10 text-center space-y-6">
                {/* Construction Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={cx(
                      "w-20 h-20 rounded-full flex items-center justify-center text-4xl",
                      "bg-indigo-500/10 dark:bg-indigo-500/25",
                      "border border-indigo-500/20 dark:border-indigo-300/35",
                      "transition-all duration-300"
                    )}
                  >
                    🚧
                  </motion.div>
                </motion.div>

                {/* Text Content Card */}
                <div className={cx(
                  "mt-6 p-6 sm:p-8 rounded-2xl border backdrop-blur-xl",
                  "border-white/25 bg-white/70",
                  "dark:border-white/12 dark:bg-[rgba(18,22,44,0.6)]",
                  "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                  "dark:shadow-[0_16px_45px_rgba(6,8,20,0.55)]"
                )}>
                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className={cx(
                      "text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight",
                      "text-slate-900 dark:text-white",
                      "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_22px_rgba(129,140,248,0.35)]"
                    )}
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    We&rsquo;re Working on It!
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className={cx(
                      "text-lg sm:text-xl mt-4",
                      "text-slate-700 dark:text-white",
                      "font-normal"
                    )}
                  >
                    This page is currently under development. Our team is working hard to bring you this feature soon.
                  </motion.p>

                  {/* Body Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="space-y-3 pt-6"
                  >
                    <p className={cx(
                      "text-base",
                      "text-slate-600 dark:text-white",
                      "leading-relaxed"
                    )}>
                      We&rsquo;re making improvements to serve you better.
                    </p>
                    <p className={cx(
                      "text-base",
                      "text-slate-600 dark:text-white",
                      "leading-relaxed"
                    )}>
                      Please check back later for updates — exciting features are on the way!
                    </p>
                  </motion.div>

                  {/* Footer Line */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      delay: 0.9,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="pt-6 border-t border-black/10 dark:border-white/10"
                  >
                    <p className={cx(
                      "text-sm",
                      "text-slate-500 dark:text-white",
                      "italic"
                    )}>
                      Thank you for your patience and support.
                    </p>
                  </motion.div>

                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="pt-6"
                  >
                    <Link href="/">
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 8px 24px rgba(99,102,241,0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className={cx(
                          "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                          "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700",
                        "dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:text-white",
                        "border border-indigo-500/20 dark:border-indigo-300/35",
                        "shadow-[0_4px_16px_rgba(99,102,241,0.15)] dark:shadow-[0_6px_24px_rgba(64,69,155,0.4)]",
                          "backdrop-blur-sm"
                        )}
                      >
                        Back to Home
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

