// scripts/test-flow.ts
import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"

const prisma = new PrismaClient()

async function main() {
  console.log("Pushing schema to in-memory database...")
  execSync("npx prisma db push")
  console.log("Schema pushed successfully.")

  console.log("\nStart seeding and testing...")

  // 1. Create Organization and Items
  const org = await prisma.organization.create({
    data: {
      id: "test-org-123",
      name: "Empresa de Teste",
      slug: "empresa-de-teste",
      createdAt: new Date(),
    },
  })
  console.log(`✅ Created organization: ${org.name} (ID: ${org.id})`)

  const product1 = await prisma.product.create({
    data: {
      name: "Produto de Teste 1",
      price: 1000,
      organizationId: org.id,
    },
  })
  console.log(`✅ Created product: ${product1.name}`)

  const service1 = await prisma.service.create({
    data: {
      name: "Serviço de Teste 1",
      price: 500,
      organizationId: org.id,
    },
  })
  console.log(`✅ Created service: ${service1.name}`)

  // 2. Create Customer
  const customer = await prisma.customer.create({
    data: {
      name: "Cliente de Teste Direto",
      email: "direto@test.com",
      nif: "111222333",
      organizationId: org.id,
    },
  })
  console.log(`✅ Created customer: ${customer.name}`)

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
  console.log(`✅ Created charge: ${charge.id} with amount ${charge.amount}`)

  // 4. "Pay" the Charge
  const paidCharge = await prisma.charge.update({
    where: { id: charge.id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  })
  console.log(`✅ Marked charge as PAID. Status: ${paidCharge.status}`)

  // 5. Create Invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: `INV-${new Date().getTime()}`,
      chargeId: charge.id,
    },
  })
  console.log(`✅ Created invoice: ${invoice.invoiceNumber} for charge ${charge.id}`)

  console.log("\n🎉 End-to-end test successful!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
