"use client"

import { useState } from "react"
import { CheckCircle, Clock, MapPin, User } from "lucide-react"
import { format } from "date-fns"

interface BookingConfirmationProps {
  booking: {
    id: string
    clientName: string
    clientEmail: string
    bookingDate: string
    startTime: string
    endTime: string
    serviceName: string
    barberName: string
    barberAddress: string
    price: number
  }
  paymentStatus?: string
}

export default function BookingConfirmation({ booking, paymentStatus }: BookingConfirmationProps) {
  const [isPaid, setIsPaid] = useState(paymentStatus === "paid")

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-8">
      <div className="mb-6 flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-green-600" />
        <h2 className="text-2xl font-bold text-green-900">Booking Confirmed!</h2>
      </div>

      <p className="mb-6 text-green-800">
        Your appointment has been confirmed. A confirmation email has been sent to {booking.clientEmail}
      </p>

      <div className="space-y-4 rounded-lg bg-white p-6">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Barber</p>
            <p className="font-semibold text-gray-900">{booking.barberName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-semibold text-gray-900">
              {format(new Date(booking.bookingDate), "MMMM dd, yyyy")} at {booking.startTime}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold text-gray-900">{booking.barberAddress}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Service</p>
          <p className="font-semibold text-gray-900">{booking.serviceName}</p>
          <p className="mt-2 text-lg font-bold text-gray-900">${(booking.price / 100).toFixed(2)}</p>
        </div>

        {isPaid && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-green-600">Payment Received</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button className="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors">
          Add to Calendar
        </button>
        <button className="flex-1 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
          Download Receipt
        </button>
      </div>
    </div>
  )
}
