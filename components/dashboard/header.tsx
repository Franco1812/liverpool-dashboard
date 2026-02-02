"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

const competitions = [
  "Todas las Competiciones",
  "Premier League",
  "Champions League",
  "FA Cup",
  "EFL Cup",
]

function LiverpoolLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-label="Liverpool FC Logo"
    >
      <circle cx="50" cy="50" r="48" className="fill-[#c8102e]" />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        className="stroke-[#f6eb61]"
        strokeWidth="2"
      />
      <path d="M50 18 L53 38 L50 34 L47 38 Z" className="fill-[#f6eb61]" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        className="fill-white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        LFC
      </text>
      <text
        x="50"
        y="72"
        textAnchor="middle"
        className="fill-[#f6eb61]"
        fontSize="7"
        fontFamily="sans-serif"
      >
        EST. 1892
      </text>
    </svg>
  )
}

export function DashboardHeader() {
  const [selectedCompetition, setSelectedCompetition] = useState(
    "Todas las Competiciones"
  )

  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <LiverpoolLogo className="h-20 w-20 lg:h-24 lg:w-24 drop-shadow-lg" />
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-foreground">
              LIVERPOOL FC
            </h1>
            <p className="text-base lg:text-xl font-semibold text-primary mt-1">
              PERFORMANCE ANALYSIS 2025-26
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Datos de ejemplo - No son estadisticas reales
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-lg border shadow-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Temporada 2025-26</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-card shadow-sm">
              {selectedCompetition}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {competitions.map((comp) => (
              <DropdownMenuItem
                key={comp}
                onClick={() => setSelectedCompetition(comp)}
                className={selectedCompetition === comp ? "bg-accent" : ""}
              >
                {comp}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
