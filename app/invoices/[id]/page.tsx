"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  FileText,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileEdit,
  Link2,
  MoreVertical,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { invoices, charges } from "@/lib/mock-data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function InvoiceDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isCopying, setIsCopying] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  })

  const invoice = invoices.find((inv) => inv.id === params.id)

  if (!invoice) {
    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container px-4 md:px-8 py-8 mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Fatura não encontrada</h2>
            <p className="text-muted-foreground mb-6">A fatura que você procura não existe.</p>
            <Link href="/invoices">
              <Button>Voltar para faturas</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const statusConfig = {
    draft: {
      label: "Rascunho",
      icon: FileEdit,
      color: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    },
    issued: {
      label: "Emitida",
      icon: Clock,
      color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    },
    paid: {
      label: "Paga",
      icon: CheckCircle2,
      color: "bg-green-500/10 text-green-700 dark:text-green-400",
    },
    overdue: {
      label: "Atrasada",
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-700 dark:text-red-400",
    },
    cancelled: {
      label: "Cancelada",
      icon: XCircle,
      color: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    },
  }

  const status = statusConfig[invoice.status]
  const StatusIcon = status.icon

  const linkedPayment = invoice.linkedPaymentId ? charges.find((c) => c.id === invoice.linkedPaymentId) : null

  const invoiceUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/invoices/${invoice.id}`

  const handleCopyLink = async () => {
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(invoiceUrl)
      toast({
        title: "Link copiado!",
        description: "O link da fatura foi copiado para a área de transferência.",
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
          title: `Fatura ${invoice.invoiceNumber}`,
          text: `Fatura de Kz ${invoice.total.toLocaleString()} para ${invoice.client.name}`,
          url: invoiceUrl,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      handleCopyLink()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    try {
      toast({
        title: "Gerando PDF...",
        description: "Aguarde enquanto preparamos o documento.",
      })

      // Call API to generate PDF
      const response = await fetch(`/api/invoices/${invoice.id}/pdf`, {
        method: "GET",
      })

      if (!response.ok) throw new Error("Failed to generate PDF")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${invoice.invoiceNumber.replace(/\s+/g, "_")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "PDF baixado!",
        description: "O arquivo foi salvo no seu dispositivo.",
      })
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleOpenEmailDialog = () => {
    setEmailForm({
      to: invoice.client.email,
      subject: `Fatura ${invoice.invoiceNumber} - ${invoice.business.name}`,
      message: `Prezado(a) ${invoice.client.name},\n\nSegue em anexo a fatura ${invoice.invoiceNumber} no valor de Kz ${invoice.total.toLocaleString()}.\n\nData de vencimento: ${new Date(invoice.dueDate).toLocaleDateString("pt-AO")}\n\nAtenciosamente,\n${invoice.business.name}`,
    })
    setIsEmailDialogOpen(true)
  }

  const handleSendEmail = async () => {
    if (!emailForm.to) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira o endereço de email do destinatário.",
        variant: "destructive",
      })
      return
    }

    setIsSendingEmail(true)
    try {
      const response = await fetch(`/api/invoices/${invoice.id}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailForm),
      })

      if (!response.ok) throw new Error("Failed to send email")

      toast({
        title: "Email enviado!",
        description: `A fatura foi enviada para ${emailForm.to}`,
      })
      setIsEmailDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar o email. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/invoices">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para faturas
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{invoice.invoiceNumber}</h1>
            <p className="text-muted-foreground">
              Fatura emitida em {new Date(invoice.date).toLocaleDateString("pt-AO")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              {isCopying ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenEmailDialog}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar por email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Editar fatura
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar fatura
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header Card */}
            <Card className="rounded-3xl border-0 p-8 shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{invoice.invoiceNumber}</h2>
                  <Badge className={`${status.color} border-0`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Valor total</div>
                  <div className="text-3xl font-bold">Kz {invoice.total.toLocaleString()}</div>
                </div>
              </div>

              {/* Business and Client Info */}
              <div className="grid gap-6 sm:grid-cols-2 mb-8">
                {/* Business Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Emitente</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">{invoice.business.name}</div>
                    <div className="text-muted-foreground">NIF: {invoice.business.nif}</div>
                    <div className="text-muted-foreground flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{invoice.business.address}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{invoice.business.phone}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{invoice.business.email}</span>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Cliente</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">{invoice.client.name}</div>
                    <div className="text-muted-foreground">NIF: {invoice.client.nif}</div>
                    <div className="text-muted-foreground flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{invoice.client.address}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{invoice.client.phone}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{invoice.client.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid gap-4 sm:grid-cols-2 mb-8 p-4 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Data de emissão</div>
                    <div className="font-medium">{new Date(invoice.date).toLocaleDateString("pt-AO")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Data de vencimento</div>
                    <div className="font-medium">{new Date(invoice.dueDate).toLocaleDateString("pt-AO")}</div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Itens da fatura</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-sm text-muted-foreground">
                        <th className="text-left py-3 font-medium">Descrição</th>
                        <th className="text-right py-3 font-medium">Qtd</th>
                        <th className="text-right py-3 font-medium">Preço Unit.</th>
                        <th className="text-right py-3 font-medium">IVA</th>
                        <th className="text-right py-3 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {invoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4">{item.description}</td>
                          <td className="py-4 text-right">{item.quantity}</td>
                          <td className="py-4 text-right">Kz {item.unitPrice.toLocaleString()}</td>
                          <td className="py-4 text-right">{item.taxRate}%</td>
                          <td className="py-4 text-right font-medium">Kz {item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 max-w-sm ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Kz {invoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA</span>
                  <span className="font-medium">Kz {invoice.taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold">Kz {invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              {(invoice.notes || invoice.terms) && (
                <div className="mt-8 pt-8 border-t space-y-4">
                  {invoice.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notas</h4>
                      <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                    </div>
                  )}
                  {invoice.terms && (
                    <div>
                      <h4 className="font-medium mb-2">Termos e condições</h4>
                      <p className="text-sm text-muted-foreground">{invoice.terms}</p>
                    </div>
                  )}
                </div>
              )}
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
                <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                  Imprimir
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={handleOpenEmailDialog}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar por email
                </Button>
              </div>
            </Card>

            {/* Payment Information */}
            {linkedPayment && (
              <Card className="rounded-3xl border-0 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  Pagamento vinculado
                </h3>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-muted/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{linkedPayment.client}</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-0">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Pago
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-3 w-3" />
                        <span>{linkedPayment.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Pago em {linkedPayment.dueDate}</span>
                      </div>
                      <div className="mt-2 font-semibold text-foreground">
                        Kz {linkedPayment.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Link href={`/charges/${linkedPayment.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Ver detalhes do pagamento
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* Invoice Link */}
            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Link da fatura
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted p-3 text-xs break-all font-mono">{invoiceUrl}</div>
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

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enviar fatura por email</DialogTitle>
            <DialogDescription>
              Envie a fatura {invoice.invoiceNumber} para o cliente por email com o PDF anexado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email-to">Para</Label>
              <Input
                id="email-to"
                type="email"
                placeholder="cliente@email.ao"
                value={emailForm.to}
                onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Assunto</Label>
              <Input
                id="email-subject"
                placeholder="Assunto do email"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-message">Mensagem</Label>
              <Textarea
                id="email-message"
                placeholder="Digite sua mensagem..."
                rows={6}
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)} disabled={isSendingEmail}>
              Cancelar
            </Button>
            <Button onClick={handleSendEmail} disabled={isSendingEmail}>
              {isSendingEmail ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
