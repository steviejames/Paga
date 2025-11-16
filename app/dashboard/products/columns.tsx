"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@prisma/client"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("pt-AO", {
        style: "currency",
        currency: "AOA",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
]
