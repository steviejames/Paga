import { z } from "zod"

export const checkoutSchema = z.object({
  customerName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  customerEmail: z.string().email("E-mail inválido"),
  customerNif: z.string().optional(),
})
