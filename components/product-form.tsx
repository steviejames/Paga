import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <Label htmlFor="product-name">Nome</Label>
          <Input id="product-name" placeholder="Ex: Café Especial" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="product-description">Descrição</Label>
          <Textarea id="product-description" placeholder="Descreva os detalhes do seu produto" />
        </div>
        <div>
          <Label htmlFor="product-price">Preço</Label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 dark:text-gray-400">
              R$
            </span>
            <Input id="product-price" placeholder="0,00" className="pl-10" />
          </div>
        </div>
        <div>
          <Label htmlFor="product-category">Categoria</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bebidas">Bebidas</SelectItem>
              <SelectItem value="comidas">Comidas</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label>Imagem do produto</Label>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 py-10 text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">upload_file</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                Arraste e solte uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou GIF até 10MB</p>
            </div>
            <Button variant="outline">Selecionar Arquivo</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost">Cancelar</Button>
        <Button>Salvar Produto</Button>
      </div>
    </div>
  )
}
