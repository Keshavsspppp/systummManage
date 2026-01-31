"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCheck, Trash2, Calendar, Package, Users, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

// Mock notifications
const initialNotifications = [
  { id: "1", type: "approval", title: "Event Approved", message: "Your event 'Web Development Workshop' has been approved by admin", read: false, createdAt: "2 hours ago", actionUrl: "/events/1" },
  { id: "2", type: "event", title: "New Event Posted", message: "Coding Club posted a new event: Hackathon 2026", read: false, createdAt: "4 hours ago", actionUrl: "/events/3" },
  { id: "3", type: "booking", title: "Booking Confirmed", message: "Your auditorium booking for March 15 has been confirmed", read: true, createdAt: "1 day ago", actionUrl: "/bookings" },
  { id: "4", type: "club", title: "New Member Joined", message: "Sarah Johnson joined your club", read: true, createdAt: "2 days ago", actionUrl: "/clubs/1" },
  { id: "5", type: "event", title: "Event Reminder", message: "Photography Walk starts tomorrow at 7:00 AM", read: false, createdAt: "3 hours ago", actionUrl: "/events/5" },
  { id: "6", type: "approval", title: "Booking Rejected", message: "Your lab booking request was rejected - time conflict", read: false, createdAt: "5 hours ago", actionUrl: "/bookings" },
  { id: "7", type: "system", title: "System Update", message: "Campus Hub has been updated with new features", read: true, createdAt: "3 days ago", actionUrl: "/" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "approval": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "event": return <Calendar className="h-5 w-5 text-blue-600" />
      case "booking": return <Package className="h-5 w-5 text-purple-600" />
      case "club": return <Users className="h-5 w-5 text-orange-600" />
      case "system": return <Bell className="h-5 w-5 text-gray-600" />
      default: return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
            >
              Unread ({unreadCount})
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`transition-colors ${!notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="mt-1">
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.createdAt}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full shrink-0 mt-2"></div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          {notification.actionUrl && (
                            <Button size="sm" variant="link" className="p-0 h-auto">
                              View Details →
                            </Button>
                          )}
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
