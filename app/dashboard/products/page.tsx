"use client"

import { useQuery } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/hooks"
import { getProductsByOrganization } from "@/lib/queries"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns" // I will create this file next
import { CreateProductDialog } from "./create-product-dialog" // And this one too

export default function ProductsPage() {
  const { organization } = useActiveOrganization()

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["products", organization?.id],
    queryFn: () => getProductsByOrganization(organization!.id),
    enabled: !!organization,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <CreateProductDialog onSuccess={refetch} />
      </div>
      {products && <DataTable columns={columns} data={products} />}
    </div>
  )
}
