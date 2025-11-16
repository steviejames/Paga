import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import PaymentSuccessEmail from "@/components/emails/payment-success"

// FAKE WhatsApp API client
const whatsapp = {
  messages: {
    create: ({ to, body }: { to: string; body: string }) => {
      console.log(`--- SIMULATING WHATSAPP MESSAGE ---`)
      console.log(`To: ${to}`)
      console.log(`Body: ${body}`)
      console.log(`------------------------------------`)
      return Promise.resolve({ sid: `fake-sid-${Math.random()}` })
    },
  },
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const charge = await prisma.charge.update({
      where: { id: params.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
      include: {
        organization: true,
        customer: true,
        items: true,
      },
    })

    // Create the invoice record
    const invoiceNumber = `INV-${new Date().getTime()}`
    await prisma.invoice.create({
      data: {
        invoiceNumber,
        chargeId: charge.id,
      },
    })

    // Send payment success email
    await resend.emails.send({
      from: "InfinityPay <nao-responda@infinitypay.ao>",
      to: [charge.customer.email],
      subject: "Pagamento recebido com sucesso!",
      react: PaymentSuccessEmail({
        customerName: charge.customer.name,
        chargeAmount: charge.amount,
        organizationName: charge.organization.name,
      }),
    })

    // Send simulated WhatsApp notification (assuming customer has a phone number field)
    const customerPhoneNumber = "+244999999999" // Placeholder
    await whatsapp.messages.create({
      to: customerPhoneNumber,
      body: `Olá ${charge.customer.name}, o seu pagamento de ${new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(charge.amount)} para ${charge.organization.name} foi recebido com sucesso!`,
    })


    return NextResponse.json(charge)
  } catch (error) {
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
