import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import SubscriptionDetails from "@/components/subscription/subscription-details"
import Link from "next/link"

export default async function SubscriptionPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
    proSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/barber/login")
  }

  const { data: barber, error } = await supabase
    .from("barbers")
    .select("id, subscription_tier, subscription_status, subscription_end_date")
    .eq("user_id", user.id)
    .single()

  if (error || !barber) {
    redirect("/barber/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="mt-2 text-gray-600">Manage your TrimSlotr subscription and billing</p>
      </div>

      <SubscriptionDetails
        tier={barber.subscription_tier}
        status={barber.subscription_status}
        endDate={barber.subscription_end_date}
      />

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Manage Subscription</h2>
        <p className="mb-4 text-gray-600">
          {barber.subscription_tier === "free"
            ? "Upgrade to unlock more features and grow your business."
            : "Change your subscription plan or manage billing."}
        </p>
        <Link
          href="/barber/dashboard/subscription/upgrade"
          className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {barber.subscription_tier === "free" ? "View Plans" : "Change Plan"}
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Billing History</h2>
        <p className="text-gray-600">Your billing history and invoices will appear here.</p>
      </div>
    </div>
  )
}
