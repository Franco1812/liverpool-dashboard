"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, TrendingUp } from "lucide-react"

const recentResults = [
  { result: "W", score: "3-1" },
  { result: "W", score: "2-0" },
  { result: "D", score: "1-1" },
  { result: "W", score: "4-2" },
  { result: "W", score: "2-1" },
]

export function KPICard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Racha Invicta
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80">
            <div className="text-center">
              <span className="text-4xl font-bold text-white">12</span>
              <Flame className="absolute -top-2 -right-2 h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground mt-4">Partidos sin perder</p>
        <p className="text-xs text-muted-foreground">Mejor racha de la temporada</p>

        <div className="w-full mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ultimos 5 partidos
            </span>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              <span>4V 1E</span>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {recentResults.map((game, i) => (
              <div
                key={i}
                className={`flex-1 py-2 px-1 rounded-lg text-center text-xs font-medium transition-colors ${
                  game.result === "W"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : game.result === "D"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                <div className="font-bold">{game.result}</div>
                <div className="text-[10px] opacity-80">{game.score}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
