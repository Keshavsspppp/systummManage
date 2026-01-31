"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@/types"
import { Package, Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock bookings data
const initialBookings = [
  {
    id: "1",
    resourceName: "Main Auditorium",
    resourceType: "auditorium",
    date: "2026-03-15",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Annual Tech Fest - Main Stage",
    status: "approved",
    requestedAt: "2026-02-28",
    approvedBy: "Admin Team",
  },
  {
    id: "2",
    resourceName: "Computer Lab 204",
    resourceType: "lab",
    date: "2026-03-10",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "Web Development Workshop",
    status: "pending",
    requestedAt: "2026-02-29",
    approvedBy: null,
  },
  {
    id: "3",
    resourceName: "Seminar Hall 1",
    resourceType: "classroom",
    date: "2026-03-08",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Guest Lecture on AI/ML",
    status: "approved",
    requestedAt: "2026-02-27",
    approvedBy: "Dr. Sarah Johnson",
  },
  {
    id: "4",
    resourceName: "Photography Equipment Set",
    resourceType: "equipment",
    date: "2026-03-20",
    startTime: "08:00",
    endTime: "18:00",
    purpose: "Campus Photography Walk",
    status: "rejected",
    requestedAt: "2026-02-26",
    approvedBy: "Equipment Manager",
    rejectionReason: "Equipment already booked for official event",
  },
  {
    id: "5",
    resourceName: "Sports Complex",
    resourceType: "sports-facility",
    date: "2026-03-25",
    startTime: "15:00",
    endTime: "18:00",
    purpose: "Inter-Club Basketball Tournament",
    status: "pending",
    requestedAt: "2026-03-01",
    approvedBy: null,
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")

  const filteredBookings = filter === "all" 
    ? bookings
    : bookings.filter(b => b.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "auditorium":
        return "🏛️"
      case "lab":
        return "💻"
      case "classroom":
        return "🏫"
      case "sports-facility":
        return "⚽"
      case "equipment":
        return "📷"
      default:
        return "📦"
    }
  }

  const cancelBooking = (id: string) => {
    // TODO: Implement API call to cancel booking
    setBookings(bookings.filter(b => b.id !== id))
  }

  const stats = {
    total: bookings.length,
    approved: bookings.filter(b => b.status === "approved").length,
    pending: bookings.filter(b => b.status === "pending").length,
    rejected: bookings.filter(b => b.status === "rejected").length,
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ORGANIZER, UserRole.ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your resource bookings and requests
              </p>
            </div>
            <Link href="/resources">
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Book New Resource
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
            >
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filter === "approved" ? "default" : "outline"}
              onClick={() => setFilter("approved")}
            >
              Approved ({stats.approved})
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
            >
              Rejected ({stats.rejected})
            </Button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No bookings found</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {filter === "all" 
                      ? "You haven't made any resource bookings yet"
                      : `No ${filter} bookings`}
                  </p>
                  <Link href="/resources">
                    <Button>Browse Resources</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      {/* Resource Info */}
                      <div className="flex gap-4 flex-1">
                        <div className="text-4xl">{getResourceIcon(booking.resourceType)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{booking.resourceName}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{booking.purpose}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(booking.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {booking.startTime} - {booking.endTime}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Package className="h-4 w-4 capitalize" />
                              {booking.resourceType.replace('-', ' ')}
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                            <p>Requested: {new Date(booking.requestedAt).toLocaleDateString()}</p>
                            {booking.approvedBy && (
                              <p>
                                {booking.status === "approved" ? "Approved" : "Reviewed"} by: {booking.approvedBy}
                              </p>
                            )}
                            {booking.rejectionReason && (
                              <p className="text-red-600 mt-1">
                                Reason: {booking.rejectionReason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {booking.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                        {booking.status === "approved" && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                        {booking.status === "rejected" && (
                          <Link href="/resources">
                            <Button variant="outline" size="sm">
                              Rebook
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
