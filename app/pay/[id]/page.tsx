"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, CreditCard, Building2, Smartphone, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function PaymentPage() {
  const params = useParams()
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [processing, setProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Mock charge data - in real app, fetch from API
  const chargeData = {
    id: params.id,
    amount: 50000,
    description: "Pagamento de serviços",
    merchant: "Paga",
    dueDate: "2025-01-15",
  }

  const paymentMethods = [
    {
      id: "multicaixa",
      name: "Multicaixa Express",
      subtitle: "Pagamento via ATM ou Express",
      icon: CreditCard,
      gradient: "from-[#FF6B00] to-[#FF8C00]",
      code: "MC",
    },
    {
      id: "bank_transfer",
      name: "Transferência Bancária",
      subtitle: "Transferência entre contas",
      icon: Building2,
      gradient: "from-[#0066CC] to-[#0088FF]",
      code: "TB",
    },
    {
      id: "unitel_money",
      name: "Unitel Money",
      subtitle: "Pagamento via mobile",
      icon: Smartphone,
      gradient: "from-[#E30613] to-[#FF1744]",
      code: "UM",
    },
  ]

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setPaymentComplete(true)
      console.log("[v0] Payment processed:", {
        chargeId: params.id,
        method: selectedMethod,
        phoneNumber,
        accountNumber,
      })
    }, 2000)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full rounded-3xl border-0 p-8 shadow-2xl text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Pagamento Confirmado!</h1>
          <p className="text-muted-foreground mb-6">O seu pagamento foi processado com sucesso. Obrigado!</p>
          <div className="bg-muted rounded-2xl p-4 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Valor Pago</div>
            <div className="text-3xl font-bold">Kz {chargeData.amount.toLocaleString()}</div>
          </div>
          <p className="text-sm text-muted-foreground">Receberá uma confirmação por email em breve.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">Paga</div>
            </div>
            <div className="text-sm text-muted-foreground">Pagamento Seguro</div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Details */}
          <div className="md:col-span-1">
            <Card className="rounded-3xl border-0 p-6 shadow-lg sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Detalhes do Pagamento</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Comerciante</div>
                  <div className="font-medium">{chargeData.merchant}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Descrição</div>
                  <div className="font-medium">{chargeData.description}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Vencimento</div>
                  <div className="font-medium">{new Date(chargeData.dueDate).toLocaleDateString("pt-AO")}</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Total a Pagar</div>
                  <div className="text-3xl font-bold">Kz {chargeData.amount.toLocaleString()}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="md:col-span-2">
            <Card className="rounded-3xl border-0 p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Escolha o método de pagamento</h2>
              <p className="text-sm text-muted-foreground mb-6">Selecione como deseja efetuar o pagamento</p>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center justify-between rounded-2xl border p-4 transition-all ${
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${method.gradient}`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.subtitle}</div>
                          </div>
                        </div>
                        <div
                          className={`h-5 w-5 rounded-full ${
                            selectedMethod === method.id
                              ? "border-4 border-primary bg-primary"
                              : "border-2 border-border"
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Payment Details Form */}
                {selectedMethod && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold mb-4">Informações de Pagamento</h3>

                      {selectedMethod === "multicaixa" && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="reference">Referência Multicaixa</Label>
                            <Input
                              id="reference"
                              placeholder="Será gerada após confirmação"
                              className="h-12 rounded-2xl mt-2"
                              disabled
                            />
                          </div>
                          <div className="bg-blue-50 rounded-2xl p-4 text-sm">
                            <p className="font-medium mb-2">Como pagar:</p>
                            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                              <li>Clique em confirmar para gerar a referência</li>
                              <li>Dirija-se a um ATM Multicaixa</li>
                              <li>Selecione "Pagamentos" e insira a referência</li>
                            </ol>
                          </div>
                        </div>
                      )}

                      {selectedMethod === "bank_transfer" && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="account">Número da Conta</Label>
                            <Input
                              id="account"
                              placeholder="Digite o número da sua conta"
                              className="h-12 rounded-2xl mt-2"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                            />
                          </div>
                          <div className="bg-blue-50 rounded-2xl p-4 text-sm">
                            <p className="font-medium mb-2">Dados bancários:</p>
                            <div className="space-y-1 text-muted-foreground">
                              <p>Banco: BAI</p>
                              <p>Conta: 0000 0000 0000 0000</p>
                              <p>IBAN: AO06 0000 0000 0000 0000 0000 0</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedMethod === "unitel_money" && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="phone">Número de Telefone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+244 9XX XXX XXX"
                              className="h-12 rounded-2xl mt-2"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <div className="bg-blue-50 rounded-2xl p-4 text-sm">
                            <p className="font-medium mb-2">Como pagar:</p>
                            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                              <li>Insira o seu número Unitel Money</li>
                              <li>Receberá um pedido de confirmação no telemóvel</li>
                              <li>Confirme o pagamento com o seu PIN</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl text-base font-medium"
                  disabled={!selectedMethod || processing}
                >
                  {processing ? "A processar..." : `Confirmar Pagamento - Kz ${chargeData.amount.toLocaleString()}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao confirmar, você concorda com os termos e condições de pagamento
                </p>
              </form>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-12">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Pagamento seguro processado por Paga</p>
        </div>
      </footer>
    </div>
  )
}
