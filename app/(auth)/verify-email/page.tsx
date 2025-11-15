import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4 dark:bg-background-dark">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-background-dark/50 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-4xl">mail</span>
          </div>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-[#111417] dark:text-white sm:text-[32px]">
            Confirme seu endereço de e-mail
          </h1>
          <p className="mt-3 text-base font-normal leading-normal text-slate-600 dark:text-slate-300">
            Enviamos um link de verificação para{" "}
            <strong className="font-semibold text-[#111417] dark:text-white">seu.email@exemplo.com</strong>. Por favor,
            clique no link para ativar sua conta.
          </p>
          <div className="mt-8 w-full">
            <Button className="h-12 w-full">Abrir cliente de e-mail</Button>
          </div>
          <p className="mt-6 text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
            Não recebeu o e-mail?{" "}
            <a className="font-medium text-primary underline hover:text-primary/80" href="#">
              Reenviar
            </a>
          </p>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Lembre-se de verificar sua pasta de spam.</p>
        </div>
      </div>
    </div>
  )
}
