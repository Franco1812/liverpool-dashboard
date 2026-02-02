"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Trophy, Percent, Calendar } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    positive: boolean
  }
  highlight?: boolean
}

function StatCard({ title, value, subtitle, icon, trend, highlight }: StatCardProps) {
  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-md ${highlight ? "border-primary/50 bg-primary/5 dark:bg-primary/10" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-3xl font-bold tracking-tight ${highlight ? "text-primary" : "text-foreground"}`}>
                {value}
              </span>
              {trend && (
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {trend.positive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {trend.positive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={`rounded-lg p-2.5 ${highlight ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Goles Totales"
        value={59}
        subtitle="Esta temporada"
        icon={<Target className="h-5 w-5" />}
        trend={{ value: 12, positive: true }}
      />
      <StatCard
        title="Posicion Liga"
        value="1ro"
        subtitle="Premier League"
        icon={<Trophy className="h-5 w-5" />}
        highlight
      />
      <StatCard
        title="Efectividad"
        value="72%"
        subtitle="Victorias totales"
        icon={<Percent className="h-5 w-5" />}
        trend={{ value: 8, positive: true }}
      />
      <StatCard
        title="Partidos"
        value={40}
        subtitle="Todas las competiciones"
        icon={<Calendar className="h-5 w-5" />}
      />
    </div>
  )
}
