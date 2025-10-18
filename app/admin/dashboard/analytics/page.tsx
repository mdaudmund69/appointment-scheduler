"use client"

import { useAdminAuth } from "@/lib/hooks/use-admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Analytics & Reporting" description="Platform performance metrics" />
        <div className="flex-1 overflow-auto p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">January</span>
                    <span className="font-semibold text-foreground">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">February</span>
                    <span className="font-semibold text-foreground">$15,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">March</span>
                    <span className="font-semibold text-foreground">$18,900</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">April</span>
                    <span className="font-semibold text-foreground">$22,100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Booking Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Total Bookings</span>
                    <span className="font-semibold text-foreground">12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Completed</span>
                    <span className="font-semibold text-green-600">11,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Cancelled</span>
                    <span className="font-semibold text-red-600">890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">No-show</span>
                    <span className="font-semibold text-yellow-600">360</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
