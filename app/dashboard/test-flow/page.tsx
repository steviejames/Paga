"use client"

import { Button } from "@/components/ui/button"
import { runTestFlow } from "./actions" // I will create this file next
import { useFormState } from "react-dom"

export default function TestFlowPage() {
  const [state, formAction] = useFormState(runTestFlow, null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Testar Fluxo de ponta a ponta</h1>
      <form action={formAction}>
        <Button type="submit">Iniciar Teste</Button>
      </form>

      {state && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Resultados do Teste:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
