"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { getOrganizationBySlug } from "@/lib/queries"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BusinessDashboardPage() {
  const params = useParams()
  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization", params.slug],
    queryFn: () => getOrganizationBySlug(params.slug as string),
    enabled: !!params.slug,
  })

  if (isLoading) {
    return <div>A carregar...</div>
  }

  if (!organization) {
    return <div>Negócio não encontrado.</div>
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href="/dashboard/businesses"
          className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal hover:text-primary"
        >
          Meus Negócios
        </Link>
        <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">/</span>
        <span className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal">
          {organization.name}
        </span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Visão Geral
        </h2>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/products">
            <Button>Novo Produto</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="rounded-xl bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informações Gerais</h3>
          <div className="grid grid-cols-1 md:grid-cols-[25%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Nome</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                {organization.name}
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Subdomínio</p>
              <p className="text-primary text-sm font-medium leading-normal hover:underline">
                {organization.slug}.plataforma.com
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Data de Criação</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                {new Date(organization.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
