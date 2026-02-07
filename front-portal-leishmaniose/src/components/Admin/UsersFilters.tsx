import React from 'react'
import { Search, ChevronDown } from 'lucide-react'

interface UsersFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: 'all' | 'admin' | 'gestor' | 'pesquisador'
  onRoleFilterChange: (role: 'all' | 'admin' | 'gestor' | 'pesquisador') => void
}

export const UsersFilters: React.FC<UsersFiltersProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}) => {
  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Search */}
      <div className="md:col-span-2 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
      </div>

      {/* Role Filter */}
      <div className="relative">
        <select
          value={roleFilter}
          onChange={(e) =>
            onRoleFilterChange(e.target.value as 'all' | 'admin' | 'gestor' | 'pesquisador')
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 appearance-none"
        >
          <option value="all">Todos os Grupos</option>
          <option value="admin">Administrador</option>
          <option value="gestor">Gestor</option>
          <option value="pesquisador">Pesquisador</option>
        </select>
        <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
      </div>
    </div>
  )
}
