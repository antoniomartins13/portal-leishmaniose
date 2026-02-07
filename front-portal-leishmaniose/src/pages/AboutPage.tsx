import React, { useState } from 'react'
import {
    AlertCircle,
    Shield,
    Heart,
    HelpCircle,
    ChevronDown
} from 'lucide-react'

type TabType = 'overview' | 'symptoms' | 'prevention' | 'treatment' | 'faq'

export const AboutPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview')
    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    const tabs: { id: TabType; label: string }[] = [
        { id: 'overview', label: 'Visão Geral' },
        { id: 'symptoms', label: 'Sintomas' },
        { id: 'prevention', label: 'Prevenção' },
        { id: 'treatment', label: 'Tratamento' },
        { id: 'faq', label: 'FAQ' },
    ]

    const faqItems = [
        {
            id: 1,
            question: 'A Leishmaniose é contagiosa de pessoa para pessoa?',
            answer: (
                <p className="text-gray-700">
                    Não, a Leishmaniose não é transmitida diretamente de pessoa para pessoa. A transmissão ocorre através da picada de flebotomíneos (mosquito-palha) infectados com o parasita <em>Leishmania</em>. O contato direto com lesões de pessoas infectadas não transmite a doença.
                </p>
            ),
        },
        {
            id: 2,
            question: 'Quais são os principais sintomas da Leishmaniose?',
            answer: (
                <>
                    <p className="text-gray-700 mb-3">
                        Os sintomas variam de acordo com o tipo de Leishmaniose:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <strong>Leishmaniose Cutânea:</strong> Lesões na pele que começam como pequenas pápulas e evoluem para úlceras com bordas elevadas.
                        </li>
                        <li>
                            <strong>Leishmaniose Visceral:</strong> Febre prolongada, perda de peso, aumento do volume abdominal, anemia e fraqueza.
                        </li>
                    </ul>
                </>
            ),
        },
        {
            id: 3,
            question: 'Como posso proteger meu cão da Leishmaniose?',
            answer: (
                <>
                    <p className="text-gray-700 mb-3">
                        Para proteger seu cão da Leishmaniose:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Use coleiras repelentes específicas</li>
                        <li>Mantenha o animal dentro de casa, principalmente ao entardecer e amanhecer</li>
                        <li>Aplique repelentes recomendados pelo veterinário</li>
                        <li>Mantenha o ambiente limpo e livre de matéria orgânica</li>
                        <li>Realize exames periódicos para detecção precoce</li>
                        <li>Vacine seu cão (consulte um veterinário sobre a disponibilidade da vacina)</li>
                    </ul>
                </>
            ),
        },
        {
            id: 4,
            question: 'A Leishmaniose tem cura?',
            answer: (
                <p className="text-gray-700">
                    Sim, a Leishmaniose tem cura quando diagnosticada e tratada adequadamente. O tratamento varia conforme o tipo da doença e deve ser sempre prescrito e acompanhado por um médico. Quanto mais cedo for iniciado o tratamento, maiores são as chances de cura sem sequelas.
                </p>
            ),
        },
        {
            id: 5,
            question: 'Existe vacina contra a Leishmaniose para humanos?',
            answer: (
                <p className="text-gray-700">
                    Atualmente, não existe vacina disponível para prevenir a Leishmaniose em humanos. A prevenção baseia-se no controle do vetor (mosquito-palha), proteção individual e controle de reservatórios. Existem vacinas disponíveis para cães em alguns países, incluindo o Brasil.
                </p>
            ),
        },
        {
            id: 6,
            question: 'O que devo fazer se suspeitar que estou com Leishmaniose?',
            answer: (
                <>
                    <p className="text-gray-700 mb-3">
                        Se você suspeitar que está com Leishmaniose:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Procure uma unidade de saúde o mais rápido possível</li>
                        <li>Informe ao médico se esteve em áreas endêmicas</li>
                        <li>Descreva detalhadamente os sintomas e quando começaram</li>
                        <li>Siga todas as orientações médicas para diagnóstico</li>
                        <li>Não se automedique</li>
                    </ul>
                    <p className="mt-3 text-gray-700">
                        O diagnóstico precoce é fundamental para o sucesso do tratamento.
                    </p>
                </>
            ),
        },
        {
            id: 7,
            question: 'Quais são as regiões com maior incidência de Leishmaniose no Brasil?',
            answer: (
                <p className="text-gray-700">
                    As regiões com maior incidência de Leishmaniose no Brasil são o Norte e Nordeste, embora casos sejam registrados em todas as regiões do país. Estados como Maranhão, Pará, Tocantins, Bahia e Minas Gerais apresentam elevado número de casos. Nos últimos anos, tem ocorrido expansão da doença para áreas urbanas e periurbanas em várias regiões do país.
                </p>
            ),
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Sobre a Leishmaniose
            </h1>

            {/* Tabs */}
            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id
                                        ? 'border-teal-500 text-teal-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* Visão Geral */}
                {activeTab === 'overview' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            O que é Leishmaniose?
                        </h2>
                        <div className="prose max-w-none">
                            <p className="mb-4">
                                A Leishmaniose é uma doença infecciosa, não contagiosa, causada por parasitas do gênero <em>Leishmania</em>, que são transmitidos pela picada de flebotomíneos infectados, conhecidos popularmente como mosquito-palha, birigui ou tatuquira.
                            </p>
                            <p className="mb-4">
                                No Brasil, existem principalmente dois tipos de leishmaniose:
                            </p>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Leishmaniose Tegumentar (ou Cutânea)
                            </h3>
                            <p className="mb-4">
                                Afeta principalmente a pele e mucosas. Caracteriza-se por úlceras na pele que podem evoluir para lesões nas mucosas do nariz, boca e garganta, podendo causar deformidades.
                            </p>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Leishmaniose Visceral (ou Calazar)
                            </h3>
                            <p className="mb-4">
                                Forma mais grave da doença, afeta órgãos internos como fígado, baço e medula óssea. Se não tratada, pode levar à morte em mais de 90% dos casos.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            A Leishmaniose é considerada uma doença negligenciada pela Organização Mundial da Saúde (OMS), afetando principalmente populações de baixa renda em países em desenvolvimento.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Ciclo de Transmissão
                            </h3>
                            <p className="mb-4">
                                A transmissão ocorre quando o mosquito-palha infectado pica uma pessoa ou animal suscetível. Os principais reservatórios da doença são cães, raposas, marsupiais e roedores.
                            </p>
                            <p className="mb-4">O ciclo de transmissão envolve:</p>
                            <ol className="list-decimal list-inside mb-4 pl-4">
                                <li className="mb-2">O mosquito-palha pica um animal ou pessoa infectada e ingere o parasita.</li>
                                <li className="mb-2">O parasita se multiplica no intestino do inseto.</li>
                                <li className="mb-2">Ao picar outro hospedeiro, o mosquito transmite o parasita.</li>
                                <li className="mb-2">O parasita invade células do sistema imunológico e se multiplica.</li>
                            </ol>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Epidemiologia no Brasil
                            </h3>
                            <p className="mb-4">
                                A Leishmaniose é endêmica em várias regiões do Brasil, com maior incidência nas regiões Norte e Nordeste. A urbanização da doença tem sido observada nos últimos anos, com aumento de casos em áreas periurbanas.
                            </p>
                        </div>
                    </div>
                )}

                {/* Sintomas */}
                {activeTab === 'symptoms' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Sintomas da Leishmaniose
                        </h2>
                        <div className="prose max-w-none">
                            <p className="mb-6">
                                Os sintomas da Leishmaniose variam conforme o tipo da doença. É importante reconhecer esses sinais precocemente para buscar tratamento adequado.
                            </p>

                            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                                    Leishmaniose Tegumentar (Cutânea)
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>Lesões na pele que começam como pequenas pápulas avermelhadas</li>
                                    <li>Evolução para úlceras com bordas elevadas e fundo granuloso</li>
                                    <li>As lesões geralmente são indolores</li>
                                    <li>Podem surgir semanas ou meses após a picada do inseto</li>
                                    <li>Nas formas mucosas, pode haver lesões nas mucosas do nariz, boca e garganta</li>
                                    <li>Possibilidade de destruição parcial ou total das mucosas</li>
                                    <li>Dificuldade para respirar e engolir em casos avançados</li>
                                </ul>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 italic">
                                        Nota: As lesões cutâneas podem cicatrizar espontaneamente, mas as formas mucosas geralmente não curam sem tratamento.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                                    Leishmaniose Visceral (Calazar)
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>Febre prolongada e irregular</li>
                                    <li>Perda de peso progressiva</li>
                                    <li>Aumento do volume abdominal (hepatoesplenomegalia)</li>
                                    <li>Palidez de pele e mucosas</li>
                                    <li>Fraqueza e fadiga</li>
                                    <li>Tosse seca</li>
                                    <li>Diarreia</li>
                                    <li>Sangramentos (nasal, gengival)</li>
                                    <li>Anemia</li>
                                </ul>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 italic">
                                        Alerta: A Leishmaniose Visceral é uma doença grave que pode ser fatal se não tratada adequadamente e em tempo hábil.
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Quando procurar atendimento médico?
                            </h3>
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Procure um médico imediatamente se você apresentar:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-yellow-700">
                                            <li>Lesões na pele que não cicatrizam em 4 semanas</li>
                                            <li>Febre prolongada de origem desconhecida</li>
                                            <li>Aumento do volume abdominal</li>
                                            <li>Emagrecimento rápido e inexplicável</li>
                                            <li>Histórico de viagem ou residência em áreas endêmicas</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6">
                                O diagnóstico precoce é fundamental para o sucesso do tratamento e para evitar complicações graves. Se você suspeita de Leishmaniose, procure uma unidade de saúde para avaliação médica.
                            </p>
                        </div>
                    </div>
                )}

                {/* Prevenção */}
                {activeTab === 'prevention' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Prevenção da Leishmaniose
                        </h2>
                        <div className="prose max-w-none">
                            <p className="mb-6">
                                A prevenção da Leishmaniose envolve medidas individuais e coletivas para reduzir o contato com o vetor (mosquito-palha) e controlar os reservatórios da doença.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white border rounded-lg shadow-sm p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-teal-100 rounded-full">
                                            <Shield className="h-6 w-6 text-teal-600" />
                                        </div>
                                        <h3 className="ml-3 text-xl font-semibold text-teal-700">
                                            Proteção Individual
                                        </h3>
                                    </div>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Use roupas que cubram a maior parte do corpo, especialmente ao entardecer e à noite (horários de maior atividade do mosquito)</li>
                                        <li>Aplique repelentes nas áreas expostas da pele</li>
                                        <li>Instale telas de malha fina em portas e janelas</li>
                                        <li>Use mosquiteiros impregnados com inseticida durante o sono</li>
                                        <li>Evite exposição nos horários de maior atividade do vetor (entardecer e amanhecer)</li>
                                        <li>Em áreas endêmicas, evite atividades próximas a matas e áreas com vegetação densa</li>
                                    </ul>
                                </div>

                                <div className="bg-white border rounded-lg shadow-sm p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Shield className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <h3 className="ml-3 text-xl font-semibold text-blue-700">
                                            Medidas Ambientais
                                        </h3>
                                    </div>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Mantenha quintais e jardins limpos, livres de matéria orgânica</li>
                                        <li>Remova folhas secas e frutos caídos</li>
                                        <li>Evite acúmulo de lixo que possa servir de criadouro para o mosquito</li>
                                        <li>Mantenha a grama aparada e pode arbustos para reduzir sombreamento do solo</li>
                                        <li>Evite acúmulo de entulho e materiais de construção</li>
                                        <li>Limpe periodicamente abrigos de animais domésticos</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Controle de Reservatórios
                            </h3>
                            <p className="mb-4">
                                O controle dos animais que servem como reservatórios da doença é uma medida importante na prevenção da Leishmaniose:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-6">
                                <li>Leve seu cão regularmente ao veterinário para exames de detecção da Leishmaniose</li>
                                <li>Use coleiras repelentes em cães, especialmente em áreas endêmicas</li>
                                <li>Mantenha cães dentro de casa ao entardecer e durante a noite</li>
                                <li>Vacine seu cão contra a Leishmaniose (consulte um veterinário sobre a disponibilidade)</li>
                                <li>Siga as orientações das autoridades sanitárias em caso de animal infectado</li>
                            </ul>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">
                                            A prevenção da Leishmaniose é uma responsabilidade compartilhada. Ações individuais e coletivas são necessárias para o controle efetivo da doença.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Ações Comunitárias
                            </h3>
                            <p className="mb-4">
                                Além das medidas individuais, ações comunitárias são essenciais para o controle da Leishmaniose:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Participe de campanhas de educação em saúde</li>
                                <li>Colabore com agentes de saúde durante visitas domiciliares</li>
                                <li>Denuncie áreas com acúmulo de lixo ou entulho</li>
                                <li>Apoie iniciativas de controle vetorial em sua comunidade</li>
                                <li>Compartilhe informações sobre prevenção com vizinhos e familiares</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Tratamento */}
                {activeTab === 'treatment' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Tratamento da Leishmaniose
                        </h2>
                        <div className="prose max-w-none">
                            <p className="mb-6">
                                O tratamento da Leishmaniose deve ser realizado sob orientação médica especializada e varia de acordo com o tipo da doença, gravidade dos sintomas e condição geral do paciente.
                            </p>

                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">
                                            <strong>Importante:</strong> O tratamento da Leishmaniose deve ser sempre prescrito e acompanhado por um médico. A automedicação é perigosa e pode levar a complicações graves.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                                    Tratamento da Leishmaniose Tegumentar (Cutânea)
                                </h3>
                                <p className="mb-4">
                                    O tratamento de primeira escolha para a Leishmaniose Tegumentar é baseado em antimoniais pentavalentes:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>Antimoniato de N-metil glucamina (Glucantime®)</li>
                                    <li>Administrado por via intramuscular ou endovenosa</li>
                                    <li>Duração do tratamento: geralmente 20 a 30 dias</li>
                                    <li>Dosagem baseada no peso do paciente</li>
                                </ul>
                                <p className="mb-4">
                                    Em casos de contraindicação ou falha terapêutica, outras opções incluem:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Anfotericina B</li>
                                    <li>Pentamidina</li>
                                    <li>Miltefosina (em alguns casos específicos)</li>
                                </ul>
                                <p className="mt-4 text-sm text-gray-600">
                                    O tratamento local com técnicas como crioterapia pode ser usado em casos selecionados de lesões cutâneas únicas e pequenas.
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                                    Tratamento da Leishmaniose Visceral (Calazar)
                                </h3>
                                <p className="mb-4">
                                    A Leishmaniose Visceral é uma condição grave que requer tratamento hospitalar em muitos casos:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>Antimoniais pentavalentes (Glucantime®) - primeira linha de tratamento</li>
                                    <li>Anfotericina B lipossomal - indicada para casos graves ou pacientes com comorbidades</li>
                                    <li>Anfotericina B desoxicolato</li>
                                    <li>Duração do tratamento: varia de 20 a 40 dias, dependendo do medicamento utilizado</li>
                                </ul>
                                <p className="text-sm text-gray-600">
                                    O paciente com Leishmaniose Visceral frequentemente necessita de cuidados de suporte, como transfusões sanguíneas, tratamento de infecções secundárias e suporte nutricional.
                                </p>
                            </div>

                            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <Heart className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="ml-3 text-xl font-semibold text-purple-700">
                                        Acompanhamento durante e após o tratamento
                                    </h3>
                                </div>
                                <p className="mb-4">
                                    O acompanhamento médico é fundamental durante e após o tratamento:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Exames laboratoriais periódicos para monitorar efeitos colaterais dos medicamentos</li>
                                    <li>Avaliação da função renal, hepática e cardíaca</li>
                                    <li>Acompanhamento clínico para verificar a cicatrização das lesões (forma cutânea)</li>
                                    <li>Avaliação da regressão dos sintomas (forma visceral)</li>
                                    <li>Consultas de seguimento por até 12 meses após o término do tratamento</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-semibold mt-6 mb-3">
                                Acesso ao tratamento
                            </h3>
                            <p className="mb-4">
                                No Brasil, os medicamentos para tratamento da Leishmaniose são fornecidos gratuitamente pelo Sistema Único de Saúde (SUS). O paciente deve procurar uma unidade de saúde para avaliação e encaminhamento adequado.
                            </p>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Os medicamentos utilizados no tratamento da Leishmaniose podem causar efeitos colaterais significativos, por isso é essencial o acompanhamento médico regular durante todo o tratamento.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ */}
                {activeTab === 'faq' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Perguntas Frequentes
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.id} className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === item.id ? null : item.id)}
                                        className="w-full flex justify-between items-center p-4 focus:outline-none hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-medium text-left">{item.question}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-teal-600 transform transition-transform ${activeFaq === item.id ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {activeFaq === item.id && (
                                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-700">
                                Tem mais dúvidas? Entre em contato com a central de atendimento do Portal da Leishmaniose pelo telefone 0800-XXX-XXXX ou envie um e-mail para contato@portalleishmaniose.gov.br
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
