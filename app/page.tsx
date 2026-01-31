"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, Users, Package } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">CH</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Campus Hub</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-purple-100">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="gradient-primary text-white border-0 hover:opacity-90">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold">
                🎓 Welcome to Campus Hub
              </span>
            </div>
            <h1 className="text-6xl font-bold leading-tight">
              Your Campus,
              <br />
              <span className="text-gradient">All in One Place</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Replace Google Forms, Excel sheets, and WhatsApp groups with a single, 
              structured platform for managing events, clubs, and campus resources.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-effect hover-lift border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Event Management</CardTitle>
                <CardDescription>
                  Create, approve, and manage campus events with built-in approval workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover-lift border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Club Operations</CardTitle>
                <CardDescription>
                  Manage club memberships, activities, and communications in one place
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover-lift border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-3">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Resource Booking</CardTitle>
                <CardDescription>
                  Book auditoriums, labs, and equipment with automated approval system
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center glass-effect p-6 rounded-2xl hover-lift">
              <p className="text-4xl font-bold text-gradient">150+</p>
              <p className="text-sm text-gray-600 mt-2">Events Hosted</p>
            </div>
            <div className="text-center glass-effect p-6 rounded-2xl hover-lift">
              <p className="text-4xl font-bold text-gradient">50+</p>
              <p className="text-sm text-gray-600 mt-2">Active Clubs</p>
            </div>
            <div className="text-center glass-effect p-6 rounded-2xl hover-lift">
              <p className="text-4xl font-bold text-gradient">100+</p>
              <p className="text-sm text-gray-600 mt-2">Resources</p>
            </div>
            <div className="text-center glass-effect p-6 rounded-2xl hover-lift">
              <p className="text-4xl font-bold text-gradient">5000+</p>
              <p className="text-sm text-gray-600 mt-2">Students</p>
            </div>
          </div>

          {/* Quick Login Info */}
          <div className="text-center space-y-4 glass-effect max-w-3xl mx-auto p-6 rounded-2xl">
            <p className="font-semibold text-purple-700">🎯 Demo Credentials for Testing:</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <p className="font-semibold text-blue-700">Admin</p>
                <p className="text-gray-600 text-xs mt-1">admin@campus.edu</p>
                <p className="text-gray-600 text-xs">admin123</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                <p className="font-semibold text-purple-700">Organizer</p>
                <p className="text-gray-600 text-xs mt-1">organizer@campus.edu</p>
                <p className="text-gray-600 text-xs">org123</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
                <p className="font-semibold text-pink-700">Student</p>
                <p className="text-gray-600 text-xs mt-1">student@campus.edu</p>
                <p className="text-gray-600 text-xs">student123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
