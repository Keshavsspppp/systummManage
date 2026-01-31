import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Club from "@/lib/models/Club"
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
    
    const club = await Club.findById(params.id)
    
    if (!club) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      )
    }
    
    // Check if user already a member
    if (club.members && club.members.includes(userId)) {
      return NextResponse.json(
        { error: "Already a member of this club" },
        { status: 400 }
      )
    }
    
    // Add member
    if (!club.members) club.members = []
    club.members.push(userId)
    club.memberCount = club.members.length
    await club.save()
    
    // Update user's club memberships
    await User.findByIdAndUpdate(userId, {
      $addToSet: { clubMemberships: params.id }
    })
    
    return NextResponse.json({
      message: "Successfully joined club"
    })
  } catch (error) {
    console.error("Join club error:", error)
    return NextResponse.json(
      { error: "Failed to join club" },
      { status: 500 }
    )
  }
}
