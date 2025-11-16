"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Invoice, Charge, Customer, Organization, ChargeItem } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { generateInvoicePdf } from "@/lib/pdf"
import Link from "next/link"

type InvoiceWithCharge = Invoice & {
  charge: Charge & {
    customer: Customer
    organization: Organization
    items: ChargeItem[]
  }
}

export const columns: ColumnDef<InvoiceWithCharge>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Número da Fatura",
  },
  {
    accessorKey: "charge.customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "charge.amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.charge.amount)
      const formatted = new Intl.NumberFormat("pt-AO", {
        style: "currency",
        currency: "AOA",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Emissão",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateInvoicePdf(invoice)}
          >
            Baixar PDF
          </Button>
          <Link href={`/api/invoices/${invoice.id}/agt`} passHref target="_blank">
            <Button variant="outline" size="sm">
              Ver JSON AGT
            </Button>
          </Link>
        </div>
      )
    },
  },
]
