import { NextResponse } from "next/server"

// Mock settings data
const mockSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  security: {
    twoFactorAuth: false,
    activeSessions: 2,
  },
  preferences: {
    language: "pt",
    currency: "usd",
    darkMode: false,
    timezone: "Africa/Luanda",
  },
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockSettings,
  })
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    // Update settings
    const updatedSettings = {
      ...mockSettings,
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: updatedSettings,
      message: "Configurações atualizadas com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao atualizar configurações",
      },
      { status: 500 },
    )
  }
}
