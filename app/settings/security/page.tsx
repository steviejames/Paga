"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Shield, Lock, Smartphone, Eye, Key } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SecurityPage() {
  const { toast } = useToast()
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const handlePasswordChange = () => {
    toast({
      title: "Alterar senha",
      description: "Você receberá um email com instruções para alterar sua senha.",
    })
  }

  const handleManageSessions = () => {
    toast({
      title: "Sessões ativas",
      description: "Gerenciamento de sessões em desenvolvimento.",
    })
  }

  return (
    <>
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Segurança da conta</h2>
              <p className="text-sm text-muted-foreground">Gerencie a segurança da sua conta</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4 rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Senha</div>
                    <div className="text-sm text-muted-foreground">Última alteração há 3 meses</div>
                  </div>
                </div>
                <Button variant="outline" className="h-9 rounded-full bg-transparent" onClick={handlePasswordChange}>
                  Alterar
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Autenticação de dois fatores</div>
                    <div className="text-sm text-muted-foreground">
                      {twoFactorAuth ? "Ativada" : "Adicione uma camada extra de segurança"}
                    </div>
                  </div>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Sessões ativas</div>
                    <div className="text-sm text-muted-foreground">2 dispositivos conectados</div>
                  </div>
                </div>
                <Button variant="outline" className="h-9 rounded-full bg-transparent" onClick={handleManageSessions}>
                  Gerenciar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Chaves de API</h2>
              <p className="text-sm text-muted-foreground">Gerencie suas chaves de integração</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Chave de produção</div>
                <div className="text-sm text-muted-foreground font-mono">pk_live_••••••••••••••••</div>
              </div>
              <Button variant="outline" className="h-9 rounded-full bg-transparent">
                Ver
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Chave de teste</div>
                <div className="text-sm text-muted-foreground font-mono">pk_test_••••••••••••••••</div>
              </div>
              <Button variant="outline" className="h-9 rounded-full bg-transparent">
                Ver
              </Button>
            </div>
          </div>

          <Button className="h-11 rounded-full w-full">Gerar nova chave</Button>
        </div>
      </Card>
    </>
  )
}
