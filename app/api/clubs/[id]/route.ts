import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Club from "@/lib/models/Club"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const club = await Club.findById(params.id)
      .populate('president', 'name email avatar')
      .populate('members', 'name email avatar department year')
      .populate('events', 'title startDate location status')
    
    if (!club) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ club })
  } catch (error) {
    console.error("Get club error:", error)
    return NextResponse.json(
      { error: "Failed to fetch club" },
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
    
    const club = await Club.findByIdAndUpdate(
      params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate('president', 'name email')
    
    if (!club) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      club,
      message: "Club updated successfully"
    })
  } catch (error) {
    console.error("Update club error:", error)
    return NextResponse.json(
      { error: "Failed to update club" },
      { status: 500 }
    )
  }
}
