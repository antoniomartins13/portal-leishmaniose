import React from 'react'
import { TrendingUp, Users, Heart, AlertCircle } from 'lucide-react'

interface CardProps {
    title: string
    value: string
    icon: React.ReactNode
    color: 'teal' | 'red' | 'green' | 'yellow'
}

const StatCard: React.FC<CardProps> = ({ title, value, icon, color }) => {
    const colorMap = {
        teal: 'border-l-teal-600 bg-teal-50 text-teal-900',
        red: 'border-l-red-600 bg-red-50 text-red-900',
        green: 'border-l-green-600 bg-green-50 text-green-900',
        yellow: 'border-l-yellow-600 bg-yellow-50 text-yellow-900',
    }

    return (
        <div className={`${colorMap[color]} border-l-4 rounded-lg p-6 shadow-sm`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
                    <p className="text-4xl font-bold">{value}</p>
                </div>
                <div className="opacity-50">{icon}</div>
            </div>
        </div>
    )
}

export const DashboardPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Painel de Monitoramento
                    </h1>
                    <p className="text-gray-600">
                        Estatísticas gerais e informações sobre cases de Leishmaniose no Brasil
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total de Casos"
                        value="2,456"
                        icon={<TrendingUp size={32} />}
                        color="teal"
                    />
                    <StatCard
                        title="Confirmados"
                        value="1,834"
                        icon={<AlertCircle size={32} />}
                        color="red"
                    />
                    <StatCard
                        title="Recuperados"
                        value="1,245"
                        icon={<Heart size={32} />}
                        color="green"
                    />
                    <StatCard
                        title="Em Tratamento"
                        value="589"
                        icon={<Users size={32} />}
                        color="yellow"
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* Recent Cases */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Últimos Casos Notificados
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">
                                            Data
                                        </th>
                                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">
                                            Localização
                                        </th>
                                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">
                                            Tipo
                                        </th>
                                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-3 text-sm text-gray-900">25/01/2024</td>
                                        <td className="py-3 text-sm text-gray-600">São Paulo, SP</td>
                                        <td className="py-3 text-sm text-gray-600">Cutânea</td>
                                        <td className="py-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                Confirmado
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-sm text-gray-900">24/01/2024</td>
                                        <td className="py-3 text-sm text-gray-600">Rio de Janeiro, RJ</td>
                                        <td className="py-3 text-sm text-gray-600">Visceral</td>
                                        <td className="py-3">
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                                Pendente
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-sm text-gray-900">23/01/2024</td>
                                        <td className="py-3 text-sm text-gray-600">Minas Gerais, MG</td>
                                        <td className="py-3 text-sm text-gray-600">Cutânea</td>
                                        <td className="py-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                Confirmado
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Info Box */}
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-3">
                                Informações Importantes
                            </h3>
                            <ul className="space-y-2 text-sm text-teal-800">
                                <li className="flex items-start space-x-2">
                                    <span className="text-teal-600 font-bold">•</span>
                                    <span>Notifique casos suspeitos imediatamente</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-teal-600 font-bold">•</span>
                                    <span>Procure unidade de saúde mais próxima</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-teal-600 font-bold">•</span>
                                    <span>Evite automedicação</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Quer notificar um caso?
                            </h3>
                            <a
                                href="/notificar"
                                className="w-full inline-block text-center bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                Notificar Novo Caso
                            </a>
                        </div>
                    </div>
                </div>

                {/* Regional Distribution */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Distribuição Geográfica
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {['SP', 'MG', 'RJ', 'BA', 'RS', 'AM'].map((state) => (
                            <div
                                key={state}
                                className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <p className="text-2xl font-bold text-teal-700 mb-1">{state}</p>
                                <p className="text-sm text-gray-600">
                                    {Math.floor(Math.random() * 500)} casos
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

