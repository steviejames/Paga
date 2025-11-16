"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customer } from "@prisma/client"

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "nif",
    header: "NIF",
  },
]
