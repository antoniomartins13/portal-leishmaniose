import React from 'react'

export const HomePage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bem-vindo ao Portal da Leishmaniose
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Sistema centralizado de monitoramento e controle da Leishmaniose no Brasil
                </p>
                <a
                    href="/painel"
                    className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                    Visualizar Painel
                </a>
            </div>
        </div>
    )
}
