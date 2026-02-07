import BaseApi from '../baseApi'
import { api } from '../configs/axiosConfigs'

export interface CreateNotificationRequest {
  name?: string
  cpf: string
  email: string
  cep?: string
  state: string
  city: string
  neighborhood?: string
  symptoms_date: string
  symptom_ids?: number[]
  details?: string
}

export interface NotificationResponse {
  id: number
  protocol: string
}

export interface NotificationSymptom {
  id: number
  name: string
}

export interface NotificationUser {
  id: number
  name: string
  email: string
}

export interface Notification {
  id: number
  protocol: string
  name: string | null
  cpf: string
  email: string
  cep: string | null
  state: string
  city: string
  neighborhood: string | null
  symptoms_date: string
  symptoms?: NotificationSymptom[]
  details: string | null
  status: 'pending' | 'in_analysis' | 'confirmed' | 'discarded'
  status_label?: string
  user_id: number | null
  user?: NotificationUser | null
  created_at: string
  updated_at: string
}

export interface PaginatedNotifications {
  data: Notification[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface NotificationFilters {
  city?: string
  symptomsDateFrom?: string
  symptomsDateTo?: string
  createdFrom?: string
  createdTo?: string
}

export interface ConfirmedCasesFilters {
  search?: string
  state?: string
  city?: string
  neighborhood?: string
  symptomsDateFrom?: string
  symptomsDateTo?: string
  createdFrom?: string
  createdTo?: string
  symptomId?: number
}

const baseApi = new BaseApi<Notification>('notifications')

export const notificationsApi = {
  /**
   * Cria uma nova notificação (rota pública)
   */
  async create(data: CreateNotificationRequest): Promise<NotificationResponse> {
    const response = await baseApi.create(data)
    return response as unknown as NotificationResponse
  },

  /**
   * Lista notificações com filtros (admin/gestor)
   */
  async getAll(
    page = 1,
    status?: string,
    search?: string,
    filters?: NotificationFilters
  ): Promise<PaginatedNotifications> {
    const params = new URLSearchParams()
    params.append('page', String(page))
    if (status && status !== 'all') params.append('status', status)
    if (search) params.append('search', search)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.symptomsDateFrom) params.append('symptoms_date_from', filters.symptomsDateFrom)
    if (filters?.symptomsDateTo) params.append('symptoms_date_to', filters.symptomsDateTo)
    if (filters?.createdFrom) params.append('created_from', filters.createdFrom)
    if (filters?.createdTo) params.append('created_to', filters.createdTo)

    const response = await api.get(`/notifications?${params.toString()}`)
    return response?.data ?? { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
  },

  /**
   * Busca uma notificação pelo ID (admin/gestor)
   */
  async getById(id: number): Promise<Notification> {
    const response = await api.get(`/notifications/${id}`)
    return response?.data?.data ?? null
  },

  /**
   * Atualiza o status de uma notificação (admin/gestor)
   */
  async updateStatus(id: number, status: string): Promise<Notification> {
    const response = await api.patch(`/notifications/${id}/status`, { status })
    return response?.data?.data ?? null
  },

  /**
   * Lista casos confirmados com filtros avançados (pesquisador/admin/gestor)
   */
  async getConfirmedCases(
    page = 1,
    filters?: ConfirmedCasesFilters
  ): Promise<PaginatedNotifications> {
    const params = new URLSearchParams()
    params.append('page', String(page))
    params.append('status', 'confirmed')
    if (filters?.search) params.append('search', filters.search)
    if (filters?.state) params.append('state', filters.state)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.neighborhood) params.append('neighborhood', filters.neighborhood)
    if (filters?.symptomsDateFrom) params.append('symptoms_date_from', filters.symptomsDateFrom)
    if (filters?.symptomsDateTo) params.append('symptoms_date_to', filters.symptomsDateTo)
    if (filters?.createdFrom) params.append('created_from', filters.createdFrom)
    if (filters?.createdTo) params.append('created_to', filters.createdTo)
    if (filters?.symptomId) params.append('symptom_id', String(filters.symptomId))

    const response = await api.get(`/notifications?${params.toString()}`)
    return response?.data ?? { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
  },

  /**
   * Exporta casos confirmados como CSV
   */
  async exportCsv(filters?: ConfirmedCasesFilters): Promise<void> {
    const params = new URLSearchParams()
    if (filters?.search) params.append('search', filters.search)
    if (filters?.state) params.append('state', filters.state)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.neighborhood) params.append('neighborhood', filters.neighborhood)
    if (filters?.symptomsDateFrom) params.append('symptoms_date_from', filters.symptomsDateFrom)
    if (filters?.symptomsDateTo) params.append('symptoms_date_to', filters.symptomsDateTo)
    if (filters?.createdFrom) params.append('created_from', filters.createdFrom)
    if (filters?.createdTo) params.append('created_to', filters.createdTo)
    if (filters?.symptomId) params.append('symptom_id', String(filters.symptomId))

    const response = await api.get(`/notifications/export-csv?${params.toString()}`, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    const date = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `casos-confirmados-${date}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },

  /**
   * Exporta casos confirmados como PDF
   */
  async exportPdf(filters?: ConfirmedCasesFilters): Promise<void> {
    const params = new URLSearchParams()
    if (filters?.search) params.append('search', filters.search)
    if (filters?.state) params.append('state', filters.state)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.neighborhood) params.append('neighborhood', filters.neighborhood)
    if (filters?.symptomsDateFrom) params.append('symptoms_date_from', filters.symptomsDateFrom)
    if (filters?.symptomsDateTo) params.append('symptoms_date_to', filters.symptomsDateTo)
    if (filters?.createdFrom) params.append('created_from', filters.createdFrom)
    if (filters?.createdTo) params.append('created_to', filters.createdTo)
    if (filters?.symptomId) params.append('symptom_id', String(filters.symptomId))

    const response = await api.get(`/notifications/export-pdf?${params.toString()}`, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    const date = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `casos-confirmados-${date}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },
}
