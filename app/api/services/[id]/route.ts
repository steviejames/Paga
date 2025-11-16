import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { authorize } from "@/lib/auth"

const updateServiceSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
})

async function getService(id: string) {
  return await prisma.service.findUnique({
    where: { id },
    include: { organization: true },
  })
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const service = await getService(params.id)
    if (!service) return new Response("Service not found", { status: 404 })
    await authorize(service.organizationId, ["admin", "member"])
    return NextResponse.json(service)
  } catch (error: any) {
    // ... error handling
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const service = await getService(params.id)
    if (!service) return new Response("Service not found", { status: 404 })
    await authorize(service.organizationId, ["admin"])

    const json = await req.json()
    const data = updateServiceSchema.parse(json)

    const updatedService = await prisma.service.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(updatedService)
  } catch (error: any) {
    // ... error handling
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const service = await getService(params.id)
    if (!service) return new Response("Service not found", { status: 404 })
    await authorize(service.organizationId, ["admin"])

    await prisma.service.delete({
      where: { id: params.id },
    })

    return new Response(null, { status: 204 })
  } catch (error: any) {
    // ... error handling
  }
}
