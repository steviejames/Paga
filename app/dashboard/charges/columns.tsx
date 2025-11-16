"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Charge, Customer } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type ChargeWithCustomer = Charge & { customer: Customer }

export const columns: ColumnDef<ChargeWithCustomer>[] = [
  {
    accessorKey: "customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-AO", {
        style: "currency",
        currency: "AOA",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "PAID" ? "default" : "secondary"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const charge = row.original
      return (
        <Link href={`/charges/public/${charge.id}`} passHref>
          <Button variant="outline" size="sm" asChild>
            <a>Ver</a>
          </Button>
        </Link>
      )
    },
  },
]
