"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Package, Search, Plus, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

// Mock resources data
const mockResources = [
  { id: "1", name: "Main Auditorium", type: "auditorium", capacity: 500, location: "Academic Block A", facilities: ["Projector", "Sound System", "AC"], available: true, image: "🏛️" },
  { id: "2", name: "Computer Lab 204", type: "lab", capacity: 50, location: "IT Block", facilities: ["50 PCs", "Projector", "Whiteboard"], available: true, image: "💻" },
  { id: "3", name: "Seminar Hall 1", type: "classroom", capacity: 100, location: "Academic Block B", facilities: ["Projector", "AC", "Whiteboard"], available: true, image: "🏫" },
  { id: "4", name: "Sports Complex", type: "sports-facility", capacity: 200, location: "Sports Ground", facilities: ["Basketball Court", "Volleyball Court"], available: true, image: "⚽" },
  { id: "5", name: "Photography Equipment Set", type: "equipment", capacity: 5, location: "Media Room", facilities: ["DSLR Camera", "Tripod", "Lights"], available: false, image: "📷" },
  { id: "6", name: "Conference Room", type: "classroom", capacity: 30, location: "Admin Block", facilities: ["Video Conferencing", "Projector", "AC"], available: true, image: "🏢" },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resources</h1>
              <p className="text-muted-foreground mt-1">Book venues and equipment for events</p>
            </div>
            <RoleGuard allowedRoles={[UserRole.ADMIN]}>
              <Link href="/resources/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </Link>
            </RoleGuard>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="auditorium">Auditorium</option>
                  <option value="classroom">Classroom</option>
                  <option value="lab">Lab</option>
                  <option value="sports-facility">Sports Facility</option>
                  <option value="equipment">Equipment</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{resource.image}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription className="capitalize">{resource.type.replace('-', ' ')}</CardDescription>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      resource.available 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {resource.available ? "Available" : "In Use"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {resource.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Capacity: {resource.capacity}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.facilities.map((facility, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/resources/${resource.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        View Schedule
                      </Button>
                    </Link>
                    <Link href={`/resources/${resource.id}/book`} className="flex-1">
                      <Button className="w-full" size="sm" disabled={!resource.available}>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
