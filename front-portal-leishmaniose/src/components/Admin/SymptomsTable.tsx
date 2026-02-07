import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { Symptom } from '../../api/resources/symptomsApi'

interface SymptomsTableProps {
    symptoms: Symptom[]
    loading: boolean
    onEdit: (symptom: Symptom) => void
    onDelete: (id: number) => void
}

export const SymptomsTable: React.FC<SymptomsTableProps> = ({
    symptoms,
    loading,
    onEdit,
    onDelete,
}) => {
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
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {symptoms.length > 0 ? (
                                symptoms.map((symptom) => (
                                    <tr key={symptom.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="font-medium text-gray-900">{symptom.name}</p>
                                            {symptom.description && (
                                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                                    {symptom.description}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${symptom.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {symptom.active ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => onEdit(symptom)}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                    title="Editar"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(symptom.id)}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Nenhum sintoma encontrado
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
