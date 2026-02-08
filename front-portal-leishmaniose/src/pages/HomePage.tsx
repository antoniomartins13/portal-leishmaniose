import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import {
    AlertTriangle,
    TrendingUp,
    MapPin,
    ArrowRight,
    Stethoscope,
    ShieldCheck,
    Pill,
    Loader2,
} from 'lucide-react'
import { reportsApi } from '../api/resources/reportsApi'
import type { Notification } from '../api/resources/notificationsApi'
import { useAuth } from '../hooks/useAuth'
import 'leaflet/dist/leaflet.css'

/* ───────── coordenadas das capitais ───────── */

const STATE_COORDS: Record<string, [number, number]> = {
    AC: [-9.97, -67.81], AL: [-9.67, -35.74], AP: [0.03, -51.06], AM: [-3.12, -60.02],
    BA: [-12.97, -38.51], CE: [-3.72, -38.54], DF: [-15.78, -47.93], ES: [-20.32, -40.34],
    GO: [-16.68, -49.25], MA: [-2.53, -44.28], MT: [-15.6, -56.1], MS: [-20.44, -54.65],
    MG: [-19.92, -43.94], PA: [-1.46, -48.5], PB: [-7.12, -34.86], PR: [-25.43, -49.27],
    PE: [-8.05, -34.87], PI: [-5.09, -42.8], RJ: [-22.91, -43.17], RN: [-5.79, -35.21],
    RS: [-30.03, -51.23], RO: [-8.76, -63.9], RR: [2.82, -60.67], SC: [-27.59, -48.55],
    SP: [-23.55, -46.63], SE: [-10.91, -37.07], TO: [-10.18, -48.33],
}

/* ───────── tipos internos ───────── */

interface StateCount {
    state: string
    count: number
    coords: [number, number]
}

interface HomeStats {
    totalCases: number
    newCases30d: number
    affectedStates: number
    stateData: StateCount[]
    loading: boolean
}

/* ───────── hook de stats ───────── */

function useHomeStats(): HomeStats {
    const { user } = useAuth()
    const [stats, setStats] = useState<HomeStats>({
        totalCases: 0,
        newCases30d: 0,
        affectedStates: 0,
        stateData: [],
        loading: true,
    })

    useEffect(() => {
        if (!user) {
            setStats((s) => ({ ...s, loading: false }))
            return
        }

        let cancelled = false
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        Promise.all([
            reportsApi.getNotifications(),
            reportsApi.getNotifications({ created_from: thirtyDaysAgo.toISOString().split('T')[0] }),
        ])
            .then(([all, recent]) => {
                if (cancelled) return

                const stateMap = new Map<string, number>()
                all.forEach((n: Notification) => {
                    const st = n.state ?? ''
                    if (st) stateMap.set(st, (stateMap.get(st) ?? 0) + 1)
                })

                const stateData: StateCount[] = Array.from(stateMap.entries())
                    .map(([state, count]) => ({
                        state,
                        count,
                        coords: STATE_COORDS[state] ?? [-14.24, -51.93],
                    }))
                    .sort((a, b) => b.count - a.count)

                setStats({
                    totalCases: all.length,
                    newCases30d: recent.length,
                    affectedStates: stateMap.size,
                    stateData,
                    loading: false,
                })
            })
            .catch(() => {
                if (!cancelled) setStats((s) => ({ ...s, loading: false }))
            })

        return () => { cancelled = true }
    }, [user])

    return stats
}

/* ───────── componente principal ───────── */

