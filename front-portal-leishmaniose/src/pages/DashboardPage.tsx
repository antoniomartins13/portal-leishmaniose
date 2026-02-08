import React, { useState, useMemo } from 'react'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
    TrendingUp,
    AlertCircle,
    Clock,
    XCircle,
    Search,
    CalendarDays,
    Loader2,
    AlertTriangle,
    Percent,
} from 'lucide-react'
import { useReports } from '../hooks/useReports'
import { useAuth } from '../hooks/useAuth'
import type { ReportFilters } from '../api/resources/reportsApi'

/* ───────────── helpers ───────────── */

/** Coordenadas aproximadas das capitais dos estados brasileiros */
const STATE_COORDS: Record<string, [number, number]> = {
    AC: [-9.97, -67.81], AL: [-9.67, -35.74], AP: [0.03, -51.06], AM: [-3.12, -60.02],
    BA: [-12.97, -38.51], CE: [-3.72, -38.54], DF: [-15.78, -47.93], ES: [-20.32, -40.34],
    GO: [-16.68, -49.25], MA: [-2.53, -44.28], MT: [-15.6, -56.1], MS: [-20.44, -54.65],
    MG: [-19.92, -43.94], PA: [-1.46, -48.5], PB: [-7.12, -34.86], PR: [-25.43, -49.27],
    PE: [-8.05, -34.87], PI: [-5.09, -42.8], RJ: [-22.91, -43.17], RN: [-5.79, -35.21],
    RS: [-30.03, -51.23], RO: [-8.76, -63.9], RR: [2.82, -60.67], SC: [-27.59, -48.55],
    SP: [-23.55, -46.63], SE: [-10.91, -37.07], TO: [-10.18, -48.33],
}

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

function defaultFrom(): string {
    const d = new Date()
    d.setMonth(d.getMonth() - 3)
    return d.toISOString().split('T')[0]
}

function defaultTo(): string {
    return new Date().toISOString().split('T')[0]
}

/* ───────────── KPI Card ───────────── */

interface KpiProps {
    title: string
    value: string | number
    subtitle?: string
    icon: React.ReactNode
    color: 'teal' | 'red' | 'yellow' | 'blue' | 'green'
}

const colorMap: Record<string, string> = {
    teal: 'border-l-teal-600 bg-teal-50 text-teal-900',
    red: 'border-l-red-600 bg-red-50 text-red-900',
    yellow: 'border-l-yellow-600 bg-yellow-50 text-yellow-900',
    blue: 'border-l-blue-600 bg-blue-50 text-blue-900',
    green: 'border-l-green-600 bg-green-50 text-green-900',
}

