"use client"

import { use } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock } from "lucide-react"

export default function BookResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    eventId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    notes: "",
  })

  // Mock resource data
  const resource = {
    id,
    name: "Main Auditorium",
    type: "auditorium",
  }

  // Mock existing bookings for conflict checking
  const existingBookings = [
    { startDate: "2026-03-15", endDate: "2026-03-15", startTime: "10:00", endTime: "14:00" },
  ]

  const checkConflict = () => {
    // TODO: Implement proper conflict detection logic
    const hasConflict = existingBookings.some(booking => {
      return (
        formData.startDate === booking.startDate &&
        formData.endDate === booking.endDate &&
        ((formData.startTime >= booking.startTime && formData.startTime < booking.endTime) ||
         (formData.endTime > booking.startTime && formData.endTime <= booking.endTime))
      )
    })
    return hasConflict
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (checkConflict()) {
      alert("Time slot conflict! Please choose a different time.")
      return
    }

    setIsLoading(true)
    // TODO: Call API to create booking
    setTimeout(() => {
      router.push("/bookings")
    }, 1000)
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ORGANIZER]}>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Book {resource.name}</h1>
            <p className="text-muted-foreground mt-1">Submit a booking request for admin approval</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Fill in your booking requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventId">Associated Event (Optional)</Label>
                  <select
                    id="eventId"
                    value={formData.eventId}
                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">No associated event</option>
                    <option value="1">Web Development Workshop</option>
                    <option value="2">Annual Cultural Fest</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Input
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g., Guest Lecture on AI"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requirements or setup instructions..."
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your booking request will be sent to admin for approval. 
                    You'll receive a notification once it's reviewed.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Conflict Warning */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Existing Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {existingBookings.map((booking, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-medium">Booked: {booking.startDate}</p>
                    <p className="text-muted-foreground">{booking.startTime} - {booking.endTime}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
