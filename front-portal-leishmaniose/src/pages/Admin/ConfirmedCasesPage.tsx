import React, { useEffect, useState, useCallback } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    X,
    Search,
    FileSpreadsheet,
    FileDown,
} from 'lucide-react'
import { Notification, ConfirmedCasesFilters } from '../../api/resources/notificationsApi'
import { symptomsApi, Symptom } from '../../api/resources/symptomsApi'
import { ConfirmedCasesTable } from '../../components/Admin/ConfirmedCasesTable'
import { NotificationDetailModal } from '../../components/Admin/NotificationDetailModal'
import { useConfirmedCases } from '../../hooks/useConfirmedCases'

export const ConfirmedCasesPage: React.FC = () => {
    const {
        cases,
        loading,
        exporting,
        pagination,
        filters,
        setFilters,
        loadCases,
        exportCsv,
        exportPdf,
        getById,
    } = useConfirmedCases()

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [symptoms, setSymptoms] = useState<Symptom[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    // Filtros locais para o formulário
    const [localFilters, setLocalFilters] = useState<ConfirmedCasesFilters>({})

    // Carrega sintomas para o filtro dropdown
    useEffect(() => {
        symptomsApi.getAllActive().then(setSymptoms).catch(() => { })
    }, [])

    // Carrega ao montar e quando filtros mudam
    useEffect(() => {
        loadCases(1, { ...filters, search: searchTerm })
    }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

    // Debounce de busca
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)
            if (searchTimeout) clearTimeout(searchTimeout)
            const timeout = setTimeout(() => {
                loadCases(1, { ...filters, search: value })
            }, 400)
            setSearchTimeout(timeout)
        },
        [filters, loadCases, searchTimeout]
    )

    const handlePageChange = (page: number) => {
        loadCases(page, { ...filters, search: searchTerm })
    }

    const handleApplyFilters = () => {
        setFilters(localFilters)
        setShowFilters(false)
    }

    const handleClearFilters = () => {
        setLocalFilters({})
        setFilters({})
        setSearchTerm('')
        setShowFilters(false)
    }

    const hasActiveFilters = Object.values(filters).some((v) => v)

    const handleView = async (notification: Notification) => {
        const full = await getById(notification.id)
        if (full) {
            setSelectedNotification(full)
            setIsDetailOpen(true)
        }
    }

    const handleExport = () => {
        exportCsv({ ...filters, search: searchTerm })
    }

    const handleExportPdf = () => {
        exportPdf({ ...filters, search: searchTerm })
    }

    // Contagem de filtros ativos
    const activeFilterCount = Object.values(filters).filter((v) => v).length

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Casos Confirmados</h1>
                        <p className="text-gray-600 mt-2">
                            Consulte e exporte dados de casos confirmados de leishmaniose
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            onClick={handleExportPdf}
                            disabled={exporting || loading}
                            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm transition shadow-sm"
                        >
                            {exporting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Exportando...</span>
                                </>
                            ) : (
                                <>
                                    <FileDown size={18} />
                                    <span>Gerar PDF</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={exporting || loading}
                            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm transition shadow-sm"
                        >
                            {exporting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Exportando...</span>
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet size={18} />
                                    <span>Gerar CSV</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Search size={20} className="text-green-700" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total de casos confirmados</p>
                                <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
                            </div>
                        </div>
                        {hasActiveFilters && (
                            <span className="text-sm text-teal-700 font-medium">
                                Filtros ativos: {activeFilterCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Search + Filter Toggle + Export */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Buscar por protocolo, nome ou cidade..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                    </div>
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
                                {activeFilterCount}
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Estado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <input
                                    type="text"
                                    placeholder="Ex: SP, RJ, MG..."
                                    value={localFilters.state ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, state: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Cidade */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                <input
                                    type="text"
                                    placeholder="Nome da cidade..."
                                    value={localFilters.city ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, city: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Bairro */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                <input
                                    type="text"
                                    placeholder="Nome do bairro..."
                                    value={localFilters.neighborhood ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({ ...f, neighborhood: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                />
                            </div>

                            {/* Sintoma */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sintoma</label>
                                <select
                                    value={localFilters.symptomId ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((f) => ({
                                            ...f,
                                            symptomId: e.target.value ? Number(e.target.value) : undefined,
                                        }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm"
                                >
                                    <option value="">Todos os sintomas</option>
                                    {symptoms.map((symptom) => (
                                        <option key={symptom.id} value={symptom.id}>
                                            {symptom.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

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
                <ConfirmedCasesTable cases={cases} loading={loading} onView={handleView} />

                {/* Pagination */}
                {!loading && pagination.lastPage > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Mostrando página {pagination.currentPage} de {pagination.lastPage} (
                            {pagination.total} resultados)
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

                {/* Detail Modal (read-only, no status editing for pesquisador) */}
                <NotificationDetailModal
                    isOpen={isDetailOpen}
                    onClose={() => {
                        setIsDetailOpen(false)
                        setSelectedNotification(null)
                    }}
                    notification={selectedNotification}
                    onUpdateStatus={async () => false}
                    canEdit={false}
                />
            </div>
        </div>
    )
}