const KpiCard: React.FC<KpiProps> = ({ title, value, subtitle, icon, color }) => (
    <div className={`${colorMap[color]} border-l-4 rounded-lg p-5 shadow-sm`}>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
                {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="opacity-40">{icon}</div>
        </div>
    </div>
)

/* ───────────── Chart wrapper card ───────────── */

const ChartCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({
    title,
    children,
    className = '',
}) => (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
)

/* ───────────── Main Page ───────────── */

export const DashboardPage: React.FC = () => {
    const { user } = useAuth()

    const [createdFrom, setCreatedFrom] = useState(defaultFrom)
    const [createdTo, setCreatedTo] = useState(defaultTo)

    // Filtros aplicados (atualizados ao clicar "Filtrar")
    const [appliedFilters, setAppliedFilters] = useState<ReportFilters>({
        created_from: defaultFrom(),
        created_to: defaultTo(),
    })

    const { data, loading, error } = useReports(appliedFilters)

    const handleFilter = () => {
        setAppliedFilters({
            created_from: createdFrom || undefined,
            created_to: createdTo || undefined,
        })
    }

    /* ── ApexCharts configs ── */

    // 1. Linha temporal — Notificações por dia
    const timelineOptions: ApexOptions = useMemo(
        () => ({
            chart: { id: 'timeline', toolbar: { show: true }, zoom: { enabled: true } },
            xaxis: {
                categories: data.dailyCounts.map((d) => formatDate(d.date)),
                labels: { rotate: -45, style: { fontSize: '11px' } },
            },
            yaxis: { title: { text: 'Quantidade' } },
            stroke: { curve: 'smooth', width: 2 },
            colors: ['#0d9488', '#16a34a', '#f59e0b', '#6366f1', '#64748b'],
            legend: { position: 'top' },
            tooltip: { shared: true, intersect: false },
            dataLabels: { enabled: false },
        }),
        [data.dailyCounts]
    )

    const timelineSeries = useMemo(
        () => [
            { name: 'Total', data: data.dailyCounts.map((d) => d.total) },
            { name: 'Confirmados', data: data.dailyCounts.map((d) => d.confirmed) },
            { name: 'Pendentes', data: data.dailyCounts.map((d) => d.pending) },
            { name: 'Em Análise', data: data.dailyCounts.map((d) => d.in_analysis) },
            { name: 'Descartados', data: data.dailyCounts.map((d) => d.discarded) },
        ],
        [data.dailyCounts]
    )

    // 2. Donut — Distribuição por status
    const statusDonutOptions: ApexOptions = useMemo(
        () => ({
            chart: { id: 'status-donut' },
            labels: ['Confirmados', 'Pendentes', 'Em Análise', 'Descartados'],
            colors: ['#16a34a', '#f59e0b', '#6366f1', '#64748b'],
            legend: { position: 'bottom' },
            dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
            plotOptions: { pie: { donut: { size: '55%' } } },
        }),
        []
    )

    const statusDonutSeries = useMemo(
        () => [data.confirmed, data.pending, data.inAnalysis, data.discarded],
        [data.confirmed, data.pending, data.inAnalysis, data.discarded]
    )

    // 3. Barras horizontais — Top sintomas
    const symptomsBarOptions: ApexOptions = useMemo(
        () => ({
            chart: { id: 'symptoms-bar', toolbar: { show: false } },
            plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
            xaxis: { title: { text: 'Ocorrências' } },
            yaxis: {
                labels: {
                    maxWidth: 200,
                    style: { fontSize: '12px' },
                },
            },
            colors: ['#0d9488'],
            dataLabels: { enabled: true },
            tooltip: { enabled: true },
        }),
        []
    )

    const symptomsBarSeries = useMemo(
        () => [
            {
                name: 'Ocorrências',
                data: data.topSymptoms.map((s) => ({
                    x: s.name,
                    y: s.count,
                })),
            },
        ],
        [data.topSymptoms]
    )

    // 4. Barras verticais — Ranking por estado
    const stateBarOptions: ApexOptions = useMemo(
        () => ({
            chart: { id: 'state-bar', toolbar: { show: false } },
            plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
            xaxis: {
                categories: data.stateRanking.map((s) => s.state),
                labels: { style: { fontSize: '12px' } },
            },
            yaxis: { title: { text: 'Notificações' } },
            colors: ['#6366f1'],
            dataLabels: { enabled: true },
        }),
        [data.stateRanking]
    )

    const stateBarSeries = useMemo(
        () => [{ name: 'Notificações', data: data.stateRanking.map((s) => s.count) }],
        [data.stateRanking]
    )

    /* ── Não autenticado — mostra versão pública simplificada ── */

    if (!user) {
        return <PublicDashboard />
    }

    /* ── Render ── */

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header + Filtros */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Painel de Monitoramento</h1>
                    <p className="text-gray-500 mb-6">
                        Estatísticas e gráficos baseados nas notificações do sistema
                    </p>

                    <div className="flex flex-wrap items-end gap-4 bg-white rounded-lg shadow-sm p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                <CalendarDays size={14} className="inline mr-1" />
                                Data Inicial
                            </label>
                            <input
                                type="date"
                                value={createdFrom}
                                onChange={(e) => setCreatedFrom(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                <CalendarDays size={14} className="inline mr-1" />
                                Data Final
                            </label>
                            <input
                                type="date"
                                value={createdTo}
                                onChange={(e) => setCreatedTo(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <button
                            onClick={handleFilter}
                            disabled={loading}
                            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-medium px-5 py-2 rounded-md transition-colors text-sm"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                            Filtrar
                        </button>
                    </div>
                </div>

                {/* Erro */}
                {error && (
                    <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                        <AlertTriangle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={36} className="animate-spin text-teal-600" />
                        <span className="ml-3 text-gray-500">Carregando dados...</span>
                    </div>
                )}

                {/* Conteúdo */}
                {!loading && !error && (
                    <>
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                            <KpiCard
                                title="Total de Notificações"
                                value={data.total.toLocaleString('pt-BR')}
                                icon={<TrendingUp size={28} />}
                                color="teal"
                            />
                            <KpiCard
                                title="Confirmados"
                                value={data.confirmed.toLocaleString('pt-BR')}
                                icon={<AlertCircle size={28} />}
                                color="green"
                            />
                            <KpiCard
                                title="Pendentes"
                                value={data.pending.toLocaleString('pt-BR')}
                                icon={<Clock size={28} />}
                                color="yellow"
                            />
                            <KpiCard
                                title="Em Análise"
                                value={data.inAnalysis.toLocaleString('pt-BR')}
                                icon={<Search size={28} />}
                                color="blue"
                            />
                            <KpiCard
                                title="Taxa de Confirmação"
                                value={`${data.confirmationRate.toFixed(1)}%`}
                                subtitle={`${data.confirmed} de ${data.total}`}
                                icon={<Percent size={28} />}
                                color="green"
                            />
                        </div>

                        {/* Mapa de notificações por estado */}
                        {data.stateRanking.length > 0 && (
                            <ChartCard title="Distribuição Geográfica por Estado">
                                <div className="rounded-lg overflow-hidden" style={{ height: 480 }}>
                                    <MapContainer
                                        center={[-14.24, -51.93]}
                                        zoom={4}
                                        scrollWheelZoom={true}
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {data.stateRanking.map((s) => {
                                            const coords = STATE_COORDS[s.state]
                                            if (!coords) return null
                                            const maxCount = data.stateRanking[0]?.count ?? 1
                                            const radius = Math.max(10, (s.count / maxCount) * 35)
                                            const pct = data.total > 0 ? ((s.count / data.total) * 100).toFixed(1) : '0'
                                            return (
                                                <CircleMarker
                                                    key={s.state}
                                                    center={coords}
                                                    radius={radius}
                                                    pathOptions={{
                                                        fillColor: '#0d9488',
                                                        color: '#115e59',
                                                        weight: 1.5,
                                                        fillOpacity: 0.7,
                                                    }}
                                                >
                                                    <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                                                        <div className="text-sm">
                                                            <strong>{s.state}</strong><br />
                                                            {s.count.toLocaleString('pt-BR')} notificações ({pct}%)
                                                        </div>
                                                    </Tooltip>
                                                </CircleMarker>
                                            )
                                        })}
                                    </MapContainer>
                                </div>
                            </ChartCard>
                        )}

                        {/* Timeline + Donut */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <ChartCard title="Notificações por Dia" className="lg:col-span-2">
                                {data.dailyCounts.length > 0 ? (
                                    <Chart
                                        options={timelineOptions}
                                        series={timelineSeries}
                                        type="line"
                                        height={340}
                                    />
                                ) : (
                                    <EmptyState />
                                )}
                            </ChartCard>

                            <ChartCard title="Distribuição por Status">
                                {data.total > 0 ? (
                                    <Chart
                                        options={statusDonutOptions}
                                        series={statusDonutSeries}
                                        type="donut"
                                        height={340}
                                    />
                                ) : (
                                    <EmptyState />
                                )}
                            </ChartCard>
                        </div>

                        {/* Row 2: Sintomas + Estados */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <ChartCard title="Sintomas Mais Frequentes">
                                {data.topSymptoms.length > 0 ? (
                                    <Chart
                                        options={symptomsBarOptions}
                                        series={symptomsBarSeries}
                                        type="bar"
                                        height={Math.max(250, data.topSymptoms.length * 40)}
                                    />
                                ) : (
                                    <EmptyState />
                                )}
                            </ChartCard>

                            <ChartCard title="Ranking por Estado (UF)">
                                {data.stateRanking.length > 0 ? (
                                    <Chart
                                        options={stateBarOptions}
                                        series={stateBarSeries}
                                        type="bar"
                                        height={320}
                                    />
                                ) : (
                                    <EmptyState />
                                )}
                            </ChartCard>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

/* ───────────── Empty State ───────────── */

const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <XCircle size={40} className="mb-2" />
        <p className="text-sm">Sem dados para o período selecionado</p>
    </div>
)

/* ───────────── Public Dashboard (sem auth) ───────────── */

const PublicDashboard: React.FC = () => (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Painel de Monitoramento</h1>
            <p className="text-gray-600 mb-8">
                Faça login com uma conta autorizada para visualizar as estatísticas e gráficos do sistema.
            </p>
            <div className="bg-white rounded-lg shadow-sm p-8">
                <AlertCircle size={48} className="mx-auto text-teal-600 mb-4" />
                <p className="text-gray-700 mb-6">
                    O painel de monitoramento exibe KPIs, gráficos de séries temporais, distribuição por
                    status, sintomas mais frequentes e ranking por estado — tudo baseado em dados reais das
                    notificações do portal.
                </p>
                <a
                    href="/login"
                    className="inline-block bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                    Entrar no Sistema
                </a>
            </div>
        </div>
    </div>
)

