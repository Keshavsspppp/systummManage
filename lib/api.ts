// API utility functions for fetching data from MongoDB

export async function fetchEvents(filters?: { status?: string; clubId?: string }) {
  try {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.clubId) params.append('clubId', filters.clubId)
    
    const response = await fetch(`/api/events?${params.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch events')
    const data = await response.json()
    return data.events || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function fetchEvent(id: string) {
  try {
    const response = await fetch(`/api/events/${id}`)
    if (!response.ok) throw new Error('Failed to fetch event')
    const data = await response.json()
    return data.event
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function fetchClubs(filters?: { category?: string }) {
  try {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    
    const response = await fetch(`/api/clubs?${params.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch clubs')
    const data = await response.json()
    return data.clubs || []
  } catch (error) {
    console.error('Error fetching clubs:', error)
    return []
  }
}

export async function fetchClub(id: string) {
  try {
    const response = await fetch(`/api/clubs/${id}`)
    if (!response.ok) throw new Error('Failed to fetch club')
    const data = await response.json()
    return data.club
  } catch (error) {
    console.error('Error fetching club:', error)
    return null
  }
}

export async function fetchResources() {
  try {
    const response = await fetch('/api/resources')
    if (!response.ok) throw new Error('Failed to fetch resources')
    const data = await response.json()
    return data.resources || []
  } catch (error) {
    console.error('Error fetching resources:', error)
    return []
  }
}

export async function fetchBookings() {
  try {
    const response = await fetch('/api/bookings')
    if (!response.ok) throw new Error('Failed to fetch bookings')
    const data = await response.json()
    return data.bookings || []
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

export async function fetchNotifications() {
  try {
    const response = await fetch('/api/notifications')
    if (!response.ok) throw new Error('Failed to fetch notifications')
    const data = await response.json()
    return data.notifications || []
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  try {
    const response = await fetch(`/api/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    if (!response.ok) throw new Error('Failed to register')
    return await response.json()
  } catch (error) {
    console.error('Error registering for event:', error)
    throw error
  }
}

export async function joinClub(clubId: string, userId: string) {
  try {
    const response = await fetch(`/api/clubs/${clubId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    if (!response.ok) throw new Error('Failed to join club')
    return await response.json()
  } catch (error) {
    console.error('Error joining club:', error)
    throw error
  }
}
