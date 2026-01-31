import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"
import Resource from "@/lib/models/Resource"
import { BookingStatus } from "@/types"

// GET bookings for a resource
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    
    const filter: any = { resource: params.id }
    if (userId) filter.user = userId
    if (status) filter.status = status
    
    const bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .populate('event', 'title')
      .sort({ startTime: 1 })
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

// POST create booking
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const { userId, eventId, startTime, endTime, purpose, notes } = data
    
    // Validate required fields
    if (!userId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Check if resource exists
    const resource = await Resource.findById(params.id)
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      )
    }
    
    // Check for conflicting bookings
    const conflict = await Booking.findOne({
      resource: params.id,
      status: { $in: [BookingStatus.PENDING, BookingStatus.APPROVED] },
      $or: [
        {
          startTime: { $lt: new Date(endTime) },
          endTime: { $gt: new Date(startTime) }
        }
      ]
    })
    
    if (conflict) {
      return NextResponse.json(
        { error: "Resource is already booked for this time slot" },
        { status: 400 }
      )
    }
    
    // Create booking
    const booking = await Booking.create({
      resource: params.id,
      user: userId,
      event: eventId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: BookingStatus.PENDING,
      purpose,
      notes
    })
    
    const populatedBooking = await Booking.findById(booking._id)
      .populate('resource', 'name type')
      .populate('user', 'name email')
      .populate('event', 'title')
    
    return NextResponse.json({
      booking: populatedBooking,
      message: "Booking created successfully"
    }, { status: 201 })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}
