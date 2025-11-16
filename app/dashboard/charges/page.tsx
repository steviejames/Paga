"use client"

import { useQuery } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/hooks"
import { getChargesByOrganization } from "@/lib/queries"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default function ChargesPage() {
  const { organization } = useActiveOrganization()

  const { data: charges, isLoading } = useQuery({
    queryKey: ["charges", organization?.id],
    queryFn: () => getChargesByOrganization(organization!.id),
    enabled: !!organization,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cobranças</h1>
      {charges && <DataTable columns={columns} data={charges} />}
    </div>
  )
}
