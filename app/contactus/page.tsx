'use client';

// ============================================================
// CONTACT US PAGE - PUBLIC PAGE (NO LOGIN REQUIRED)
// 
// This page is accessible to everyone without authentication.
// Users can fill out the Contact Us form and submit directly
// to Google Sheets without needing to log in.
// 
// All login logic has been commented out and disabled.
// ============================================================

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Background3D from '@/components/effects/Background3D';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { ContactUsFlow } from '@/components/marketing/contactus-flow';

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

export default function ContactUsPage() {
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
          "absolute inset-0 -z-30",
          "[--gradient-background-start:rgba(238,242,255,1)]",
          "[--gradient-background-end:rgba(199,210,254,1)]",
          isDark && "[--gradient-background-start:rgba(60,70,100,1)] [--gradient-background-end:rgba(100,80,150,1)]"
        )}
        className="hidden"
        firstColor={isDark ? "180, 190, 255" : "59, 130, 246"}
        secondColor={isDark ? "180, 120, 230" : "99, 102, 241"}
        thirdColor={isDark ? "140, 200, 250" : "125, 211, 252"}
        fourthColor={isDark ? "120, 130, 160" : "180, 190, 255"}
        fifthColor={isDark ? "170, 140, 255" : "248, 250, 252"}
        pointerColor={isDark ? "190, 200, 255" : "59, 130, 246"}
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

            {/* Right: Home + Theme Toggle */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                className={cx(
                  "px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full inline-block",
                  "text-black/70 hover:text-black/85",
                  "dark:text-[#cbd5e1] dark:hover:text-white"
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
            className="w-full max-w-2xl"
          >
            <ContactUsFlow />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-black/10 dark:border-white/10 dark:backdrop-blur-[16px] dark:bg-[rgba(18,18,18,0.3)] mt-16 pt-8 pb-6">
          <div className="max-w-7xl mx-auto px-6">
            {/* Footer Links and Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-black/60 dark:text-[#9ca3af]">
              <p className="text-black/60 dark:text-[#9ca3af]">
                Glasscode Innovations. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

