"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: "📊" },
  { href: "/admin/dashboard/barbers", label: "Barbers", icon: "💼" },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: "📈" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">TrimSlotr</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start">
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}
