import { prisma } from "@/lib/prisma"
import { getAuth } from "better-auth"

type Role = "admin" | "member"

export async function authorize(organizationId: string, requiredRoles: Role[]) {
  const { session } = await getAuth()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const membership = await prisma.member.findFirst({
    where: {
      organizationId,
      userId: session.userId,
    },
  })

  if (!membership) {
    throw new Error("Not a member of this organization")
  }

  const hasRequiredRole = requiredRoles.some(role => role === membership.role)

  if (!hasRequiredRole) {
    throw new Error("Insufficient permissions")
  }

  return { session, membership }
}
