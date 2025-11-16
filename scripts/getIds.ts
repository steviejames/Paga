// scripts/getIds.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const product = await prisma.product.findFirst({
    where: { name: "Produto de Teste 1" },
  })
  const service = await prisma.service.findFirst({
    where: { name: "Serviço de Teste 1" },
  })

  console.log("Product ID:", product?.id)
  console.log("Service ID:", service?.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
