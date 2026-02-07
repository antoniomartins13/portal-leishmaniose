import React, { useState, useEffect } from 'react'
import { X, User, MapPin, Calendar, FileText, AlertCircle } from 'lucide-react'
import { Notification } from '../../api/resources/notificationsApi'

interface NotificationDetailModalProps {
    isOpen: boolean
    onClose: () => void
    notification: Notification | null
    onUpdateStatus: (id: number, status: string) => Promise<boolean>
    canEdit: boolean
}

const statusConfig: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
    in_analysis: { label: 'Em Análise', className: 'bg-blue-100 text-blue-800' },
    confirmed: { label: 'Confirmado', className: 'bg-green-100 text-green-800' },
    discarded: { label: 'Descartado', className: 'bg-red-100 text-red-800' },
}

const statusActions: { value: string; label: string; className: string }[] = [
    {
        value: 'in_analysis',
        label: 'Colocar em Análise',
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
        value: 'confirmed',
        label: 'Confirmar Caso',
        className: 'bg-green-600 hover:bg-green-700 text-white',
    },
    {
        value: 'discarded',
        label: 'Descartar',
        className: 'bg-red-600 hover:bg-red-700 text-white',
    },
    {
        value: 'pending',
        label: 'Voltar a Pendente',
        className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    },
]

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
    isOpen,
    onClose,
    notification,
    onUpdateStatus,
    canEdit,
}) => {
    const [updatingStatus, setUpdatingStatus] = useState(false)

    useEffect(() => {
        if (!isOpen) setUpdatingStatus(false)
    }, [isOpen])

    if (!isOpen || !notification) return null

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('pt-BR')

    const status = statusConfig[notification.status] ?? {
        label: notification.status,
        className: 'bg-gray-100 text-gray-800',
    }

    const availableActions = statusActions.filter(
        (a) => a.value !== notification.status
    )

    const handleStatusChange = async (newStatus: string) => {
        setUpdatingStatus(true)
        const success = await onUpdateStatus(notification.id, newStatus)
        if (success) {
            onClose()
        }
        setUpdatingStatus(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Detalhes da Notificação
                        </h2>
                        <span className="font-mono text-sm text-teal-700 font-semibold">
                            {notification.protocol}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${status.className}`}
                        >
                            {status.label}
                        </span>
                    </div>

                    {/* Dados do Notificante */}
                    <div className="space-y-3">
                        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                            <User size={18} />
                            <span>Dados do Notificante</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Nome</p>
                                <p className="text-gray-900">{notification.name || 'Não informado'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">CPF</p>
                                <p className="text-gray-900">{notification.cpf}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">E-mail</p>
                                <p className="text-gray-900">{notification.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">CEP</p>
                                <p className="text-gray-900">{notification.cep || 'Não informado'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="space-y-3">
                        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                            <MapPin size={18} />
                            <span>Endereço</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Cidade</p>
                                <p className="text-gray-900">{notification.city}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Estado</p>
                                <p className="text-gray-900">{notification.state}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Bairro</p>
                                <p className="text-gray-900">{notification.neighborhood || 'Não informado'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Caso */}
                    <div className="space-y-3">
                        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                            <Calendar size={18} />
                            <span>Informações do Caso</span>
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">
                                    Data dos Sintomas
                                </p>
                                <p className="text-gray-900">
                                    {formatDate(notification.symptoms_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">
                                    Data da Notificação
                                </p>
                                <p className="text-gray-900">
                                    {formatDate(notification.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sintomas */}
                    {notification.symptoms && notification.symptoms.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                                <AlertCircle size={18} />
                                <span>Sintomas Relatados</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {notification.symptoms.map((symptom) => (
                                    <span
                                        key={symptom.id}
                                        className="px-3 py-1 bg-teal-50 text-teal-800 text-sm rounded-full font-medium"
                                    >
                                        {symptom.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detalhes */}
                    {notification.details && (
                        <div className="space-y-3">
                            <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                                <FileText size={18} />
                                <span>Detalhes Adicionais</span>
                            </h3>
                            <p className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                                {notification.details}
                            </p>
                        </div>
                    )}

                    {/* Status Actions */}
                    {canEdit && (
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Alterar Status
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {availableActions.map((action) => (
                                    <button
                                        key={action.value}
                                        onClick={() => handleStatusChange(action.value)}
                                        disabled={updatingStatus}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition disabled:opacity-50 ${action.className}`}
                                    >
                                        {updatingStatus ? 'Atualizando...' : action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
