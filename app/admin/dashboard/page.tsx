"use client"

import { useAdminAuth } from "@/lib/hooks/use-admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Admin Dashboard" description="Platform overview and key metrics" />
        <div className="flex-1 overflow-auto p-8">
          <AdminStats />

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Recent Barber Signups</CardTitle>
                <CardDescription>Last 5 new barbers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">Barber Shop {i}</p>
                        <p className="text-sm text-muted-foreground">Joined 2 days ago</p>
                      </div>
                      <span className="text-sm font-medium text-primary">Active</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Subscription Breakdown</CardTitle>
                <CardDescription>Current subscription distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Free Plan</span>
                  <span className="font-semibold text-foreground">450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Basic Plan</span>
                  <span className="font-semibold text-foreground">320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Pro Plan</span>
                  <span className="font-semibold text-foreground">280</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Premium Plan</span>
                  <span className="font-semibold text-foreground">184</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
