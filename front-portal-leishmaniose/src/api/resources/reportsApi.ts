import { api } from '../configs/axiosConfigs'
import type { Notification, PaginatedNotifications } from './notificationsApi'
import type { Symptom } from './symptomsApi'

export interface ReportFilters {
  created_from?: string
  created_to?: string
}

export const reportsApi = {
  /**
   * Lista notificações filtradas por período (protegida — requer notifications.view)
   * Acumula todas as páginas para fornecer dados completos ao painel.
   */
  async getNotifications(filters?: ReportFilters): Promise<Notification[]> {
    const params = new URLSearchParams()
    if (filters?.created_from) params.append('created_from', filters.created_from)
    if (filters?.created_to) params.append('created_to', filters.created_to)

    const allData: Notification[] = []
    let currentPage = 1
    let lastPage = 1

    do {
      params.set('page', String(currentPage))
      const response = await api.get<PaginatedNotifications>(
        `/reports/notifications?${params.toString()}`
      )
      const paginated = response?.data ?? { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
      allData.push(...(paginated.data ?? []))
      lastPage = paginated.last_page
      currentPage++
    } while (currentPage <= lastPage)

    return allData
  },

  /**
   * Lista notificações — primeira página apenas (para contagem rápida via total)
   */
  async getNotificationsSummary(filters?: ReportFilters): Promise<PaginatedNotifications> {
    const params = new URLSearchParams()
    params.append('page', '1')
    if (filters?.created_from) params.append('created_from', filters.created_from)
    if (filters?.created_to) params.append('created_to', filters.created_to)

    const response = await api.get<PaginatedNotifications>(
      `/reports/notifications?${params.toString()}`
    )
    return response?.data ?? { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
  },

  /**
   * Lista sintomas ativos (rota pública)
   */
  async getSymptoms(): Promise<Symptom[]> {
    const response = await api.get<Symptom[]>('/reports/symptoms')
    return response?.data ?? []
  },
}
