"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { User, Building2, Bell, Shield, Globe } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/settings/profile", label: "Perfil", icon: User },
    { href: "/settings/business", label: "Negócios", icon: Building2 },
    { href: "/settings/notifications", label: "Notificações", icon: Bell },
    { href: "/settings/security", label: "Segurança", icon: Shield },
    { href: "/settings/preferences", label: "Preferências", icon: Globe },
  ]

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Configurações</h1>
          <p className="mt-2 text-muted-foreground">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <Card className="rounded-3xl border-0 p-2 shadow-sm">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href}>
                      <button
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    </Link>
                  )
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">{children}</div>
        </div>
      </main>
    </div>
  )
}
