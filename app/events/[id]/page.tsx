"use client"

import { use } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { RoleGuard } from "@/components/auth/role-guard"
import { UserRole } from "@/types"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  Tag,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchEvent, registerForEvent } from "@/lib/api"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadEvent()
  }, [id])

  const loadEvent = async () => {
    const data = await fetchEvent(id)
    setEvent(data)
    setLoading(false)
    // Check if user is already registered
    if (data && user) {
      const userId = user._id || user.id
      setIsRegistered(data.participants?.includes(userId))
    }
  }

  const handleRegister = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const userId = user._id || user.id
      await registerForEvent(id, userId)
      setIsRegistered(true)
      await loadEvent() // Refresh event data
    } catch (error) {
      alert("Failed to register for event")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async () => {
    setIsLoading(true)
    // TODO: Call API to unregister from event
    setTimeout(() => {
      setIsRegistered(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      // TODO: Call API to delete event
      router.push("/events")
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-96">
            <p>Loading event...</p>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  if (!event) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg">Event not found</p>
              <Link href="/events">
                <Button className="mt-4">Back to Events</Button>
              </Link>
            </CardContent>
          </Card>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  const isFull = event.currentParticipants >= event.maxParticipants
  const spotsLeft = event.maxParticipants - event.currentParticipants

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="h-3 w-3 mr-1" />Pending Approval</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                {getStatusBadge(event.status)}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{event.club?.logo || "📅"}</span>
                  <span>{event.club?.name || "Campus Event"}</span>
                </div>
                <span>•</span>
                <span className="capitalize">{event.category || "General"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <RoleGuard allowedRoles={[UserRole.PARTICIPANT]}>
                {!isRegistered ? (
                  <Button 
                    onClick={handleRegister} 
                    disabled={isFull || isLoading || event.status !== "approved"}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isFull ? "Event Full" : "Register"}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={handleUnregister}
                    disabled={isLoading}
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Unregister
                  </Button>
                )}
              </RoleGuard>

              <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
                <Link href={`/events/${id}/edit`}>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </RoleGuard>
            </div>
          </div>

          {/* Main Info Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">
                    {new Date(event.startDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    {' - '}
                    {new Date(event.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Venue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{event.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{event.currentParticipants} / {event.maxParticipants} registered</p>
                  <p className="text-sm text-muted-foreground">
                    {spotsLeft > 0 ? `${spotsLeft} spots left` : "Event is full"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budget */}
          {event.budget && (
            <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">₹{event.budget.toLocaleString()}</p>
                </CardContent>
              </Card>
            </RoleGuard>
          )}

          {/* Organizer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{event.organizer.name}</p>
                  <p className="text-sm text-muted-foreground">{event.organizer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
