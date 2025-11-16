"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getOrganizationBySlug } from "@/lib/queries"
import { ProductCard } from "@/components/product-card"
import { ServiceCard } from "@/components/service-card"

export default function BusinessPage() {
  const params = useParams()
  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization", params.slug],
    queryFn: () => getOrganizationBySlug(params.slug as string),
    enabled: !!params.slug,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!organization) {
    return <div>Negócio não encontrado</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{organization.name}</h1>
        {/* <p className="text-lg text-muted-foreground">{organization.description}</p> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Produtos</h2>
          <div className="space-y-4">
            {organization.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Serviços</h2>
          <div className="space-y-4">
            {organization.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
