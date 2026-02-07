import React from 'react'

export const NewsPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Notícias</h1>
                <p className="text-gray-600 mb-8">
                    Acompanhe as últimas notícias sobre Leishmaniose
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <article
                            key={item}
                            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                        >
                            <div className="bg-gradient-to-r from-teal-700 to-teal-800 h-40" />
                            <div className="p-6">
                                <div className="text-sm text-teal-700 font-semibold mb-2">
                                    25 de janeiro de 2024
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    Título da Notícia {item}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    Resumo da notícia sobre Leishmaniose e os últimos desenvolvimentos no
                                    Brasil...
                                </p>
                                <a
                                    href="#"
                                    className="text-teal-700 hover:text-teal-800 font-semibold text-sm"
                                >
                                    Leia mais →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
