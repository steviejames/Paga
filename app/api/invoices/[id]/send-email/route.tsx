import { type NextRequest, NextResponse } from "next/server"
import { invoices } from "@/lib/mock-data"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoice = invoices.find((inv) => inv.id === params.id)

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    const body = await request.json()
    const { to, subject, message } = body

    if (!to) {
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 })
    }

    // In a real implementation, you would use an email service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP

    // Example with Resend (commented out):
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: to,
      subject: subject,
      html: `
        <div>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Fatura em anexo.</p>
        </div>
      `,
      attachments: [
        {
          filename: `${invoice.invoiceNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    })
    */

    // For now, we'll simulate a successful email send
    console.log("[v0] Simulating email send:", {
      to,
      subject,
      message,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    })

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      recipient: to,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
