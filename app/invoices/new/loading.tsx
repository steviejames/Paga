import { Skeleton } from "@/components/ui/skeleton"

export default function NewInvoiceLoading() {
  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-2 h-5 w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96 rounded-3xl" />
            <Skeleton className="h-48 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
