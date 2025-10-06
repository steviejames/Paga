"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, ChevronDown } from "lucide-react"
import { chartData } from "@/lib/mock-data"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TotalBilledChart() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar")
  const [timePeriod, setTimePeriod] = useState("Último mês")

  const maxAmount = Math.max(...chartData.map((d) => d.amount))

  const timePeriods = ["Última semana", "Último mês", "Últimos 3 meses", "Último ano"]

  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Total faturado</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType("bar")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                chartType === "bar"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Colunas
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                chartType === "line"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Linha
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Calendar className="h-4 w-4" />
                  {timePeriod}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {timePeriods.map((period) => (
                  <DropdownMenuItem key={period} onClick={() => setTimePeriod(period)}>
                    {period}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
            <span>500K</span>
            <span>400K</span>
            <span>300K</span>
            <span>200K</span>
            <span>100K</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 flex h-full items-end justify-between gap-3">
            {chartData.map((data, index) => {
              const height = (data.amount / maxAmount) * 100
              const isHighlighted = index === 1 || index === 6

              return (
                <div key={data.date} className="group relative flex-1">
                  {/* Tooltip */}
                  {isHighlighted && (
                    <div className="absolute -top-16 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                      <div>Kz {data.amount.toLocaleString()}</div>
                      <div className="text-[10px] opacity-80">{data.date}</div>
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isHighlighted ? "bg-[#2D3FFF]" : "bg-[#E2E8F0] group-hover:bg-[#CBD5E1]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div className="ml-12 mt-3 flex justify-between text-xs text-muted-foreground">
            {chartData.map((data) => (
              <div key={data.date} className="flex-1 text-center">
                {data.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
