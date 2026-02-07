import toast from 'react-hot-toast'
import { api } from './configs/axiosConfigs'
import type { AxiosRequestConfig } from 'axios/index'

export const toastStyleConfig = {
  style: {
    minWidth: '250px',
    minHeight: '75px'
  }
}

export const toastGetMessage = {
  loading: 'Carregando...',
  success: 'Dado carregado com sucesso.',
  error: 'Erro ao carregar dado!'
}

export const toastGetAllMessage = {
  loading: 'Carregando...',
  success: 'Dados carregados com sucesso.',
  error: 'Erro ao carregar dados!'
}

export const toastCreateMessage = {
  loading: 'Carregando...',
  success: 'Dado criado com sucesso.',
  error: 'Erro ao criar dado!'
}

export const toastUpdateMessage = {
  loading: 'Atualizando...',
  success: 'Dado atualizado com sucesso.',
  error: 'Erro ao atualizar dado!'
}

export const toastEmailSentMessage = {
  loading: 'Enviando email...',
  success: 'Email enviado com sucesso.',
  error: 'Erro ao enviar email!'
}

export const toastDeleteMessage = {
  loading: 'Deletando...',
  success: 'Dado deletado com sucesso.',
  error: 'Erro ao deletar dado!'
}

export const toastActiveMessage = {
  loading: 'Ativando...',
  success: 'Dado ativado com sucesso.',
  error: 'Erro ao ativar dado!'
}

export const toastCodeConfirmMessage = {
  loading: 'Confirmando...',
  success: 'Código confirmado com sucesso.',
  error: 'Erro ao confirmar código!'
}

interface ApiResponse<T = any> {
  data?: T
  message?: string
  status?: number
  title?: string
}

export default class BaseApi<T = any> {
  private route: string

  constructor(route: string) {
    this.route = route
  }

  async getAll(page?: number, config?: AxiosRequestConfig): Promise<T[]> {
    let url = `/${this.route}`

    if (page) {
      url += `?page=${page}`
    }

    try {
      const response = await (config ? api.get<ApiResponse<T[]>>(url, config) : api.get<ApiResponse<T[]>>(url))
      return response?.data?.data ?? []
    } catch (error: any) {
      const { code, response: errorResponse } = error

      if (code !== 'ERR_CANCELED') {
        toast.error(
          errorResponse?.data?.title ?? 'Erro ao carregar os dados.',
          { duration: 30000 }
        )
      } else {
        toast.remove()
      }

      throw error
    }
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (config
        ? api.get<ApiResponse<T>>(url, config)
        : api.get<ApiResponse<T>>(url))
      return response?.data ?? {}
    } catch (error: any) {
      if (error?.code !== 'ERR_CANCELED') {
        let message = 'Erro ao carregar os dados.'
        if (error?.response?.data?.detail) {
          message = error?.response?.data?.detail
        }
        toast.error(message ?? error?.response?.data?.title, { duration: 15000 })
      }
      if (error?.code === 'ERR_CANCELED') {
        toast.remove()
      }
      throw error
    }
  }

  async getOne(id: number | string, config?: AxiosRequestConfig): Promise<T | null> {
    try {
      const response = await (config
        ? api.get<ApiResponse<T>>(`/${this.route}/${id}`, config)
        : api.get<ApiResponse<T>>(`/${this.route}/${id}`))
      return response?.data?.data ?? null
    } catch (error: any) {
      if (error?.code !== 'ERR_CANCELED') {
        toast.error(
          error?.response?.data?.title ?? 'Erro ao carregar os dados.',
          { duration: 30000 }
        )
      }
      if (error?.code === 'ERR_CANCELED') {
        toast.remove()
      }
      throw error
    }
  }

  async create(data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await toast.promise(
        api.post<any>(`/${this.route}`, data, config),
        toastCreateMessage,
        toastStyleConfig
      ) as any

      return response?.data?.data ?? response?.data ?? {}
    } catch (error: any) {
      if (error?.response?.data?.status === 422) {
        toast.error(error?.response?.data?.title, { duration: 60000 })
      }

      throw error
    }
  }

  async update(id: number | string, data: any): Promise<T> {
    try {
      const response = await toast.promise(
        api.put<any>(`/${this.route}/${id}`, data),
        toastUpdateMessage,
        toastStyleConfig
      ) as any

      return response?.data?.data ?? response?.data ?? {}
    } catch (error: any) {
      if (error?.response?.data?.status === 422) {
        toast.error(error?.response?.data?.title, { duration: 60000 })
      }

      throw error
    }
  }

  async delete(id: number | string): Promise<void> {
    try {
      await toast.promise(
        api.delete(`/${this.route}/${id}`),
        toastDeleteMessage,
        toastStyleConfig
      )
    } catch (error) {
      throw error
    }
  }

  async patch(url: string, data?: any): Promise<T> {
    try {
      const response = await toast.promise(
        api.patch<any>(url, data),
        toastUpdateMessage,
        toastStyleConfig
      ) as any

      return response?.data?.data ?? response?.data ?? {}
    } catch (error) {
      throw error
    }
  }

  async post(url: string, data: any): Promise<T> {
    try {
      const response = await toast.promise(
        api.post<any>(url, data),
        toastCreateMessage,
        toastStyleConfig
      ) as any

      return response?.data?.data ?? response?.data ?? {}
    } catch (error) {
      throw error
    }
  }
}
