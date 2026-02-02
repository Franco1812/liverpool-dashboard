"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLiverpool } from "@/contexts/liverpool-context"
import { Skeleton } from "@/components/ui/skeleton"

const COLORS = ["#c8102e", "#d4a017", "#64748b"]

export function GoalDiffByCompetitionChart() {
  const { data } = useLiverpool()
  const goalDiffData = data?.goalDiffByCompetition ?? []

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Dif. Goles por Competicion
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-[180px] w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Dif. Goles por Competicion
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={goalDiffData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="comp"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                formatter={(value, _name, props) => [
                  `${Number(value) > 0 ? "+" : ""}${value}`,
                  props.payload.fullName
                ]}
              />
              <Bar dataKey="diff" radius={[0, 4, 4, 0]}>
                {goalDiffData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.diff >= 0 ? "#c8102e" : "#64748b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function MatchesByCompetitionChart() {
  const { data } = useLiverpool()
  const matchesData = data?.matchesByCompetition ?? []

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Partidos por Competicion
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-[180px] w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Partidos por Competicion
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {matchesData.map((item) => {
            const total = item.wins + item.draws + item.losses
            const winPct = (item.wins / total) * 100
            const drawPct = (item.draws / total) * 100
            const lossPct = (item.losses / total) * 100

            return (
              <div key={item.comp} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate max-w-[120px]">{item.comp}</span>
                  <span className="font-medium text-foreground">{item.matches} partidos</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="transition-all"
                    style={{ width: `${winPct}%`, backgroundColor: COLORS[0] }}
                  />
                  <div
                    className="transition-all"
                    style={{ width: `${drawPct}%`, backgroundColor: COLORS[1] }}
                  />
                  <div
                    className="transition-all"
                    style={{ width: `${lossPct}%`, backgroundColor: COLORS[2] }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[0] }} />
            <span className="text-muted-foreground">V</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[1] }} />
            <span className="text-muted-foreground">E</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[2] }} />
            <span className="text-muted-foreground">D</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
