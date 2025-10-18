import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { bookingId, bookingDate, startTime, serviceName, clientName } = await request.json()

    // In production, this would use Google Calendar API
    // For now, return success response
    console.log("Syncing booking to Google Calendar:", {
      bookingId,
      bookingDate,
      startTime,
      serviceName,
      clientName,
    })

    return NextResponse.json({ success: true, message: "Booking synced to calendar" })
  } catch (error) {
    console.error("Calendar sync error:", error)
    return NextResponse.json({ error: "Failed to sync calendar" }, { status: 500 })
  }
}
