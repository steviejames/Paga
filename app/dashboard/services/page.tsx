"use client"

import { useQuery } from "@tanstack/react-query"
import { useActiveOrganization } from "better-auth/hooks"
import { getServicesByOrganization } from "@/lib/queries"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns" // I will create this file next
import { CreateServiceDialog } from "./create-service-dialog" // And this one too

export default function ServicesPage() {
  const { organization } = useActiveOrganization()

  const { data: services, isLoading, refetch } = useQuery({
    queryKey: ["services", organization?.id],
    queryFn: () => getServicesByOrganization(organization!.id),
    enabled: !!organization,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Serviços</h1>
        <CreateServiceDialog onSuccess={refetch} />
      </div>
      {services && <DataTable columns={columns} data={services} />}
    </div>
  )
}
