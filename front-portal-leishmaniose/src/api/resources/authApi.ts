import BaseApi from '../baseApi'
import toast from 'react-hot-toast'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
  }
  token: string
}

// Nota: authApi não usa BaseApi pois autenticação é diferente das rotas protegidas
// Importar { api } direto de axiosConfigs quando necessário
import { api } from '../configs/axiosConfigs'

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        '/auth/login',
        credentials
      )
      return response.data
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'Erro ao fazer login. Verifique suas credenciais.'
      toast.error(message)
      throw error
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout', {})
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error)
    }
  },

  async getProfile(): Promise<any> {
    try {
      const response = await api.get('/auth/profile')
      return response.data
    } catch (error: any) {
      console.error('Erro ao obter perfil:', error)
      throw error
    }
  },
}
