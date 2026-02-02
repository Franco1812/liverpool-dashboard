import type {
  ApiStandingsResponse,
  ApiTeamStatisticsResponse,
  ApiFixturesResponse,
} from "./api-football-types"

/**
 * API-Football v3 (api-sports.io)
 * Reference IDs:
 * - Country GB-ENG = England
 * - Team 40 = Liverpool (Liverpool FC)
 * - League 39 = Premier League
 */
const BASE_URL = "https://v3.football.api-sports.io"

function getHeaders(): HeadersInit {
  const key = process.env.API_FOOTBALL_KEY
  if (!key) {
    throw new Error("API_FOOTBALL_KEY is not set in environment variables")
  }
  return {
    "x-apisports-key": key,
  }
}

export async function fetchStandings(
  leagueId: number,
  season: number
): Promise<ApiStandingsResponse> {
  const url = `${BASE_URL}/standings?league=${leagueId}&season=${season}`
  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Standings API error: ${res.status}`)
  const data = (await res.json()) as ApiStandingsResponse
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(String(data.errors[Object.keys(data.errors)[0] as keyof typeof data.errors]))
  }
  return data
}

export async function fetchTeamStatistics(
  leagueId: number,
  teamId: number,
  season: number
): Promise<ApiTeamStatisticsResponse> {
  const url = `${BASE_URL}/teams/statistics?league=${leagueId}&team=${teamId}&season=${season}`
  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Team statistics API error: ${res.status}`)
  const data = (await res.json()) as ApiTeamStatisticsResponse
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(String(data.errors[Object.keys(data.errors)[0] as keyof typeof data.errors]))
  }
  return data
}

/** Free plan: no "last" parameter — fetch all fixtures and slice in code. */
export async function fetchTeamFixtures(
  teamId: number,
  season: number
): Promise<ApiFixturesResponse> {
  const params = new URLSearchParams({ team: String(teamId), season: String(season) })
  const url = `${BASE_URL}/fixtures?${params.toString()}`
  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`Fixtures API error: ${res.status}`)
  const data = (await res.json()) as ApiFixturesResponse
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(String(data.errors[Object.keys(data.errors)[0] as keyof typeof data.errors]))
  }
  return data
}

export const LIVERPOOL_TEAM_ID = 40
export const PREMIER_LEAGUE_ID = 39
