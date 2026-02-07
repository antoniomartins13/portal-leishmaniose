import { useState, useCallback } from 'react'
import { usersApi } from '../api/resources/usersApi'

interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

interface PaginatedResponse {
  data: User[]
  meta: {
    current_page: number
    total: number
    per_page: number
    last_page: number
  }
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: 15,
    last_page: 1,
  })

  const fetchUsers = useCallback(
    async (page = 1, search?: string, role?: string) => {
      setLoading(true)
      try {
        const response = await usersApi.getAll(page, search, role)
        setUsers(response.data)
        setPagination(response.meta)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const createUser = useCallback(
    async (data: any) => {
      try {
        const newUser = await usersApi.create(data)
        setUsers((prev) => [newUser, ...prev])
        return newUser
      } catch (error) {
        console.error('Erro ao criar usuário:', error)
        throw error
      }
    },
    []
  )

  const updateUser = useCallback(
    async (id: number, data: any) => {
      try {
        const updatedUser = await usersApi.update(id, data)
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user))
        )
        return updatedUser
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        throw error
      }
    },
    []
  )

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        await usersApi.delete(id)
        setUsers((prev) => prev.filter((user) => user.id !== id))
      } catch (error) {
        console.error('Erro ao deletar usuário:', error)
        throw error
      }
    },
    []
  )

  return {
    users,
    loading,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
