"use client"

import React from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/react"
import { getProductsByOrganization, getServicesByOrganization, getCustomersByOrganization } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NewChargePage() {
  const { organization } = useActiveOrganization()
  const router = useRouter()

  // Queries to fetch data needed for the form
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", organization?.id],
    queryFn: () => getProductsByOrganization(organization!.id),
    enabled: !!organization,
  })

  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ["services", organization?.id],
    queryFn: () => getServicesByOrganization(organization!.id),
    enabled: !!organization,
  })

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers", organization?.id],
    queryFn: () => getCustomersByOrganization(organization!.id),
    enabled: !!organization,
  })

  // State for the form
  // This will be replaced by react-hook-form later
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>(null)
  const [cart, setCart] = React.useState<any[]>([])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axios.post("/api/charges", data),
    onSuccess: (response) => {
      toast.success("Cobrança criada com sucesso! Link de pagamento copiado para a área de transferência.")
      navigator.clipboard.writeText(`${window.location.origin}/charges/public/${response.data.id}`)
      router.push("/dashboard/charges")
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar a cobrança.")
    },
  })

  const addToCart = (item: any, type: "PRODUCT" | "SERVICE") => {
    setCart((prev) => [...prev, { ...item, type }])
  }

  const handleSubmit = () => {
    if (!organization || !selectedCustomer || cart.length === 0) {
      toast.error("Por favor, preencha todos os campos.")
      return
    }
    mutate({
      customerId: selectedCustomer,
      cart,
      organizationId: organization.id,
    })
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  if (isLoadingProducts || isLoadingServices || isLoadingCustomers) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar Nova Cobrança</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Itens</h2>
          {/* Product and Service Selection Here */}
          <div className="space-y-2">
            <h3 className="font-semibold">Produtos</h3>
            {products?.map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <p>{product.name}</p>
                <Button size="sm" onClick={() => addToCart(product, "PRODUCT")}>Adicionar</Button>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold">Serviços</h3>
            {services?.map((service) => (
              <div key={service.id} className="flex justify-between items-center">
                <p>{service.name}</p>
                <Button size="sm" onClick={() => addToCart(service, "SERVICE")}>Adicionar</Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Cliente e Resumo</h2>
          {/* Customer Selection */}
          <Select onValueChange={setSelectedCustomer}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {customers?.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Cart Summary */}
          <div className="mt-8 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p>{item.name}</p>
                <p>Kz {item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t">
            <div className="flex justify-between items-center font-bold">
              <p>Total</p>
              <p>Kz {total.toLocaleString()}</p>
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={isPending} className="w-full mt-8">
            {isPending ? "A criar..." : "Criar Cobrança"}
          </Button>
        </div>
      </div>
    </div>
  )
}
