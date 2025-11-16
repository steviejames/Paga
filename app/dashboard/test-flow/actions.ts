"use server"

import { prisma } from "@/lib/prisma"

export async function runTestFlow() {
  try {
    console.log("Start seeding and testing...")

    // Clear previous test data
    await prisma.organization.deleteMany({ where: { id: "test-org-e2e" } })

    // 1. Create Organization and Items
    const org = await prisma.organization.create({
      data: {
        id: "test-org-e2e",
        name: "Empresa de Teste E2E",
        slug: "empresa-de-teste-e2e",
        createdAt: new Date(),
      },
    })

    const product1 = await prisma.product.create({
      data: {
        name: "Produto de Teste E2E 1",
        price: 1000,
        organizationId: org.id,
      },
    })

    const service1 = await prisma.service.create({
      data: {
        name: "Serviço de Teste E2E 1",
        price: 500,
        organizationId: org.id,
      },
    })

    // 2. Create Customer
    const customer = await prisma.customer.create({
      data: {
        name: "Cliente de Teste E2E",
        email: "e2e@test.com",
        nif: "333222111",
        organizationId: org.id,
      },
    })

    // 3. Create Charge
    const charge = await prisma.charge.create({
      data: {
        amount: product1.price + service1.price,
        customerId: customer.id,
        organizationId: org.id,
        items: {
          create: [
            {
              name: product1.name,
              price: product1.price,
              type: "PRODUCT",
              productId: product1.id,
            },
            {
              name: service1.name,
              price: service1.price,
              type: "SERVICE",
              serviceId: service1.id,
            },
          ],
        },
      },
    })

    // 4. "Pay" the Charge
    const paidCharge = await prisma.charge.update({
      where: { id: charge.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    })

    // 5. Create Invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-E2E-${new Date().getTime()}`,
        chargeId: charge.id,
      },
    })

    return {
      success: true,
      organization: org,
      product: product1,
      service: service1,
      customer,
      charge: paidCharge,
      invoice,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}
