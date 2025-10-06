"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, FileText, Users, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react"
import { charges, clients } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Search through charges and clients
  const searchResults = {
    charges: charges.filter(
      (charge) =>
        charge.client.toLowerCase().includes(query.toLowerCase()) ||
        charge.description?.toLowerCase().includes(query.toLowerCase()) ||
        charge.paymentMethod.toLowerCase().includes(query.toLowerCase()),
    ),
    clients: clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.email?.toLowerCase().includes(query.toLowerCase()),
    ),
  }

  const totalResults = searchResults.charges.length + searchResults.clients.length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-[#F59E0B]" />
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
      case "overdue":
        return <XCircle className="h-4 w-4 text-[#EF4444]" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "paid":
        return "Pago"
      case "overdue":
        return "Atrasado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Search className="h-5 w-5" />
            <span className="text-sm">Resultados da pesquisa</span>
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{query ? `"${query}"` : "Pesquisar"}</h1>
          <p className="mt-2 text-muted-foreground">
            {totalResults} {totalResults === 1 ? "resultado encontrado" : "resultados encontrados"}
          </p>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Charges Results */}
          {searchResults.charges.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Cobranças</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {searchResults.charges.length}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.charges.map((charge) => (
                  <Card key={charge.id} className="rounded-3xl border-0 p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={charge.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{charge.client[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{charge.client}</div>
                            <div className="text-sm text-muted-foreground">{charge.paymentMethod}</div>
                          </div>
                        </div>
                        {getStatusIcon(charge.status)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Valor</span>
                          <span className="text-lg font-semibold">Kz {charge.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Vencimento</span>
                          <span className="text-sm">{charge.dueDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <span className="text-sm">{getStatusLabel(charge.status)}</span>
                        </div>
                      </div>

                      {charge.description && <p className="text-sm text-muted-foreground">{charge.description}</p>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Clients Results */}
          {searchResults.clients.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Clientes</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {searchResults.clients.length}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.clients.map((client) => (
                  <Card key={client.id} className="rounded-3xl border-0 p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{client.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{client.name}</div>
                        {client.email && <div className="text-sm text-muted-foreground">{client.email}</div>}
                        <div className="mt-2 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{client.totalCharges || 0} cobranças</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {totalResults === 0 && query && (
            <Card className="rounded-3xl border-0 p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Nenhum resultado encontrado</h3>
              <p className="mt-2 text-muted-foreground">
                Tente pesquisar com palavras-chave diferentes ou verifique a ortografia
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default function PesquisaPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchResults />
    </Suspense>
  )
}
