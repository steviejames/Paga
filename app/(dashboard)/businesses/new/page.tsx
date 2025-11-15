import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewBusinessPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 px-4">
        <div className="flex gap-6 justify-between items-center mb-2">
          <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">Passo 1 de 3</p>
        </div>
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2">
          <div className="h-2 rounded-full bg-primary" style={{ width: "33%" }}></div>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
              Vamos configurar seu negócio
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Preencha os dados abaixo para dar o primeiro passo na plataforma.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <Label htmlFor="business-name">Nome do Negócio</Label>
            <Input id="business-name" placeholder="Ex: Minha Loja Incrível" />
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">Este nome será visível para seus clientes.</p>
          </div>
          <div>
            <Label htmlFor="subdomain">Endereço na plataforma (Subdomínio)</Label>
            <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
              <Input
                id="subdomain"
                placeholder="seunegocio"
                className="border-0 focus:ring-0"
              />
              <span className="text-gray-400 dark:text-gray-500 pr-4 text-base font-normal">.plataforma.com</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
              Será o endereço único do seu negócio na plataforma.
            </p>
          </div>
          <div>
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente o que seu negócio faz..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>
            Criar Negócio
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
