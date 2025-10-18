"use server"

import { stripe } from "@/lib/stripe"
import { SUBSCRIPTION_PLANS } from "@/lib/products"

export async function createSubscriptionCheckout(planId: string, barberId: string) {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)

  if (!plan) {
    throw new Error(`Plan with id "${planId}" not found`)
  }

  // Free plan doesn't need checkout
  if (plan.priceInCents === 0) {
    return { clientSecret: null, message: "Free plan activated" }
  }

  // Create checkout session for subscription
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.priceInCents,
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {
      barberId,
      planId,
    },
  })

  return { clientSecret: session.client_secret }
}

export async function createBookingPaymentCheckout(
  bookingId: string,
  serviceId: string,
  priceInCents: number,
  serviceName: string,
) {
  // Create checkout session for booking payment
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: serviceName,
            description: "Appointment booking payment",
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      bookingId,
      serviceId,
    },
  })

  return { clientSecret: session.client_secret }
}

export async function getCheckoutSessionStatus(clientSecret: string) {
  const session = await stripe.checkout.sessions.retrieve(clientSecret)
  return {
    status: session.payment_status,
    paymentStatus: session.payment_status,
    subscriptionId: session.subscription,
  }
}
