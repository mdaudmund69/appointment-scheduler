"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Service {
  id: string
  name: string
  duration: number
  price: number
}

interface BookingFormProps {
  barberId: string
  services: Service[]
}

export function BookingForm({ barberId, services }: BookingFormProps) {
  const [selectedService, setSelectedService] = useState<string>(services[0]?.id || "")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setFormData({ name: "", email: "", phone: "" })
      setSelectedDate("")
      setSelectedTime("")
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Generate time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ]

  // Get tomorrow's date as minimum
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  const selectedServiceData = services.find((s) => s.id === selectedService)

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Book Your Appointment</CardTitle>
        <CardDescription>Fill in your details and select your preferred time</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="rounded-lg bg-green-50 p-6 text-center">
            <p className="text-lg font-semibold text-green-900 mb-2">Booking Confirmed!</p>
            <p className="text-green-700 mb-4">
              A confirmation email has been sent to {formData.email}. We look forward to seeing you!
            </p>
            <Button onClick={() => setSuccess(false)}>Book Another Appointment</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Select Service</label>
              <div className="grid gap-2">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30"
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 flex-1">
                      <span className="font-medium text-foreground">{service.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({service.duration} min • ${service.price})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                Preferred Date
              </label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDate}
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Preferred Time</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 md:p-3 rounded-lg border transition text-sm md:text-base ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-semibold text-foreground">Your Information</h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Summary */}
            {selectedServiceData && selectedDate && selectedTime && (
              <div className="rounded-lg bg-secondary/30 p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Booking Summary</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Service:</span>{" "}
                    <span className="font-medium text-foreground">{selectedServiceData.name}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Date:</span>{" "}
                    <span className="font-medium text-foreground">{selectedDate}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Time:</span>{" "}
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </p>
                  <p className="pt-2 border-t border-border">
                    <span className="text-muted-foreground">Total:</span>{" "}
                    <span className="font-bold text-foreground">${selectedServiceData.price}</span>
                  </p>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || !selectedDate || !selectedTime}>
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
