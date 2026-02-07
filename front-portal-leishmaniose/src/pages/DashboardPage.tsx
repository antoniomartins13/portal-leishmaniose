import React from 'react'

export const DashboardPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card title="Total de Casos" value="234" color="blue" />
                    <Card title="Confirmados" value="156" color="red" />
                    <Card title="Recuperados" value="78" color="green" />
                    <Card title="Pendentes" value="0" color="yellow" />
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Últimos Casos</h2>
                    <p className="text-gray-600">Seção ainda será implementada...</p>
                </div>
            </div>
        </div>
    )
}

interface CardProps {
    title: string
    value: string
    color: 'blue' | 'red' | 'green' | 'yellow'
}

const Card: React.FC<CardProps> = ({ title, value, color }) => {
    const colorMap = {
        blue: 'border-l-blue-500 bg-blue-50',
        red: 'border-l-red-500 bg-red-50',
        green: 'border-l-green-500 bg-green-50',
        yellow: 'border-l-yellow-500 bg-yellow-50'
    }

    return (
        <div className={`${colorMap[color]} border-l-4 rounded p-6`}>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
    )
}
