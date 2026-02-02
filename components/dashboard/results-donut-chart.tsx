"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const COLORS = {
  wins: "#c8102e",
  draws: "#d4a017",
  losses: "#64748b",
}

const data = [
  { name: "Victorias", value: 29, color: COLORS.wins },
  { name: "Empates", value: 7, color: COLORS.draws },
  { name: "Derrotas", value: 4, color: COLORS.losses },
]

export function ResultsDonutChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  const winRate = Math.round((data[0].value / total) * 100)

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
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
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
          {data.map((item) => (
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
