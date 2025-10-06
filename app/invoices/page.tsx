"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Plus, Filter, Download, Eye, CheckCircle2, Clock, XCircle, FileEdit } from "lucide-react"
import { invoices } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileEdit className="h-4 w-4" />
      case "issued":
        return <Clock className="h-4 w-4" />
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho"
      case "issued":
        return "Emitida"
      case "paid":
        return "Paga"
      case "overdue":
        return "Atrasada"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "draft":
        return "secondary"
      case "issued":
        return "default"
      case "paid":
        return "outline"
      case "overdue":
        return "destructive"
      case "cancelled":
        return "secondary"
      default:
        return "default"
    }
  }

  const stats = [
    {
      label: "Total de Faturas",
      value: invoices.length,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pagas",
      value: invoices.filter((inv) => inv.status === "paid").length,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Emitidas",
      value: invoices.filter((inv) => inv.status === "issued").length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Rascunhos",
      value: invoices.filter((inv) => inv.status === "draft").length,
      icon: FileEdit,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
  ]

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Faturas</h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Gerencie suas faturas e documentos fiscais
            </p>
          </div>
          <Link href="/invoices/new">
            <Button className="h-12 rounded-full px-6 text-base font-medium">
              <Plus className="mr-2 h-5 w-5" />
              Nova fatura
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-3xl border-0 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6 rounded-3xl border-0 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou número da fatura..."
                className="h-12 rounded-2xl border-border pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 w-[180px] rounded-2xl">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="issued">Emitida</SelectItem>
                  <SelectItem value="paid">Paga</SelectItem>
                  <SelectItem value="overdue">Atrasada</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Invoices List */}
        <Card className="rounded-3xl border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Número</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Data</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Vencimento</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Valor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="transition-colors hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{invoice.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{invoice.client.name}</div>
                        <div className="text-sm text-muted-foreground">NIF: {invoice.client.nif}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString("pt-AO")}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(invoice.dueDate).toLocaleDateString("pt-AO")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">Kz {invoice.total.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">IVA: Kz {invoice.taxAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(invoice.status)} className="gap-1">
                        {getStatusIcon(invoice.status)}
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/invoices/${invoice.id}`}>
                          <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">Nenhuma fatura encontrada</p>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou criar uma nova fatura</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
