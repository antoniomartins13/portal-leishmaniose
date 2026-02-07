import { useState, useCallback } from 'react'
import {
  notificationsApi,
  Notification,
  ConfirmedCasesFilters,
  PaginatedNotifications,
} from '../api/resources/notificationsApi'
import toast from 'react-hot-toast'

export const useConfirmedCases = () => {
  const [cases, setCases] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  })
  const [filters, setFilters] = useState<ConfirmedCasesFilters>({})

  const loadCases = useCallback(
    async (page = 1, currentFilters?: ConfirmedCasesFilters) => {
      setLoading(true)
      try {
        const result: PaginatedNotifications = await notificationsApi.getConfirmedCases(
          page,
          currentFilters
        )
        setCases(result.data ?? [])
        setPagination({
          currentPage: result.current_page,
          lastPage: result.last_page,
          total: result.total,
        })
      } catch {
        toast.error('Erro ao carregar casos confirmados')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const exportCsv = useCallback(async (currentFilters?: ConfirmedCasesFilters) => {
    setExporting(true)
    try {
      await notificationsApi.exportCsv(currentFilters)
      toast.success('Relatório CSV exportado com sucesso')
    } catch {
      toast.error('Erro ao exportar relatório CSV')
    } finally {
      setExporting(false)
    }
  }, [])

  const exportPdf = useCallback(async (currentFilters?: ConfirmedCasesFilters) => {
    setExporting(true)
    try {
      await notificationsApi.exportPdf(currentFilters)
      toast.success('Relatório PDF exportado com sucesso')
    } catch {
      toast.error('Erro ao exportar relatório PDF')
    } finally {
      setExporting(false)
    }
  }, [])

  const getById = useCallback(async (id: number) => {
    try {
      return await notificationsApi.getById(id)
    } catch {
      toast.error('Erro ao carregar caso')
      return null
    }
  }, [])

  return {
    cases,
    loading,
    exporting,
    pagination,
    filters,
    setFilters,
    loadCases,
    exportCsv,
    exportPdf,
    getById,
  }
}
