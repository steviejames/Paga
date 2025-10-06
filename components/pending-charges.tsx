"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Shuffle, MoreVertical } from "lucide-react"
import { pendingCharges } from "@/lib/mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
export function PendingCharges() {
  const router = useRouter()
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

  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cobranças pendentes</h3>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
              <Shuffle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Estado
                </th>
              
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Vencimento
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Valor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingCharges.map((charge, index) => (
                <tr
                  key={charge.id}
                  className={`transition-colors hover:bg-muted/50 ${
                    index !== pendingCharges.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={charge.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{charge.client}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{charge.client}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(charge.status)}`} />
                      <span className="text-sm">{getStatusLabel(charge.status)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm">{charge.dueDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm">{charge.amount}</span>
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-muted-foreground transition-colors hover:text-foreground">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/charges/${charge.id}`)}>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Enviar cobrança</DropdownMenuItem>
                        <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
