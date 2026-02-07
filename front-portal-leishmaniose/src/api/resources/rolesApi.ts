import BaseApi from '../baseApi'

interface Role {
  id?: string
  name: string
  display_name?: string
  description?: string
  permissions_count?: number
}

const baseApi = new BaseApi<Role>('roles')

export const rolesApi = {
  async getAll() {
    return await baseApi.get('/roles')
  },

  async create(data: Role) {
    return await baseApi.create(data)
  },

  async delete(id: string) {
    return await baseApi.delete(id)
  },
}
