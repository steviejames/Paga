import { NextResponse } from "next/server"
import { payments, chartData } from "@/lib/mock-data"

export async function GET() {
  // Calculate statistics
  const totalSent = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const totalReceived = totalSent * 0.5 // Mock data
  const pendingCount = payments.filter((p) => p.status === "scheduled" || p.status === "processing").length
  const completedCount = payments.filter((p) => p.status === "completed").length
  const monthlyTransactions = payments.length

  // Calculate growth percentages
  const sentGrowth = 18
  const receivedGrowth = 12

  return NextResponse.json({
    success: true,
    data: {
      totalSent,
      totalReceived,
      pendingCount,
      completedCount,
      monthlyTransactions,
      sentGrowth,
      receivedGrowth,
      chartData,
    },
  })
}
