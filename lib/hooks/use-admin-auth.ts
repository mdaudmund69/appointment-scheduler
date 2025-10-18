"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"

export function useAdminAuth() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminAuth = async () => {
      const supabase = getSupabaseClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
        return
      }

      // Check if user is admin
      const { data: barber } = await supabase.from("barbers").select("is_admin").eq("user_id", session.user.id).single()

      if (!barber?.is_admin) {
        router.push("/")
        return
      }

      setUser(session.user)
      setIsAdmin(true)
      setLoading(false)
    }

    checkAdminAuth()
  }, [router])

  return { user, isAdmin, loading }
}
