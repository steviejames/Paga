import { NextResponse } from "next/server"
import { payments } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const payment = payments.find((p) => p.id === params.id)

  if (!payment) {
    return NextResponse.json(
      {
        success: false,
        error: "Pagamento não encontrado",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: payment,
  })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const payment = payments.find((p) => p.id === params.id)

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          error: "Pagamento não encontrado",
        },
        { status: 404 },
      )
    }

    // Update payment
    const updatedPayment = {
      ...payment,
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: updatedPayment,
      message: "Pagamento atualizado com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao atualizar pagamento",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const payment = payments.find((p) => p.id === params.id)

  if (!payment) {
    return NextResponse.json(
      {
        success: false,
        error: "Pagamento não encontrado",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    message: "Pagamento excluído com sucesso",
  })
}
