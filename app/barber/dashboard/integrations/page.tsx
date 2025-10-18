"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { GoogleCalendarConnect } from "@/components/integrations/google-calendar-connect"
import { SMSSettings } from "@/components/integrations/sms-settings"

export default function IntegrationsPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Integrations" description="Connect third-party services to enhance your business" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl space-y-6">
            <GoogleCalendarConnect isConnected={false} />
            <SMSSettings isEnabled={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
