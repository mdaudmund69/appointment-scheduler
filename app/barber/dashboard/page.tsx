"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Dashboard" description="Welcome back! Here's your business overview." />
        <div className="flex-1 overflow-auto p-8">
          <OverviewStats />

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Next 5 appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">Client {i}</p>
                        <p className="text-sm text-muted-foreground">Haircut • 2:00 PM</p>
                      </div>
                      <span className="text-sm font-medium text-primary">Confirmed</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition">
                  Add New Service
                </button>
                <button className="w-full rounded-lg border border-border px-4 py-2 text-foreground hover:bg-secondary transition">
                  Update Working Hours
                </button>
                <button className="w-full rounded-lg border border-border px-4 py-2 text-foreground hover:bg-secondary transition">
                  View All Bookings
                </button>
                <button className="w-full rounded-lg border border-border px-4 py-2 text-foreground hover:bg-secondary transition">
                  Manage Profile
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
