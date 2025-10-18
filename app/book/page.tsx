"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data - in production, this would come from the database
const barbers = [
  {
    id: "1",
    businessName: "Classic Cuts Barbershop",
    rating: 4.9,
    reviews: 128,
    image: "/barber-shop.jpg",
    address: "123 Main St, Downtown",
    services: ["Haircut", "Beard Trim", "Fade"],
    nextAvailable: "Today at 2:00 PM",
  },
  {
    id: "2",
    businessName: "The Fade Masters",
    rating: 4.8,
    reviews: 95,
    image: "/barbershop-interior.jpg",
    address: "456 Oak Ave, Midtown",
    services: ["Haircut", "Fade", "Line Up"],
    nextAvailable: "Tomorrow at 10:00 AM",
  },
  {
    id: "3",
    businessName: "Premium Grooming Co",
    rating: 4.7,
    reviews: 156,
    image: "/professional-barber.jpg",
    address: "789 Pine Rd, Uptown",
    services: ["Haircut", "Beard Trim", "Fade", "Shave"],
    nextAvailable: "Today at 4:30 PM",
  },
  {
    id: "4",
    businessName: "Urban Barber Studio",
    rating: 4.9,
    reviews: 203,
    image: "/modern-barbershop.jpg",
    address: "321 Elm St, Arts District",
    services: ["Haircut", "Fade", "Design"],
    nextAvailable: "Today at 3:00 PM",
  },
]

export default function BookPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBarbers = barbers.filter(
    (barber) =>
      barber.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary">
            TrimSlotr
          </Link>
          <p className="mt-2 text-muted-foreground">Find and book your perfect barber</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="border-b border-border bg-secondary/30 px-4 py-6 md:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Find a Barber</h1>
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md text-base"
            />
          </div>
        </div>
      </div>

      {/* Barbers Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {filteredBarbers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No barbers found matching your search.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBarbers.map((barber) => (
              <Card key={barber.id} className="border border-border overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={barber.image || "/placeholder.svg"}
                    alt={barber.businessName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{barber.businessName}</CardTitle>
                  <CardDescription>{barber.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">{barber.rating}★</span>
                    <span className="text-sm text-muted-foreground">({barber.reviews} reviews)</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {barber.services.map((service) => (
                        <span
                          key={service}
                          className="inline-block bg-secondary px-2 py-1 rounded text-xs text-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Next available: {barber.nextAvailable}</p>
                    <Link href={`/book/${barber.id}`}>
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
