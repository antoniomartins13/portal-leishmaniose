import BaseApi from '../baseApi'

interface Role {
  id?: string
  name: string
  permissions_count?: number
}

const baseApi = new BaseApi<Role>('roles')

export const rolesApi = {
  async getAll() {
    return await baseApi.get('/roles')
  },

  async getById(id: string) {
    return await baseApi.getOne(id)
  },

  async update(id: string, data: any) {
    return await baseApi.update(id, data)
  },

  async getPermissions() {
    return await baseApi.get('/permissions')
  },

  async create(data: Role) {
    return await baseApi.create(data)
  },

  async delete(id: string) {
    return await baseApi.delete(id)
  },
}
