import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/lib/models/Event"
import { EventStatus } from "@/types"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const event = await Event.findById(params.id)
      .populate('organizer', 'name email avatar')
      .populate('club', 'name logo')
      .populate('participants', 'name email avatar')
      .populate('collaborators', 'name email')
      .populate('resources', 'name type')
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ event })
  } catch (error) {
    console.error("Get event error:", error)
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const updates = await request.json()
    
    const event = await Event.findByIdAndUpdate(
      params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate('organizer', 'name email')
      .populate('club', 'name logo')
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      event,
      message: "Event updated successfully"
    })
  } catch (error) {
    console.error("Update event error:", error)
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const event = await Event.findByIdAndDelete(params.id)
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: "Event deleted successfully"
    })
  } catch (error) {
    console.error("Delete event error:", error)
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    )
  }
}
