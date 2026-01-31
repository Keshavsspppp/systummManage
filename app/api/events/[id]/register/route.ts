import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/lib/models/Event"
import User from "@/lib/models/User"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const { userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }
    
    const event = await Event.findById(params.id)
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }
    
    // Check if user already registered
    if (event.participants.includes(userId)) {
      return NextResponse.json(
        { error: "Already registered for this event" },
        { status: 400 }
      )
    }
    
    // Check capacity
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return NextResponse.json(
        { error: "Event is full" },
        { status: 400 }
      )
    }
    
    // Add participant
    event.participants.push(userId)
    event.currentParticipants = event.participants.length
    await event.save()
    
    // Update user's registered events
    await User.findByIdAndUpdate(userId, {
      $addToSet: { registeredEvents: params.id }
    })
    
    return NextResponse.json({
      message: "Successfully registered for event"
    })
  } catch (error) {
    console.error("Register event error:", error)
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    )
  }
}
