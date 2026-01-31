import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Notification from "@/lib/models/Notification"

// GET notifications for a user
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const unreadOnly = searchParams.get('unreadOnly')
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }
    
    const filter: any = { userId }
    if (unreadOnly === 'true') filter.read = false
    
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
    
    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

// POST create notification
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const { userId, type, title, message, link } = data
    
    // Validate required fields
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Create notification
    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      link,
      read: false
    })
    
    return NextResponse.json({
      notification,
      message: "Notification created successfully"
    }, { status: 201 })
  } catch (error) {
    console.error("Create notification error:", error)
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

// PATCH mark notification as read
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect()
    
    const { notificationId, read } = await request.json()
    
    if (!notificationId) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      )
    }
    
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read },
      { new: true }
    )
    
    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      notification,
      message: "Notification updated successfully"
    })
  } catch (error) {
    console.error("Update notification error:", error)
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    )
  }
}
