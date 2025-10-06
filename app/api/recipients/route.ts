import { NextResponse } from "next/server"
import { payments } from "@/lib/mock-data"

export async function GET() {
  // Extract unique recipients from payments
  const recipients = payments.map((payment) => ({
    id: payment.id,
    name: payment.customer,
    country: payment.country,
    countryCode: payment.countryCode,
    avatar: payment.avatar,
    lastTransaction: {
      amount: payment.amount,
      date: payment.date,
      status: payment.status,
    },
  }))

  return NextResponse.json({
    success: true,
    data: recipients,
    total: recipients.length,
  })
}
