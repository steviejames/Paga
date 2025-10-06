"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { BusinessCard } from "@/components/business-card"
import { RecentClients } from "@/components/clients-scroll"
import {  PendingCharges } from "@/components/pending-charges"
import { TotalBilledChart } from "@/components/total-billed-chart"
import { Plus, ChevronDown, Building2, PlusCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Business {
  id: string
  name: string
  type: string
  balance: number
}

export default function DashboardPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>({
    id: "1",
    name: "WavePay Principal",
    type: "Conta Principal",
    balance: 8450000,
  })

  const [businesses, setBusinesses] = useState<Business[]>([
    { id: "1", name: "WavePay Principal", type: "Conta Principal", balance: 8450000 },
    { id: "2", name: "Loja Online", type: "E-commerce", balance: 2340000 },
    { id: "3", name: "Serviços de Consultoria", type: "Serviços", balance: 1890000 },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newBusinessName, setNewBusinessName] = useState("")
  const [newBusinessType, setNewBusinessType] = useState("")

  const handleCreateBusiness = () => {
    if (newBusinessName.trim() && newBusinessType.trim()) {
      const newBusiness: Business = {
        id: Date.now().toString(),
        name: newBusinessName,
        type: newBusinessType,
        balance: 0,
      }
      setBusinesses([...businesses, newBusiness])
      setNewBusinessName("")
      setNewBusinessType("")
      setIsCreateDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="container px-4 md:px-8 py-8 mx-auto">
        {/* Page Title */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Visão geral de cobranças</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{selectedBusiness.name}</span>
                      <span className="text-xs text-muted-foreground">{selectedBusiness.type}</span>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {businesses.map((business) => (
                  <DropdownMenuItem
                    key={business.id}
                    onClick={() => setSelectedBusiness(business)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">{business.name}</span>
                        <span className="text-xs text-muted-foreground">{business.type}</span>
                      </div>
                      {business.id === selectedBusiness.id && (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsCreateDialogOpen(true)} className="cursor-pointer">
                  <div className="flex items-center gap-3 w-full text-primary">
                    <PlusCircle className="h-4 w-4" />
                    <span className="font-medium">Criar novo negócio</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/charges" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Nova cobrança
              </button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/*  */}
          <div className="space-y-6 col-span-full">
            <BusinessCard business={selectedBusiness} />
            
          </div>

         
          <div className="space-y-6 col-span-full">
            <PendingCharges />
            
          </div>
          <div className="space-y-6 col-span-full">
        
              <RecentClients />
          </div>
        </div>

        {/* Full Width Chart */}
        <div className="mt-6">
          <TotalBilledChart />
        </div>
      </main>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar novo negócio</DialogTitle>
            <DialogDescription>Adicione um novo negócio para gerenciar cobranças separadamente.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Nome do negócio</Label>
              <Input
                id="business-name"
                placeholder="Ex: Minha Loja Online"
                value={newBusinessName}
                onChange={(e) => setNewBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Tipo de negócio</Label>
              <Input
                id="business-type"
                placeholder="Ex: E-commerce, Serviços, Restaurante"
                value={newBusinessType}
                onChange={(e) => setNewBusinessType(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateBusiness}>Criar negócio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