export const HomePage: React.FC = () => {
    const { user } = useAuth()
    const stats = useHomeStats()

    return (
        <div className="w-full">
            {/* ══════ Hero Section ══════ */}
            <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-14">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">Portal da Leishmaniose</h1>
                        <p className="text-xl mb-8 text-teal-50">
                            Monitoramento e controle da Leishmaniose no Brasil. Dados atualizados,
                            informações e serviços para profissionais e população.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/notificar"
                                className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Notificar um Caso
                            </Link>
                            <Link
                                to="/sobre"
                                className="border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Saiba Mais
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════ Stats Section ══════ */}
            {user && (
                <section className="py-8 bg-white">
                    <div className="container mx-auto px-4">
                        {stats.loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 size={28} className="animate-spin text-teal-600" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                                    <div className="flex items-start">
                                        <div className="p-3 bg-blue-100 rounded-full">
                                            <AlertTriangle className="text-blue-700" size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-blue-600 font-medium">Total de Notificações</p>
                                            <h3 className="text-3xl font-bold text-blue-900">
                                                {stats.totalCases.toLocaleString('pt-BR')}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-teal-50 p-6 rounded-lg shadow-sm">
                                    <div className="flex items-start">
                                        <div className="p-3 bg-teal-100 rounded-full">
                                            <TrendingUp className="text-teal-700" size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-teal-600 font-medium">Novas (últimos 30 dias)</p>
                                            <h3 className="text-3xl font-bold text-teal-900">
                                                {stats.newCases30d.toLocaleString('pt-BR')}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                                    <div className="flex items-start">
                                        <div className="p-3 bg-green-100 rounded-full">
                                            <MapPin className="text-green-700" size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-green-600 font-medium">Estados Afetados</p>
                                            <h3 className="text-3xl font-bold text-green-900">
                                                {stats.affectedStates.toLocaleString('pt-BR')}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ══════ Map Section ══════ */}
            {user && !stats.loading && stats.stateData.length > 0 && (
                <section className="py-8 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Mapa de Notificações de Leishmaniose
                        </h2>
                        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: 500 }}>
                            <MapContainer
                                center={[-14.24, -51.93]}
                                zoom={4}
                                scrollWheelZoom={false}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {stats.stateData.map((s) => {
                                    const maxCount = stats.stateData[0]?.count ?? 1
                                    const radius = Math.max(8, (s.count / maxCount) * 30)
                                    return (
                                        <CircleMarker
                                            key={s.state}
                                            center={s.coords}
                                            radius={radius}
                                            pathOptions={{
                                                fillColor: '#10b981',
                                                color: '#047857',
                                                weight: 1.5,
                                                fillOpacity: 0.7,
                                            }}
                                        >
                                            <Tooltip>
                                                <div className="text-sm">
                                                    <strong>{s.state}</strong>
                                                    <br />
                                                    {s.count.toLocaleString('pt-BR')} notificações
                                                </div>
                                            </Tooltip>
                                        </CircleMarker>
                                    )
                                })}
                            </MapContainer>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                O mapa apresenta dados das notificações registradas no portal.
                            </p>
                            <Link
                                to="/painel"
                                className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center gap-1"
                            >
                                Ver painel completo <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ══════ Info Cards ══════ */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                        Informações Importantes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 bg-teal-100 rounded-full w-fit mb-4">
                                <Stethoscope className="text-teal-700" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-teal-700 mb-3">Sintomas</h3>
                            <p className="text-gray-600 mb-4">
                                Reconheça os sinais da Leishmaniose: febre prolongada, perda de
                                peso, aumento do fígado e baço, entre outros.
                            </p>
                            <Link
                                to="/sobre"
                                className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                            >
                                Saiba mais <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 bg-teal-100 rounded-full w-fit mb-4">
                                <ShieldCheck className="text-teal-700" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-teal-700 mb-3">Prevenção</h3>
                            <p className="text-gray-600 mb-4">
                                Medidas preventivas incluem uso de repelentes, telas em janelas e
                                portas, e controle de animais reservatórios.
                            </p>
                            <Link
                                to="/sobre"
                                className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                            >
                                Saiba mais <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 bg-teal-100 rounded-full w-fit mb-4">
                                <Pill className="text-teal-700" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-teal-700 mb-3">Tratamento</h3>
                            <p className="text-gray-600 mb-4">
                                O tratamento deve ser realizado sob orientação médica e varia
                                conforme o tipo de leishmaniose.
                            </p>
                            <Link
                                to="/sobre"
                                className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                            >
                                Saiba mais <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════ CTA Section ══════ */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Identificou um caso suspeito?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        A notificação é rápida, pode ser feita sem cadastro e ajuda as autoridades
                        de saúde no controle da doença.
                    </p>
                    <Link
                        to="/notificar"
                        className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                        Notificar um Caso <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
