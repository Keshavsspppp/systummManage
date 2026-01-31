"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Package, TrendingUp, CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react"
import Link from "next/link"
import AnimatedCard from "@/components/AnimatedCard"
import FloatingElement from "@/components/FloatingElement"

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header with Animation */}
          <FloatingElement delay={0} duration={3}>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage campus events, resources, and approvals
              </p>
            </div>
          </FloatingElement>

          {/* Stats Grid with Animations */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard delay={0}>
              <Card className="glass-effect border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-700">Total Events</CardTitle>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-green-600 font-medium mt-1">+3 from last month</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-700">Active Clubs</CardTitle>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <p className="text-xs text-gray-600 font-medium mt-1">All categories</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card className="glass-effect border-2 border-pink-100 hover:border-pink-300 hover:shadow-2xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-700">Resource Bookings</CardTitle>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">18</div>
                  <p className="text-xs text-gray-600 font-medium mt-1">This month</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card className="glass-effect border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-700">Pending Approvals</CardTitle>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">5</div>
                  <p className="text-xs text-red-600 font-semibold mt-1">⚠️ Requires attention</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Pending Approvals */}
            <AnimatedCard delay={0.4}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Pending Approvals</CardTitle>
                  <CardDescription className="text-base">Review and approve events and bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-purple-100 pb-4 hover:bg-purple-50/50 p-2 rounded-lg transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Tech Hackathon 2026</p>
                    <p className="text-sm text-gray-600">Event by Coding Club</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="hover:bg-green-50 hover:border-green-400 transition-all">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-400 transition-all">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b-2 border-purple-100 pb-4 hover:bg-purple-50/50 p-2 rounded-lg transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Auditorium Booking</p>
                    <p className="text-sm text-gray-600">March 15, 2026 - Drama Club</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="hover:bg-green-50 hover:border-green-400 transition-all">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-400 transition-all">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                <Link href="/approvals">
                  <Button variant="link" className="w-full gradient-primary text-white hover:opacity-90 rounded-lg">
                    View All Approvals
                  </Button>
                </Link>
              </CardContent>
            </Card>
            </AnimatedCard>

            {/* Recent Activity */}
            <AnimatedCard delay={0.5}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                  <CardDescription className="text-base">Latest events and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-50/50 transition-all">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Approved Annual Fest 2026</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-all">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">New club: AI/ML Society</p>
                      <p className="text-xs text-gray-600">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-purple-50/50 transition-all">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Workshop completed: Web Dev Basics</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>

                  <Link href="/analytics">
                    <Button variant="link" className="w-full gradient-primary text-white hover:opacity-90 rounded-lg">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Quick Actions */}
          <AnimatedCard delay={0.6}>
            <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                <CardDescription className="text-base">Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Link href="/approvals">
                  <Button className="gradient-primary text-white hover:opacity-90">Review Approvals</Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-400">Manage Events</Button>
                </Link>
                <Link href="/clubs">
                  <Button variant="outline" className="border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-400">Manage Clubs</Button>
                </Link>
                <Link href="/resources">
                  <Button variant="outline" className="border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-400">Manage Resources</Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
