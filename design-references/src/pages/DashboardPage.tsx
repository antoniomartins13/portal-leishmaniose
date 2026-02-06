import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as MapTooltip } from
'react-leaflet';
import { FilterIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
export function DashboardPage() {
  const [filters, setFilters] = useState({
    dateRange: 'month',
    state: 'all',
    caseType: 'all'
  });
  // Mock data for charts
  const monthlyData = [
  {
    name: 'Jan',
    cutaneous: 65,
    visceral: 28
  },
  {
    name: 'Fev',
    cutaneous: 59,
    visceral: 32
  },
  {
    name: 'Mar',
    cutaneous: 80,
    visceral: 41
  },
  {
    name: 'Abr',
    cutaneous: 81,
    visceral: 34
  },
  {
    name: 'Mai',
    cutaneous: 56,
    visceral: 29
  },
  {
    name: 'Jun',
    cutaneous: 55,
    visceral: 20
  },
  {
    name: 'Jul',
    cutaneous: 40,
    visceral: 24
  },
  {
    name: 'Ago',
    cutaneous: 45,
    visceral: 35
  },
  {
    name: 'Set',
    cutaneous: 62,
    visceral: 30
  },
  {
    name: 'Out',
    cutaneous: 78,
    visceral: 38
  },
  {
    name: 'Nov',
    cutaneous: 91,
    visceral: 42
  },
  {
    name: 'Dez',
    cutaneous: 73,
    visceral: 36
  }];

  const regionData = [
  {
    name: 'Norte',
    cutaneous: 421,
    visceral: 187
  },
  {
    name: 'Nordeste',
    cutaneous: 389,
    visceral: 203
  },
  {
    name: 'Centro-Oeste',
    cutaneous: 245,
    visceral: 98
  },
  {
    name: 'Sudeste',
    cutaneous: 187,
    visceral: 76
  },
  {
    name: 'Sul',
    cutaneous: 43,
    visceral: 21
  }];

  const mapData = [
  {
    id: 1,
    lat: -15.7801,
    lng: -47.9292,
    cases: 245,
    region: 'Brasília',
    type: 'cutaneous'
  },
  {
    id: 2,
    lat: -23.5505,
    lng: -46.6333,
    cases: 189,
    region: 'São Paulo',
    type: 'visceral'
  },
  {
    id: 3,
    lat: -22.9068,
    lng: -43.1729,
    cases: 167,
    region: 'Rio de Janeiro',
    type: 'cutaneous'
  },
  {
    id: 4,
    lat: -12.9714,
    lng: -38.5014,
    cases: 203,
    region: 'Salvador',
    type: 'visceral'
  },
  {
    id: 5,
    lat: -8.0578,
    lng: -34.8829,
    cases: 156,
    region: 'Recife',
    type: 'cutaneous'
  },
  {
    id: 6,
    lat: -3.7172,
    lng: -38.5433,
    cases: 132,
    region: 'Fortaleza',
    type: 'visceral'
  },
  {
    id: 7,
    lat: -19.9167,
    lng: -43.9345,
    cases: 118,
    region: 'Belo Horizonte',
    type: 'cutaneous'
  },
  {
    id: 8,
    lat: -3.1019,
    lng: -60.025,
    cases: 224,
    region: 'Manaus',
    type: 'visceral'
  }];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Painel de Leishmaniose no Brasil
        </h1>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <div size={16} className="mr-2" />
            Atualizar Dados
          </button>
          <Link
            to="/exportar"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">

            <PrinterIcon size={16} className="mr-2" />
            Exportar Dados
          </Link>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <DownloadIcon size={16} className="mr-2" />
            Exportar
          </button>
        </div>
      </div>
      {/* Filters */}
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

                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Ano</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1">

                Estado
              </label>
              <select
                id="state"
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">

                <option value="all">Todos os Estados</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="BA">Bahia</option>
                <option value="AM">Amazonas</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="caseType"
                className="block text-sm font-medium text-gray-700 mb-1">

                Tipo de Caso
              </label>
              <select
                id="caseType"
                name="caseType"
                value={filters.caseType}
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total de Casos
          </p>
          <h3 className="text-3xl font-bold text-gray-800">12,587</h3>
          <p className="text-xs text-gray-500 mt-2">Atualizado em 15/10/2023</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-500">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Leishmaniose Cutânea
          </p>
          <h3 className="text-3xl font-bold text-gray-800">8,342</h3>
          <p className="text-xs text-gray-500 mt-2">66.3% dos casos</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Leishmaniose Visceral
          </p>
          <h3 className="text-3xl font-bold text-gray-800">4,245</h3>
          <p className="text-xs text-gray-500 mt-2">33.7% dos casos</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Regiões Afetadas
          </p>
          <h3 className="text-3xl font-bold text-gray-800">156</h3>
          <p className="text-xs text-gray-500 mt-2">Em 24 estados</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Casos por Mês
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cutaneous"
                  name="Leishmaniose Cutânea"
                  stroke="#10b981"
                  strokeWidth={2} />

                <Line
                  type="monotone"
                  dataKey="visceral"
                  name="Leishmaniose Visceral"
                  stroke="#3b82f6"
                  strokeWidth={2} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Casos por Região
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="cutaneous"
                  name="Leishmaniose Cutânea"
                  fill="#10b981" />

                <Bar
                  dataKey="visceral"
                  name="Leishmaniose Visceral"
                  fill="#3b82f6" />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Distribuição Geográfica
        </h2>
        <div
          style={{
            height: '500px'
          }}>

          <MapContainer
            center={[-15.7801, -47.9292]}
            zoom={4}
            style={{
              height: '100%',
              width: '100%'
            }}
            scrollWheelZoom={false}>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {mapData.map((point) =>
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={Math.sqrt(point.cases) / 2}
              fillColor={point.type === 'cutaneous' ? '#10b981' : '#3b82f6'}
              color={point.type === 'cutaneous' ? '#047857' : '#1d4ed8'}
              weight={1}
              fillOpacity={0.7}>

                <MapTooltip>
                  <div>
                    <strong>{point.region}</strong>
                    <br />
                    {point.cases} casos (
                    {point.type === 'cutaneous' ? 'Cutânea' : 'Visceral'})<br />
                  </div>
                </MapTooltip>
              </CircleMarker>
            )}
          </MapContainer>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        <p>
          Fonte: Ministério da Saúde - Sistema de Informação de Agravos de
          Notificação (SINAN).
          <br />
          Os dados apresentados são atualizados semanalmente. Última
          atualização: 15/10/2023.
        </p>
      </div>
    </div>);

}