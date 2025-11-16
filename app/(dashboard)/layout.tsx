"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignOutButton } from "better-auth/components"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-row">
      <aside className="flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined text-xl"> all_inclusive </span>
              </div>
              <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-normal">InfinityPay</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> dashboard </span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </Link>
              <Link
                href="/dashboard/charges"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> receipt_long </span>
                <p className="text-sm font-medium leading-normal">Cobranças</p>
              </Link>
               <Link
                href="/dashboard/invoices"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> description </span>
                <p className="text-sm font-medium leading-normal">Faturas</p>
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> groups </span>
                <p className="text-sm font-medium leading-normal">Clientes</p>
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> inventory_2 </span>
                <p className="text-sm font-medium leading-normal">Produtos</p>
              </Link>
               <Link
                href="/dashboard/services"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> miscellaneous_services </span>
                <p className="text-sm font-medium leading-normal">Serviços</p>
              </Link>
               <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-2xl"> settings </span>
                <p className="text-sm font-medium leading-normal">Configurações</p>
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <SignOutButton>
              <Button variant="ghost" className="flex items-center gap-3 justify-start px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined text-2xl"> logout </span>
                <p className="text-sm font-medium leading-normal">Sair</p>
              </Button>
            </SignOutButton>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            {/* We can make this dynamic later */}
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-2xl"> notifications </span>
            </Button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</div>
      </main>
    </div>
  )
}
