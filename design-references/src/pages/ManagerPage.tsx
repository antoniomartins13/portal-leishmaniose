import React, { useState } from 'react';
import {
  CheckIcon,
  XIcon,
  FileIcon,
  EyeIcon,
  DownloadIcon,
  KeyIcon } from
'lucide-react';
export function ManagerPage() {
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    name: 'Maria Silva',
    cpf: '123.456.789-00',
    date: '2023-10-12',
    city: 'São Paulo',
    state: 'SP',
    status: 'pending',
    type: 'cutaneous'
  },
  {
    id: 2,
    name: 'João Santos',
    cpf: '987.654.321-00',
    date: '2023-10-10',
    city: 'Rio de Janeiro',
    state: 'RJ',
    status: 'confirmed',
    type: 'visceral'
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    cpf: '456.789.123-00',
    date: '2023-10-09',
    city: 'Fortaleza',
    state: 'CE',
    status: 'pending',
    type: 'cutaneous'
  },
  {
    id: 4,
    name: 'Carlos Ferreira',
    cpf: '789.123.456-00',
    date: '2023-10-07',
    city: 'Salvador',
    state: 'BA',
    status: 'rejected',
    type: 'visceral'
  },
  {
    id: 5,
    name: 'Juliana Costa',
    cpf: '321.654.987-00',
    date: '2023-10-05',
    city: 'Manaus',
    state: 'AM',
    status: 'confirmed',
    type: 'cutaneous'
  }]
  );
  const [apiKey, setApiKey] = useState('sk_test_leish_12345abcdefg67890');
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');
  const handleStatusChange = (id, newStatus) => {
    setNotifications(
      notifications.map((notification) =>
      notification.id === id ?
      {
        ...notification,
        status: newStatus
      } :
      notification
      )
    );
  };
  const generateReport = () => {
    alert('Relatório gerado com sucesso!');
  };
  const regenerateApiKey = () => {
    const newKey =
    'sk_test_leish_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    alert('Nova chave API gerada com sucesso!');
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Área do Gestor de Saúde
      </h1>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${activeTab === 'notifications' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>

              Notificações
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`${activeTab === 'reports' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>

              Relatórios
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`${activeTab === 'api' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>

              API
            </button>
          </nav>
        </div>
      </div>
      {activeTab === 'notifications' &&
      <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
              Lista de Notificações
            </h2>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                <option value="all">Todos os Status</option>
                <option value="pending">Pendentes</option>
                <option value="confirmed">Confirmados</option>
                <option value="rejected">Rejeitados</option>
              </select>
              <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                <option value="all">Todos os Tipos</option>
                <option value="cutaneous">Leishmaniose Cutânea</option>
                <option value="visceral">Leishmaniose Visceral</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Paciente
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Data
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Localização
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Tipo
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Status
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification) =>
              <tr key={notification.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {notification.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {notification.cpf}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(notification.date).toLocaleDateString(
                      'pt-BR'
                    )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {notification.city}, {notification.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${notification.type === 'cutaneous' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>

                        {notification.type === 'cutaneous' ?
                    'Cutânea' :
                    'Visceral'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : notification.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                        {notification.status === 'pending' ?
                    'Pendente' :
                    notification.status === 'confirmed' ?
                    'Confirmado' :
                    'Rejeitado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                      onClick={() =>
                      handleStatusChange(notification.id, 'confirmed')
                      }
                      className="text-green-600 hover:text-green-900"
                      disabled={notification.status === 'confirmed'}>

                          <CheckIcon size={18} />
                        </button>
                        <button
                      onClick={() =>
                      handleStatusChange(notification.id, 'rejected')
                      }
                      className="text-red-600 hover:text-red-900"
                      disabled={notification.status === 'rejected'}>

                          <XIcon size={18} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      }
      {activeTab === 'reports' &&
      <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Geração de Relatórios
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <FileIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Relatório Mensal
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Resumo de todos os casos do último mês com análise por
                      região.
                    </p>
                    <button
                    onClick={generateReport}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                      <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="p-2 bg-teal-100 rounded-md">
                    <FileIcon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Relatório por Região
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Análise detalhada por estado e município com tendências.
                    </p>
                    <button
                    onClick={generateReport}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

                      <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-md">
                    <FileIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Relatório por Tipo
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Comparação entre casos cutâneos e viscerais ao longo do
                      tempo.
                    </p>
                    <button
                    onClick={generateReport}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

                      <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <FileIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Relatório Personalizado
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Crie um relatório com filtros e parâmetros específicos.
                    </p>
                    <button
                    onClick={generateReport}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">

                      <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {activeTab === 'api' &&
      <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Gerenciamento de API
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sua Chave de API
              </h3>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-100 p-3 rounded-md font-mono text-sm">
                  {showApiKey ? apiKey : '•'.repeat(apiKey.length)}
                </div>
                <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700">

                  <EyeIcon size={20} />
                </button>
              </div>
              <div className="mt-4">
                <button
                onClick={regenerateApiKey}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

                  <KeyIcon className="-ml-1 mr-2 h-5 w-5" />
                  Gerar Nova Chave
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Esta chave permite acesso programático aos dados do Portal da
                Leishmaniose. Mantenha-a segura.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Documentação da API
              </h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-semibold mb-2">
                  Endpoints Disponíveis:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      GET /api/cases
                    </code>{' '}
                    - Lista todos os casos confirmados
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      GET /api/cases/region/:region
                    </code>{' '}
                    - Casos por região
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      GET /api/cases/type/:type
                    </code>{' '}
                    - Casos por tipo
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">
                      GET /api/stats
                    </code>{' '}
                    - Estatísticas gerais
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  Para mais informações, consulte a{' '}
                  <a href="#" className="text-teal-600 hover:underline">
                    documentação completa
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}