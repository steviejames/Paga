import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { authorize } from "@/lib/auth"

const createChargeSchema = z.object({
  customerId: z.string(),
  cart: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      type: z.enum(["PRODUCT", "SERVICE"]),
    })
  ),
  organizationId: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { customerId, cart, organizationId } = createChargeSchema.parse(json)

    await authorize(organizationId, ["admin", "member"])

    const total = cart.reduce((acc, item) => acc + item.price, 0)

    const charge = await prisma.charge.create({
      data: {
        amount: total,
        customerId,
        organizationId,
        items: {
          create: cart.map((item) => ({
            name: item.name,
            price: item.price,
            type: item.type,
            productId: item.type === "PRODUCT" ? item.id : null,
            serviceId: item.type === "SERVICE" ? item.id : null,
          })),
        },
      },
    })

    return NextResponse.json(charge)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    if (error.message === "Not authenticated" || error.message === "Not a member of this organization" || error.message === "Insufficient permissions") {
      return new Response(error.message, { status: 403 })
    }
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
