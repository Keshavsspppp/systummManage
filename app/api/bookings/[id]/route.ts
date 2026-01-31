import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const booking = await Booking.findById(params.id)
      .populate('user', 'name email')
      .populate('resource', 'name type')
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Get booking error:", error)
    return NextResponse.json(
      { error: "Failed to fetch booking" },
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
    
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('resource', 'name type')
    
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const booking = await Booking.findByIdAndDelete(params.id)
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: "Booking deleted successfully"
    })
  } catch (error) {
    console.error("Delete booking error:", error)
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    )
  }
}
