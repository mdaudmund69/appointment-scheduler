import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Online Booking",
    description: "Let clients book appointments 24/7 without phone calls",
    icon: "📅",
  },
  {
    title: "Automated Reminders",
    description: "Reduce no-shows with email and SMS reminders",
    icon: "🔔",
  },
  {
    title: "Service Management",
    description: "Create custom services with pricing and duration",
    icon: "✂️",
  },
  {
    title: "Client Profiles",
    description: "Keep track of client preferences and history",
    icon: "👤",
  },
  {
    title: "Payment Processing",
    description: "Accept payments securely with Stripe integration",
    icon: "💳",
  },
  {
    title: "Analytics Dashboard",
    description: "Track revenue, bookings, and business metrics",
    icon: "📊",
  },
]

export function Features() {
  return (
    <section className="px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Run Your Business
          </h2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            Powerful features designed specifically for barbers and salons
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-border">
              <CardHeader>
                <div className="text-4xl">{feature.icon}</div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
