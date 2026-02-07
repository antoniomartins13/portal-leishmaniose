import React from 'react'

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre a Leishmaniose</h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">O que é Leishmaniose?</h2>
                        <p className="mb-4">
                            A Leishmaniose é uma doença infecciosa causada por protozoários do gênero
                            Leishmania, transmitida através da picada de flebotomíneos infectados.
                        </p>
                        <p>
                            No Brasil, é uma doença de notificação compulsória que afeta principalmente
                            regiões com vegetação tropical e subtropical.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipos de Leishmaniose</h2>
                        <ul className="space-y-3">
                            <li>
                                <strong>Cutânea:</strong> Forma mais comum, afeta a pele
                            </li>
                            <li>
                                <strong>Mucocutânea:</strong> Afeta pele e mucosas
                            </li>
                            <li>
                                <strong>Visceral:</strong> Forma mais grave, afeta órgãos internos
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sintomas e Prevenção</h2>
                        <p>
                            Se você apresentar síntomas suspeitos, procure imediatamente uma unidade de
                            saúde. Use repelentes, mosquiteiros e evite sair ao entardecer nas áreas de
                            risco.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
