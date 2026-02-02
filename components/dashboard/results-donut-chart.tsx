"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLiverpool } from "@/contexts/liverpool-context"
import { Skeleton } from "@/components/ui/skeleton"

export function ResultsDonutChart() {
  const { data } = useLiverpool()
  const chartData = data?.resultsDonut ?? []
  const total = chartData.reduce((acc, item) => acc + item.value, 0)
  const winRate = total > 0 ? Math.round((chartData[0]?.value ?? 0) / total * 100) : 0

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Resultados
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
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Resultados
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{winRate}%</span>
            <span className="text-xs text-muted-foreground">Victorias</span>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-xs">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-1.5 font-semibold text-foreground">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
