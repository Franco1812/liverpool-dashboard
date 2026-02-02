"use client"

import React, { createContext, useContext, useMemo, useState, useEffect } from "react"
import type { LiverpoolDashboardData } from "@/lib/liverpool-dashboard-types"

interface LiverpoolContextValue {
  data: LiverpoolDashboardData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const LiverpoolContext = createContext<LiverpoolContextValue | null>(null)

export function LiverpoolProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<LiverpoolDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/liverpool")
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }
      const json = (await res.json()) as LiverpoolDashboardData
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar datos")
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const value = useMemo(
    () => ({ data, loading, error, refetch: fetchData }),
    [data, loading, error]
  )

  return (
    <LiverpoolContext.Provider value={value}>
      {children}
    </LiverpoolContext.Provider>
  )
}

export function useLiverpool() {
  const ctx = useContext(LiverpoolContext)
  if (!ctx) {
    throw new Error("useLiverpool must be used within LiverpoolProvider")
  }
  return ctx
}
