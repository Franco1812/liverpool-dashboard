// Tipos unificados para el dashboard (mapeados desde API-Football)

export interface LiverpoolDashboardData {
  season: string
  leagueName: string
  position: number
  points: number
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string
  winRatePercent: number
  lastFive: Array<{ result: "W" | "D" | "L"; score: string }>
  unbeatenStreak: number
  // Para gráficos
  resultsDonut: Array<{ name: string; value: number; color: string }>
  accumulatedPoints: Array<{ date: string; points: number; matches: number }>
  goalDifferenceChart: Array<{ date: string; diff: number; goals: number; conceded: number }>
  goalDiffByCompetition: Array<{ comp: string; diff: number; fullName: string }>
  matchesByCompetition: Array<{ comp: string; matches: number; wins: number; draws: number; losses: number }>
}
