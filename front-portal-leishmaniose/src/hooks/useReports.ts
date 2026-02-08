import { useState, useEffect, useCallback } from 'react'
import { reportsApi, type ReportFilters } from '../api/resources/reportsApi'
import type { Notification } from '../api/resources/notificationsApi'
import type { Symptom } from '../api/resources/symptomsApi'

interface SymptomCount {
  id: number
  name: string
  count: number
}

interface DailyCounts {
  date: string
  total: number
  confirmed: number
  pending: number
  in_analysis: number
  discarded: number
}

interface StateCounts {
  state: string
  count: number
}

interface ReportsData {
  notifications: Notification[]
  symptoms: Symptom[]
  total: number
  confirmed: number
  pending: number
  inAnalysis: number
  discarded: number
  confirmationRate: number
  dailyCounts: DailyCounts[]
  topSymptoms: SymptomCount[]
  stateRanking: StateCounts[]
}

const emptyData: ReportsData = {
  notifications: [],
  symptoms: [],
  total: 0,
  confirmed: 0,
  pending: 0,
  inAnalysis: 0,
  discarded: 0,
  confirmationRate: 0,
  dailyCounts: [],
  topSymptoms: [],
  stateRanking: [],
}

export function useReports(filters: ReportFilters) {
  const [data, setData] = useState<ReportsData>(emptyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const processData = useCallback(
    (notifications: Notification[], symptoms: Symptom[]): ReportsData => {
      const total = notifications.length
      const confirmed = notifications.filter((n) => n.status === 'confirmed').length
      const pending = notifications.filter((n) => n.status === 'pending').length
      const inAnalysis = notifications.filter((n) => n.status === 'in_analysis').length
      const discarded = notifications.filter((n) => n.status === 'discarded').length
      const confirmationRate = total > 0 ? (confirmed / total) * 100 : 0

      // Série temporal agrupada por dia (created_at)
      const dailyMap = new Map<string, DailyCounts>()
      notifications.forEach((n) => {
        const date = n.created_at?.split('T')[0] ?? ''
        if (!date) return
        if (!dailyMap.has(date)) {
          dailyMap.set(date, { date, total: 0, confirmed: 0, pending: 0, in_analysis: 0, discarded: 0 })
        }
        const entry = dailyMap.get(date)!
        entry.total++
        if (n.status === 'confirmed') entry.confirmed++
        else if (n.status === 'pending') entry.pending++
        else if (n.status === 'in_analysis') entry.in_analysis++
        else if (n.status === 'discarded') entry.discarded++
      })
      const dailyCounts = Array.from(dailyMap.values()).sort(
        (a, b) => a.date.localeCompare(b.date)
      )

      // Contagem de sintomas
      const symptomMap = new Map<number, SymptomCount>()
      notifications.forEach((n) => {
        n.symptoms?.forEach((s) => {
          if (!symptomMap.has(s.id)) {
            symptomMap.set(s.id, { id: s.id, name: s.name, count: 0 })
          }
          symptomMap.get(s.id)!.count++
        })
      })
      const topSymptoms = Array.from(symptomMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Ranking por estado
      const stateMap = new Map<string, number>()
      notifications.forEach((n) => {
        const state = n.state ?? 'Desconhecido'
        stateMap.set(state, (stateMap.get(state) ?? 0) + 1)
      })
      const stateRanking = Array.from(stateMap.entries())
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      return {
        notifications,
        symptoms,
        total,
        confirmed,
        pending,
        inAnalysis,
        discarded,
        confirmationRate,
        dailyCounts,
        topSymptoms,
        stateRanking,
      }
    },
    []
  )

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      reportsApi.getNotifications(filters),
      reportsApi.getSymptoms(),
    ])
      .then(([notifications, symptoms]) => {
        if (!cancelled) {
          setData(processData(notifications, symptoms))
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (err?.code !== 'ERR_CANCELED') {
            setError('Erro ao carregar dados do relatório.')
          }
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [filters.created_from, filters.created_to, processData])

  return { data, loading, error }
}
