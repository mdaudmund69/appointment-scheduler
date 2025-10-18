"use client"

import { BookingWidget } from "@/components/widget/booking-widget"

// Mock barber data
const barberData: Record<string, any> = {
  "1": {
    businessName: "Classic Cuts Barbershop",
    services: [
      { id: "1", name: "Haircut", duration: 30, price: 25 },
      { id: "2", name: "Beard Trim", duration: 15, price: 15 },
      { id: "3", name: "Fade", duration: 45, price: 35 },
    ],
  },
}

export default function WidgetPage({ params }: { params: { barberId: string } }) {
  const barber = barberData[params.barberId]

  if (!barber) {
    return <div className="flex items-center justify-center min-h-screen">Barber not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <BookingWidget barberId={params.barberId} services={barber.services} businessName={barber.businessName} />
    </div>
  )
}
