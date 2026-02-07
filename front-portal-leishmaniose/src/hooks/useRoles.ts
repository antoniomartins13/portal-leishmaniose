import { useState, useCallback } from 'react'
import { rolesApi } from '../api/resources/rolesApi'

interface Role {
  id?: string
  name: string
  display_name?: string
  description?: string
  permissions_count?: number
}

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRoles = useCallback(async () => {
    setLoading(true)
    try {
      const response = await rolesApi.getAll()
      setRoles(response.data || response)
    } catch (error) {
      console.error('Erro ao buscar grupos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const createRole = useCallback(async (data: Role) => {
    try {
      const newRole = await rolesApi.create(data)
      setRoles((prev) => [newRole, ...prev])
      return newRole
    } catch (error) {
      console.error('Erro ao criar grupo:', error)
      throw error
    }
  }, [])

  const deleteRole = useCallback(async (id: string) => {
    try {
      await rolesApi.delete(id)
      setRoles((prev) => prev.filter((role) => (role.id || role.name) !== id))
    } catch (error) {
      console.error('Erro ao deletar grupo:', error)
      throw error
    }
  }, [])

  return {
    roles,
    loading,
    fetchRoles,
    createRole,
    deleteRole,
  }
}
