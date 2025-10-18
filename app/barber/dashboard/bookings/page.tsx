"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BookingsPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const bookings = [
    { id: 1, client: "John Doe", service: "Haircut", date: "2025-01-20", time: "10:00 AM", status: "confirmed" },
    { id: 2, client: "Jane Smith", service: "Beard Trim", date: "2025-01-20", time: "11:30 AM", status: "confirmed" },
    { id: 3, client: "Mike Johnson", service: "Fade", date: "2025-01-20", time: "2:00 PM", status: "pending" },
    {
      id: 4,
      client: "Sarah Williams",
      service: "Haircut + Beard",
      date: "2025-01-21",
      time: "9:00 AM",
      status: "confirmed",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Bookings" description="Manage all your appointments" />
        <div className="flex-1 overflow-auto p-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="py-3 px-4 text-foreground">{booking.client}</td>
                        <td className="py-3 px-4 text-foreground">{booking.service}</td>
                        <td className="py-3 px-4 text-foreground">{booking.date}</td>
                        <td className="py-3 px-4 text-foreground">{booking.time}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
