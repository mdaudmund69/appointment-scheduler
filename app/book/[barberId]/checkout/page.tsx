"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BookingPaymentCheckout from "@/components/checkout/booking-payment-checkout"
import BookingConfirmation from "@/components/booking/booking-confirmation"

export default function BookingCheckoutPage({ params }: { params: { barberId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentComplete, setPaymentComplete] = useState(false)

  const bookingData = {
    id: searchParams.get("bookingId") || "",
    clientName: searchParams.get("clientName") || "",
    clientEmail: searchParams.get("clientEmail") || "",
    bookingDate: searchParams.get("bookingDate") || "",
    startTime: searchParams.get("startTime") || "",
    endTime: searchParams.get("endTime") || "",
    serviceName: searchParams.get("serviceName") || "",
    barberName: searchParams.get("barberName") || "",
    barberAddress: searchParams.get("barberAddress") || "",
    price: Number.parseInt(searchParams.get("price") || "0"),
  }

  const serviceId = searchParams.get("serviceId") || ""

  if (paymentComplete) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <BookingConfirmation booking={bookingData} paymentStatus="paid" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
        <p className="mt-2 text-gray-600">Review your appointment details and complete payment</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Booking Summary</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Service:</span> {bookingData.serviceName}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {bookingData.bookingDate}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {bookingData.startTime}
          </p>
          <p>
            <span className="font-semibold">Barber:</span> {bookingData.barberName}
          </p>
          <p className="border-t pt-2 text-lg font-bold">Total: ${(bookingData.price / 100).toFixed(2)}</p>
        </div>
      </div>

      <BookingPaymentCheckout
        bookingId={bookingData.id}
        serviceId={serviceId}
        priceInCents={bookingData.price}
        serviceName={bookingData.serviceName}
        onSuccess={() => setPaymentComplete(true)}
      />
    </div>
  )
}
