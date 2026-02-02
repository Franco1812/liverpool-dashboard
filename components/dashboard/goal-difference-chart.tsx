"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLiverpool } from "@/contexts/liverpool-context"
import { Skeleton } from "@/components/ui/skeleton"

export function GoalDifferenceChart() {
  const { data } = useLiverpool()
  const chartData = data?.goalDifferenceChart ?? []
  const totalDiff = data?.goalDifference ?? 0

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Diferencia de Goles
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Diferencia de Goles
          </CardTitle>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold ${totalDiff >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {totalDiff >= 0 ? "+" : ""}{totalDiff}
            </span>
            <span className="text-xs text-muted-foreground">total</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--border))" />
              <Bar dataKey="diff" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
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
