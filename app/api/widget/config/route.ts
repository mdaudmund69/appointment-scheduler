import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const barberId = request.nextUrl.searchParams.get("barberId")

  if (!barberId) {
    return NextResponse.json({ error: "barberId is required" }, { status: 400 })
  }

  // In production, fetch from database
  const config = {
    barberId,
    businessName: "TrimSlotr Barber",
    services: [
      { id: "1", name: "Haircut", duration: 30, price: 25 },
      { id: "2", name: "Beard Trim", duration: 15, price: 15 },
    ],
  }

  return NextResponse.json(config)
}
