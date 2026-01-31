import { NextRequest, NextResponse } from "next/server"
import { UserRole } from "@/types"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { name, email, password, role, department, year, phone } = await request.json()

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    if (!["admin", "organizer", "participant"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role as UserRole,
      department,
      year,
      phone,
      clubMemberships: [],
      registeredEvents: [],
    })

    // Remove password from response
    const userResponse = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      year: newUser.year,
      phone: newUser.phone,
      clubMemberships: newUser.clubMemberships,
      registeredEvents: newUser.registeredEvents,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json({
      user: userResponse,
      message: "Signup successful",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
