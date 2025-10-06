import { NextResponse } from "next/server"

// Mock user data
const mockUser = {
  id: "1",
  firstName: "João",
  lastName: "Silva",
  email: "joao.silva@exemplo.com",
  phone: "+244 900 000 000",
  avatar: "/woman-profile.jpg",
  createdAt: "2024-01-15",
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockUser,
  })
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    // Update user profile
    const updatedUser = {
      ...mockUser,
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Perfil atualizado com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao atualizar perfil",
      },
      { status: 500 },
    )
  }
}
