import React, { useEffect, useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { symptomsApi, Symptom } from '../../api/resources/symptomsApi'
import { SymptomsTable } from '../../components/Admin/SymptomsTable'
import { SymptomModal } from '../../components/Admin/SymptomModal'
import toast from 'react-hot-toast'

export const SymptomsPage: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null)
    const [saving, setSaving] = useState(false)

    const loadSymptoms = useCallback(async () => {
        setLoading(true)
        try {
            const data = await symptomsApi.getAll()
            setSymptoms(Array.isArray(data) ? data : [])
        } catch (error) {
            toast.error('Erro ao carregar sintomas')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSymptoms()
    }, [loadSymptoms])

    const handleSave = async (data: any) => {
        setSaving(true)
        try {
            if (selectedSymptom) {
                await symptomsApi.update(selectedSymptom.id, data)
            } else {
                await symptomsApi.create(data)
            }
            loadSymptoms()
            setIsModalOpen(false)
            setSelectedSymptom(null)
        } catch (error) {
            // BaseApi já exibe toast de erro
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este sintoma?')) return

        try {
            await symptomsApi.delete(id)
            loadSymptoms()
        } catch (error) {
            // BaseApi já exibe toast de erro
        }
    }

    const handleEdit = (symptom: Symptom) => {
        setSelectedSymptom(symptom)
        setIsModalOpen(true)
    }

    const filteredSymptoms = symptoms.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Gerenciamento de Sintomas
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Adicione, edite ou remova sintomas disponíveis para notificação
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedSymptom(null)
                            setIsModalOpen(true)
                        }}
                        className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                        <Plus size={20} />
                        <span>Adicionar Sintoma</span>
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

                {/* Symptoms Table */}
                <SymptomsTable
                    symptoms={filteredSymptoms}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Symptom Modal */}
                <SymptomModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedSymptom(null)
                    }}
                    onSave={handleSave}
                    symptom={selectedSymptom}
                    isLoading={saving}
                />
            </div>
        </div>
    )
}
