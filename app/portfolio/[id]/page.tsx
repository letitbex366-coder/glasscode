'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Background3D from '@/components/effects/Background3D';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import Image from 'next/image';

const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(' ');

const projects = {
  wynngrid: {
    id: 'wynngrid',
    name: 'Wynngrid',
    tagline: 'Connecting homeowners with verified architects and designers',
    category: 'Marketplace Platform',
    techStack: ['React', 'Node.js', 'REST API', 'MongoDB', 'Express'],
    image: '/images/wyn.png',
    image2: '/images/wynn1.png',
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
      'Responsive frontend design',
      'Professional verification system',
      'Location-based matching'
    ],
    problem: 'Homeowners struggled to find qualified professionals for their renovation projects, while architects and designers lacked visibility. The traditional process involved days of searching, multiple phone calls, and uncertainty about professional credentials.',
    solutionDetails: 'I built a comprehensive marketplace platform with dual user flows—one for homeowners seeking professionals and another for professionals managing their profiles. The platform features intelligent matching algorithms that consider location, budget, project type, and professional expertise. Real-time data synchronization ensures users always see up-to-date availability and pricing.',
    results: [
      'Reduced average connection time from days to minutes',
      '40% increase in user engagement',
      'Improved professional visibility and lead generation',
      'Streamlined onboarding process for both user types'
    ]
  },
  sensai: {
    id: 'sensai',
    name: 'Sensai',
    tagline: 'AI-powered career coaching platform',
    category: 'AI SaaS Platform',
    techStack: ['React 19', 'Next.js 15', 'Tailwind CSS', 'Prisma', 'Gemini API', 'Clerk', 'NeonDB', 'Inngest'],
    image: '/images/AI 2.png',
    image2: '/images/AI carrer coach.png',
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
      'Background tasks with Inngest',
      '50+ industries coverage',
      '1000+ interview questions database'
    ],
    problem: 'Job seekers struggle with creating ATS-optimized resumes and preparing for interviews. Traditional career coaching is expensive and not scalable. Professionals need personalized guidance that adapts to their industry and role.',
    solutionDetails: 'I developed a comprehensive AI-powered platform using React 19 and Next.js 15, integrated with Google\'s Gemini API for intelligent content generation. The platform uses Prisma with NeonDB for efficient data management and Clerk for secure authentication. Background tasks are handled by Inngest for scoring and analytics. The frontend is built with ShadCN UI components for a polished, responsive experience.',
    results: [
      '95% success rate in ATS optimization',
      '50+ industries covered with tailored content',
      '1000+ interview questions database',
      '24/7 AI-powered support',
      'Significant improvement in interview performance'
    ]
  },
  lms: {
    id: 'lms',
    name: 'LMS',
    tagline: 'Secure litigation management for government departments',
    category: 'Enterprise System',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vite', 'Redux Toolkit', 'SMTP'],
    image: '/images/LMS.png',
    image2: '/images/lms2.png',
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
      'Ticket generation system',
      'Multi-level department hierarchy',
      'Real-time case status tracking'
    ],
    problem: 'Government legal departments were using manual or email-based case tracking, leading to lost documents, lack of accountability, and compliance issues. There was no centralized system to track case progress, assign responsibilities, or maintain audit trails.',
    solutionDetails: 'I architected a highly secure enterprise system with multiple layers of security. The authentication system uses JWT access tokens (short-lived) and refresh tokens (long-lived) with rotation to prevent replay attacks. The RBAC system provides granular permissions for different roles (Super Admin, Department Admin, Officers, Operators, Lawyers). Every action is logged in a comprehensive audit trail. The admin dashboard provides real-time metrics, user management, and system-wide visibility. The system is built with production-ready security practices including HTTPS, rate limiting, and secure cookie handling.',
    results: [
      '100% audit trail for all case actions',
      'Reduced case tracking errors by 90%',
      'Improved compliance with regulatory requirements',
      'Streamlined case assignment workflows',
      'Enhanced security with multi-layer authentication'
    ]
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;
  const project = projects[projectId as keyof typeof projects];
  const [isScrolled, setIsScrolled] = useState(false);

  // Force light mode on portfolio case study pages
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('color-scheme', 'light');
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-indigo-600 hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

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
        <Background3D isDark={false} />
        <div className="dot-mask hidden lg:block -z-10" aria-hidden />

        {/* Header */}
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
              <Link href="/contactus">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cx(
                    "px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full",
                    "text-black/70 hover:text-black/90"
                  )}
                >
                  Contact
                </motion.button>
              </Link>
            </nav>
          </div>
        </motion.header>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 pb-20 pt-28 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/portfolio"
              className={cx(
                "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                "text-black/70 hover:text-black"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Hero Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <div className="relative z-10 px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Project Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <span className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium",
                    "border-indigo-500/35 bg-transparent text-indigo-700"
                  )}>
                    {project.category}
                  </span>
                  
                  <h1 className={cx(
                    "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight",
                    "text-black"
                  )} style={{ letterSpacing: '-0.02em' }}>
                    {project.name}
                  </h1>
                  
                  <p className={cx(
                    "text-lg leading-relaxed",
                    "text-black/70"
                  )}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={cx(
                          "px-3 py-1.5 rounded-lg text-sm font-medium",
                          "bg-indigo-500/10 text-indigo-700",
                          "border border-indigo-500/20"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cx(
                          "px-6 py-3 rounded-full text-sm font-semibold transition-all",
                          "bg-indigo-600 text-white hover:bg-indigo-700",
                          "shadow-lg shadow-indigo-500/50"
                        )}
                      >
                        View Live Demo →
                      </motion.a>
                    )}
                    <motion.a
                      href="/contactus"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cx(
                        "px-6 py-3 rounded-full text-sm font-semibold transition-all",
                        "bg-white/20 backdrop-blur-sm text-indigo-700 hover:bg-white/30",
                        "border border-indigo-500/30"
                      )}
                    >
                      Start Your Project
                    </motion.a>
                  </div>
                </motion.div>

                {/* Right: Project Images */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className={cx(
                    "relative rounded-2xl overflow-hidden border aspect-video",
                    "border-white/20 bg-white/10 backdrop-blur-sm"
                  )}>
                    <Image
                      src={project.image}
                      alt={`${project.name} - Main View`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {project.image2 && (
                    <div className={cx(
                      "relative rounded-2xl overflow-hidden border aspect-video",
                      "border-white/20 bg-white/10 backdrop-blur-sm"
                    )}>
                      <Image
                        src={project.image2}
                        alt={`${project.name} - Secondary View`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 px-6 lg:px-8 py-12"
            >
              <h2 className={cx(
                "text-3xl sm:text-4xl font-semibold mb-6",
                "text-black"
              )}>
                The Problem
              </h2>
              <p className={cx(
                "text-lg leading-relaxed max-w-3xl",
                "text-black/70"
              )}>
                {project.problem}
              </p>
            </motion.div>
          </section>

          {/* Our Solution Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 px-6 lg:px-8 py-12"
            >
              <h2 className={cx(
                "text-3xl sm:text-4xl font-semibold mb-6",
                "text-black"
              )}>
                Our Solution
              </h2>
              <p className={cx(
                "text-lg leading-relaxed max-w-3xl mb-8",
                "text-black/70"
              )}>
                {project.solutionDetails}
              </p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cx(
                      "flex items-start gap-3 p-4 rounded-xl",
                      "bg-white/20 backdrop-blur-sm border border-white/20"
                    )}
                  >
                    <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={cx(
                      "text-sm",
                      "text-black/80"
                    )}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Results Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 px-6 lg:px-8 py-12"
            >
              <h2 className={cx(
                "text-3xl sm:text-4xl font-semibold mb-8",
                "text-black"
              )}>
                Results & Impact
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cx(
                      "p-6 rounded-xl",
                      "bg-white/20 backdrop-blur-sm border border-white/20"
                    )}
                  >
                    <p className={cx(
                      "text-base leading-relaxed",
                      "text-black/80"
                    )}>
                      {result}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="relative -mx-6 lg:-mx-8">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className={cx(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-white/12 via-slate-100/8 to-white/6"
              )} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 px-6 lg:px-8 py-12 text-center"
            >
              <h2 className={cx(
                "text-3xl sm:text-4xl font-semibold mb-4",
                "text-black"
              )}>
                Ready to Build Your Project?
              </h2>
              <p className={cx(
                "text-lg mb-8 max-w-2xl mx-auto",
                "text-black/70"
              )}>
                Let's discuss how we can bring your vision to life with modern technology and expert development.
              </p>
              <motion.a
                href="/contactus"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cx(
                  "inline-block px-8 py-4 rounded-full text-base font-semibold transition-all",
                  "bg-indigo-600 text-white hover:bg-indigo-700",
                  "shadow-lg shadow-indigo-500/50"
                )}
              >
                Get Started Today →
              </motion.a>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

