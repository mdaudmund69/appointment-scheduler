import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getBarberSubscription(barberId: string) {
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

  const { data, error } = await supabase
    .from("barbers")
    .select("subscription_tier, subscription_status, subscription_end_date")
    .eq("id", barberId)
    .single()

  if (error) throw error
  return data
}

export async function updateBarberSubscription(barberId: string, tier: string, status: string, endDate: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  const { data, error } = await supabase
    .from("barbers")
    .update({
      subscription_tier: tier,
      subscription_status: status,
      subscription_end_date: endDate,
    })
    .eq("id", barberId)
    .select()
    .single()

  if (error) throw error
  return data
}
