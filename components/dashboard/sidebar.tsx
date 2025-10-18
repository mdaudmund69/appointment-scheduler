"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/barber/dashboard", label: "Overview", icon: "📊" },
  { href: "/barber/dashboard/bookings", label: "Bookings", icon: "📅" },
  { href: "/barber/dashboard/services", label: "Services", icon: "✂️" },
  { href: "/barber/dashboard/hours", label: "Working Hours", icon: "🕐" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg bg-card border border-border">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 border-r border-border bg-card h-screen md:h-auto transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">TrimSlotr</h1>
            <p className="text-sm text-muted-foreground">Barber Dashboard</p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
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

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
