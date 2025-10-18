import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Create your barber profile in minutes",
  },
  {
    number: "2",
    title: "Add Services",
    description: "List your services with pricing and duration",
  },
  {
    number: "3",
    title: "Set Hours",
    description: "Define your working hours and availability",
  },
  {
    number: "4",
    title: "Start Booking",
    description: "Clients can book appointments online instantly",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary/30 px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">Get started in 4 simple steps</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="border border-border">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    {step.number}
                  </div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-6 hidden h-1 w-8 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
