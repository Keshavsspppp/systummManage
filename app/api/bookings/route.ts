import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"
import { BookingStatus } from "@/types"

// GET all bookings with filters
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const resourceId = searchParams.get('resourceId')
    
    const filter: any = {}
    if (userId) filter.user = userId
    if (status) filter.status = status
    if (resourceId) filter.resource = resourceId
    
    const bookings = await Booking.find(filter)
      .populate('resource', 'name type location')
      .populate('user', 'name email')
      .populate('event', 'title')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

// PATCH update booking status
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect()
    
    const { bookingId, status } = await request.json()
    
    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Booking ID and status are required" },
        { status: 400 }
      )
    }
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
      .populate('resource', 'name type')
      .populate('user', 'name email')
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      booking,
      message: "Booking updated successfully"
    })
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    )
  }
}
