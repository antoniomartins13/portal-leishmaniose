import BaseApi from '../baseApi'
import { objectToQueryString } from '../../utility/Utils'

interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: 'admin' | 'gestor' | 'pesquisador'
}

interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
  role?: 'admin' | 'gestor' | 'pesquisador'
}

interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    total: number
    per_page: number
    last_page: number
  }
}

const baseApi = new BaseApi<User>('users')

export const usersApi = {
  async getAll(page = 1, search?: string, role?: string): Promise<PaginatedResponse<User>> {
    let url = '/users'
    const queryObj: Record<string, any> = {}

    if (page) {
      queryObj.page = page
    }

    if (search) {
      queryObj.search_all_fields_string = search
    }

    if (role) {
      queryObj.role = role
    }

    const queryString = objectToQueryString(queryObj)

    if (queryString) {
      url += `?${queryString}`
    }

    return await baseApi.get(url)
  },

  async getById(id: number): Promise<User | null> {
    return await baseApi.getOne(id)
  },

  async create(data: CreateUserRequest): Promise<User> {
    return await baseApi.create(data)
  },

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    return await baseApi.update(id, data)
  },

  async delete(id: number): Promise<void> {
    return await baseApi.delete(id)
  }
}
