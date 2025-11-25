'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ');

type ProjectType = 'website-for-business' | 'web-app' | 'ai-automation' | 'other' | '';

export function ContactUsFlow() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('');
  const [aboutProject, setAboutProject] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus input when step changes
  useEffect(() => {
    if (inputRef.current && (step === 1 || step === 2)) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (textareaRef.current && step === 4) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [step]);

  const validateName = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter your name');
      return false;
    }
    setError('');
    return true;
  };

  const validateEmail = (value: string): boolean => {
    const trimmed = value.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateName(name)) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateEmail(email)) {
        setStep(3);
      }
    } else if (step === 3) {
      if (projectType) {
        setStep(4);
      } else {
        setError('Please select a project type');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 4) {
      handleNext();
    }
  };

  const handleProjectTypeSelect = (type: ProjectType) => {
    setProjectType(type);
    setError('');
    setStep(4);
  };

  const handleSubmit = async () => {
    if (!aboutProject.trim()) {
      setError('Please tell us about your project');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          aboutProject: aboutProject.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStep(5); // Success screen
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const projectTypeLabels: Record<ProjectType, string> = {
    'website-for-business': 'Website for your business',
    'web-app': 'Web app',
    'ai-automation': 'AI Automation projects',
    'other': 'Other',
    '': '',
  };

  return (
    <div
      className={cx(
        "relative w-full rounded-3xl border backdrop-blur-2xl overflow-hidden",
        "border-white/25 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
        "dark:border-purple-400/15 dark:bg-purple-950/20 dark:shadow-[0_8px_40px_rgba(139,92,246,0.25),0_0_60px_rgba(99,102,241,0.15)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-purple-400/5" />
      
      <div className="relative p-8 sm:p-12 min-h-[500px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full text-center space-y-8"
            >
              <div className="space-y-12">
                <div className="relative flex flex-col items-center justify-center min-h-[120px]">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: name ? 0 : 1,
                      y: name ? -20 : 0,
                      scale: name ? 0.95 : 1
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-0 pointer-events-none"
                  >
                    <span className={cx(
                      "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight",
                      "text-black/70 dark:text-white/70"
                    )}
                    style={{ 
                      letterSpacing: '-0.03em',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    }}>
                      Hi, what is your name?
                    </span>
                  </motion.div>

                  <div className="relative inline-flex flex-col items-center mt-8">
                    <input
                      ref={inputRef}
                      id="name-input"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      onKeyPress={handleKeyPress}
                      className={cx(
                        "bg-transparent pb-3 text-3xl sm:text-4xl lg:text-5xl text-center",
                        "text-black dark:text-white",
                        "focus:outline-none transition-all duration-300",
                        "font-light tracking-tight",
                        "min-w-[20px] max-w-full"
                      )}
                      placeholder=""
                      aria-label="Your name"
                      style={{ 
                        letterSpacing: '-0.03em',
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        width: name ? `${Math.max(name.length * 0.6, 1)}em` : '1em',
                        caretColor: '#6366f1'
                      }}
                    />
                    <motion.div
                      className={cx(
                        "h-0.5 rounded-full",
                        "bg-black/20 dark:bg-purple-400/40"
                      )}
                      animate={{
                        width: name ? `${Math.max(name.length * 0.6, 1)}em` : '3em',
                        backgroundColor: name 
                          ? 'rgba(99, 102, 241, 0.6)' 
                          : 'rgba(0, 0, 0, 0.2)'
                      }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={cx(
                  "px-8 py-3 rounded-full text-base font-medium tracking-tight transition-all duration-300",
                  "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                  "dark:bg-purple-600/25 dark:hover:bg-purple-500/35 dark:text-white",
                  "border-2 border-indigo-500/40 dark:border-purple-400/40",
                  "shadow-[0_6px_20px_rgba(99,102,241,0.3)]",
                  "dark:shadow-[0_6px_20px_rgba(139,92,246,0.4)]"
                )}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full text-center space-y-8"
            >
              <div className="space-y-12">
                <div className="relative flex flex-col items-center justify-center min-h-[120px]">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: email ? 0 : 1,
                      y: email ? -20 : 0,
                      scale: email ? 0.95 : 1
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-0 pointer-events-none"
                  >
                    <span className={cx(
                      "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight",
                      "text-black/70 dark:text-white/70"
                    )}
                    style={{ 
                      letterSpacing: '-0.03em',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    }}>
                      What&rsquo;s your email?
                    </span>
                  </motion.div>

                  <div className="relative inline-flex flex-col items-center mt-8">
                    <input
                      ref={inputRef}
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      onKeyPress={handleKeyPress}
                      className={cx(
                        "bg-transparent pb-3 text-3xl sm:text-4xl lg:text-5xl text-center",
                        "text-black dark:text-white",
                        "focus:outline-none transition-all duration-300",
                        "font-light tracking-tight",
                        "min-w-[20px] max-w-full"
                      )}
                      placeholder=""
                      aria-label="Your email address"
                      style={{ 
                        letterSpacing: '-0.03em',
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        width: email ? `${Math.max(email.length * 0.55, 1)}em` : '1em',
                        caretColor: '#6366f1'
                      }}
                    />
                    <motion.div
                      className={cx(
                        "h-0.5 rounded-full",
                        "bg-black/20 dark:bg-purple-400/40"
                      )}
                      animate={{
                        width: email ? `${Math.max(email.length * 0.55, 1)}em` : '4em',
                        backgroundColor: email 
                          ? 'rgba(99, 102, 241, 0.6)' 
                          : 'rgba(0, 0, 0, 0.2)'
                      }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={cx(
                  "px-8 py-3 rounded-full text-base font-medium tracking-tight transition-all duration-300",
                  "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                  "dark:bg-purple-600/25 dark:hover:bg-purple-500/35 dark:text-white",
                  "border-2 border-indigo-500/40 dark:border-purple-400/40",
                  "shadow-[0_6px_20px_rgba(99,102,241,0.3)]",
                  "dark:shadow-[0_6px_20px_rgba(139,92,246,0.4)]"
                )}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {/* Step 3: Project Type */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full text-center space-y-8"
            >
              <div className="space-y-6">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black dark:text-white"
                  style={{ 
                    letterSpacing: '-0.03em',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  }}
                >
                  What would you like to build?
                </h2>
                <div className="flex flex-col gap-4 max-w-md mx-auto">
                  {(['website-for-business', 'web-app', 'ai-automation', 'other'] as ProjectType[]).map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProjectTypeSelect(type)}
                      className={cx(
                        "px-6 py-4 rounded-2xl text-left transition-all duration-300",
                        "bg-white/70 hover:bg-white/90 border-2 border-black/10",
                        "dark:bg-purple-900/25 dark:hover:bg-purple-800/35 dark:border-purple-300/40",
                        "shadow-[0_4px_16px_rgba(0,0,0,0.06)]",
                        "dark:shadow-[0_4px_16px_rgba(139,92,246,0.3)]"
                      )}
                    >
                      <div 
                        className="text-lg font-medium text-black dark:text-white"
                        style={{ 
                          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        }}
                      >
                        {projectTypeLabels[type]}
                      </div>
                    </motion.button>
                  ))}
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: About Project */}
          {step === 4 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full text-center space-y-8"
            >
              <div className="space-y-6">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black dark:text-white"
                  style={{ 
                    letterSpacing: '-0.03em',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  }}
                >
                  Tell us about your project
                </h2>
                <div className="max-w-md mx-auto">
                  <textarea
                    ref={textareaRef}
                    value={aboutProject}
                    onChange={(e) => {
                      setAboutProject(e.target.value);
                      setError('');
                    }}
                    className={cx(
                      "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300",
                      "bg-white/70 dark:bg-purple-900/25",
                      "border-black/10 dark:border-purple-300/40",
                      "text-black dark:text-white",
                      "focus:outline-none focus:border-indigo-500 dark:focus:border-purple-400",
                      "resize-none min-h-[120px]",
                      "font-light"
                    )}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    aria-label="About your project"
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={cx(
                    "px-8 py-3 rounded-full text-base font-medium tracking-tight transition-all duration-300",
                    "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                    "dark:bg-purple-600/25 dark:hover:bg-purple-500/35 dark:text-white",
                    "border-2 border-indigo-500/40 dark:border-purple-400/40",
                    "shadow-[0_6px_20px_rgba(99,102,241,0.3)]",
                    "dark:shadow-[0_6px_20px_rgba(139,92,246,0.4)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block text-6xl mb-4"
              >
                ✨
              </motion.div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black dark:text-white"
                style={{ 
                  letterSpacing: '-0.03em',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                }}
              >
                Thanks, we&rsquo;ll talk to you soon!
              </h2>
              <p 
                className="text-lg text-black/70 dark:text-white/80"
                style={{ 
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                }}
              >
                We&rsquo;ll reach out to <span className="font-semibold dark:text-white">{email}</span> within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className={cx(
                  "px-8 py-3 rounded-full text-base font-medium tracking-tight transition-all duration-300",
                  "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                  "dark:bg-purple-600/25 dark:hover:bg-purple-500/35 dark:text-white",
                  "border-2 border-indigo-500/40 dark:border-purple-400/40",
                  "shadow-[0_6px_20px_rgba(99,102,241,0.3)]",
                  "dark:shadow-[0_6px_20px_rgba(139,92,246,0.4)]"
                )}
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
