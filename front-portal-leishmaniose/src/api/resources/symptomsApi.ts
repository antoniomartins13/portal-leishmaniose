import BaseApi from '../baseApi'
import { api } from '../configs/axiosConfigs'

export interface Symptom {
  id: number
  name: string
  slug: string
  description: string | null
  active: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateSymptomRequest {
  name: string
  description?: string
  active?: boolean
}

export interface UpdateSymptomRequest {
  name?: string
  description?: string
  active?: boolean
}

const baseApi = new BaseApi<Symptom>('symptoms')

export const symptomsApi = {
  /**
   * Lista pública — apenas sintomas ativos (para formulário de notificação)
   */
  async getAllActive(): Promise<Symptom[]> {
    const response = await api.get('/symptoms')
    return response?.data ?? []
  },

  /**
   * Lista admin — todos os sintomas (ativos e inativos), requer auth
   */
  async getAll(): Promise<Symptom[]> {
    const response = await api.get('/symptoms/all')
    return response?.data ?? []
  },

  async create(data: CreateSymptomRequest) {
    return await baseApi.create(data)
  },

  async update(id: number, data: UpdateSymptomRequest) {
    return await baseApi.update(id, data)
  },

  async delete(id: number) {
    return await baseApi.delete(id)
  },

  async getById(id: number) {
    return await baseApi.getOne(id)
  },
}
