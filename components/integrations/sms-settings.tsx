"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Check } from "lucide-react"

interface SMSSettingsProps {
  isEnabled?: boolean
  phoneNumber?: string
}

export function SMSSettings({ isEnabled = false, phoneNumber }: SMSSettingsProps) {
  const [phone, setPhone] = useState(phoneNumber || "")
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(isEnabled)

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/sms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, enabled: true }),
      })
      if (response.ok) {
        setEnabled(true)
      }
    } catch (error) {
      console.error("Failed to save SMS settings:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>SMS Reminders</CardTitle>
              <CardDescription>Send appointment reminders via SMS</CardDescription>
            </div>
          </div>
          {enabled && <Check className="h-5 w-5 text-green-600" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Twilio Phone Number</label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={enabled}
          />
          <p className="text-xs text-muted-foreground mt-1">Your Twilio phone number for sending SMS</p>
        </div>
        {!enabled ? (
          <Button onClick={handleSave} disabled={loading || !phone} className="w-full">
            {loading ? "Saving..." : "Enable SMS Reminders"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-transparent">
            Disable SMS Reminders
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
