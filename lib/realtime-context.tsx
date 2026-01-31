"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface RealtimeData {
  events: any[]
  clubs: any[]
  resources: any[]
  bookings: any[]
  notifications: any[]
  analytics: any
  pendingApprovals: {
    events: any[]
    clubs: any[]
    bookings: any[]
  }
}

interface RealtimeContextType {
  data: RealtimeData
  isLoading: boolean
  error: string | null
  refreshAll: () => Promise<void>
  refreshEvents: () => Promise<void>
  refreshClubs: () => Promise<void>
  refreshResources: () => Promise<void>
  refreshBookings: () => Promise<void>
  refreshAnalytics: () => Promise<void>
  refreshApprovals: () => Promise<void>
  lastUpdated: Date | null
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RealtimeData>({
    events: [],
    clubs: [],
    resources: [],
    bookings: [],
    notifications: [],
    analytics: null,
    pendingApprovals: {
      events: [],
      clubs: [],
      bookings: []
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/events')
      const result = await response.json()
      setData(prev => ({ ...prev, events: result.events || [] }))
    } catch (err) {
      console.error('Failed to fetch events:', err)
    }
  }, [])

  const fetchClubs = useCallback(async () => {
    try {
      const response = await fetch('/api/clubs')
      const result = await response.json()
      setData(prev => ({ ...prev, clubs: result.clubs || [] }))
    } catch (err) {
      console.error('Failed to fetch clubs:', err)
    }
  }, [])

  const fetchResources = useCallback(async () => {
    try {
      const response = await fetch('/api/resources')
      const result = await response.json()
      setData(prev => ({ ...prev, resources: result.resources || [] }))
    } catch (err) {
      console.error('Failed to fetch resources:', err)
    }
  }, [])

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch('/api/bookings')
      const result = await response.json()
      setData(prev => ({ ...prev, bookings: result.bookings || [] }))
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
    }
  }, [])

  const fetchAnalytics = useCallback(async () => {
    try {
      // Calculate analytics from current data
      const totalEvents = data.events.length
      const totalClubs = data.clubs.length
      const totalBookings = data.bookings.length
      
      const approvedEvents = data.events.filter((e: any) => e.status === 'approved').length
      const pendingEvents = data.events.filter((e: any) => e.status === 'pending').length
      
      const analytics = {
        totalEvents,
        totalClubs,
        totalBookings,
        approvedEvents,
        pendingEvents,
        eventsByStatus: {
          approved: approvedEvents,
          pending: pendingEvents,
          rejected: data.events.filter((e: any) => e.status === 'rejected').length,
          draft: data.events.filter((e: any) => e.status === 'draft').length
        },
        recentActivity: data.events.slice(0, 10).map((e: any) => ({
          id: e._id,
          title: e.title,
          type: 'event',
          status: e.status,
          date: e.createdAt
        }))
      }
      
      setData(prev => ({ ...prev, analytics }))
    } catch (err) {
      console.error('Failed to calculate analytics:', err)
    }
  }, [data.events, data.clubs, data.bookings])

  const fetchApprovals = useCallback(async () => {
    try {
      // Fetch pending approvals
      const [eventsRes, clubsRes, bookingsRes] = await Promise.all([
        fetch('/api/events?status=pending'),
        fetch('/api/clubs?status=pending'),
        fetch('/api/bookings?status=pending')
      ])

      const [eventsData, clubsData, bookingsData] = await Promise.all([
        eventsRes.json(),
        clubsRes.json(),
        bookingsRes.json()
      ])

      setData(prev => ({
        ...prev,
        pendingApprovals: {
          events: eventsData.events || [],
          clubs: clubsData.clubs || [],
          bookings: bookingsData.bookings || []
        }
      }))
    } catch (err) {
      console.error('Failed to fetch approvals:', err)
    }
  }, [])

  const refreshAll = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([
        fetchEvents(),
        fetchClubs(),
        fetchResources(),
        fetchBookings(),
        fetchApprovals()
      ])
      await fetchAnalytics()
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to refresh data')
      console.error('Refresh error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [fetchEvents, fetchClubs, fetchResources, fetchBookings, fetchAnalytics, fetchApprovals])

  const refreshEvents = useCallback(async () => {
    await fetchEvents()
    await fetchAnalytics()
    setLastUpdated(new Date())
  }, [fetchEvents, fetchAnalytics])

  const refreshClubs = useCallback(async () => {
    await fetchClubs()
    await fetchAnalytics()
    setLastUpdated(new Date())
  }, [fetchClubs, fetchAnalytics])

  const refreshResources = useCallback(async () => {
    await fetchResources()
    setLastUpdated(new Date())
  }, [fetchResources])

  const refreshBookings = useCallback(async () => {
    await fetchBookings()
    await fetchAnalytics()
    setLastUpdated(new Date())
  }, [fetchBookings, fetchAnalytics])

  const refreshAnalytics = useCallback(async () => {
    await fetchAnalytics()
    setLastUpdated(new Date())
  }, [fetchAnalytics])

  const refreshApprovals = useCallback(async () => {
    await fetchApprovals()
    setLastUpdated(new Date())
  }, [fetchApprovals])

  // Initial load
  useEffect(() => {
    refreshAll()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAll()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [refreshAll])

  // Refresh on window focus
  useEffect(() => {
    const handleFocus = () => {
      refreshAll()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refreshAll])

  return (
    <RealtimeContext.Provider
      value={{
        data,
        isLoading,
        error,
        refreshAll,
        refreshEvents,
        refreshClubs,
        refreshResources,
        refreshBookings,
        refreshAnalytics,
        refreshApprovals,
        lastUpdated
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider')
  }
  return context
}
