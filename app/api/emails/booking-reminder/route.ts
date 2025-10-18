import { sendBookingReminder } from "@/lib/email/send"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await sendBookingReminder({
      clientEmail: body.clientEmail,
      clientName: body.clientName,
      barberName: body.barberName,
      serviceName: body.serviceName,
      bookingDate: body.bookingDate,
      startTime: body.startTime,
      barberAddress: body.barberAddress,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send booking reminder:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
