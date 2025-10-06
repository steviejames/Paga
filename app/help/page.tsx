"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HelpCircle, Search, MessageCircle, Mail, Phone, FileText, Video, BookOpen, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      title: "Começando",
      icon: BookOpen,
      articles: [
        "Como criar minha primeira cobrança",
        "Configurar métodos de pagamento",
        "Entender o dashboard",
        "Gerenciar negócios",
      ],
    },
    {
      title: "Cobranças",
      icon: FileText,
      articles: [
        "Como criar uma cobrança",
        "Compartilhar link de pagamento",
        "Acompanhar status de cobranças",
        "Cancelar ou reembolsar",
      ],
    },
    {
      title: "Pagamentos",
      icon: MessageCircle,
      articles: [
        "Métodos de pagamento disponíveis",
        "Tempo de processamento",
        "Taxas e tarifas",
        "Receber pagamentos internacionais",
      ],
    },
    {
      title: "Segurança",
      icon: HelpCircle,
      articles: [
        "Proteger minha conta",
        "Autenticação de dois fatores",
        "Gerenciar sessões ativas",
        "Reportar atividade suspeita",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Central de Ajuda</h1>
          <p className="mt-2 text-muted-foreground">Encontre respostas e suporte para suas dúvidas</p>
        </div>

        {/* Search */}
        <Card className="rounded-3xl border-0 p-6 shadow-sm mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar artigos de ajuda..."
              className="h-14 rounded-2xl border-border pl-12 pr-4 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* FAQ Categories */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Perguntas frequentes</h2>

            {faqCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.title} className="rounded-3xl border-0 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>

                  <div className="space-y-2">
                    {category.articles.map((article) => (
                      <button
                        key={article}
                        className="flex w-full items-center justify-between rounded-2xl p-3 text-left text-sm transition-colors hover:bg-secondary"
                      >
                        <span>{article}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Suporte</h2>

            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Chat ao vivo</h3>
                    <p className="text-sm text-muted-foreground">Resposta em minutos</p>
                  </div>
                </div>
                <Button className="w-full h-11 rounded-full">Iniciar chat</Button>
              </div>
            </Card>

            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">Resposta em 24h</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-11 rounded-full bg-transparent">
                  Enviar email
                </Button>
              </div>
            </Card>

            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-sm text-muted-foreground">+244 900 000 000</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-11 rounded-full bg-transparent">
                  Ligar agora
                </Button>
              </div>
            </Card>

            <Card className="rounded-3xl border-0 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tutoriais em vídeo</h3>
                    <p className="text-sm text-muted-foreground">Aprenda visualmente</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-11 rounded-full bg-transparent">
                  Ver vídeos
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
