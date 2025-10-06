"use client"

import type React from "react"

import { Search, Settings, Bell, Menu, HelpCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push("/")
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold tracking-tight">Paga</div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <Link href="/dashboard">
              <button
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
            </Link>
            <Link href="/charges">
              <button
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                  isActive("/charges")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                Cobranças
              </button>
            </Link>
            <Link href="/invoices">
              <button
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                  pathname.startsWith("/invoices")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                Faturas
              </button>
            </Link>
           
            <Link href="/settings">
              <button
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                  pathname.startsWith("/settings")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                Configurações
              </button>
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar"
              className="h-11 w-48 md:w-64 rounded-full border-0 bg-muted pl-11 pr-4 text-sm focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Bell className="h-5 w-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Avatar className="h-10 w-10 cursor-pointer transition-opacity hover:opacity-80">
                  <AvatarImage src="/woman-profile.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">João Pedro</p>
                  <p className="text-xs leading-none text-muted-foreground">joao@paga.ao</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ajuda</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Terminar sessão</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/woman-profile.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">João Pedro</p>
                    <p className="text-xs text-muted-foreground">joao@paga.ao</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive("/dashboard")
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/charges" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive("/charges")
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      Cobranças
                    </button>
                  </Link>
                  <Link href="/invoices" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.startsWith("/invoices")
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      Faturas
                    </button>
                  </Link>
                 
                  <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.startsWith("/settings")
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      Configurações
                    </button>
                  </Link>
                  <Link href="/help" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                      Ajuda
                    </button>
                  </Link>
                </nav>

                <div className="sm:hidden pt-2">
                  <form
                    onSubmit={(e) => {
                      handleSearch(e)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Pesquisar"
                        className="h-11 w-full rounded-full border-0 bg-muted pl-11 pr-4 text-sm focus-visible:ring-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>

                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="w-full text-left rounded-2xl px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 inline-block h-4 w-4" />
                    Terminar sessão
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
