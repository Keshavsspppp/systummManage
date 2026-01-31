import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Club from "@/lib/models/Club"

// GET all clubs or filter by query params
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')
    
    const filter: any = {}
    if (category) filter.category = category
    if (isActive !== null) filter.isActive = isActive === 'true'
    
    const clubs = await Club.find(filter)
      .populate('president', 'name email')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({ clubs })
  } catch (error) {
    console.error("Get clubs error:", error)
    return NextResponse.json(
      { error: "Failed to fetch clubs" },
      { status: 500 }
    )
  }
}

// POST create new club
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const {
      name,
      description,
      category,
      presidentId,
      logo,
      coverImage,
      email,
      instagram,
      linkedin,
      website
    } = data
    
    // Validate required fields
    if (!name || !description || !category || !presidentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Check if club with same name exists
    const existingClub = await Club.findOne({ name })
    if (existingClub) {
      return NextResponse.json(
        { error: "Club with this name already exists" },
        { status: 400 }
      )
    }
    
    // Create club
    const club = await Club.create({
      name,
      description,
      category,
      president: presidentId,
      members: [presidentId],
      memberCount: 1,
      logo,
      coverImage,
      email,
      instagram,
      linkedin,
      website,
      isActive: true,
      events: []
    })
    
    const populatedClub = await Club.findById(club._id)
      .populate('president', 'name email')
    
    return NextResponse.json({
      club: populatedClub,
      message: "Club created successfully"
    }, { status: 201 })
  } catch (error) {
    console.error("Create club error:", error)
    return NextResponse.json(
      { error: "Failed to create club" },
      { status: 500 }
    )
  }
}
