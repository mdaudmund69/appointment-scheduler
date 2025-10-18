import { stripe } from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clientSecret = request.nextUrl.searchParams.get("clientSecret")

    if (!clientSecret) {
      return NextResponse.json({ error: "Missing clientSecret" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(clientSecret)

    return NextResponse.json({
      paymentStatus: session.payment_status,
      status: session.status,
      subscriptionId: session.subscription,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get payment status" }, { status: 500 })
  }
}
