import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminStats() {
  const stats = [
    { label: "Total Barbers", value: "1,234", change: "+12%" },
    { label: "Active Bookings", value: "5,678", change: "+8%" },
    { label: "Total Revenue", value: "$45,230", change: "+23%" },
    { label: "Subscription Revenue", value: "$12,450", change: "+15%" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
