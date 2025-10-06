import { Skeleton } from "@/components/ui/skeleton"

export default function InvoiceDetailsLoading() {
  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-8 py-8 max-w-6xl">
        <Skeleton className="mb-6 h-10 w-48" />

        <div className="mb-8 flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[800px] rounded-3xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-48 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
