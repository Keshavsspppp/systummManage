"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Building2, TrendingUp, Plus, Package, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function OrganizerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ORGANIZER]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your club events and resource bookings
              </p>
            </div>
            <Link href="/events/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">My Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 upcoming</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Club Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+5 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resource Bookings</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">2 pending approval</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Web Development Workshop</p>
                      <p className="text-sm text-muted-foreground">March 10, 2026 • 10:00 AM</p>
                      <p className="text-xs text-muted-foreground mt-1">Lab 204 • 45 registered</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <div className="border-l-4 border-purple-600 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Guest Lecture: Cloud Computing</p>
                      <p className="text-sm text-muted-foreground">March 15, 2026 • 2:00 PM</p>
                      <p className="text-xs text-muted-foreground mt-1">Auditorium • 120 registered</p>
                    </div>
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                </div>

                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Coding Competition</p>
                      <p className="text-sm text-muted-foreground">March 20, 2026 • 9:00 AM</p>
                      <p className="text-xs text-muted-foreground mt-1">Computer Center • 80 registered</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <Link href="/events">
                  <Button variant="link" className="w-full">View All Events</Button>
                </Link>
              </CardContent>
            </Card>

            {/* My Club */}
            <Card>
              <CardHeader>
                <CardTitle>My Club</CardTitle>
                <CardDescription>Coding Club</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Members</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Events This Semester</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>

                <div className="pt-4 space-y-2">
                  <Link href="/clubs/manage">
                    <Button variant="outline" className="w-full">
                      Manage Members
                    </Button>
                  </Link>
                  <Link href="/events/create">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Event
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Resource Bookings</CardTitle>
              <CardDescription>Your venue and equipment reservations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Auditorium</p>
                  <p className="text-sm text-muted-foreground">March 15, 2026 • 2:00 PM - 5:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Lab 204</p>
                  <p className="text-sm text-muted-foreground">March 10, 2026 • 10:00 AM - 1:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Approved
                </span>
              </div>

              <Link href="/bookings">
                <Button variant="link" className="w-full">View All Bookings</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
