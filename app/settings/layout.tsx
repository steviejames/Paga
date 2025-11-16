"use client"

import Link from "next/link"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#18212a] p-4 border-r border-gray-200 dark:border-gray-800">
        <nav className="flex flex-col gap-2 mt-4">
          <Link href="/settings/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">person</span>
            <p className="text-sm font-medium leading-normal">Perfil</p>
          </Link>
          <Link href="/settings/business" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">business_center</span>
            <p className="text-sm font-medium leading-normal">Negócio</p>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
