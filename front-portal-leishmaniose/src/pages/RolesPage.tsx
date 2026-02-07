import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useRoles } from '../hooks/useRoles'
import { RolesTable } from '../components/Admin/RolesTable'
import { AddRoleModal } from '../components/Admin/AddRoleModal'

export const RolesPage: React.FC = () => {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { roles, loading, fetchRoles, createRole, deleteRole } = useRoles()

  // Carregar roles ao montar o componente
  useEffect(() => {
    fetchRoles()
  }, [])

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRole = async (data: any) => {
    try {
      await createRole(data)
    } catch (error) {
      console.error('Erro ao criar grupo:', error)
    }
  }

  const handleDeleteRole = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este grupo?')) {
      try {
        await deleteRole(id)
      } catch (error) {
        console.error('Erro ao deletar grupo:', error)
      }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Gerenciamento de Grupos
            </h1>
            <p className="text-gray-600 mt-2">
              Defina e gerencie os grupos (papéis) do sistema
            </p>
          </div>
          <button
            onClick={() => setIsAddRoleModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            <span>Adicionar Grupo</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
          />
        </div>

        {/* Roles Table */}
        <RolesTable
          roles={filteredRoles}
          loading={loading}
          onDelete={handleDeleteRole}
        />

        {/* Add Role Modal */}
        <AddRoleModal
          isOpen={isAddRoleModalOpen}
          onClose={() => setIsAddRoleModalOpen(false)}
          onSubmit={handleAddRole}
        />
      </div>
    </div>
  )
}
