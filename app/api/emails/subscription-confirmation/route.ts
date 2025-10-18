import { sendSubscriptionConfirmation } from "@/lib/email/send"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await sendSubscriptionConfirmation({
      barberEmail: body.barberEmail,
      barberName: body.barberName,
      planName: body.planName,
      amount: body.amount,
      renewalDate: body.renewalDate,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send subscription confirmation:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
