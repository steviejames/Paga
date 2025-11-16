"use client"

import { Card } from "@/components/ui/card"
import { Service } from "@prisma/client"

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="p-4">
      <div>
        <h3 className="font-bold">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
        <p className="font-bold mt-2">
          {new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA",
          }).format(service.price)}
        </p>
      </div>
    </Card>
  )
}
