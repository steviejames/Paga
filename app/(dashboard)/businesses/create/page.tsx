"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function CreateBusinessPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authClient.organization.create({
      name,
      slug,
    })
    setLoading(false)
    if (error) {
      toast({
        title: "Erro ao criar negócio",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Negócio criado com sucesso!",
      })
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl bg-white dark:bg-background-dark dark:border dark:border-white/10 shadow-lg">
      <div className="flex flex-col">
        <div className="p-8 border-b border-gray-200 dark:border-white/10">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#111417] dark:text-white">Crie seu novo negócio</h1>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Preencha os dados abaixo para começar a gerenciar suas operações.
            </p>
          </div>
        </div>
        <form onSubmit={handleCreateBusiness} className="p-8 space-y-6">
          <div className="flex flex-col">
            <Label htmlFor="name">Nome do Negócio</Label>
            <Input
              id="name"
              placeholder="Digite o nome do seu negócio"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="slug">Subdomínio</Label>
            <div className="relative">
              <Input
                id="slug"
                placeholder="meu-negocio"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="pr-36"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 text-base">
                .minhaempresa.com
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Apenas letras minúsculas, números e hifens.
            </p>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente o seu negócio"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex flex-1 sm:flex-initial gap-3 flex-wrap justify-end">
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Aguarde..." : "Criar Negócio"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
