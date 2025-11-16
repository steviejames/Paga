"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"

export default function MyBusinessesPage() {
  const { data: organizations, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => authClient.organization.list(),
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
            Meus Negócios
          </h1>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-gray-400">
            Gerencie todos os seus negócios em um só lugar.
          </p>
        </div>
        <Link href="/businesses/create">
          <Button>
            <span className="material-symbols-outlined mr-2">add</span>
            Criar Novo Negócio
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
            >
              <div className="flex flex-col">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="material-symbols-outlined">store</span>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations?.data?.map((org) => (
            <Link key={org.id} href={`/businesses/${org.id}`}>
              <div className="flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-primary/10">
                <div className="flex flex-col">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    <span className="material-symbols-outlined">store</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{org.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {/* org.description would go here if it existed */}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
