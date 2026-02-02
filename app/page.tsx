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

export default function DashboardPage() {
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
                Temporada 2025-26 - Datos de ejemplo
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
