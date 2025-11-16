import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        charge: {
          include: {
            customer: true,
            organization: true,
            items: true,
          },
        },
      },
    })

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 })
    }

    // This is a simulated AGT-compliant JSON structure
    const agtJson = {
      header: {
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.createdAt.toISOString(),
        issuer: {
          name: invoice.charge.organization.name,
          nif: "5000000000", // Placeholder
        },
        recipient: {
          name: invoice.charge.customer.name,
          nif: invoice.charge.customer.nif || "999999999", // Placeholder
        },
      },
      items: invoice.charge.items.map((item) => ({
        description: item.name,
        unitPrice: item.price,
        quantity: 1, // Assuming quantity of 1 for simplicity
        total: item.price,
      })),
      summary: {
        totalAmount: invoice.charge.amount,
        taxAmount: 0, // Assuming 0 tax for simplicity
      },
      // In a real scenario, this would be a cryptographic signature
      signature: "simulated-digital-signature",
    }

    return NextResponse.json(agtJson)
  } catch (error) {
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
