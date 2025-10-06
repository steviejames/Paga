"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Trash2, LinkIcon } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { clients, charges, type InvoiceItem } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function NewInvoicePage() {
  const router = useRouter()
  const [selectedClient, setSelectedClient] = useState("")
  const [clientNif, setClientNif] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      unitPrice: 0,
      taxRate: 14,
      total: 0,
    },
  ])
  const [notes, setNotes] = useState("")
  const [terms, setTerms] = useState("Pagamento em 30 dias")
  const [linkedPaymentId, setLinkedPaymentId] = useState<string>("")

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      taxRate: 14,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          // Recalculate total
          if (field === "quantity" || field === "unitPrice" || field === "taxRate") {
            const subtotal = updatedItem.quantity * updatedItem.unitPrice
            updatedItem.total = subtotal
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateTax = () => {
    return items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice
      return sum + (itemSubtotal * item.taxRate) / 100
    }, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleClientSelect = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setSelectedClient(client.name)
      setClientEmail(client.email || "")
      // In a real app, you'd fetch full client details
      setClientNif("")
      setClientAddress("")
      setClientPhone("")
    }
  }

  const handleSubmit = (e: React.FormEvent, status: "draft" | "issued") => {
    e.preventDefault()

    const invoiceId = `INV-${Date.now()}`
    const invoiceNumber = `FT 2024/${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    console.log("[v0] Invoice created:", {
      invoiceId,
      invoiceNumber,
      status,
      client: {
        name: selectedClient,
        nif: clientNif,
        address: clientAddress,
        phone: clientPhone,
        email: clientEmail,
      },
      items,
      subtotal: calculateSubtotal(),
      taxAmount: calculateTax(),
      total: calculateTotal(),
      linkedPaymentId,
      notes,
      terms,
    })

    router.push(`/invoices/${invoiceId}`)
  }

  const paidCharges = charges.filter((c) => c.status === "paid")

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Nova Fatura</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Preencha os dados para criar uma fatura AGT-compliant
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client Information */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Informações do Cliente</h2>
                    <p className="text-sm text-muted-foreground">Dados do cliente para a fatura</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={selectedClient} onValueChange={handleClientSelect}>
                      <SelectTrigger className="h-12 rounded-2xl">
                        <SelectValue placeholder="Selecionar cliente existente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nome completo</Label>
                      <Input
                        id="clientName"
                        placeholder="Nome do cliente"
                        className="h-12 rounded-2xl"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientNif">NIF</Label>
                      <Input
                        id="clientNif"
                        placeholder="5000123456"
                        className="h-12 rounded-2xl"
                        value={clientNif}
                        onChange={(e) => setClientNif(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Endereço</Label>
                    <Input
                      id="clientAddress"
                      placeholder="Rua, número, bairro, cidade"
                      className="h-12 rounded-2xl"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input
                        id="clientPhone"
                        placeholder="+244 923 456 789"
                        className="h-12 rounded-2xl"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        placeholder="cliente@email.ao"
                        className="h-12 rounded-2xl"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Invoice Details */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Detalhes da Fatura</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceDate">Data de emissão</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      className="h-12 rounded-2xl"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Data de vencimento</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      className="h-12 rounded-2xl"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Items */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Itens da Fatura</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="rounded-full bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar item
                  </Button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="rounded-2xl border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Item {index + 1}</span>
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 rounded-full p-0 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                          placeholder="Descrição do produto ou serviço"
                          className="h-12 rounded-2xl"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-4">
                        <div className="space-y-2">
                          <Label>Quantidade</Label>
                          <Input
                            type="number"
                            min="1"
                            className="h-12 rounded-2xl"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Preço unitário</Label>
                          <Input
                            type="number"
                            min="0"
                            step="100"
                            placeholder="Kz"
                            className="h-12 rounded-2xl"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>IVA (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            className="h-12 rounded-2xl"
                            value={item.taxRate}
                            onChange={(e) => updateItem(item.id, "taxRate", Number(e.target.value))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Total</Label>
                          <div className="flex h-12 items-center rounded-2xl bg-muted px-4 font-semibold">
                            Kz {(item.quantity * item.unitPrice).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Additional Information */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Informações Adicionais</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <Textarea
                      id="notes"
                      placeholder="Notas ou observações adicionais"
                      className="min-h-24 rounded-2xl"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms">Termos e condições</Label>
                    <Input
                      id="terms"
                      placeholder="Ex: Pagamento em 30 dias"
                      className="h-12 rounded-2xl"
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Link Payment */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Vincular Pagamento</h3>
                </div>

                <p className="mb-4 text-sm text-muted-foreground">Vincule um pagamento já recebido a esta fatura</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                      {linkedPaymentId ? "Alterar pagamento" : "Selecionar pagamento"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Selecionar Pagamento</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {paidCharges.map((charge) => (
                        <button
                          key={charge.id}
                          type="button"
                          onClick={() => setLinkedPaymentId(charge.id)}
                          className={`w-full rounded-2xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                            linkedPaymentId === charge.id ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{charge.client}</div>
                              <div className="text-sm text-muted-foreground">{charge.paymentMethod}</div>
                              <div className="text-xs text-muted-foreground">Pago em {charge.dueDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">Kz {charge.amount.toLocaleString()}</div>
                              <Badge variant="outline" className="mt-1">
                                Pago
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                {linkedPaymentId && (
                  <div className="mt-4 rounded-2xl bg-primary/5 p-4">
                    <div className="text-sm font-medium">Pagamento vinculado</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {paidCharges.find((c) => c.id === linkedPaymentId)?.client}
                    </div>
                  </div>
                )}
              </Card>

              {/* Summary */}
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Resumo</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">Kz {calculateSubtotal().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA</span>
                    <span className="font-medium">Kz {calculateTax().toLocaleString()}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold">Kz {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, "issued")}
                  className="h-12 w-full rounded-full text-base font-medium"
                >
                  Emitir fatura
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, "draft")}
                  variant="outline"
                  className="h-12 w-full rounded-full text-base font-medium"
                >
                  Salvar como rascunho
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
