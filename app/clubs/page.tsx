"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Users, Search, Plus, Filter, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import ScrollReveal from "@/components/effects/ScrollReveal"
import TiltCard from "@/components/effects/TiltCard"
import MagneticButton from "@/components/effects/MagneticButton"
import { useRealtime } from "@/lib/realtime-context"
import { motion } from "framer-motion"

export default function ClubsPage() {
  const { data, isLoading, refreshClubs, lastUpdated } = useRealtime()
  const clubs = data.clubs
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshClubs()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const filteredClubs = clubs.filter((club: any) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "technical", "cultural", "sports", "social", "academic"]

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header with Animation */}
          <ScrollReveal direction="down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Clubs & Committees
                </h1>
                <p className="text-gray-400 mt-2">
                  Discover and join campus clubs • 
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
                    <Link href="/clubs/create">
                      <Button className="bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 hover:opacity-90 transition-all shadow-lg shadow-purple-500/50">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Club
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
                        placeholder="Search clubs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Filter className="h-4 w-4 text-purple-400" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-white/10 rounded-lg bg-white/5 text-white hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                      >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-gray-900">
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            </TiltCard>
          </ScrollReveal>

          {/* Club Grid with Animations */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club, index) => (
              <ScrollReveal key={club.id} delay={index * 0.05}>
                <TiltCard>
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-2xl transition-all group h-full shadow-purple-500/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 6 }}
                            className="text-5xl transition-all"
                          >
                            {club.logo}
                          </motion.div>
                          <div>
                            <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">{club.name}</CardTitle>
                            <CardDescription className="capitalize text-purple-400 font-semibold">{club.category}</CardDescription>
                          </div>
                        </div>
                        {club.status === "pending" && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30">
                            Pending
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-400">{club.description}</p>
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className="flex items-center gap-2 text-sm text-gray-400"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Users className="h-5 w-5 text-purple-400" />
                          <span className="font-medium">{club.members} members</span>
                        </motion.div>
                        <MagneticButton>
                          <Link href={`/clubs/${club.id}`}>
                            <Button variant="outline" size="sm" className="border-purple-500/30 bg-white/5 hover:bg-white/10 text-white">View Details</Button>
                          </Link>
                        </MagneticButton>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            ))}

            {filteredClubs.length === 0 && (
              <div className="col-span-full">
                <ScrollReveal delay={0.2}>
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardContent className="py-16 text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Users className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2 text-white">No clubs found</h3>
                      <p className="text-gray-400">Try adjusting your search or filters</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
