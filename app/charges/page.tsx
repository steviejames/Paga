"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, TrendingUp, Clock, CheckCircle2, Calendar, XCircle, Plus, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { charges } from "@/lib/mock-data"
import { useState } from "react"

export default function HistoricoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#F59E0B]"
      case "paid":
        return "bg-[#10B981]"
      case "overdue":
        return "bg-[#EF4444]"
      case "cancelled":
        return "bg-[#6B7280]"
      default:
        return "bg-muted"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filteredCharges = charges.filter((charge) => {
    const matchesSearch = charge.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || charge.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const allTransactions = [
    ...charges,
    {
      id: "6",
      amount: 320000,
      status: "paid" as const,
      client: "Sofia Almeida",
      paymentMethod: "Multicaixa",
      dueDate: "20 Out",
      createdDate: "12 Out",
      paymentLink: "https://paga.ao/pay/pqr678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      amount: 150000,
      status: "paid" as const,
      client: "Ricardo Nunes",
      paymentMethod: "Unitel Money",
      dueDate: "18 Out",
      createdDate: "10 Out",
      paymentLink: "https://paga.ao/pay/stu901",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      amount: 275000,
      status: "paid" as const,
      client: "Beatriz Lima",
      paymentMethod: "Transferência Bancária",
      dueDate: "16 Out",
      createdDate: "08 Out",
      paymentLink: "https://paga.ao/pay/vwx234",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-8 py-8 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Histórico</h1>
            <p className="mt-2 text-muted-foreground">Visualize todas as suas cobranças</p>
          </div>
         <div className="flex items-center gap-2">
          <Link href="/charges/new">
            <Button className="h-11 gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              Nova cobrança
            </Button>
          </Link>
         
         <Button variant="outline" className="h-11 gap-2 rounded-full">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
         </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Stats Cards */}
          <Card className="rounded-3xl border-0 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Total faturado</span>
              </div>
              <div className="text-3xl font-semibold">Kz 1.480.000</div>
              <div className="text-xs text-[#10B981]">+18% este mês</div>
            </div>
          </Card>

          <Card className="rounded-3xl border-0 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>Cobranças pagas</span>
              </div>
              <div className="text-3xl font-semibold">Kz 1.025.000</div>
              <div className="text-xs text-[#10B981]">+12% este mês</div>
            </div>
          </Card>

          <Card className="rounded-3xl border-0 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Pendentes</span>
              </div>
              <div className="text-3xl font-semibold">2</div>
              <div className="text-xs text-muted-foreground">Kz 210.000</div>
            </div>
          </Card>

          <Card className="rounded-3xl border-0 p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Este mês</span>
              </div>
              <div className="text-3xl font-semibold">8</div>
              <div className="text-xs text-muted-foreground">cobranças</div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mt-6 rounded-3xl border-0 p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar cobranças..."
                className="h-11 rounded-full border-border pl-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                className="h-10 rounded-full"
                onClick={() => setFilterStatus("all")}
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "paid" ? "default" : "outline"}
                className="h-10 rounded-full"
                onClick={() => setFilterStatus("paid")}
              >
                Pagas
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                className="h-10 rounded-full"
                onClick={() => setFilterStatus("pending")}
              >
                Pendentes
              </Button>
              <Button
                variant={filterStatus === "overdue" ? "default" : "outline"}
                className="h-10 rounded-full"
                onClick={() => setFilterStatus("overdue")}
              >
                Atrasadas
              </Button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Método
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Vencimento
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {allTransactions.map((transaction) => (
                  <tr key={transaction.id} className="transition-colors hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={transaction.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{transaction.client[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{transaction.client}</div>
                          <div className="text-sm text-muted-foreground">{transaction.createdDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(transaction.status)}`} />
                        <span className="text-sm">{getStatusLabel(transaction.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{transaction.paymentMethod}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{transaction.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold">Kz {transaction.amount.toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Mostrando 8 de 8 cobranças</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 rounded-full px-4 bg-transparent">
                Anterior
              </Button>
              <Button className="h-9 w-9 rounded-full">1</Button>
              <Button variant="outline" className="h-9 rounded-full px-4 bg-transparent">
                Próximo
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
