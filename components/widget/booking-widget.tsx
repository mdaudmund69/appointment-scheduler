"use client"
import { BookingForm } from "@/components/booking/booking-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingWidgetProps {
  barberId: string
  services: Array<{
    id: string
    name: string
    duration: number
    price: number
  }>
  businessName?: string
}

export function BookingWidget({ barberId, services, businessName = "TrimSlotr" }: BookingWidgetProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">{businessName}</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingForm barberId={barberId} services={services} />
        </CardContent>
      </Card>
    </div>
  )
}
