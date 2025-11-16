"use client"

import { GeistSans } from "geist/font/sans"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@/app/globals.css"
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
