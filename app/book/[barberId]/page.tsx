"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingForm } from "@/components/booking/booking-form"

// Mock barber data
const barberData = {
  "1": {
    businessName: "Classic Cuts Barbershop",
    rating: 4.9,
    reviews: 128,
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    services: [
      { id: "1", name: "Haircut", duration: 30, price: 25 },
      { id: "2", name: "Beard Trim", duration: 15, price: 15 },
      { id: "3", name: "Fade", duration: 45, price: 35 },
      { id: "4", name: "Haircut + Beard", duration: 45, price: 40 },
    ],
  },
  "2": {
    businessName: "The Fade Masters",
    rating: 4.8,
    reviews: 95,
    address: "456 Oak Ave, Midtown",
    phone: "(555) 234-5678",
    services: [
      { id: "1", name: "Haircut", duration: 30, price: 25 },
      { id: "2", name: "Fade", duration: 45, price: 35 },
      { id: "3", name: "Line Up", duration: 20, price: 15 },
    ],
  },
}

export default function BarberDetailPage({ params }: { params: { barberId: string } }) {
  const barber = barberData[params.barberId as keyof typeof barberData]

  if (!barber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Barber not found</h1>
          <Link href="/book">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link href="/book" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{barber.businessName}</h1>
          <div className="mt-2 flex items-center gap-4">
            <span className="text-lg font-semibold text-foreground">{barber.rating}★</span>
            <span className="text-muted-foreground">({barber.reviews} reviews)</span>
            <span className="text-muted-foreground">{barber.address}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {/* Services */}
          <div className="lg:col-span-1">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {barber.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between items-start pb-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.duration} min</p>
                    </div>
                    <p className="font-semibold text-foreground">${service.price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border mt-6">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{barber.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{barber.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <BookingForm barberId={params.barberId} services={barber.services} />
          </div>
        </div>
      </div>
    </main>
  )
}
