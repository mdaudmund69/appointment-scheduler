import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Appointment Scheduling Made Simple
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl">
            TrimSlotr helps barbers and salons manage bookings, clients, and payments all in one place. Start accepting
            online appointments today.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/barber/signup">
              <Button size="lg" className="w-full sm:w-auto">
                For Barbers & Salons
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Book an Appointment
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <p className="mt-2 text-sm text-muted-foreground">Active Barbers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <p className="mt-2 text-sm text-muted-foreground">Bookings Monthly</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <p className="mt-2 text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
