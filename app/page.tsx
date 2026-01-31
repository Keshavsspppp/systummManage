"use client"

import Link from "next/link"
import { useEffect, useRef, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Package, ArrowRight, Sparkles, CheckCircle2, TrendingUp, Award, Shield, Zap } from "lucide-react"
import CustomCursor from "@/components/effects/CustomCursor"
import MagneticButton from "@/components/effects/MagneticButton"
import TiltCard from "@/components/effects/TiltCard"
import ScrollReveal from "@/components/effects/ScrollReveal"
import GlowButton from "@/components/effects/GlowButton"
import ParallaxSection from "@/components/effects/ParallaxSection"
import { motion } from "framer-motion"
import { gsap } from "gsap"

const HeroScene = lazy(() => import("@/components/3d/HeroScene"))

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const badgeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    // Animate hero elements
    const tl = gsap.timeline({ delay: 0.3 })
    
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      )
    }

    if (trustRef.current) {
      tl.fromTo(
        trustRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Campus Hub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-bold text-xl">CH</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Campus Hub
              </span>
            </motion.div>
            <div className="flex items-center gap-3">
              <MagneticButton>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 border-0">
                    Sign In
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/signup">
                  <GlowButton>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </GlowButton>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />}>
          <HeroScene />
        </Suspense>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full filter blur-[120px] animate-pulse animation-delay-2000" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 px-6">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Complete Campus Management Solution
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold tracking-tight"
            >
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Manage Your
              </span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Campus Life
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Say goodbye to scattered Google Forms, Excel sheets, and WhatsApp chaos. 
              <span className="text-purple-400 font-semibold"> Streamline everything </span> 
              with one powerful platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <MagneticButton>
                <Link href="/signup">
                  <GlowButton className="text-lg px-10 py-6">
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/events">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-6 rounded-xl border-2 border-white/20 hover:border-white/40 backdrop-blur-sm text-lg font-semibold hover:bg-white/5 transition-all"
                  >
                    <Calendar className="inline mr-2 h-5 w-5" />
                    View Events
                  </motion.button>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center justify-center gap-8 pt-12 text-sm text-gray-400"
            >
              {[
                { icon: CheckCircle2, text: "No credit card" },
                { icon: CheckCircle2, text: "5000+ users" },
                { icon: CheckCircle2, text: "Free forever" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-5 w-5 text-green-400" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <ParallaxSection speed={-0.2}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </ParallaxSection>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Trusted by Thousands
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, number: "150+", label: "Events Hosted", color: "from-blue-400 to-cyan-400", shadow: "shadow-blue-500/50" },
              { icon: Users, number: "50+", label: "Active Clubs", color: "from-purple-400 to-indigo-400", shadow: "shadow-purple-500/50" },
              { icon: Package, number: "100+", label: "Resources", color: "from-pink-400 to-rose-400", shadow: "shadow-pink-500/50" },
              { icon: TrendingUp, number: "5000+", label: "Active Students", color: "from-orange-400 to-red-400", shadow: "shadow-orange-500/50" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg ${stat.shadow}`}
                    >
                      <stat.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <p className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </p>
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Everything You Need
                </span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Powerful tools designed specifically for campus management
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Event Management",
                description: "Create, approve, and manage campus events with built-in workflows, registrations, and analytics",
                gradient: "from-blue-500 to-cyan-500",
                shadow: "shadow-blue-500/50"
              },
              {
                icon: Users,
                title: "Club Operations",
                description: "Manage memberships, activities, meetings, and communications all in one centralized platform",
                gradient: "from-purple-500 to-indigo-500",
                shadow: "shadow-purple-500/50"
              },
              {
                icon: Package,
                title: "Resource Booking",
                description: "Book auditoriums, labs, and equipment with automated approval workflows and scheduling",
                gradient: "from-pink-500 to-rose-500",
                shadow: "shadow-pink-500/50"
              }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction="up">
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="h-full p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ${feature.shadow} mb-6`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full filter blur-[150px]" />
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Why Campus Hub?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Built specifically for modern campuses, Campus Hub eliminates chaos and brings everything together.
                </p>
                
                <div className="space-y-6 pt-4">
                  {[
                    { icon: Shield, title: "Secure & Reliable", desc: "Role-based access control and data encryption keep your campus data safe", color: "purple" },
                    { icon: Zap, title: "Lightning Fast", desc: "Instant updates, real-time notifications, and blazing-fast performance", color: "blue" },
                    { icon: Award, title: "Award-Winning UX", desc: "Intuitive design that students and administrators love to use", color: "pink" }
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`shrink-0 h-14 w-14 rounded-xl bg-${benefit.color}-500/10 backdrop-blur-sm border border-${benefit.color}-500/20 flex items-center justify-center`}
                      >
                        <benefit.icon className={`h-7 w-7 text-${benefit.color}-400`} />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-white group-hover:text-purple-400 transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <TiltCard>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
                  <Card className="relative border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-b border-white/10">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500" />
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                        <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          🎯 Demo Credentials
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {[
                        { role: "👨‍💼 Admin Access", email: "admin@campus.edu", pass: "admin123", gradient: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20" },
                        { role: "👔 Organizer Access", email: "organizer@campus.edu", pass: "org123", gradient: "from-purple-500/10 to-indigo-500/10", border: "border-purple-500/20" },
                        { role: "🎓 Student Access", email: "student@campus.edu", pass: "student123", gradient: "from-pink-500/10 to-rose-500/10", border: "border-pink-500/20" }
                      ].map((cred, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className={`p-4 bg-gradient-to-br ${cred.gradient} backdrop-blur-sm rounded-xl border ${cred.border} cursor-pointer`}
                        >
                          <p className="font-semibold text-white mb-2">{cred.role}</p>
                          <p className="text-sm text-gray-300 font-mono">{cred.email}</p>
                          <p className="text-sm text-gray-300 font-mono">{cred.pass}</p>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <ParallaxSection speed={0.3}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
        </ParallaxSection>

        <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
          <ScrollReveal direction="up">
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Ready to Transform Your Campus?
            </motion.h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-2xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Join thousands of students and administrators already using Campus Hub
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-white text-purple-600 hover:bg-gray-100 rounded-xl text-lg font-bold shadow-2xl"
                  >
                    Get Started Free
                    <ArrowRight className="inline ml-2 h-5 w-5" />
                  </motion.button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 border-2 border-white text-white hover:bg-white/10 rounded-xl text-lg font-bold backdrop-blur-sm"
                  >
                    Sign In
                  </motion.button>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Campus Hub
              </span>
            </motion.div>
            <p className="text-sm text-gray-500">
              © 2026 Campus Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
