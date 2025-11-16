"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { getChargeById } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PublicChargePage() {
  const params = useParams()
  const router = useRouter()
  const { data: charge, isLoading, refetch } = useQuery({
    queryKey: ["charge", params.id],
    queryFn: () => getChargeById(params.id as string),
    enabled: !!params.id,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.post(`/api/charges/${params.id}/pay`),
    onSuccess: () => {
      toast.success("Pagamento efetuado com sucesso!")
      refetch()
    },
    onError: () => {
      toast.error("Ocorreu um erro ao processar o pagamento.")
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">A carregar...</div>
  }

  if (!charge) {
    return <div className="flex justify-center items-center h-screen">Cobrança não encontrada.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Pagar Cobrança</CardTitle>
          <p className="text-center text-muted-foreground">para {charge.organization.name}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 my-8">
            {charge.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <p className="font-semibold">{item.name}</p>
                <p>
                  {new Intl.NumberFormat("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  }).format(item.price)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t">
            <div className="flex justify-between items-center text-xl font-bold">
              <p>Total</p>
              <p>
                {new Intl.NumberFormat("pt-AO", {
                  style: "currency",
                  currency: "AOA",
                }).format(charge.amount)}
              </p>
            </div>
          </div>

          {charge.status === "PAID" ? (
            <div className="mt-8 text-center text-green-600 font-semibold p-4 bg-green-50 rounded-lg">
              Esta cobrança foi paga com sucesso no dia {new Date(charge.paidAt!).toLocaleDateString()}.
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <h3 className="text-center font-semibold">Selecione o método de pagamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => mutate()} disabled={isPending} size="lg">
                  Pagar com GPO (Express)
                </Button>
                <Button onClick={() => mutate()} disabled={isPending} size="lg">
                  Pagar com Referência Multicaixa
                </Button>
              </div>
              {isPending && <p className="text-center text-sm text-muted-foreground">A processar pagamento...</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
