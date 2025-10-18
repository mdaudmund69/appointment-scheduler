"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SUBSCRIPTION_PLANS } from "@/lib/products"
import PlanCard from "@/components/subscription/plan-card"
import SubscriptionCheckout from "@/components/checkout/subscription-checkout"

export default function UpgradeSubscriptionPage() {
  const router = useRouter()
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [barberId, setBarberId] = useState<string>("")

  // Get barber ID from session/context
  // This would typically come from useAuth hook or context
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId)
  }

  const handleCheckoutSuccess = () => {
    router.push("/barber/dashboard/subscription?success=true")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="mt-2 text-gray-600">Select the perfect plan for your business</p>
      </div>

      {selectedPlanId ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <button
            onClick={() => setSelectedPlanId(null)}
            className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Plans
          </button>
          <SubscriptionCheckout planId={selectedPlanId} barberId={barberId} onSuccess={handleCheckoutSuccess} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={() => handlePlanSelect(plan.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
