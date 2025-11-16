"use client"

import { Card } from "@/components/ui/card"
import { Product } from "@prisma/client"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="p-4">
      <div>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="font-bold mt-2">
          {new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA",
          }).format(product.price)}
        </p>
      </div>
    </Card>
  )
}
