import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import { UsersFilters, UsersTable, AddUserModal } from '../components/Admin'
import { EditUserModal, type EditUserFormData } from '../components/Admin/EditUserModal'

interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

export const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'gestor' | 'pesquisador'>('all')
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | undefined>()

  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers()

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleAddUser = async (data: CreateUserFormData) => {
    try {
      await createUser(data)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  const handleEditUser = async (selectedUser: User, data: EditUserFormData) => {
    try {
      await updateUser(selectedUser.id, data)
      setIsEditUserModalOpen(false)
      setSelectedUserForEdit(undefined)
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUser(id)
      } catch (error) {
        console.error('Erro ao deletar usuário:', error)
      }
    }
  }

  const openEditModal = (user: User) => {
    setSelectedUserForEdit(user)
    setIsEditUserModalOpen(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie usuários e suas permissões no sistema
            </p>
          </div>
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            <span>Adicionar Usuário</span>
          </button>
        </div>

        {/* Filters */}
        <UsersFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />

        {/* Users Table */}
        <UsersTable
          users={filteredUsers}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onSubmit={handleAddUser}
        />

        {/* Edit User Modal */}
        <EditUserModal
          isOpen={isEditUserModalOpen}
          user={selectedUserForEdit}
          onClose={() => {
            setIsEditUserModalOpen(false)
            setSelectedUserForEdit(undefined)
          }}
          onSubmit={(data) => {
            if (selectedUserForEdit) {
              return handleEditUser(selectedUserForEdit, data)
            }
            return Promise.resolve()
          }}
        />
      </div>
    </div>
  )
}
