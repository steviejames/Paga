import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { authorize } from "@/lib/auth"

const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
})

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { organization: true },
  })
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id)
    if (!product) return new Response("Product not found", { status: 404 })
    await authorize(product.organizationId, ["admin", "member"])
    return NextResponse.json(product)
  } catch (error: any) {
    // ... error handling
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id)
    if (!product) return new Response("Product not found", { status: 404 })
    await authorize(product.organizationId, ["admin"])

    const json = await req.json()
    const data = updateProductSchema.parse(json)

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    // ... error handling
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id)
    if (!product) return new Response("Product not found", { status: 404 })
    await authorize(product.organizationId, ["admin"])

    await prisma.product.delete({
      where: { id: params.id },
    })

    return new Response(null, { status: 204 })
  } catch (error: any) {
    // ... error handling
  }
}
