'use client';

import { useEffect, useState } from 'react';
import Background3D from '@/components/effects/Background3D';
import Link from 'next/link';

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ');

export default function SignUpPage() {
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

  return (
    <main
      className={cx(
        'relative min-h-screen overflow-hidden transition-colors duration-300',
        'bg-white text-black',
        'dark:bg-[#121212] dark:text-[#cbd5e1]'
      )}
    >
      {/* 3D Background */}
      <Background3D isDark={isDark} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="mx-auto w-full max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold text-black dark:text-[#cbd5e1]">
            Sign Up
          </h1>
          <p className="text-black/70 dark:text-[#9ca3af]">
            Authentication is currently not available. Please join our waitlist to stay updated.
          </p>
          <Link
            href="/contactus"
            className={cx(
              "inline-block px-6 py-3 rounded-full font-semibold transition-all duration-300",
              "bg-indigo-500 hover:bg-indigo-600 text-white",
              "shadow-[0_6px_20px_rgba(99,102,241,0.3)]"
            )}
          >
            Contact Us
          </Link>
          <div className="pt-4">
            <Link
              href="/"
              className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

