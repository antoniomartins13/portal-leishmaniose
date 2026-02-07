import React, { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { Notification } from '../../api/resources/notificationsApi'
import { NotificationFilters } from '../../api/resources/notificationsApi'
import { NotificationsTable } from '../../components/Admin/NotificationsTable'
import { NotificationDetailModal } from '../../components/Admin/NotificationDetailModal'
import { useNotifications } from '../../hooks/useNotifications'
import { usePermission } from '../../hooks/usePermission'

const statusTabs = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'in_analysis', label: 'Em Análise' },
    { value: 'confirmed', label: 'Confirmados' },
    { value: 'discarded', label: 'Descartados' },
]

export const NotificationsPage: React.FC = () => {
    const {
        notifications,
        loading,
        pagination,
        statusFilter,
        searchTerm,
        filters,
        setStatusFilter,
        setSearchTerm,
        setFilters,
        loadNotifications,
        updateStatus,
    } = useNotifications()

    const { canAction } = usePermission()
    const canEdit = canAction('notifications', 'edit')

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    // Filtros locais para o formulário
    const [localFilters, setLocalFilters] = useState<NotificationFilters>({})

    // Carrega ao montar e quando filtros mudam
    useEffect(() => {
        loadNotifications(1, statusFilter, searchTerm, filters)
    }, [statusFilter, filters]) // eslint-disable-line react-hooks/exhaustive-deps

    // Debounce de busca
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)
            if (searchTimeout) clearTimeout(searchTimeout)
            const timeout = setTimeout(() => {
                loadNotifications(1, statusFilter, value, filters)
            }, 400)
            setSearchTimeout(timeout)
        },
        [statusFilter, filters, loadNotifications, searchTimeout, setSearchTerm]
    )

    const handlePageChange = (page: number) => {
        loadNotifications(page, statusFilter, searchTerm, filters)
    }

    const handleApplyFilters = () => {
        setFilters(localFilters)
        setShowFilters(false)
    }

    const handleClearFilters = () => {
        setLocalFilters({})
        setFilters({})
        setShowFilters(false)
    }

    const hasActiveFilters = Object.values(filters).some((v) => v)

    const handleView = (notification: Notification) => {
        setSelectedNotification(notification)
        setIsDetailOpen(true)
    }

    const handleStatusUpdate = async (id: number, status: string) => {
        const success = await updateStatus(id, status)
        return success
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Gerenciamento de Notificações
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Visualize e gerencie as notificações de casos de leishmaniose
                    </p>
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setStatusFilter(tab.value)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${statusFilter === tab.value
                                ? 'bg-teal-700 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search + Filter Toggle */}
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por protocolo, nome ou cidade..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm border transition ${hasActiveFilters
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        <Filter size={16} />
                        <span>Filtros</span>
                        {hasActiveFilters && (
                            <span className="bg-white text-teal-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                !
                            </span>
                        )}
                    </button>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Filtros Avançados</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Data Sintomas - De */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data Sintomas - De
                                </label>
                                <input
                                    type="date"
                                    value={localFilters.symptomsDateFrom ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, symptomsDateFrom: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Data Sintomas - Até */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data Sintomas - Até
                                </label>
                                <input
                                    type="date"
                                    value={localFilters.symptomsDateTo ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, symptomsDateTo: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Data Notificação - De */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data Notificação - De
                                </label>
                                <input
                                    type="date"
                                    value={localFilters.createdFrom ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, createdFrom: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Data Notificação - Até */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data Notificação - Até
                                </label>
                                <input
                                    type="date"
                                    value={localFilters.createdTo ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, createdTo: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                            >
                                Limpar filtros
                            </button>
                            <button
                                onClick={handleApplyFilters}
                                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-sm transition"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <NotificationsTable
                    notifications={notifications}
                    loading={loading}
                    onView={handleView}
                />

                {/* Pagination */}
                {!loading && pagination.lastPage > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Mostrando página {pagination.currentPage} de {pagination.lastPage} ({pagination.total} resultados)
                        </p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage <= 1}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-700">
                                {pagination.currentPage}
                            </span>
                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage >= pagination.lastPage}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Detail Modal */}
                <NotificationDetailModal
                    isOpen={isDetailOpen}
                    onClose={() => {
                        setIsDetailOpen(false)
                        setSelectedNotification(null)
                    }}
                    notification={selectedNotification}
                    onUpdateStatus={handleStatusUpdate}
                    canEdit={canEdit}
                />
            </div>
        </div>
    )
}
