"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, Smartphone, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [chargeNotifications, setChargeNotifications] = useState(true)
  const [paymentNotifications, setPaymentNotifications] = useState(true)
  const [marketingNotifications, setMarketingNotifications] = useState(false)

  return (
    <>
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Canais de notificação</h2>
              <p className="text-sm text-muted-foreground">Escolha como deseja receber notificações</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações por email</div>
                  <div className="text-sm text-muted-foreground">Receba atualizações por email</div>
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações push</div>
                  <div className="text-sm text-muted-foreground">Receba notificações no dispositivo</div>
                </div>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Notificações por SMS</div>
                  <div className="text-sm text-muted-foreground">Receba alertas importantes por SMS</div>
                </div>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Tipos de notificação</h2>
              <p className="text-sm text-muted-foreground">Escolha quais eventos deseja ser notificado</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <div className="font-medium">Novas cobranças</div>
                <div className="text-sm text-muted-foreground">Quando uma nova cobrança for criada</div>
              </div>
              <Switch checked={chargeNotifications} onCheckedChange={setChargeNotifications} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <div className="font-medium">Pagamentos recebidos</div>
                <div className="text-sm text-muted-foreground">Quando um pagamento for confirmado</div>
              </div>
              <Switch checked={paymentNotifications} onCheckedChange={setPaymentNotifications} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <div className="font-medium">Novidades e promoções</div>
                <div className="text-sm text-muted-foreground">Receba dicas e ofertas especiais</div>
              </div>
              <Switch checked={marketingNotifications} onCheckedChange={setMarketingNotifications} />
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
