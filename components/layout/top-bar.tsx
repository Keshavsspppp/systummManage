"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Bell, Search, UserCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopBar() {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications] = useState([
    { id: 1, title: "Event Approved", message: "Your event 'Tech Workshop' has been approved", read: false },
    { id: 2, title: "New Event", message: "Coding Club posted a new event", read: false },
    { id: 3, title: "Booking Confirmed", message: "Auditorium booking confirmed for March 15", read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, clubs, resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <Card className="absolute right-0 mt-2 w-80 z-50 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-sm">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notif.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                  </div>
                ))}
                <Link href="/notifications">
                  <div className="p-3 text-center text-sm text-primary hover:bg-gray-50">
                    View All Notifications
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* User Profile */}
        <Link href="/profile">
          <Button variant="ghost" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            <span className="hidden md:inline text-sm">{user?.name}</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
