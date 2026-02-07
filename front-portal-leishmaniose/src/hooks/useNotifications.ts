import { useState, useCallback } from 'react'
import {
  notificationsApi,
  Notification,
  NotificationFilters,
  PaginatedNotifications,
} from '../api/resources/notificationsApi'
import toast from 'react-hot-toast'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  })
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<NotificationFilters>({})

  const loadNotifications = useCallback(
    async (page = 1, status?: string, search?: string, extraFilters?: NotificationFilters) => {
      setLoading(true)
      try {
        const result: PaginatedNotifications = await notificationsApi.getAll(
          page,
          status,
          search,
          extraFilters
        )
        setNotifications(result.data ?? [])
        setPagination({
          currentPage: result.current_page,
          lastPage: result.last_page,
          total: result.total,
        })
      } catch (error) {
        toast.error('Erro ao carregar notificações')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updateStatus = useCallback(
    async (id: number, status: string) => {
      try {
        await notificationsApi.updateStatus(id, status)
        toast.success('Status atualizado com sucesso')
        // Recarrega a lista com os filtros atuais
        await loadNotifications(pagination.currentPage, statusFilter, searchTerm, filters)
        return true
      } catch (error) {
        toast.error('Erro ao atualizar status')
        return false
      }
    },
    [loadNotifications, pagination.currentPage, statusFilter, searchTerm, filters]
  )

  const getById = useCallback(async (id: number) => {
    try {
      return await notificationsApi.getById(id)
    } catch (error) {
      toast.error('Erro ao carregar notificação')
      return null
    }
  }, [])

  return {
    notifications,
    loading,
    pagination,
    statusFilter,
    searchTerm,
    filters,
    setStatusFilter,
    setSearchTerm,
    setFilters,
    loadNotifications,
    updateStatus,
    getById,
  }
}
