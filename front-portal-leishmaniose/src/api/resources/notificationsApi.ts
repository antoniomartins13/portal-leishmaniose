import BaseApi from '../baseApi'

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
  symptoms?: any[] // Ajustado para receber objetos de sintomas se necessário
  details: string | null
  status: 'pending' | 'in_analysis' | 'confirmed' | 'discarded'
  user_id: number | null
  created_at: string
  updated_at: string
}

const baseApi = new BaseApi<Notification>('notifications')

export const notificationsApi = {
  async create(data: CreateNotificationRequest): Promise<NotificationResponse> {
    const response = await baseApi.create(data)
    return response as unknown as NotificationResponse
  },

  async getAll(page = 1) {
    return await baseApi.get(`/notifications?page=${page}`)
  },

  async getById(id: number) {
    return await baseApi.get(`/notifications/${id}`)
  },

  async updateStatus(id: number, status: string) {
    return await baseApi.update(id, { status })
  },
}
