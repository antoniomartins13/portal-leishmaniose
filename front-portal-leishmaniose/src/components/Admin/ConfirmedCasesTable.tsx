import React from 'react'
import { Eye } from 'lucide-react'
import { Notification } from '../../api/resources/notificationsApi'

interface ConfirmedCasesTableProps {
    cases: Notification[]
    loading: boolean
    onView: (notification: Notification) => void
}

export const ConfirmedCasesTable: React.FC<ConfirmedCasesTableProps> = ({
    cases,
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
                                    Bairro
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Data Sintomas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Sintomas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Data Notificação
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cases.length > 0 ? (
                                cases.map((caseItem) => (
                                    <tr key={caseItem.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm font-semibold text-teal-700">
                                                {caseItem.protocol}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="font-medium text-gray-900">
                                                {caseItem.name || 'Não informado'}
                                            </p>
                                            <p className="text-sm text-gray-500">{caseItem.email}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-gray-900">
                                                {caseItem.city} / {caseItem.state}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {caseItem.neighborhood || '—'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {formatDate(caseItem.symptoms_date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {caseItem.symptoms && caseItem.symptoms.length > 0 ? (
                                                    caseItem.symptoms.map((symptom) => (
                                                        <span
                                                            key={symptom.id}
                                                            className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800"
                                                        >
                                                            {symptom.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(caseItem.created_at)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                        Nenhum caso confirmado encontrado
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
