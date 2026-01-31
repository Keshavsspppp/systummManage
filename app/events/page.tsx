"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Calendar, Search, Plus, Filter, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

interface Event {
  _id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  maxParticipants: number
  currentParticipants: number
  organizer: { _id: string; name: string; email: string }
  club?: { _id: string; name: string; logo?: string }
  category?: string
  status: string
  tags: string[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.category === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "draft": return "bg-gray-100 text-gray-800"
      case "completed": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Events</h1>
              <p className="text-gray-600 mt-1">Browse and manage campus events</p>
            </div>
            <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
              <Link href="/events/create">
                <Button className="gradient-primary text-white border-0 hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </RoleGuard>
          </div>

          {/* Search and Filters */}
          <Card className="glass-effect border-0">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="competition">Competition</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="social">Social</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          {loading ? (
            <Card className="glass-effect border-0">
              <CardContent className="py-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading events...</p>
              </CardContent>
            </Card>
          ) : filteredEvents.length === 0 ? (
            <Card className="glass-effect border-0">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No events found</p>
                <p className="text-sm text-gray-600">
                  {events.length === 0 ? "No events have been created yet" : "Try adjusting your search filters"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event._id} className="glass-effect hover-lift border-0">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Date Badge */}
                      <div className="shrink-0 w-20 h-20 gradient-primary rounded-lg flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-2xl font-bold">
                          {new Date(event.startDate).getDate()}
                        </span>
                        <span className="text-xs">
                          {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/events/${event._id}`}>
                              <h3 className="text-xl font-bold hover:text-purple-600 transition-colors">{event.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-600">
                              Organized by {event.club?.name || event.organizer.name}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-purple-500" />
                            {new Date(event.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-purple-500" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-purple-500" />
                            {event.currentParticipants} / {event.maxParticipants} registered
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {event.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 justify-center">
                        <Link href={`/events/${event._id}`}>
                          <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50">View Details</Button>
                        </Link>
                        {event.status === "approved" && (
                          <Button className="w-full gradient-primary text-white border-0 hover:opacity-90">Register</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
