"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Business {
  id: string
  name: string
  category: string
  phone: string
  email: string
}

export default function BusinessPage() {
  const { toast } = useToast()
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "Loja Principal",
      category: "E-commerce",
      phone: "+244 900 000 000",
      email: "contato@loja.ao",
    },
  ])

  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    phone: "",
    email: "",
  })

  const handleAddBusiness = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBusiness.name || !newBusiness.category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const business: Business = {
      id: Date.now().toString(),
      ...newBusiness,
    }

    setBusinesses([...businesses, business])
    setNewBusiness({ name: "", category: "", phone: "", email: "" })
    toast({
      title: "Negócio adicionado",
      description: "Novo negócio criado com sucesso.",
    })
  }

  const handleDeleteBusiness = (id: string) => {
    if (businesses.length === 1) {
      toast({
        title: "Erro",
        description: "Você precisa ter pelo menos um negócio.",
        variant: "destructive",
      })
      return
    }

    setBusinesses(businesses.filter((b) => b.id !== id))
    toast({
      title: "Negócio removido",
      description: "O negócio foi removido com sucesso.",
    })
  }

  return (
    <>
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Meus negócios</h2>
              <p className="text-sm text-muted-foreground">Gerencie seus negócios cadastrados</p>
            </div>
          </div>

          <div className="space-y-4">
            {businesses.map((business) => (
              <div key={business.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{business.name}</h3>
                    <p className="text-sm text-muted-foreground">{business.category}</p>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span>{business.phone}</span>
                      <span>{business.email}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBusiness(business.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <form onSubmit={handleAddBusiness} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Adicionar novo negócio</h2>
              <p className="text-sm text-muted-foreground">Cadastre um novo negócio</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nome do negócio *</Label>
              <Input
                id="businessName"
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                placeholder="Ex: Minha Loja"
                className="h-11 rounded-2xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessCategory">Categoria *</Label>
              <Input
                id="businessCategory"
                value={newBusiness.category}
                onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
                placeholder="Ex: E-commerce, Restaurante, Serviços"
                className="h-11 rounded-2xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessPhone">Telefone</Label>
              <Input
                id="businessPhone"
                type="tel"
                value={newBusiness.phone}
                onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                placeholder="+244 900 000 000"
                className="h-11 rounded-2xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmail">Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={newBusiness.email}
                onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                placeholder="contato@negocio.ao"
                className="h-11 rounded-2xl border-border"
              />
            </div>
          </div>

          <Button type="submit" className="h-11 rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar negócio
          </Button>
        </form>
      </Card>
    </>
  )
}
