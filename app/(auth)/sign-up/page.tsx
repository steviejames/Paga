"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authClient.auth.signUp({
      email,
      password,
      name,
    })
    setLoading(false)
    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "Enviamos um e-mail de verificação para você.",
      })
      router.push("/verify-email")
    }
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="flex flex-1 flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#111417] dark:text-white">Crie sua Conta</h1>
            <p className="mt-2 text-base text-[#647587] dark:text-gray-400">
              Rápido e fácil. Junte-se à plataforma líder em gestão.
            </p>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Label htmlFor="full-name">Nome Completo</Label>
              <Input
                id="full-name"
                placeholder="Insira seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Seu melhor e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Crie uma senha forte</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-14" disabled={loading}>
              {loading ? "Aguarde..." : "Registrar"}
            </Button>
          </form>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background-light dark:bg-background-dark px-2 text-[#647587] dark:text-gray-400">
                ou
              </span>
            </div>
          </div>
          <div>
            <Button variant="outline" className="w-full h-14" disabled>
              Registrar com Google
            </Button>
          </div>
          <div className="text-center text-sm text-[#647587] dark:text-gray-400">
            <p>
              Ao se registrar, você concorda com nossos{" "}
              <Link href="/terms" className="font-semibold text-primary hover:underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="/privacy" className="font-semibold text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
            <p className="mt-4">
              Já possui uma conta?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:flex flex-1 w-1/2 items-center justify-center relative bg-gray-100 dark:bg-background-dark"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgUua0kBM4fY3yjun1N6F1P9mDKfTqGhEuMytR4jAvucWvuAdlHmTRjzvhebKJdnPvyhAsiTrl8l3s2K2Tc9rjd1E_ZkZamZikd2Cp0jJYHqEqp1j51STmR-S9B5Q3iLn1EvBAoepKDoCO4_KupS5vKL54r7sV3Sq3meo7U6i0xSrpGLm2DOATQUL7cMzfzitjTHbt0zjqlYcyz3eP1gGBtxNLPywxZIpgLv63UYlJdDxLgPGz7hKCDkK75ivWrq_GtzO-eUO4p-o')",
        }}
      >
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
        <div className="relative z-10 p-12 text-white max-w-xl">
          <h2 className="text-4xl font-bold leading-tight">Gestão simplificada. Resultados ampliados.</h2>
          <p className="mt-4 text-lg text-white/80">
            Nossa plataforma oferece as ferramentas que você precisa para crescer seu negócio com confiança e
            eficiência.
          </p>
        </div>
      </div>
    </div>
  )
}
