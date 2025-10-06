import { Card } from "@/components/ui/card"
import { Building2, TrendingUp, Users, Receipt, FileText, Link2 } from "lucide-react"
import Link from "next/link"

interface BusinessCardProps {
  business: {
    id: string
    name: string
    type: string
    balance: number
  }
}

export function BusinessCard({ business }: BusinessCardProps) {
  const formattedBalance = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  }).format(business.balance)

  return (
    <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-[#2D3FFF] to-[#4F5EFF] p-8 shadow-lg">
      {/* Business Icon */}
      <div className="absolute right-8 top-8 opacity-20">
        <Building2 className="h-16 w-16 text-white" />
      </div>

      {/* Business Info */}
      <div className="relative space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{business.name}</h3>
              <p className="text-sm text-white/80">{business.type}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
            <span>Total a receber</span>
            <span className="rounded bg-[#10B981] px-2 py-0.5 text-xs font-semibold text-white">+12%</span>
          </div>
          <div className="text-4xl font-semibold tracking-tight text-white">{formattedBalance}</div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/charges">
            <button className="flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Criar</span>
            </button>
          </Link>
          <button className="flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Link2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">Link</span>
          </button>
          <Link href="/historico">
            <button className="flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Relatório</span>
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="h-4 w-4 text-white/80" />
              <span className="text-xs text-white/80">Cobranças</span>
            </div>
            <p className="text-2xl font-semibold text-white">24</p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-white/80" />
              <span className="text-xs text-white/80">Clientes</span>
            </div>
            <p className="text-2xl font-semibold text-white">156</p>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm p-4">
          <TrendingUp className="h-5 w-5 text-[#10B981]" />
          <div>
            <p className="text-sm text-white/80">Crescimento este mês</p>
            <p className="text-lg font-semibold text-white">+12.5%</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
