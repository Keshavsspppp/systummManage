"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Users, Search, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

// Mock data - replace with API
const mockClubs = [
  { id: "1", name: "Coding Club", category: "technical", members: 45, logo: "💻", description: "Learn programming and software development", status: "active" },
  { id: "2", name: "Drama Club", category: "cultural", members: 32, logo: "🎭", description: "Theater and performing arts", status: "active" },
  { id: "3", name: "Photography Club", category: "social", members: 28, logo: "📸", description: "Capture moments and learn photography", status: "active" },
  { id: "4", name: "Robotics Club", category: "technical", members: 38, logo: "🤖", description: "Build robots and automation projects", status: "active" },
  { id: "5", name: "Music Club", category: "cultural", members: 52, logo: "🎵", description: "Instrumental and vocal performances", status: "active" },
  { id: "6", name: "Sports Club", category: "sports", members: 67, logo: "⚽", description: "All campus sports activities", status: "active" },
  { id: "7", name: "AI/ML Society", category: "technical", members: 41, logo: "🧠", description: "Machine learning and AI research", status: "pending" },
  { id: "8", name: "Debate Club", category: "academic", members: 24, logo: "💬", description: "Public speaking and debates", status: "active" },
]

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "technical", "cultural", "sports", "social", "academic"]

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Clubs & Committees</h1>
              <p className="text-gray-600 mt-1">Discover and join campus clubs</p>
            </div>
            <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
              <Link href="/clubs/create">
                <Button className="gradient-primary text-white border-0 hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Club
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
                    placeholder="Search clubs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Filter className="h-4 w-4 text-purple-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Club Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="glass-effect hover-lift border-0">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{club.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <CardDescription className="capitalize text-purple-600">{club.category}</CardDescription>
                      </div>
                    </div>
                    {club.status === "pending" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{club.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{club.members} members</span>
                    </div>
                    <Link href={`/clubs/${club.id}`}>
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <Card className="glass-effect border-0">
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No clubs found</p>
                <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
