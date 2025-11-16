"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/auth-client"

export default function CreateChargePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const { data: activeOrganization, isLoading } = useQuery({
    queryKey: ["activeOrganization"],
    queryFn: () => authClient.organization.getActive(),
  })

  const handleCreateCharge = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!activeOrganization?.data) {
      toast({
        title: "Erro",
        description: "Nenhum negócio ativo selecionado.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const response = await fetch("/api/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        description,
        organizationId: activeOrganization.data.id,
        customer: {
          name: customerName,
          email: customerEmail,
        },
      }),
    })

    setLoading(false)

    if (response.ok) {
      const charge = await response.json()
      toast({
        title: "Cobrança criada com sucesso!",
      })
      router.push(`/charges/success/${charge.id}`)
    } else {
      const error = await response.json()
      toast({
        title: "Erro ao criar cobrança",
        description: error.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-border-light dark:border-border-dark">
      <div className="p-6 md:p-8 border-b border-border-light dark:border-border-dark">
        <h1 className="text-2xl font-bold">Criar Nova Cobrança</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Preencha os dados abaixo para gerar uma nova cobrança.
        </p>
      </div>
      <form onSubmit={handleCreateCharge} className="p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Detalhes da Cobrança</h2>
          <div>
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Ex: Pagamento de fatura #123"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Dados do Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer-name">Nome do Cliente</Label>
              <Input
                id="customer-name"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="customer-email">E-mail do Cliente</Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="john.doe@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading || isLoading}>
            {loading ? "Aguarde..." : "Gerar Cobrança"}
          </Button>
        </div>
      </form>
    </div>
  )
}
