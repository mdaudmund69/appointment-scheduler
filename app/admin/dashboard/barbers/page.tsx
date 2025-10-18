"use client"

import { useAdminAuth } from "@/lib/hooks/use-admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BarbersPage() {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const barbers = [
    { id: 1, name: "John's Barbershop", email: "john@example.com", tier: "Pro", status: "active", bookings: 45 },
    { id: 2, name: "Classic Cuts", email: "classic@example.com", tier: "Basic", status: "active", bookings: 28 },
    { id: 3, name: "Modern Fade", email: "modern@example.com", tier: "Premium", status: "active", bookings: 67 },
    { id: 4, name: "Barber's Choice", email: "choice@example.com", tier: "Free", status: "inactive", bookings: 12 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Barber Management" description="Manage all barbers on the platform" />
        <div className="flex-1 overflow-auto p-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>All Barbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Business Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Subscription</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Bookings</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barbers.map((barber) => (
                      <tr key={barber.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="py-3 px-4 text-foreground">{barber.name}</td>
                        <td className="py-3 px-4 text-foreground">{barber.email}</td>
                        <td className="py-3 px-4 text-foreground">{barber.tier}</td>
                        <td className="py-3 px-4 text-foreground">{barber.bookings}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              barber.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {barber.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View
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
