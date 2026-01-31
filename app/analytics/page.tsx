"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserRole } from "@/types"
import { TrendingUp, Users, Calendar, Building2, Download, RefreshCw } from "lucide-react"
import AnimatedCard from "@/components/AnimatedCard"
import FloatingElement from "@/components/FloatingElement"
import { useRealtime } from "@/lib/realtime-context"
import { useState } from "react"

export default function AnalyticsPage() {
  const { data, isLoading, refreshAnalytics, lastUpdated } = useRealtime()
  const stats = data.analytics || {
    totalEvents: 0,
    activeClubs: 0,
    totalMembers: 0,
    pendingApprovals: 0,
    approvedEvents: 0,
    pendingEvents: 0,
    rejectedEvents: 0
  }
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshAnalytics()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleExportCSV = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Total Events', stats.totalEvents],
      ['Active Clubs', stats.activeClubs],
      ['Total Members', stats.totalMembers],
      ['Pending Approvals', stats.pendingApprovals],
      ['Approved Events', stats.approvedEvents],
      ['Pending Events', stats.pendingEvents],
      ['Rejected Events', stats.rejectedEvents]
    ]

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
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
                  Analytics
                </h1>
                <p className="text-gray-600 mt-2">
                  Platform insights and statistics • 
                  <span className="text-purple-600 font-medium ml-2">
                    {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Live'}
                  </span>
                </p>
              </div>
            </FloatingElement>
            <div className="flex gap-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className={`border-purple-200 hover:bg-purple-50 ${isRefreshing ? 'animate-spin' : ''}`}
                disabled={isRefreshing}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button onClick={handleExportCSV} className="gradient-primary text-white">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
                  <Calendar className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{stats.totalEvents}</div>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Clubs</CardTitle>
                  <Users className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{stats.activeClubs}</div>
                  <p className="text-xs text-gray-500 mt-1">Currently active</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
                  <TrendingUp className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{stats.totalMembers}</div>
                  <p className="text-xs text-gray-500 mt-1">Registered users</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card className="glass-effect border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Approvals</CardTitle>
                  <Building2 className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">{stats.pendingApprovals}</div>
                  <p className="text-xs text-gray-500 mt-1">Needs review</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Event Status Breakdown */}
          <AnimatedCard delay={0.4}>
            <Card className="glass-effect border-2 border-purple-100">
              <CardHeader>
                <CardTitle>Event Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-2xl font-bold text-green-600">{stats.approvedEvents}</div>
                    <p className="text-sm text-green-700 mt-1">Approved Events</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pendingEvents}</div>
                    <p className="text-sm text-yellow-700 mt-1">Pending Events</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <div className="text-2xl font-bold text-red-600">{stats.rejectedEvents}</div>
                    <p className="text-sm text-red-700 mt-1">Rejected Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Recent Activity */}
          <AnimatedCard delay={0.5}>
            <Card className="glass-effect border-2 border-purple-100">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <div>
                      <p className="text-sm font-medium text-purple-900">Average Event Attendance</p>
                      <p className="text-xs text-purple-600 mt-1">Based on registered participants</p>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.totalEvents > 0 ? Math.round(stats.totalMembers / stats.totalEvents) : 0}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Average Club Size</p>
                      <p className="text-xs text-blue-600 mt-1">Members per club</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.activeClubs > 0 ? Math.round(stats.totalMembers / stats.activeClubs) : 0}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                    <div>
                      <p className="text-sm font-medium text-indigo-900">Approval Rate</p>
                      <p className="text-xs text-indigo-600 mt-1">Events approved vs total</p>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {stats.totalEvents > 0 ? Math.round((stats.approvedEvents / stats.totalEvents) * 100) : 0}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
