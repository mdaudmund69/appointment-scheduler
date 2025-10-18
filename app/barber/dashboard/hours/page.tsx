"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HoursPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Working Hours" description="Set your availability" />
        <div className="flex-1 overflow-auto p-8">
          <Card className="border border-border max-w-2xl">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                  <div className="w-24">
                    <p className="font-medium text-foreground">{day}</p>
                  </div>
                  <div className="flex gap-2 flex-1">
                    <Input type="time" defaultValue="09:00" className="w-24" />
                    <span className="flex items-center text-muted-foreground">to</span>
                    <Input type="time" defaultValue="18:00" className="w-24" />
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">Open</span>
                  </label>
                </div>
              ))}
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
