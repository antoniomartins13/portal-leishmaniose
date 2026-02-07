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
  async getAll(page = 1, status?: string, search?: string): Promise<PaginatedNotifications> {
    const params = new URLSearchParams()
    params.append('page', String(page))
    if (status && status !== 'all') params.append('status', status)
    if (search) params.append('search', search)

    const response = await api.get(`/notifications?${params.toString()}`)
    return response?.data?.data ?? { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
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
}
