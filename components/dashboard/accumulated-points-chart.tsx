"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLiverpool } from "@/contexts/liverpool-context"
import { Skeleton } from "@/components/ui/skeleton"

export function AccumulatedPointsChart() {
  const { data } = useLiverpool()
  const chartData = data?.accumulatedPoints ?? []
  const currentPoints = data?.points ?? 0

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Puntos Acumulados
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Puntos Acumulados
          </CardTitle>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{currentPoints}</span>
            <span className="text-xs text-muted-foreground">pts</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c8102e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c8102e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
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
              <Area
                type="monotone"
                dataKey="points"
                stroke="#c8102e"
                strokeWidth={2}
                fill="url(#pointsGradient)"
                dot={{ fill: "#c8102e", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "#c8102e", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
