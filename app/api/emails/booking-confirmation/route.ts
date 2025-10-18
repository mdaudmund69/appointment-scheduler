import { sendBookingConfirmation } from "@/lib/email/send"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await sendBookingConfirmation({
      clientEmail: body.clientEmail,
      clientName: body.clientName,
      barberName: body.barberName,
      serviceName: body.serviceName,
      bookingDate: body.bookingDate,
      startTime: body.startTime,
      barberAddress: body.barberAddress,
      barberPhone: body.barberPhone,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send booking confirmation:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
