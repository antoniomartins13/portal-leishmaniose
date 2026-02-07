import React, { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Notification } from '../../api/resources/notificationsApi'
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
        setStatusFilter,
        setSearchTerm,
        loadNotifications,
        updateStatus,
    } = useNotifications()

    const { canAction } = usePermission()
    const canEdit = canAction('notifications', 'edit')

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    // Carrega ao montar e quando filtros mudam
    useEffect(() => {
        loadNotifications(1, statusFilter, searchTerm)
    }, [statusFilter]) // eslint-disable-line react-hooks/exhaustive-deps

    // Debounce de busca
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)
            if (searchTimeout) clearTimeout(searchTimeout)
            const timeout = setTimeout(() => {
                loadNotifications(1, statusFilter, value)
            }, 400)
            setSearchTimeout(timeout)
        },
        [statusFilter, loadNotifications, searchTimeout, setSearchTerm]
    )

    const handlePageChange = (page: number) => {
        loadNotifications(page, statusFilter, searchTerm)
    }

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

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por protocolo, nome ou cidade..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                </div>

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
