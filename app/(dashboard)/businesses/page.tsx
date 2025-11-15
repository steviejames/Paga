import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MyBusinessesPage() {
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
        <Link href="/businesses/new">
          <Button>
            <span className="material-symbols-outlined mr-2">add</span>
            Criar Novo Negócio
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-primary/10">
          <div className="flex flex-col">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              <span className="material-symbols-outlined">store</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tech Solutions Inc.</h2>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              Soluções inovadoras de software para empresas.
            </p>
          </div>
        </div>
        <div className="flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-primary/10">
          <div className="flex flex-col">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              <span className="material-symbols-outlined">store</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Café Gourmet Brasil</h2>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              Cafés especiais de origem única para os paladares mais exigentes.
            </p>
          </div>
        </div>
        <div className="flex cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-primary/10">
          <div className="flex flex-col">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              <span className="material-symbols-outlined">store</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Digital Growth Agency</h2>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              Especialistas em marketing digital e crescimento de marca online.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
