import { NextResponse } from "next/server"
import { payments } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let filteredPayments = [...payments]

  // Filter by status
  if (status && status !== "all") {
    filteredPayments = filteredPayments.filter((payment) => payment.status === status)
  }

  // Filter by search query
  if (search) {
    filteredPayments = filteredPayments.filter((payment) =>
      payment.customer.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredPayments,
    total: filteredPayments.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { recipient, amount, description, paymentMethod } = body

    // Validate required fields
    if (!recipient || !amount) {
      return NextResponse.json(
        {
          success: false,
          error: "Destinatário e valor são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Create new payment
    const newPayment = {
      id: String(payments.length + 1),
      amount: Number.parseFloat(amount),
      status: "scheduled" as const,
      customer: recipient,
      country: "Brasil",
      countryCode: "BR",
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      avatar: "/placeholder.svg?height=40&width=40",
      description,
      paymentMethod,
    }

    return NextResponse.json({
      success: true,
      data: newPayment,
      message: "Pagamento criado com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar pagamento",
      },
      { status: 500 },
    )
  }
}
