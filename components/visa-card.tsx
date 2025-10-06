import { Card } from "@/components/ui/card"
import { Waves } from "lucide-react"

export function VisaCard() {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-[#2D3FFF] to-[#4F5EFF] p-8 shadow-lg">
      {/* VISA Logo */}
      <div className="absolute right-8 top-8 text-2xl font-bold text-white">VISA</div>

      {/* Contactless Icon */}
      <div className="absolute right-8 top-8">
        <Waves className="h-6 w-6 rotate-90 text-white/80" />
      </div>

      {/* Illustration */}
      <div className="relative flex h-48 items-center justify-center">
        <div className="relative">
          {/* Phone illustration */}
          <div className="relative z-10 h-32 w-20 rounded-2xl bg-white/90 shadow-xl">
            <div className="absolute inset-x-0 top-4 mx-auto h-16 w-12 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]" />
          </div>

          {/* Link/Chain illustration */}
          <div className="absolute -left-16 top-1/2 z-20 -translate-y-1/2">
            <div className="flex items-center gap-1">
              <div className="h-16 w-8 rounded-full border-8 border-white/80" />
              <div className="h-16 w-8 rounded-full border-8 border-white/80" />
            </div>
          </div>

          {/* Card illustration */}
          <div className="absolute -right-12 top-1/2 h-20 w-28 -translate-y-1/2 rounded-xl bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Card Number */}
      <div className="mt-4 text-sm font-medium tracking-wider text-white/90">•••• 4329</div>

      {/* Expiry */}
      <div className="absolute bottom-8 right-8 text-xs text-white/80">09/24</div>
    </Card>
  )
}
