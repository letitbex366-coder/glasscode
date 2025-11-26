'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Background3D from '@/components/effects/Background3D';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import Image from 'next/image';

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ');

const projects = [
  {
    id: 'wynngrid',
    name: 'Wynngrid',
    tagline: 'Connecting homeowners with verified architects and designers',
    category: 'Marketplace Platform',
    techStack: ['React', 'Node.js', 'REST API', 'MongoDB'],
    image: '/images/wyn.png',
    image2: '/images/wynn1.png',
    image3: '/images/wynn2.png',
    liveUrl: 'https://wynngrid.netlify.app/',
    description: 'A platform that connects homeowners with verified architects and interior designers, making home renovation and construction simpler and more efficient.',
    challenge: 'Ensuring users quickly find relevant professionals based on their needs, budget, and location.',
    solution: 'Optimized backend logic and implemented intuitive filters, reducing average connection time from days to minutes.',
    impact: 'Boosted professional visibility and improved user engagement by over 40%, creating real value for both sides of the marketplace.',
    features: [
      'User onboarding for homeowners and professionals',
      'Seamless UI for both user types',
      'Real-time data flow with REST APIs',
      'Intuitive filtering and search',
      'Responsive frontend design'
    ]
  },
  {
    id: 'sensai',
    name: 'Sensai',
    tagline: 'AI-powered career coaching platform',
    category: 'AI SaaS Platform',
    techStack: ['React 19', 'Next.js 15', 'Tailwind CSS', 'Prisma', 'Gemini API', 'Clerk', 'NeonDB'],
    image: '/images/AI carrer coach.png',
    image2: '/images/AI 2.png',
    liveUrl: 'https://ai-career-coach-lake.vercel.app/',
    description: 'A full-stack AI-powered career coaching platform that helps users generate ATS-friendly resumes, personalized cover letters, and offers role-specific mock interviews with instant feedback.',
    challenge: 'Integrating advanced AI into real-world applications while maintaining user-friendly experience and scalability.',
    solution: 'Built a complete career solution using modern stack with AI integration, secure authentication, and scalable architecture deployed on Vercel.',
    impact: 'Provides intelligent career guidance across 50+ industries with real-time insights and performance tracking.',
    features: [
      'ATS-friendly resume generation',
      'Personalized cover letter creation',
      'Role-specific mock interviews',
      'Real-time industry insights',
      'Performance tracking and analytics',
      'Secure authentication with Clerk',
      'Background tasks with Inngest'
    ]
  },
  {
    id: 'lms',
    name: 'LMS',
    tagline: 'Secure litigation management for government departments',
    category: 'Enterprise System',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vite', 'Redux Toolkit'],
    image: '/images/lms2.png',
    image2: '/images/LMS.png',
    liveUrl: null,
    description: 'A highly secure, role-based web application designed to manage case intake, assignment, tracking, and audit for government/legal departments.',
    challenge: 'Replacing manual case tracking with a centralized, auditable system while ensuring strict security and role-based access control.',
    solution: 'Built a production-ready system with JWT authentication, refresh token rotation, granular RBAC, comprehensive audit logging, and admin dashboard for system-wide visibility.',
    impact: 'Centralized case management with complete audit trails, reducing manual tracking errors and improving compliance.',
    features: [
      'JWT + Refresh token authentication',
      'Role-based access control (RBAC)',
      'Case assignment workflows',
      'Comprehensive audit logging',
      'Admin dashboard with metrics',
      'User management system',
      'Secure email notifications',
      'Ticket generation system'
    ]
  }
];

