"use client"

import { useQuery } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/hooks"
import { getInvoicesByOrganization } from "@/lib/queries"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default function InvoicesPage() {
  const { organization } = useActiveOrganization()

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices", organization?.id],
    queryFn: () => getInvoicesByOrganization(organization!.id),
    enabled: !!organization,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Faturas</h1>
      {invoices && <DataTable columns={columns} data={invoices} />}
    </div>
  )
}
