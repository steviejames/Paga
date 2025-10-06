"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Globe, Moon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function PreferencesPage() {
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("pt")
  const [currency, setCurrency] = useState("aoa")

  const handleSave = () => {
    toast({
      title: "Preferências salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    })
  }

  return (
    <>
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Preferências regionais</h2>
              <p className="text-sm text-muted-foreground">Configure idioma e moeda</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="flex h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="aoa">AOA - Kwanza Angolano</option>
                <option value="usd">USD - Dólar Americano</option>
                <option value="eur">EUR - Euro</option>
                <option value="brl">BRL - Real Brasileiro</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Moon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Aparência</h2>
              <p className="text-sm text-muted-foreground">Personalize a interface</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Modo escuro</div>
                <div className="text-sm text-muted-foreground">Ativar tema escuro</div>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <Button onClick={handleSave} className="h-11 rounded-full w-full">
            Salvar preferências
          </Button>
        </div>
      </Card>
    </>
  )
}
