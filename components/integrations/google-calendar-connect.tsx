"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Check } from "lucide-react"

interface GoogleCalendarConnectProps {
  isConnected?: boolean
  onConnect?: () => void
}

export function GoogleCalendarConnect({ isConnected = false, onConnect }: GoogleCalendarConnectProps) {
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    try {
      // In production, this would initiate OAuth flow
      const response = await fetch("/api/calendar/auth", { method: "POST" })
      const data = await response.json()
      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error("Failed to connect Google Calendar:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Google Calendar</CardTitle>
              <CardDescription>Sync bookings to your calendar</CardDescription>
            </div>
          </div>
          {isConnected && <Check className="h-5 w-5 text-green-600" />}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {isConnected
            ? "Your bookings are automatically synced to Google Calendar"
            : "Connect your Google Calendar to automatically sync all bookings"}
        </p>
        {!isConnected && (
          <Button onClick={handleConnect} disabled={loading} className="w-full">
            {loading ? "Connecting..." : "Connect Google Calendar"}
          </Button>
        )}
        {isConnected && (
          <Button variant="outline" className="w-full bg-transparent">
            Disconnect
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
