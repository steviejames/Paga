"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Copy, Share2, FileText, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ChargeSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [paymentLink, setPaymentLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const link = searchParams.get("link")
    if (link) {
      setPaymentLink(link)
    } else {
      // Fallback if link not in query params
      setPaymentLink(`${window.location.origin}/pay/${params.id}`)
    }
  }, [params.id, searchParams])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink)
      setCopied(true)
      toast({
        title: "Link copiado!",
        description: "O link de pagamento foi copiado para a área de transferência.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Link de Pagamento - Paga",
          text: "Efetue o pagamento através deste link",
          url: paymentLink,
        })
        toast({
          title: "Link partilhado!",
          description: "O link foi partilhado com sucesso.",
        })
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== "AbortError") {
          toast({
            title: "Erro ao partilhar",
            description: "Não foi possível partilhar o link. Tente copiar manualmente.",
            variant: "destructive",
          })
        }
      }
    } else {
      // Fallback to copy if share API not available
      copyToClipboard()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 md:py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Cobrança criada com sucesso!</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              O link de pagamento foi gerado e está pronto para ser partilhado com o cliente.
            </p>
          </div>

          {/* Payment Link Card */}
          <Card className="rounded-3xl border-0 p-6 md:p-8 shadow-lg mb-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Link de Pagamento</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Partilhe este link com o cliente para que ele possa efetuar o pagamento
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input value={paymentLink} readOnly className="h-12 rounded-2xl bg-muted flex-1 text-sm" />
                  <div className="flex gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="h-12 rounded-2xl flex-1 sm:flex-none sm:px-6 bg-transparent"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copiado!" : "Copiar"}
                    </Button>
                    <Button onClick={shareLink} className="h-12 rounded-2xl flex-1 sm:flex-none sm:px-6">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partilhar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Charge Details */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">DETALHES DA COBRANÇA</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID da Cobrança</span>
                    <span className="text-sm font-medium">#{params.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-yellow-600">
                      <div className="h-2 w-2 rounded-full bg-yellow-600" />
                      Pendente
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Data de Criação</span>
                    <span className="text-sm font-medium">{new Date().toLocaleDateString("pt-AO")}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/charges" className="sm:col-span-1">
              <Button variant="outline" className="w-full h-14 rounded-2xl bg-transparent">
                <Plus className="h-5 w-5 mr-2" />
                Nova Cobrança
              </Button>
            </Link>
            <Link href="/history" className="sm:col-span-1">
              <Button variant="outline" className="w-full h-14 rounded-2xl bg-transparent">
                <FileText className="h-5 w-5 mr-2" />
                Ver Todas
              </Button>
            </Link>
            <Link href="/dashboard" className="sm:col-span-1">
              <Button className="w-full h-14 rounded-2xl">Ir para Dashboard</Button>
            </Link>
          </div>

          {/* Tips */}
          <Card className="rounded-3xl border-0 p-6 shadow-sm mt-6 bg-blue-50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                i
              </div>
              Dicas para partilhar
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Envie o link via WhatsApp, SMS ou email para o cliente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>O cliente pode escolher o método de pagamento preferido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Você receberá uma notificação quando o pagamento for efetuado</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
