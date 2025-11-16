"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "@/components/product-form"
import { useState } from "react"

export default function ProductsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-gray-900 dark:text-white text-4xl font-black tracking-tight">Produtos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <span className="material-symbols-outlined mr-2">add</span>
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <Input placeholder="Buscar por nome do produto..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="w-full">
            Status
            <span className="material-symbols-outlined ml-2">expand_more</span>
          </Button>
          <Button variant="outline" className="w-full">
            Todos
            <span className="material-symbols-outlined ml-2">expand_more</span>
          </Button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">
                <Checkbox id="checkbox-all" />
              </TableHead>
              <TableHead>Nome do Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Example Row */}
            <TableRow>
              <TableCell className="p-4">
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 mr-3" />
                  <div>
                    <div className="font-semibold">Tênis de Corrida Boost</div>
                    <div className="text-gray-500">Calçados</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>R$ 299,90</TableCell>
              <TableCell>128</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <span className="size-1.5 inline-block rounded-full bg-green-500"></span>
                  Ativo
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <span className="material-symbols-outlined">more_horiz</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
