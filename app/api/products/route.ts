import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { authorize } from "@/lib/auth"

const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
  organizationId: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const data = createProductSchema.parse(json)

    await authorize(data.organizationId, ["admin"])

    const product = await prisma.product.create({
      data,
    })

    return NextResponse.json(product)
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
