import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/lib/models/Event"
import User from "@/lib/models/User"
import { EventStatus } from "@/types"

// GET all events or filter by query params
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const clubId = searchParams.get('clubId')
    const organizerId = searchParams.get('organizerId')
    
    const filter: any = {}
    if (status) filter.status = status
    if (clubId) filter.club = clubId
    if (organizerId) filter.organizer = organizerId
    
    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .populate('club', 'name logo')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({ events })
  } catch (error) {
    console.error("Get events error:", error)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const { 
      title, 
      description, 
      startDate, 
      endDate, 
      location, 
      maxParticipants,
      organizerId,
      clubId,
      category,
      tags,
      budget,
      image
    } = data
    
    // Validate required fields
    if (!title || !description || !startDate || !endDate || !location || !organizerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Create event
    const event = await Event.create({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      maxParticipants,
      organizer: organizerId,
      club: clubId,
      category,
      tags: tags || [],
      budget,
      image,
      status: EventStatus.DRAFT,
      currentParticipants: 0,
      participants: [],
      collaborators: [],
      resources: []
    })
    
    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'name email')
      .populate('club', 'name logo')
    
    return NextResponse.json({
      event: populatedEvent,
      message: "Event created successfully"
    }, { status: 201 })
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}
