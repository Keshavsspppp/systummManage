"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Calendar, Package, Users, Eye } from "lucide-react"
import { useState } from "react"

// Mock pending approvals data
const mockPendingEvents = [
  { id: "1", title: "Hackathon 2026", organizer: "Coding Club", date: "2026-03-20", type: "competition", budget: 10000 },
  { id: "2", title: "Annual Tech Fest", organizer: "Tech Society", date: "2026-04-15", type: "cultural", budget: 50000 },
]

const mockPendingBookings = [
  { id: "1", resource: "Main Auditorium", requestedBy: "Drama Club", date: "2026-03-18", time: "14:00 - 18:00", purpose: "Annual Play" },
  { id: "2", resource: "Computer Lab 204", requestedBy: "AI Society", date: "2026-03-22", time: "10:00 - 13:00", purpose: "ML Workshop" },
]

const mockPendingClubs = [
  { id: "1", name: "AI/ML Society", category: "technical", requestedBy: "John Doe", members: 15 },
  { id: "2", name: "Entrepreneurship Cell", category: "academic", requestedBy: "Jane Smith", members: 20 },
]

export default function ApprovalsPage() {
  const [eventApprovals, setEventApprovals] = useState(mockPendingEvents)
  const [bookingApprovals, setBookingApprovals] = useState(mockPendingBookings)
  const [clubApprovals, setClubApprovals] = useState(mockPendingClubs)

  const handleEventApproval = (id: string, approved: boolean) => {
    setEventApprovals(eventApprovals.filter(e => e.id !== id))
    // TODO: Call API to approve/reject
    alert(`Event ${approved ? "approved" : "rejected"} successfully!`)
  }

  const handleBookingApproval = (id: string, approved: boolean) => {
    setBookingApprovals(bookingApprovals.filter(b => b.id !== id))
    // TODO: Call API to approve/reject
    alert(`Booking ${approved ? "approved" : "rejected"} successfully!`)
  }

  const handleClubApproval = (id: string, approved: boolean) => {
    setClubApprovals(clubApprovals.filter(c => c.id !== id))
    // TODO: Call API to approve/reject
    alert(`Club ${approved ? "approved" : "rejected"} successfully!`)
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Pending Approvals</h1>
            <p className="text-muted-foreground mt-1">Review and approve events, bookings, and clubs</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eventApprovals.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingApprovals.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Clubs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clubApprovals.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Approval Tabs */}
          <Tabs defaultValue="events" className="space-y-4">
            <TabsList>
              <TabsTrigger value="events">Events ({eventApprovals.length})</TabsTrigger>
              <TabsTrigger value="bookings">Bookings ({bookingApprovals.length})</TabsTrigger>
              <TabsTrigger value="clubs">Clubs ({clubApprovals.length})</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              {eventApprovals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">No pending event approvals</p>
                  </CardContent>
                </Card>
              ) : (
                eventApprovals.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>Organized by {event.organizer}</CardDescription>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Pending
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{event.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium capitalize">{event.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">₹{event.budget.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEventApproval(event.id, true)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleEventApproval(event.id, false)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              {bookingApprovals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">No pending booking approvals</p>
                  </CardContent>
                </Card>
              ) : (
                bookingApprovals.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{booking.resource}</CardTitle>
                          <CardDescription>Requested by {booking.requestedBy}</CardDescription>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Pending
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p className="font-medium">{booking.time}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Purpose</p>
                            <p className="font-medium">{booking.purpose}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleBookingApproval(booking.id, true)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBookingApproval(booking.id, false)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Clubs Tab */}
            <TabsContent value="clubs" className="space-y-4">
              {clubApprovals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">No pending club approvals</p>
                  </CardContent>
                </Card>
              ) : (
                clubApprovals.map((club) => (
                  <Card key={club.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{club.name}</CardTitle>
                          <CardDescription>Requested by {club.requestedBy}</CardDescription>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Pending
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Category</p>
                            <p className="font-medium capitalize">{club.category}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Initial Members</p>
                            <p className="font-medium">{club.members}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleClubApproval(club.id, true)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleClubApproval(club.id, false)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
