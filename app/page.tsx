"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ResultsDonutChart } from "@/components/dashboard/results-donut-chart"
import { AccumulatedPointsChart } from "@/components/dashboard/accumulated-points-chart"
import { GoalDifferenceChart } from "@/components/dashboard/goal-difference-chart"
import {
  GoalDiffByCompetitionChart,
  MatchesByCompetitionChart,
} from "@/components/dashboard/competition-stats-chart"
import { KPICard } from "@/components/dashboard/kpi-card"
import { useLiverpool } from "@/contexts/liverpool-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { data, loading, error } = useLiverpool()

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </main>
    )
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground mt-4">
            Asegúrate de tener <code className="bg-muted px-1 rounded">API_FOOTBALL_KEY</code> en tu archivo .env.local. Obtén una clave gratuita en{" "}
            <a href="https://dashboard.api-football.com/register" target="_blank" rel="noopener noreferrer" className="underline">
              api-football.com
            </a>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <DashboardHeader />

        <section className="mt-8">
          <StatsCards />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <ResultsDonutChart />
          <AccumulatedPointsChart />
          <KPICard />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <GoalDifferenceChart />
          <GoalDiffByCompetitionChart />
          <MatchesByCompetitionChart />
        </section>

        <footer className="mt-12 pt-6 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-foreground">
                Liverpool FC Performance Dashboard
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Temporada {data?.season ?? "—"} - Datos en vivo vía API-Football
              </p>
            </div>
            <p className="text-sm italic text-primary font-medium">
              {"You'll Never Walk Alone"}
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
