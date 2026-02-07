import React from 'react'
import { Eye } from 'lucide-react'
import { Notification } from '../../api/resources/notificationsApi'

interface NotificationsTableProps {
    notifications: Notification[]
    loading: boolean
    onView: (notification: Notification) => void
}

const statusConfig: Record<string, { label: string; className: string }> = {
    pending: {
        label: 'Pendente',
        className: 'bg-yellow-100 text-yellow-800',
    },
    in_analysis: {
        label: 'Em Análise',
        className: 'bg-blue-100 text-blue-800',
    },
    confirmed: {
        label: 'Confirmado',
        className: 'bg-green-100 text-green-800',
    },
    discarded: {
        label: 'Descartado',
        className: 'bg-red-100 text-red-800',
    },
}

export const NotificationsTable: React.FC<NotificationsTableProps> = ({
    notifications,
    loading,
    onView,
}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR')
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-teal-700 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Protocolo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Cidade / UF
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Data Sintomas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Criado em
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => {
                                    const status = statusConfig[notification.status] ?? {
                                        label: notification.status,
                                        className: 'bg-gray-100 text-gray-800',
                                    }

                                    return (
                                        <tr key={notification.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm font-semibold text-teal-700">
                                                    {notification.protocol}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="font-medium text-gray-900">
                                                    {notification.name || 'Não informado'}
                                                </p>
                                                <p className="text-sm text-gray-500">{notification.email}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-gray-900">
                                                    {notification.city} / {notification.state}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                {formatDate(notification.symptoms_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${status.className}`}
                                                >
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(notification.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => onView(notification)}
                                                    className="text-teal-700 hover:text-teal-900 transition"
                                                    title="Ver detalhes"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        Nenhuma notificação encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
