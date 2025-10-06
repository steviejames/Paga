"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Copy,
  Share2,
  Download,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  CreditCard,
  User,
  FileText,
  Link2,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { charges } from "@/lib/mock-data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ChargeDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isCopying, setIsCopying] = useState(false)

  const charge = charges.find((c) => c.id === params.id)

  if (!charge) {
    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container px-4 md:px-8 py-8 mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Cobrança não encontrada</h2>
            <p className="text-muted-foreground mb-6">A cobrança que você procura não existe.</p>
            <Link href="/charges">
              <Button>Voltar para cobranças</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const statusConfig = {
    pending: {
      label: "Pendente",
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    },
    paid: {
      label: "Pago",
      icon: CheckCircle2,
      color: "bg-green-500/10 text-green-700 dark:text-green-400",
    },
    overdue: {
      label: "Vencido",
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-700 dark:text-red-400",
    },
    cancelled: {
      label: "Cancelado",
      icon: XCircle,
      color: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    },
  }

  const status = statusConfig[charge.status]
  const StatusIcon = status.icon

  const formattedAmount = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  }).format(charge.amount)

  const handleCopyLink = async () => {
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/pay/${charge.id}`)
      toast({
        title: "Link copiado!",
        description: "O link de pagamento foi copiado para a área de transferência.",
      })
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => setIsCopying(false), 1000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cobrança - ${charge.client}`,
          text: `Pagamento de ${formattedAmount} para ${charge.client}`,
          url: `${window.location.origin}/pay/${charge.id}`,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/charges">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para cobranças
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Detalhes da cobrança</h1>
            <p className="text-muted-foreground">ID: {charge.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              {isCopying ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar recibo
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar lembrete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar cobrança
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Amount Card */}
            <Card className="rounded-3xl border-0 p-8 shadow-sm bg-gradient-to-br from-primary to-primary/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`${status.color} border-0`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  <div className="text-sm text-white/80">#{charge.id}</div>
                </div>
                <div>
                  <div className="text-sm text-white/80 mb-2">Valor da cobrança</div>
                  <div className="text-5xl font-bold text-white">{formattedAmount}</div>
                </div>
              </div>
            </Card>

            {/* Client Information */}
            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do cliente
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={charge.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{charge.client[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">{charge.client}</div>
                  <div className="text-sm text-muted-foreground">Cliente</div>
                </div>
              </div>
            </Card>

            {/* Payment Details */}
            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Detalhes do pagamento
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>Método de pagamento</span>
                  </div>
                  <div className="font-medium">{charge.paymentMethod}</div>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Data de criação</span>
                  </div>
                  <div className="font-medium">{charge.createdDate}</div>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Data de vencimento</span>
                  </div>
                  <div className="font-medium">{charge.dueDate}</div>
                </div>
                {charge.description && (
                  <div className="flex items-start justify-between py-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Descrição</span>
                    </div>
                    <div className="font-medium text-right max-w-xs">{charge.description}</div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Ações rápidas</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar link
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar lembrete
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar recibo
                </Button>
              </div>
            </Card>

            {/* Payment Link */}
            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Link de pagamento
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted p-3 text-sm break-all font-mono">{`${window.location.origin}/pay/${charge.id}`}</div>
                <Button className="w-full" onClick={handleCopyLink}>
                  {isCopying ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar link
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
