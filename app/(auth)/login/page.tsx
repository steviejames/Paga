"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authClient.auth.signIn({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Login efetuado com sucesso!",
      })
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black text-text-light-primary dark:text-text-dark-primary sm:text-4xl">
            Bem-vindo de volta!
          </h1>
          <p className="mt-2 text-base text-text-light-secondary dark:text-text-dark-secondary">
            Acesse sua conta para gerenciar seus negócios.
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <Label htmlFor="password">Senha</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button type="submit" className="h-14" disabled={loading}>
              {loading ? "Aguarde..." : "Entrar"}
            </Button>
            <div className="flex w-full items-center gap-4">
              <hr className="w-full border-t border-border-light dark:border-border-dark" />
              <p className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">ou</p>
              <hr className="w-full border-t border-border-light dark:border-border-dark" />
            </div>
            <Button variant="outline" className="h-14" disabled>
              Entrar com o Google
            </Button>
          </div>
          <p className="text-center text-sm font-normal text-text-light-secondary dark:text-text-dark-secondary">
            Ainda não tem uma conta?{" "}
            <Link href="/sign-up" className="font-bold text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
