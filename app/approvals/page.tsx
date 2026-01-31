"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRole } from "@/types"
import { CheckCircle, XCircle, Clock, Calendar, Users, Building2, RefreshCw } from "lucide-react"
import { useState } from "react"
import AnimatedCard from "@/components/AnimatedCard"
import FloatingElement from "@/components/FloatingElement"
import { useRealtime } from "@/lib/realtime-context"

export default function ApprovalsPage() {
  const { data, isLoading, refreshApprovals, refreshEvents, refreshClubs, refreshBookings, lastUpdated } = useRealtime()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const pendingEvents = data.pendingApprovals.events
  const pendingClubs = data.pendingApprovals.clubs
  const pendingBookings = data.pendingApprovals.bookings

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshApprovals()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleEventAction = async (eventId: string, action: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      })
      if (response.ok) {
        await refreshEvents()
        await refreshApprovals()
      }
    } catch (error) {
      console.error('Failed to update event:', error)
    }
  }

  const handleClubAction = async (clubId: string, action: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/clubs/${clubId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      })
      if (response.ok) {
        await refreshClubs()
        await refreshApprovals()
      }
    } catch (error) {
      console.error('Failed to update club:', error)
    }
  }

  const handleBookingAction = async (bookingId: string, action: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      })
      if (response.ok) {
        await refreshBookings()
        await refreshApprovals()
      }
    } catch (error) {
      console.error('Failed to update booking:', error)
    }
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <FloatingElement delay={0} duration={3}>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Approvals
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage pending approvals • 
                  <span className="text-purple-600 font-medium ml-2">
                    {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Live'}
                  </span>
                </p>
              </div>
            </FloatingElement>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className={`border-purple-200 hover:bg-purple-50 ${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatedCard delay={0}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Events</CardTitle>
                  <Calendar className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{pendingEvents.length}</div>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Clubs</CardTitle>
                  <Users className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{pendingClubs.length}</div>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Bookings</CardTitle>
                  <Building2 className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{pendingBookings.length}</div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Approval Tabs */}
          <AnimatedCard delay={0.3}>
            <Card className="glass-effect border-2 border-purple-100">
              <CardContent className="pt-6">
                <Tabs defaultValue="events" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="events">Events ({pendingEvents.length})</TabsTrigger>
                    <TabsTrigger value="clubs">Clubs ({pendingClubs.length})</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings ({pendingBookings.length})</TabsTrigger>
                  </TabsList>

                  {/* Events Tab */}
                  <TabsContent value="events" className="space-y-4">
                    {isLoading ? (
                      <div className="py-16 text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                        <p className="mt-6 text-gray-600 font-medium">Loading...</p>
                      </div>
                    ) : pendingEvents.length === 0 ? (
                      <div className="py-16 text-center">
                        <Clock className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                        <p className="text-gray-600">No pending events</p>
                      </div>
                    ) : (
                      pendingEvents.map((event: any) => (
                        <Card key={event._id} className="border-2 border-purple-100 hover:border-purple-300 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold">{event.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                  <span>📅 {new Date(event.startDate).toLocaleDateString()}</span>
                                  <span>📍 {event.location}</span>
                                  <span>👥 Max: {event.maxParticipants}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  onClick={() => handleEventAction(event._id, 'approved')}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => handleEventAction(event._id, 'rejected')}
                                  variant="destructive"
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
                    {isLoading ? (
                      <div className="py-16 text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                        <p className="mt-6 text-gray-600 font-medium">Loading...</p>
                      </div>
                    ) : pendingClubs.length === 0 ? (
                      <div className="py-16 text-center">
                        <Clock className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                        <p className="text-gray-600">No pending clubs</p>
                      </div>
                    ) : (
                      pendingClubs.map((club: any) => (
                        <Card key={club._id} className="border-2 border-purple-100 hover:border-purple-300 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold">{club.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{club.description}</p>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                  <span>Category: {club.category}</span>
                                  <span>Members: {club.memberCount || 0}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  onClick={() => handleClubAction(club._id, 'approved')}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => handleClubAction(club._id, 'rejected')}
                                  variant="destructive"
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

                  {/* Bookings Tab */}
                  <TabsContent value="bookings" className="space-y-4">
                    {isLoading ? (
                      <div className="py-16 text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                        <p className="mt-6 text-gray-600 font-medium">Loading...</p>
                      </div>
                    ) : pendingBookings.length === 0 ? (
                      <div className="py-16 text-center">
                        <Clock className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                        <p className="text-gray-600">No pending bookings</p>
                      </div>
                    ) : (
                      pendingBookings.map((booking: any) => (
                        <Card key={booking._id} className="border-2 border-purple-100 hover:border-purple-300 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold">{booking.resource?.name || 'Resource Booking'}</h3>
                                <p className="text-sm text-gray-600 mt-1">{booking.purpose}</p>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                  <span>📅 {new Date(booking.startTime).toLocaleDateString()}</span>
                                  <span>⏰ {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}</span>
                                  <span>👤 {booking.user?.name || 'Unknown'}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  onClick={() => handleBookingAction(booking._id, 'approved')}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => handleBookingAction(booking._id, 'rejected')}
                                  variant="destructive"
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
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
