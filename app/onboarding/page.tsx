'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Input } from '@/components/ui/input';
import Background3D from '@/components/effects/Background3D';
import Link from 'next/link';
import clsx from 'clsx';
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

export default function OnboardingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'ADVERTISER' | 'API_CLIENT'>('ADVERTISER');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDarkState] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkState(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Get suggested type from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type === 'API_CLIENT' || type === 'api-client') {
      setUserType('API_CLIENT');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userType,
          companyName,
          email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to complete onboarding');
      }

      // Redirect to contact page after successful submission
      router.push('/contactus?success=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

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
          transition={{ 
            duration: 0.8, 
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={cx(
            "fixed inset-x-0 top-0 z-40 transition-all duration-300",
            "bg-white/16 backdrop-blur-3xl",
            "dark:backdrop-blur-[28px]",
            "dark:bg-[rgba(12,17,33,0.58)]",
            "supports-[backdrop-filter]:bg-white/12 dark:supports-[backdrop-filter]:bg-[rgba(12,17,33,0.58)]"
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
                <span className="text-xs sm:text-sm font-bold tracking-tight text-black dark:text-[#cbd5e1]">
                  Glasscode Innovations
                </span>
              </motion.div>
            </Link>

            {/* Right: Theme Toggle */}
            <div className="flex items-center gap-2.5">
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
            className="w-full max-w-lg space-y-8"
          >
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-2"
            >
              <h1 className={cx(
                "text-4xl sm:text-5xl font-normal tracking-tight",
                "text-black dark:text-[#cbd5e1]",
                "drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
              )} style={{ letterSpacing: '-0.02em' }}>
                Welcome to Glasscode Innovations
              </h1>
              <p className={cx(
                "text-lg",
                "text-black/70 dark:text-[#9ca3af]"
              )}>
                Let&apos;s get your account set up
              </p>
            </motion.div>

            {/* Onboarding Form Card */}
            <GlassCard
              padding="clamp(2.25rem, 4vw, 3.25rem)"
              cornerRadius={32}
              blurAmount={0.022}
              displacementScale={78}
              shadowMode={false}
              className="w-full"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <label className={cx(
                    "block text-sm font-semibold mb-3",
                    "text-black/80 dark:text-[#cbd5e1]"
                  )}>
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setUserType('ADVERTISER')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cx(
                        "p-4 rounded-xl border-2 transition-all text-left",
                        "backdrop-blur-xl",
                        userType === 'ADVERTISER'
                          ? "border-white/60 bg-white/20 dark:border-white/40 dark:bg-[rgba(26,30,43,0.55)] shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
                          : "border-white/25 bg-white/10 dark:border-white/10 dark:bg-[rgba(22,26,38,0.45)] hover:border-white/45 hover:bg-white/16 dark:hover:border-white/30 dark:hover:bg-[rgba(28,34,50,0.52)]"
                      )}
                    >
                      <div className="text-2xl mb-2">📢</div>
                      <div className={cx(
                        "font-medium mb-1",
                        "text-black dark:text-[#cbd5e1]"
                      )}>
                        Advertiser
                      </div>
                      <p className={cx(
                        "text-sm leading-snug",
                        userType === 'ADVERTISER' 
                          ? "text-black/70 dark:text-[#9ca3af]"
                          : "text-black/60 dark:text-[#9ca3af]"
                      )}>
                        Launch campaigns and track performance.
                      </p>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setUserType('API_CLIENT')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cx(
                        "p-4 rounded-xl border-2 transition-all text-left",
                        "backdrop-blur-xl",
                        userType === 'API_CLIENT'
                          ? "border-white/60 bg-white/20 dark:border-white/40 dark:bg-[rgba(26,30,43,0.55)] shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
                          : "border-white/25 bg-white/10 dark:border-white/10 dark:bg-[rgba(22,26,38,0.45)] hover:border-white/45 hover:bg-white/16 dark:hover:border-white/30 dark:hover:bg-[rgba(28,34,50,0.52)]"
                      )}
                    >
                      <div className="text-2xl mb-2">💻</div>
                      <div className={cx(
                        "font-medium mb-1",
                        "text-black dark:text-[#cbd5e1]"
                      )}>
                        API Client
                      </div>
                      <p className={cx(
                        "text-sm leading-snug",
                        userType === 'API_CLIENT' 
                          ? "text-black/70 dark:text-[#9ca3af]"
                          : "text-black/60 dark:text-[#9ca3af]"
                      )}>
                        Monetize conversations with contextual ads.
                      </p>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Input
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cx(
                      "p-4 rounded-lg border text-sm",
                      "bg-red-50/50 dark:bg-red-900/20",
                      "border-red-200 dark:border-red-800/50",
                      "text-red-600 dark:text-red-400",
                      "backdrop-blur-sm"
                    )}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <GlassButton
                    type="submit"
                    className="w-full"
                    disabled={loading || !companyName || !email}
                    size="lg"
                  >
                    {loading ? 'Setting up...' : 'Complete Setup'}
                  </GlassButton>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

