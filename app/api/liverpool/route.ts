import { NextResponse } from "next/server"
import {
  fetchStandings,
  fetchTeamStatistics,
  fetchTeamFixtures,
  LIVERPOOL_TEAM_ID,
  PREMIER_LEAGUE_ID,
} from "@/lib/api-football"
import type { LiverpoolDashboardData } from "@/lib/liverpool-dashboard-types"
import type { ApiFixture } from "@/lib/api-football-types"

const COLORS = {
  wins: "#c8102e",
  draws: "#d4a017",
  losses: "#64748b",
}

const MONTH_LABELS: Record<number, string> = {
  8: "Ago",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dic",
  1: "Ene",
  2: "Feb",
  3: "Mar",
  4: "Abr",
  5: "May",
  6: "Jun",
  7: "Jul",
}

function getResultFromFixture(fixture: ApiFixture): "W" | "D" | "L" | null {
  if (fixture.fixture.status.short !== "FT" && fixture.fixture.status.short !== "AET" && fixture.fixture.status.short !== "PEN") {
    return null
  }
  const home = fixture.teams.home.id === LIVERPOOL_TEAM_ID
  const our = home ? (fixture.goals.home ?? 0) : (fixture.goals.away ?? 0)
  const their = home ? (fixture.goals.away ?? 0) : (fixture.goals.home ?? 0)
  if (our > their) return "W"
  if (our < their) return "L"
  return "D"
}

function computeUnbeatenStreak(form: string): number {
  let streak = 0
  for (const c of form) {
    if (c === "W" || c === "D") streak++
    else break
  }
  return streak
}

export async function GET() {
  try {
    const season = 2024 // 2024-25
    const [standingsRes, statsRes, fixturesRes] = await Promise.all([
      fetchStandings(PREMIER_LEAGUE_ID, season),
      fetchTeamStatistics(PREMIER_LEAGUE_ID, LIVERPOOL_TEAM_ID, season),
      fetchTeamFixtures(LIVERPOOL_TEAM_ID, season),
    ])

    const standingRow = standingsRes.response[0]?.league?.standings?.[0]?.find(
      (s) => s.team.id === LIVERPOOL_TEAM_ID
    )
    if (!standingRow) {
      return NextResponse.json(
        { error: "Liverpool not found in standings" },
        { status: 404 }
      )
    }

    const stats = statsRes.response
    const wins = stats.fixtures.wins.total
    const draws = stats.fixtures.draws.total
    const losses = stats.fixtures.loses.total
    const played = stats.fixtures.played.total
    const goalsFor = stats.goals.for.total.total
    const goalsAgainst = stats.goals.against.total.total
    const winRatePercent = played > 0 ? Math.round((wins / played) * 100) : 0
    const form = stats.form || standingRow.form || ""

    // Partidos finalizados (Free plan: sin parámetro "last", filtramos y tomamos últimos 5 en código)
    const allFixtures = fixturesRes.response || []
    const finished = allFixtures.filter(
      (f) =>
        f.fixture.status.short === "FT" || f.fixture.status.short === "AET" || f.fixture.status.short === "PEN"
    )
    const lastFiveFixtures = [...finished]
      .sort((a, b) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime())
      .slice(0, 5)
      .reverse()
    const lastFive = lastFiveFixtures.map((f) => {
      const result = getResultFromFixture(f)
      const home = f.teams.home.id === LIVERPOOL_TEAM_ID
      const our = home ? (f.goals.home ?? 0) : (f.goals.away ?? 0)
      const their = home ? (f.goals.away ?? 0) : (f.goals.home ?? 0)
      return {
        result: (result ?? "D") as "W" | "D" | "L",
        score: `${our}-${their}`,
      }
    })

    // Acumulado de puntos y diferencia de goles por mes (solo Premier League)
    const allFinished = finished
      .filter((f) => f.league.id === PREMIER_LEAGUE_ID)
      .sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())

    let accPoints = 0
    const pointsByMonth = new Map<string, { points: number; matches: number }>()
    const diffByMonth = new Map<string, { goals: number; conceded: number }>()

    for (const f of allFinished) {
      const result = getResultFromFixture(f)
      if (result === null) continue
      const home = f.teams.home.id === LIVERPOOL_TEAM_ID
      const our = home ? (f.goals.home ?? 0) : (f.goals.away ?? 0)
      const their = home ? (f.goals.away ?? 0) : (f.goals.home ?? 0)
      if (result === "W") accPoints += 3
      else if (result === "D") accPoints += 1
      const d = new Date(f.fixture.date)
      const monthKey = `${d.getFullYear()}-${d.getMonth() + 1}`
      const label = MONTH_LABELS[d.getMonth() + 1] ?? `${d.getMonth() + 1}`
      const prev = pointsByMonth.get(monthKey) ?? { points: 0, matches: 0 }
      pointsByMonth.set(monthKey, {
        points: accPoints,
        matches: prev.matches + 1,
      })
      const prevDiff = diffByMonth.get(monthKey) ?? { goals: 0, conceded: 0 }
      diffByMonth.set(monthKey, {
        goals: prevDiff.goals + our,
        conceded: prevDiff.conceded + their,
      })
    }

    const sortedMonths = Array.from(pointsByMonth.keys()).sort()
    const accumulatedPoints = sortedMonths.map((key) => {
      const v = pointsByMonth.get(key)!
      const [, m] = key.split("-")
      const label = MONTH_LABELS[parseInt(m, 10)] ?? m
      return { date: label, points: v.points, matches: v.matches }
    })
    const goalDifferenceChart = sortedMonths.map((key) => {
      const v = diffByMonth.get(key)!
      const [, m] = key.split("-")
      const label = MONTH_LABELS[parseInt(m, 10)] ?? m
      return {
        date: label,
        diff: v.goals - v.conceded,
        goals: v.goals,
        conceded: v.conceded,
      }
    })

    const data: LiverpoolDashboardData = {
      season: `${season}-${(season + 1) % 100}`,
      leagueName: standingsRes.response[0].league.name,
      position: standingRow.rank,
      points: standingRow.points,
      played: standingRow.all.played,
      wins: standingRow.all.win,
      draws: standingRow.all.draw,
      losses: standingRow.all.lose,
      goalsFor: standingRow.all.goals.for,
      goalsAgainst: standingRow.all.goals.against,
      goalDifference: standingRow.goalsDiff,
      form,
      winRatePercent,
      lastFive: lastFive.length ? lastFive : [{ result: "W", score: "0-0" }],
      unbeatenStreak: computeUnbeatenStreak(form),
      resultsDonut: [
        { name: "Victorias", value: wins, color: COLORS.wins },
        { name: "Empates", value: draws, color: COLORS.draws },
        { name: "Derrotas", value: losses, color: COLORS.losses },
      ],
      accumulatedPoints: accumulatedPoints.length ? accumulatedPoints : [
        { date: "Ago", points: 0, matches: 0 },
      ],
      goalDifferenceChart: goalDifferenceChart.length ? goalDifferenceChart : [
        { date: "Ago", diff: 0, goals: 0, conceded: 0 },
      ],
      goalDiffByCompetition: [
        {
          comp: "Premier",
          diff: standingRow.goalsDiff,
          fullName: standingsRes.response[0].league.name,
        },
      ],
      matchesByCompetition: [
        {
          comp: standingsRes.response[0].league.name,
          matches: played,
          wins,
          draws,
          losses,
        },
      ],
    }

    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
