"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/types"
import { Package, Search, Plus, MapPin, Users, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { useRealtime } from "@/lib/realtime-context"
import ScrollReveal from "@/components/effects/ScrollReveal"
import TiltCard from "@/components/effects/TiltCard"
import MagneticButton from "@/components/effects/MagneticButton"
import { motion } from "framer-motion"

export default function ResourcesPage() {
  const { data, refreshResources, lastUpdated } = useRealtime()
  const resources = data.resources
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshResources()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const filteredResources = resources.filter((resource: any) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <ScrollReveal direction="down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Resources
                </h1>
                <p className="text-gray-400 mt-2">
                  Book venues and equipment for events • 
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
                <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                  <MagneticButton>
                    <Link href="/resources/create">
                      <Button className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Resource
                      </Button>
                    </Link>
                  </MagneticButton>
                </RoleGuard>
              </div>
            </div>
          </ScrollReveal>

          {/* Search and Filters */}
          <ScrollReveal delay={0.1}>
            <TiltCard>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                      />
                    </div>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-4 py-2 border border-white/10 rounded-lg bg-white/5 text-white hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                    >
                      <option value="all" className="bg-gray-900">All Types</option>
                      <option value="auditorium" className="bg-gray-900">Auditorium</option>
                      <option value="classroom" className="bg-gray-900">Classroom</option>
                      <option value="lab" className="bg-gray-900">Lab</option>
                      <option value="sports-facility" className="bg-gray-900">Sports Facility</option>
                      <option value="equipment" className="bg-gray-900">Equipment</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </ScrollReveal>

          {/* Resources Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <ScrollReveal key={resource.id} delay={index * 0.05}>
                <TiltCard>
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-2xl transition-all shadow-purple-500/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 6 }}
                            className="text-4xl"
                          >
                            {resource.image}
                          </motion.div>
                          <div>
                            <CardTitle className="text-lg text-white">{resource.name}</CardTitle>
                            <CardDescription className="capitalize text-purple-400">{resource.type.replace('-', ' ')}</CardDescription>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs border ${
                          resource.available 
                            ? "bg-green-500/20 text-green-300 border-green-500/30" 
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                        }`}>
                          {resource.available ? "Available" : "In Use"}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <motion.div 
                          className="flex items-center gap-2 text-gray-400"
                          whileHover={{ scale: 1.05 }}
                        >
                          <MapPin className="h-4 w-4 text-purple-400" />
                          {resource.location}
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2 text-gray-400"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Users className="h-4 w-4 text-purple-400" />
                          Capacity: {resource.capacity}
                        </motion.div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 text-white">Facilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {resource.facilities.map((facility: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <MagneticButton>
                          <Link href={`/resources/${resource.id}`} className="flex-1">
                            <Button variant="outline" className="w-full border-purple-500/30 bg-white/5 hover:bg-white/10 text-white" size="sm">
                              View Schedule
                            </Button>
                          </Link>
                        </MagneticButton>
                        <MagneticButton>
                          <Link href={`/resources/${resource.id}/book`} className="flex-1">
                            <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white" size="sm" disabled={!resource.available}>
                              Book Now
                            </Button>
                          </Link>
                        </MagneticButton>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
