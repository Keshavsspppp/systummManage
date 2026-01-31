"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Calendar, Package, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  // Mock analytics data
  const stats = {
    totalEvents: 48,
    totalParticipants: 1240,
    totalClubs: 12,
    resourceUtilization: 76,
    avgEventSize: 26,
    popularEventType: "Technical",
  }

  const monthlyEvents = [
    { month: "Sep", count: 6 },
    { month: "Oct", count: 8 },
    { month: "Nov", count: 12 },
    { month: "Dec", count: 10 },
    { month: "Jan", count: 12 },
  ]

  const clubActivity = [
    { name: "Coding Club", events: 8, members: 45 },
    { name: "Drama Club", events: 6, members: 32 },
    { name: "Sports Club", events: 12, members: 67 },
    { name: "Photography Club", events: 4, members: 28 },
    { name: "Music Club", events: 7, members: 52 },
  ]

  const resourceUsage = [
    { resource: "Main Auditorium", bookings: 24, hours: 96 },
    { resource: "Computer Lab 204", bookings: 18, hours: 72 },
    { resource: "Seminar Hall 1", bookings: 15, hours: 60 },
    { resource: "Sports Complex", bookings: 22, hours: 110 },
  ]

  const exportData = () => {
    // TODO: Implement CSV/Excel export
    alert("Export functionality will be implemented with actual data")
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">Campus activity insights and metrics</p>
            </div>
            <Button onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-green-600 mt-1">+12% from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalParticipants}</div>
                <p className="text-xs text-green-600 mt-1">+18% from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Clubs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClubs}</div>
                <p className="text-xs text-muted-foreground mt-1">All categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resourceUtilization}%</div>
                <p className="text-xs text-green-600 mt-1">Optimal usage</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Event Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Event Participation Trends
                </CardTitle>
                <CardDescription>Monthly event count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyEvents.map((data) => (
                    <div key={data.month} className="flex items-center">
                      <div className="w-16 text-sm text-muted-foreground">{data.month}</div>
                      <div className="flex-1">
                        <div className="bg-primary h-8 rounded flex items-center justify-end px-2 text-white text-sm font-medium"
                             style={{ width: `${(data.count / 15) * 100}%` }}>
                          {data.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Insight:</strong> Event participation has increased by 18% this semester
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Club Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Club Activity Metrics
                </CardTitle>
                <CardDescription>Events organized per club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clubActivity.map((club) => (
                    <div key={club.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{club.name}</span>
                        <span className="text-muted-foreground">{club.events} events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(club.events / 12) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-16 text-right">
                          {club.members} members
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Resource Utilization Report
              </CardTitle>
              <CardDescription>Booking statistics and usage hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Resource</th>
                      <th className="text-left py-3 px-4">Total Bookings</th>
                      <th className="text-left py-3 px-4">Total Hours</th>
                      <th className="text-left py-3 px-4">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resourceUsage.map((resource) => (
                      <tr key={resource.resource} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{resource.resource}</td>
                        <td className="py-3 px-4">{resource.bookings}</td>
                        <td className="py-3 px-4">{resource.hours} hrs</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-25">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(resource.hours / 110) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((resource.hours / 110) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>✓ High Engagement:</strong> Sports Club leads with 12 events and 67 members
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>ℹ Popular Category:</strong> {stats.popularEventType} events have the highest participation rate
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠ Resource Optimization:</strong> Main Auditorium is at 87% capacity - consider adding time slots
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
