import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  description?: string
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard title="Today's Bookings" value="5" icon="📅" description="Confirmed appointments" />
      <StatCard title="Total Clients" value="124" icon="👥" description="Repeat customers" />
      <StatCard title="Revenue (Month)" value="$2,450" icon="💰" description="From bookings" />
      <StatCard title="Rating" value="4.8★" icon="⭐" description="From 45 reviews" />
    </div>
  )
}
