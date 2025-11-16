"use client"

import { useQuery } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/hooks"
import { getCustomersByOrganization } from "@/lib/queries"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns" // I will create this file next
import { CreateCustomerDialog } from "./create-customer-dialog" // And this one too

export default function CustomersPage() {
  const { organization } = useActiveOrganization()

  const { data: customers, isLoading, refetch } = useQuery({
    queryKey: ["customers", organization?.id],
    queryFn: () => getCustomersByOrganization(organization!.id),
    enabled: !!organization,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <CreateCustomerDialog onSuccess={refetch} />
      </div>
      {customers && <DataTable columns={columns} data={customers} />}
    </div>
  )
}
