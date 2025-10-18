import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { clientPhone, clientName, bookingDate, startTime, serviceName } = await request.json()

    // In production, this would use Twilio API
    const message = `Hi ${clientName}, reminder: You have a ${serviceName} appointment on ${bookingDate} at ${startTime}. Reply STOP to unsubscribe.`

    console.log("Sending SMS reminder:", {
      to: clientPhone,
      message,
    })

    return NextResponse.json({ success: true, message: "SMS reminder sent" })
  } catch (error) {
    console.error("SMS send error:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}
