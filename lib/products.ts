export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
  bookingLimit: number
  supportLevel: string
}

// Subscription plans for barbers
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    priceInCents: 0,
    features: ["Up to 10 bookings per month", "Basic booking management", "Email notifications", "Mobile responsive"],
    bookingLimit: 10,
    supportLevel: "community",
  },
  {
    id: "basic",
    name: "Basic",
    description: "For growing businesses",
    priceInCents: 2999, // $29.99/month
    features: [
      "Unlimited bookings",
      "Advanced booking management",
      "Email & SMS notifications",
      "Analytics dashboard",
      "Custom working hours",
      "Service management",
      "Email support",
    ],
    bookingLimit: -1, // unlimited
    supportLevel: "email",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For established salons",
    priceInCents: 7999, // $79.99/month
    features: [
      "Everything in Basic",
      "Multiple staff members",
      "Advanced analytics",
      "Google Calendar sync",
      "SMS reminders",
      "Custom branding",
      "Priority email support",
      "API access",
    ],
    bookingLimit: -1,
    supportLevel: "priority",
  },
  {
    id: "premium",
    name: "Premium",
    description: "For large operations",
    priceInCents: 19999, // $199.99/month
    features: [
      "Everything in Pro",
      "Unlimited staff members",
      "White-label solution",
      "Advanced integrations",
      "Dedicated account manager",
      "Phone & email support",
      "Custom development",
      "SLA guarantee",
    ],
    bookingLimit: -1,
    supportLevel: "dedicated",
  },
]

// Service booking prices (for client payments)
export interface ServicePrice {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const SERVICE_PRICES: ServicePrice[] = [
  {
    id: "haircut",
    name: "Haircut",
    description: "Standard haircut service",
    priceInCents: 2500, // $25.00
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    description: "Beard trimming and shaping",
    priceInCents: 1500, // $15.00
  },
  {
    id: "full-service",
    name: "Full Service",
    description: "Haircut + beard trim + styling",
    priceInCents: 4000, // $40.00
  },
]
