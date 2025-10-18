"use client"

import { Check } from "lucide-react"
import type { SubscriptionPlan } from "@/lib/products"

interface PlanCardProps {
  plan: SubscriptionPlan
  isCurrentPlan?: boolean
  onSelect?: () => void
}

export default function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  return (
    <div
      className={`rounded-lg border-2 p-6 transition-all ${
        isCurrentPlan ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-400"
      }`}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.description}</p>
      </div>

      <div className="mb-6">
        {plan.priceInCents === 0 ? (
          <div className="text-3xl font-bold text-gray-900">Free</div>
        ) : (
          <div>
            <span className="text-4xl font-bold text-gray-900">${(plan.priceInCents / 100).toFixed(2)}</span>
            <span className="text-gray-600">/month</span>
          </div>
        )}
      </div>

      <ul className="mb-6 space-y-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {isCurrentPlan ? (
        <button disabled className="w-full rounded-lg bg-gray-300 py-2 text-gray-700 font-semibold cursor-not-allowed">
          Current Plan
        </button>
      ) : (
        <button
          onClick={onSelect}
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {plan.priceInCents === 0 ? "Downgrade" : "Upgrade"}
        </button>
      )}
    </div>
  )
}
