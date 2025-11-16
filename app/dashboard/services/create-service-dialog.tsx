"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActiveOrganization } from "better-auth/react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const createServiceSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  price: z.coerce.number().positive("O preço deve ser um número positivo"),
})

export function CreateServiceDialog({ onSuccess }: { onSuccess: () => void }) {
  const { organization } = useActiveOrganization()
  const [isOpen, setIsOpen] = React.useState(false)

  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: { name: "", description: "", price: 0 },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axios.post("/api/services", data),
    onSuccess: () => {
      toast.success("Serviço criado com sucesso!")
      onSuccess()
      setIsOpen(false)
      form.reset()
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        toast.error("Você não tem permissão para criar serviços.")
      } else {
        toast.error("Ocorreu um erro ao criar o serviço.")
      }
    },
  })

  function onSubmit(values: z.infer<typeof createServiceSchema>) {
    mutate({ ...values, organizationId: organization?.id })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Novo Serviço</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Serviço</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "A criar..." : "Criar Serviço"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
