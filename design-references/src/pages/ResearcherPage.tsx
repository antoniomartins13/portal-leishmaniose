import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
import { DownloadIcon, FilterIcon, DatabaseIcon } from 'lucide-react';
export function ResearcherPage() {
  const [filters, setFilters] = useState({
    dateRange: 'year',
    region: 'all',
    type: 'all'
  });
  // Mock data for charts
  const yearlyData = [
  {
    year: '2018',
    cutaneous: 4231,
    visceral: 2145
  },
  {
    year: '2019',
    cutaneous: 4587,
    visceral: 2356
  },
  {
    year: '2020',
    cutaneous: 5102,
    visceral: 2789
  },
  {
    year: '2021',
    cutaneous: 6234,
    visceral: 3012
  },
  {
    year: '2022',
    cutaneous: 7845,
    visceral: 3456
  },
  {
    year: '2023',
    cutaneous: 8342,
    visceral: 4245
  }];

  const ageData = [
  {
    name: '0-14',
    value: 1245
  },
  {
    name: '15-29',
    value: 3456
  },
  {
    name: '30-44',
    value: 4321
  },
  {
    name: '45-59',
    value: 2567
  },
  {
    name: '60+',
    value: 998
  }];

  const genderData = [
  {
    name: 'Masculino',
    value: 7654
  },
  {
    name: 'Feminino',
    value: 4933
  }];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleExport = (format) => {
    alert(`Dados exportados em formato ${format}`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Área do Pesquisador
      </h1>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center text-gray-700">
            <FilterIcon size={18} className="mr-2" />
            <span className="font-medium">Filtros:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            <div>
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-gray-700 mb-1">

                Período
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">

                <option value="month">Último Mês</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Ano</option>
                <option value="all">Todos os Anos</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 mb-1">

                Região
              </label>
              <select
                id="region"
                name="region"
                value={filters.region}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">

                <option value="all">Todas as Regiões</option>
                <option value="norte">Norte</option>
                <option value="nordeste">Nordeste</option>
                <option value="centro-oeste">Centro-Oeste</option>
                <option value="sudeste">Sudeste</option>
                <option value="sul">Sul</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1">

                Tipo
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">

                <option value="all">Todos os Tipos</option>
                <option value="cutaneous">Leishmaniose Cutânea</option>
                <option value="visceral">Leishmaniose Visceral</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Evolução dos Casos
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              <DownloadIcon className="mr-1.5 h-4 w-4" />
              CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              <DownloadIcon className="mr-1.5 h-4 w-4" />
              Excel
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yearlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cutaneous"
                  name="Leishmaniose Cutânea"
                  stroke="#10b981"
                  activeDot={{
                    r: 8
                  }} />

                <Line
                  type="monotone"
                  dataKey="visceral"
                  name="Leishmaniose Visceral"
                  stroke="#3b82f6" />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Distribuição por Faixa Etária
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                    }>

                    {ageData.map((entry, index) =>
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]} />

                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Distribuição por Gênero
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                    }>

                    <Cell fill="#3b82f6" />
                    <Cell fill="#ec4899" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Exportar Dados Completos
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <DatabaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Banco de Dados de Casos Confirmados
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Acesse o conjunto completo de dados anonimizados para análises
                científicas. Os dados estão disponíveis em diversos formatos e
                incluem informações detalhadas sobre casos confirmados.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExport('csv')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

                <DownloadIcon className="mr-2 h-5 w-5" />
                Exportar CSV
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                <DownloadIcon className="mr-2 h-5 w-5" />
                Exportar Excel
              </button>
              <button
                onClick={() => handleExport('json')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">

                <DownloadIcon className="mr-2 h-5 w-5" />
                Exportar JSON
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        <p>
          <strong>Nota:</strong> Todos os dados disponibilizados foram
          anonimizados e são fornecidos apenas para fins de pesquisa. O uso
          destes dados deve seguir as diretrizes éticas e legais aplicáveis.
        </p>
      </div>
    </div>);

}