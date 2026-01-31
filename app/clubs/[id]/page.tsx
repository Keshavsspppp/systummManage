"use client"

import { use } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { RoleGuard } from "@/components/auth/role-guard"
import { UserRole } from "@/types"
import { Users, Calendar, Mail, Globe, Instagram, Linkedin, UserPlus, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock club data
const getClubData = (id: string) => ({
  id,
  name: "Coding Club",
  category: "technical",
  description: "A community of passionate programmers, developers, and tech enthusiasts dedicated to learning, building, and sharing knowledge about software development, algorithms, and emerging technologies.",
  logo: "💻",
  coverImage: "/club-cover.jpg",
  members: 45,
  leads: ["2"],
  membersList: [
    { id: "1", name: "Alice Johnson", role: "Member", year: 2 },
    { id: "2", name: "Bob Smith", role: "Lead", year: 3 },
    { id: "3", name: "Carol White", role: "Member", year: 1 },
  ],
  events: [
    { id: "1", title: "Web Development Workshop", date: "March 10, 2026", status: "upcoming" },
    { id: "2", title: "Coding Competition", date: "March 20, 2026", status: "upcoming" },
  ],
  socials: {
    email: "coding@campus.edu",
    website: "https://codingclub.campus.edu",
    instagram: "@campus_coding",
    linkedin: "campus-coding-club",
  },
  status: "active" as const,
})

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const [isMember, setIsMember] = useState(false)
  const club = getClubData(id)

  const handleJoinClub = () => {
    // TODO: Call API to join club
    setIsMember(true)
  }

  const handleLeaveClub = () => {
    // TODO: Call API to leave club
    setIsMember(false)
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{club.logo}</div>
              <div>
                <h1 className="text-3xl font-bold">{club.name}</h1>
                <p className="text-muted-foreground capitalize">{club.category} Club</p>
              </div>
            </div>
            <div className="flex gap-2">
              {isMember ? (
                <>
                  <Button variant="outline" onClick={handleLeaveClub}>Leave Club</Button>
                  <RoleGuard allowedRoles={[UserRole.ORGANIZER]}>
                    <Link href={`/clubs/${id}/manage`}>
                      <Button>
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </Link>
                  </RoleGuard>
                </>
              ) : (
                <Button onClick={handleJoinClub}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Club
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{club.description}</p>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                    <RoleGuard allowedRoles={[UserRole.ORGANIZER]}>
                      <Link href="/events/create">
                        <Button size="sm">Create Event</Button>
                      </Link>
                    </RoleGuard>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {club.events.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <Link href={`/events/${event.id}`}>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Members ({club.members})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {club.membersList.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">Year {member.year}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.role === "Lead" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold">{club.members}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Events</p>
                    <p className="text-2xl font-bold">{club.events.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs capitalize">
                      {club.status}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Social */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {club.socials.email && (
                    <a href={`mailto:${club.socials.email}`} className="flex items-center gap-2 text-sm hover:text-primary">
                      <Mail className="h-4 w-4" />
                      {club.socials.email}
                    </a>
                  )}
                  {club.socials.website && (
                    <a href={club.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                  {club.socials.instagram && (
                    <a href={`https://instagram.com/${club.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary">
                      <Instagram className="h-4 w-4" />
                      {club.socials.instagram}
                    </a>
                  )}
                  {club.socials.linkedin && (
                    <a href={`https://linkedin.com/company/${club.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