export default function PortfolioPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Force light mode on portfolio page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('color-scheme', 'light');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGradientAnimation
        containerClassName={cx(
          "absolute inset-0 -z-30",
          "[--gradient-background-start:rgba(238,242,255,1)]",
          "[--gradient-background-end:rgba(199,210,254,1)]"
        )}
        className="hidden"
        firstColor="59, 130, 246"
        secondColor="99, 102, 241"
        thirdColor="125, 211, 252"
        fourthColor="180, 190, 255"
        fifthColor="248, 250, 252"
        pointerColor="59, 130, 246"
        blendingValue="screen"
      />

      <main
        className={cx(
          'relative z-10 min-h-screen overflow-hidden transition-colors duration-300',
          'text-black'
        )}
      >
        {/* 3D Background */}
        <Background3D isDark={false} />

        {/* Dotted overlay accents */}
        <div className="dot-mask hidden lg:block -z-10" aria-hidden />

        {/* Glassmorphic Fixed Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cx(
            "fixed inset-x-0 top-0 z-40 transition-all duration-300",
            isScrolled ? "bg-white/85 backdrop-blur-3xl shadow-sm" : "bg-white/18 backdrop-blur-3xl",
            isScrolled 
              ? "supports-[backdrop-filter]:bg-white/80"
              : "supports-[backdrop-filter]:bg-white/12"
          )}
        >
          <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
            {/* Left: Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center gap-2 sm:gap-2.5 min-w-[100px] sm:min-w-[140px]"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg overflow-hidden bg-white shadow-md">
                  <Image 
                    src="/images/logo.png" 
                    alt="Glasscode Innovations Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-black">
                  Glasscode Innovations
                </span>
              </motion.div>
            </Link>

            {/* Center: Navigation */}
            <nav className={cx(
              "hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-300",
              "border-white/25 bg-white/12 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
            )}>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cx(
                    "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                    "text-black/70 hover:text-black/90"
                  )}
                >
                  Home
                </motion.button>
              </Link>
              <Link href="/#what-we-build">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cx(
                    "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                    "text-black/70 hover:text-black/90"
                  )}
                >
                  Our Services
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cx(
                    "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                    "text-black/70 hover:text-black/90"
                  )}
                >
                  Portfolio
                </motion.button>
              </Link>
              <Link href="/#about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cx(
                    "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                    "text-black/70 hover:text-black/90"
                  )}
                >
                  About
                </motion.button>
              </Link>
            </nav>

            {/* Right: Contact */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-[80px] sm:min-w-[140px] justify-end">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
                <Link
                  href="/contactus"
                  className={cx(
                    "px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-full inline-block",
                    "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-700",
                    "border-2 border-indigo-500/40",
                    "shadow-[0_6px_20px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.2)]",
                    "transform scale-105"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-28 lg:px-8">
          {/* Hero Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 text-center py-12 px-6 lg:px-8"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300",
                  "border-indigo-500/35 bg-transparent text-indigo-700"
                )}
              >
                🔥 Our Work
              </motion.span>
              
              <h1 className={cx(
                "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                "text-black"
              )} style={{ letterSpacing: '-0.02em' }}>
                Real Projects. Real Solutions. Real Impact.
              </h1>
              
              <p className={cx(
                "text-base sm:text-lg max-w-2xl leading-relaxed",
                "text-black/70"
              )}>
                Explore our portfolio of successful projects that showcase our expertise in MERN stack development, AI automation, and enterprise solutions.
              </p>
            </motion.div>
          </section>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/portfolio/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={cx(
                    "group relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 cursor-pointer",
                    "border-white/15 bg-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
                    "hover:bg-white/30",
                    "hover:border-white/25"
                  )}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={cx(
                        "inline-block px-3 py-1 rounded-full text-xs font-medium",
                        "bg-white/20 backdrop-blur-sm text-white",
                        "border border-white/30"
                      )}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-black">
                        {project.name}
                      </h3>
                      <p className="text-sm text-black/70">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={cx(
                            "px-2.5 py-1 rounded-lg text-xs font-medium",
                            "bg-indigo-500/10 text-indigo-700",
                            "border border-indigo-500/20"
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className={cx(
                          "px-2.5 py-1 rounded-lg text-xs font-medium",
                          "text-black/60"
                        )}>
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Case Study Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:gap-3 transition-all">
                      <span>View Case Study</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

