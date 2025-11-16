"use client"

import { useActiveOrganization } from "better-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BusinessSettingsPage() {
  const { organization } = useActiveOrganization()

  if (!organization) {
    return <div>A carregar...</div>
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
        <p className="text-[#111827] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Negócio</p>
      </div>
      <div className="bg-white dark:bg-[#18212a] rounded-xl shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-[#111827] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Detalhes do Negócio</h2>
          <p className="text-[#6B7280] dark:text-gray-400 text-base font-normal leading-normal mt-1">Atualize as informações do seu negócio aqui.</p>
        </div>
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[#111827] dark:text-white text-base font-medium leading-normal pb-2" htmlFor="businessName">Nome do Negócio</label>
              <Input id="businessName" value={organization.name} />
            </div>
            <div className="flex flex-col">
              <label className="text-[#111827] dark:text-white text-base font-medium leading-normal pb-2" htmlFor="businessSlug">Subdomínio</label>
              <Input id="businessSlug" value={organization.slug} disabled />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end gap-3 p-4">
        <Button variant="outline">Cancelar</Button>
        <Button disabled>Salvar Alterações</Button>
      </div>
    </div>
  )
}
