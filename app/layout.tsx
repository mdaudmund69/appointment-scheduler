import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "TrimSlotr - Appointment Scheduling for Barbers & Salons",
  description: "Manage bookings, clients, and payments all in one place. Start accepting online appointments today.",
  keywords: ["barber", "salon", "appointments", "scheduling", "booking", "management"],
  authors: [{ name: "TrimSlotr" }],
  openGraph: {
    title: "TrimSlotr - Appointment Scheduling for Barbers & Salons",
    description: "The easiest way to manage appointments for barbers and salons.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
