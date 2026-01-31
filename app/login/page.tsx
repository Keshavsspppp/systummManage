"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock, ArrowRight, Sparkles, Users, Calendar, Trophy } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      alert("Login failed. Please check your credentials.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">CH</span>
              </div>
            </Link>
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your campus hub</p>
          </div>

          {/* Quick Login Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-purple-700">🎯 Demo Credentials:</p>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
              <div>👤 Admin: <span className="font-mono">admin@campus.edu / admin123</span></div>
              <div>👤 Organizer: <span className="font-mono">organizer@campus.edu / org123</span></div>
              <div>👤 Student: <span className="font-mono">student@campus.edu / student123</span></div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 gradient-primary text-white border-0 hover:opacity-90 text-base font-semibold group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-64 w-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 h-96 w-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Campus Management Platform</span>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight">
              Your Entire Campus,
              <br />
              <span className="text-pink-200">One Platform</span>
            </h2>
            
            <p className="text-xl text-purple-100 max-w-md">
              Join thousands of students, organizers, and administrators managing events, clubs, and resources seamlessly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-200" />
                  <p className="text-3xl font-bold">150+</p>
                </div>
                <p className="text-sm text-purple-200">Events Hosted</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-200" />
                  <p className="text-3xl font-bold">5000+</p>
                </div>
                <p className="text-sm text-purple-200">Active Users</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-pink-200" />
                  <p className="text-3xl font-bold">50+</p>
                </div>
                <p className="text-sm text-purple-200">Active Clubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
