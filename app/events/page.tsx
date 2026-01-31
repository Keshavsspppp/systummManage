"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Calendar, Search, Plus, MapPin, Users, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import ScrollReveal from "@/components/effects/ScrollReveal"
import TiltCard from "@/components/effects/TiltCard"
import MagneticButton from "@/components/effects/MagneticButton"
import { useRealtime } from "@/lib/realtime-context"
import { motion } from "framer-motion"

interface Event {
  _id: string
  title: string
  description: string
  category: string
  startDate: string
  endDate: string
  location: string
  organizer: {
    _id: string
    name: string
  }
  club?: {
    _id: string
    name: string
  }
  maxParticipants: number
  currentParticipants: number
  status: "draft" | "pending" | "approved" | "rejected" | "completed"
  tags: string[]
  registrationDeadline: string
  imageUrl?: string
}

export default function EventsPage() {
  const { data, isLoading: realtimeLoading, refreshEvents, lastUpdated } = useRealtime()
  const events = data.events
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshEvents()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const filteredEvents = events.filter((event: any) => {
    const matchesSearch = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.category === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "pending": return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      case "rejected": return "bg-red-500/20 text-red-300 border border-red-500/30"
      case "draft": return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
      case "completed": return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
      default: return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header with Animation */}
          <ScrollReveal direction="down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Events
                </h1>
                <p className="text-gray-400 mt-2">
                  Browse and manage campus events • 
                  <span className="text-purple-400 font-medium ml-2">
                    {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Live'}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MagneticButton>
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className={`border-purple-500/30 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm ${isRefreshing ? 'animate-spin' : ''}`}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </MagneticButton>
                <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
                  <MagneticButton>
                    <Link href="/events/create">
                      <Button className="bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 hover:opacity-90 transition-all shadow-lg shadow-purple-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </Link>
                  </MagneticButton>
                </RoleGuard>
              </div>
            </div>
          </ScrollReveal>

          {/* Search and Filters with Animation */}
          <ScrollReveal delay={0.1}>
            <TiltCard>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-2xl shadow-purple-500/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 border border-white/10 rounded-lg bg-white/5 text-white hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                      >
                        <option value="all" className="bg-gray-900">All Types</option>
                        <option value="workshop" className="bg-gray-900">Workshop</option>
                        <option value="seminar" className="bg-gray-900">Seminar</option>
                        <option value="competition" className="bg-gray-900">Competition</option>
                        <option value="cultural" className="bg-gray-900">Cultural</option>
                        <option value="sports" className="bg-gray-900">Sports</option>
                        <option value="social" className="bg-gray-900">Social</option>
                      </select>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-white/10 rounded-lg bg-white/5 text-white hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                      >
                        <option value="all" className="bg-gray-900">All Status</option>
                        <option value="approved" className="bg-gray-900">Approved</option>
                        <option value="pending" className="bg-gray-900">Pending</option>
                        <option value="draft" className="bg-gray-900">Draft</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </ScrollReveal>

          {/* Events List */}
          {realtimeLoading ? (
            <ScrollReveal delay={0.2}>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="py-16 text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
                  <p className="mt-6 text-gray-400 font-medium">Loading events...</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : filteredEvents.length === 0 ? (
            <ScrollReveal delay={0.2}>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="py-16 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-white">No events found</h3>
                  <p className="text-gray-400">
                    {events.length === 0 ? "No events have been created yet" : "Try adjusting your search filters"}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event: any, index: number) => (
                <ScrollReveal key={event._id} delay={index * 0.05}>
                  <TiltCard>
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-2xl transition-all group shadow-purple-500/10">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Date Badge */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="shrink-0 w-24 h-24 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl shadow-purple-500/40 transition-all duration-300"
                          >
                            <span className="text-3xl font-bold">
                              {new Date(event.startDate).getDate()}
                            </span>
                            <span className="text-sm font-medium">
                              {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </motion.div>

                          {/* Event Details */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link href={`/events/${event._id}`}>
                                  <h3 className="text-xl font-bold text-white hover:text-purple-400 transition-all group-hover:translate-x-1">
                                    {event.title}
                                  </h3>
                                </Link>
                                <p className="text-sm text-gray-400 mt-1">
                                  Organized by {event.club?.name || event.organizer?.name}
                                </p>
                              </div>
                              <span className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize shadow-lg ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>

                            <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                              <motion.div 
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Clock className="h-5 w-5 text-purple-400" />
                                <span className="font-medium">{new Date(event.startDate).toLocaleDateString()}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                              >
                                <MapPin className="h-5 w-5 text-purple-400" />
                                <span className="font-medium">{event.location}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Users className="h-5 w-5 text-purple-400" />
                                <span className="font-medium">{event.currentParticipants || 0} / {event.maxParticipants} registered</span>
                              </motion.div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {event.tags?.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 justify-center">
                            <MagneticButton>
                              <Link href={`/events/${event._id}`}>
                                <Button variant="outline" className="w-full border-purple-500/30 bg-white/5 hover:bg-white/10 text-white">View Details</Button>
                              </Link>
                            </MagneticButton>
                            {event.status === "approved" && (
                              <MagneticButton>
                                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 hover:opacity-90">Register</Button>
                              </MagneticButton>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
