import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChargeDetailsLoading() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container px-4 md:px-8 py-8 max-w-5xl">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-3xl p-8">
              <Skeleton className="h-32 w-full" />
            </Card>
            <Card className="rounded-3xl p-6">
              <Skeleton className="h-48 w-full" />
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="rounded-3xl p-6">
              <Skeleton className="h-64 w-full" />
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
