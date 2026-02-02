// Tipos para respuestas de API-Football (v3.football.api-sports.io)

export interface ApiStandingsResponse {
  get: string
  parameters: { league: string; season: string }
  errors: Record<string, unknown>
  results: number
  paging: { current: number; total: number }
  response: Array<{
    league: {
      id: number
      name: string
      country: string
      logo: string
      flag: string
      season: number
      standings: Array<Array<{
        rank: number
        team: { id: number; name: string; logo: string }
        points: number
        goalsDiff: number
        group: string
        form: string
        all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } }
        home: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } }
        away: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } }
      }>>
    }
  }>
}

export interface ApiTeamStatisticsResponse {
  get: string
  parameters: { league: string; season: string; team: string }
  errors: Record<string, unknown>
  results: number
  response: {
    league: { id: number; name: string; country: string; season: number }
    team: { id: number; name: string; logo: string }
    form: string
    fixtures: {
      played: { home: number; away: number; total: number }
      wins: { home: number; away: number; total: number }
      draws: { home: number; away: number; total: number }
      loses: { home: number; away: number; total: number }
    }
    goals: {
      for: {
        total: { home: number; away: number; total: number }
        average: { home: string; away: string; total: string }
      }
      against: {
        total: { home: number; away: number; total: number }
        average: { home: string; away: string; total: string }
      }
    }
    biggest: {
      streak: { wins: number; draws: number; loses: number }
    }
  }
}

export interface ApiFixture {
  fixture: { id: number; date: string; status: { short: string } }
  league: { id: number; name: string; round: string }
  teams: { home: { id: number; name: string }; away: { id: number; name: string } }
  goals: { home: number | null; away: number | null }
  score: { fulltime: { home: number | null; away: number | null } }
}

export interface ApiFixturesResponse {
  get: string
  parameters: Record<string, string>
  errors: Record<string, unknown>
  results: number
  response: ApiFixture[]
}
