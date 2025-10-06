import { NextResponse } from "next/server"

// Mock cards data
const mockCards = [
  {
    id: "1",
    type: "visa",
    last4: "0324",
    expiryMonth: 9,
    expiryYear: 24,
    holderName: "João Silva",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8756",
    expiryMonth: 12,
    expiryYear: 25,
    holderName: "João Silva",
    isDefault: false,
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCards,
    total: mockCards.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cardNumber, expiryMonth, expiryYear, cvv, holderName } = body

    // Validate required fields
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !holderName) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos os campos são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Create new card
    const newCard = {
      id: String(mockCards.length + 1),
      type: cardNumber.startsWith("4") ? "visa" : "mastercard",
      last4: cardNumber.slice(-4),
      expiryMonth: Number.parseInt(expiryMonth),
      expiryYear: Number.parseInt(expiryYear),
      holderName,
      isDefault: false,
    }

    return NextResponse.json({
      success: true,
      data: newCard,
      message: "Cartão adicionado com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao adicionar cartão",
      },
      { status: 500 },
    )
  }
}
