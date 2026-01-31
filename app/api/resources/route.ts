import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Resource from "@/lib/models/Resource"

// GET all resources or filter by query params
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const available = searchParams.get('available')
    
    const filter: any = {}
    if (type) filter.type = type
    if (available !== null) filter.available = available === 'true'
    
    const resources = await Resource.find(filter).sort({ name: 1 })
    
    return NextResponse.json({ resources })
  } catch (error) {
    console.error("Get resources error:", error)
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    )
  }
}

// POST create new resource
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const {
      name,
      type,
      description,
      capacity,
      location,
      amenities,
      image,
      pricePerHour
    } = data
    
    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      )
    }
    
    // Create resource
    const resource = await Resource.create({
      name,
      type,
      description,
      capacity,
      location,
      amenities: amenities || [],
      image,
      available: true,
      pricePerHour: pricePerHour || 0
    })
    
    return NextResponse.json({
      resource,
      message: "Resource created successfully"
    }, { status: 201 })
  } catch (error) {
    console.error("Create resource error:", error)
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    )
  }
}
