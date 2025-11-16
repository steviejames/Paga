"use server"

import { prisma } from "@/lib/prisma"

export async function getOrganizationBySlug(slug: string) {
  return await prisma.organization.findUnique({
    where: { slug },
    include: {
      products: true,
      services: true,
    },
  })
}

export async function getChargeById(id: string) {
  return await prisma.charge.findUnique({
    where: { id },
    include: {
      organization: true,
      customer: true,
      items: true,
    },
  })
}

export async function getChargesByOrganization(organizationId: string) {
  return await prisma.charge.findMany({
    where: { organizationId },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getInvoicesByOrganization(organizationId: string) {
  return await prisma.invoice.findMany({
    where: {
      charge: {
        organizationId,
      },
    },
    include: {
      charge: {
        include: {
          customer: true,
          organization: true,
          items: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getProductsByOrganization(organizationId: string) {
  return await prisma.product.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getServicesByOrganization(organizationId: string) {
  return await prisma.service.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getCustomersByOrganization(organizationId: string) {
  return await prisma.customer.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
  })
}
