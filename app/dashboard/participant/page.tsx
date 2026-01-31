"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Bell, Trophy, BookmarkCheck } from "lucide-react"
import Link from "next/link"

export default function ParticipantDashboard() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.PARTICIPANT]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your events and club activities
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 upcoming</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Club Memberships</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active clubs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
                <BookmarkCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>My Upcoming Events</CardTitle>
                <CardDescription>Events you're registered for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <p className="font-medium">Web Development Workshop</p>
                  <p className="text-sm text-muted-foreground">March 10, 2026 • 10:00 AM</p>
                  <p className="text-xs text-muted-foreground mt-1">Lab 204 • Coding Club</p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4 py-2">
                  <p className="font-medium">Guest Lecture: Cloud Computing</p>
                  <p className="text-sm text-muted-foreground">March 15, 2026 • 2:00 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Auditorium • Tech Society</p>
                </div>

                <Link href="/events">
                  <Button variant="link" className="w-full">Browse All Events</Button>
                </Link>
              </CardContent>
            </Card>

            {/* My Clubs */}
            <Card>
              <CardHeader>
                <CardTitle>My Clubs</CardTitle>
                <CardDescription>Clubs you're a member of</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Coding Club</p>
                      <p className="text-xs text-muted-foreground">Technical</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Drama Club</p>
                      <p className="text-xs text-muted-foreground">Cultural</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Photography Club</p>
                      <p className="text-xs text-muted-foreground">Social</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>

                <Link href="/clubs">
                  <Button variant="outline" className="w-full">Discover More Clubs</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Events</CardTitle>
              <CardDescription>Based on your interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between border-b pb-3">
                <div className="flex-1">
                  <p className="font-medium">AI/ML Workshop Series</p>
                  <p className="text-sm text-muted-foreground">March 18-20, 2026 • AI Society</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Technical</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Workshop</span>
                  </div>
                </div>
                <Link href="/events/1">
                  <Button size="sm">Register</Button>
                </Link>
              </div>

              <div className="flex items-start justify-between border-b pb-3">
                <div className="flex-1">
                  <p className="font-medium">Photography Walkathon</p>
                  <p className="text-sm text-muted-foreground">March 22, 2026 • Photography Club</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Social</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Outdoor</span>
                  </div>
                </div>
                <Link href="/events/2">
                  <Button size="sm">Register</Button>
                </Link>
              </div>

              <Link href="/events">
                <Button variant="link" className="w-full">View All Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
