"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { User, Mail, Building2, Calendar, Users as UsersIcon, Shield } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    year: user?.year?.toString() || "",
    rollNumber: user?.rollNumber || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Call API to update profile
    setIsEditing(false)
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-1">Manage your account information</p>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Info */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your campus account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {user?.role !== "admin" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="year"
                              type="number"
                              min="1"
                              max="4"
                              value={formData.year}
                              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        {user?.role === "participant" && (
                          <div className="space-y-2">
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input
                              id="rollNumber"
                              value={formData.rollNumber}
                              disabled
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <Input value={user?.role} disabled className="capitalize" />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <Button type="submit" className="w-full">Save Changes</Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>My Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Clubs Joined</span>
                  <span className="text-2xl font-bold">{user?.clubMemberships?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Events Attended</span>
                  <span className="text-2xl font-bold">12</span>
                </div>
                {user?.role === "organizer" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Events Organized</span>
                    <span className="text-2xl font-bold">8</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Clubs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                My Clubs
              </CardTitle>
              <CardDescription>Clubs you're a member of</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Mock clubs - replace with actual data */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Coding Club</h3>
                  <p className="text-sm text-muted-foreground">Member since Jan 2026</p>
                  <p className="text-xs text-muted-foreground mt-1">Technical</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Drama Club</h3>
                  <p className="text-sm text-muted-foreground">Member since Dec 2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Cultural</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Photography Club</h3>
                  <p className="text-sm text-muted-foreground">Member since Nov 2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Social</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
