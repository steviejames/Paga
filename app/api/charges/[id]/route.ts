import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authorize } from "@/lib/auth"

async function getCharge(id: string) {
  return await prisma.charge.findUnique({
    where: { id },
    include: { organization: true },
  })
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const charge = await getCharge(params.id)
    if (!charge) return new Response("Charge not found", { status: 404 })
    await authorize(charge.organizationId, ["admin", "member"])
    return NextResponse.json(charge)
  } catch (error: any) {
    if (error.message === "Not authenticated" || error.message === "Not a member of this organization" || error.message === "Insufficient permissions") {
      return new Response(error.message, { status: 403 })
    }
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
