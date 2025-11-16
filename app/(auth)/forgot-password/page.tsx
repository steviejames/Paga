"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authClient.auth.requestPasswordReset({ email })
    setLoading(false)
    if (error) {
      toast({
        title: "Erro ao solicitar redefinição de senha",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "E-mail de redefinição de senha enviado!",
        description: "Verifique sua caixa de entrada para o link de redefinição.",
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-neutral-dark dark:text-white tracking-tight text-2xl sm:text-3xl font-bold leading-tight">
            Esqueceu sua senha?
          </h1>
          <p className="text-neutral-medium dark:text-gray-400 text-sm sm:text-base font-normal leading-normal pt-2 pb-6 max-w-sm">
            Sem problemas. Digite seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha.
          </p>
          <form onSubmit={handleForgotPassword} className="flex w-full flex-col space-y-5">
            <div className="flex w-full flex-col">
              <Label className="flex flex-col w-full text-left">
                <p className="text-neutral-dark dark:text-gray-300 text-sm font-medium leading-normal pb-2">E-mail</p>
                <div className="relative flex items-center w-full">
                  <span className="material-symbols-outlined absolute left-3 text-neutral-medium dark:text-gray-400">
                    mail
                  </span>
                  <Input
                    className="pl-10"
                    placeholder="seuemail@exemplo.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Label>
            </div>
            <div className="flex w-full pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Aguarde..." : "Enviar Link de Redefinição"}
              </Button>
            </div>
          </form>
          <div className="flex items-center pt-6">
            <span className="material-symbols-outlined text-base text-neutral-medium dark:text-gray-400 mr-2">
              arrow_back
            </span>
            <Link href="/login" className="text-sm font-medium text-primary hover:underline">
              Voltar para o Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
