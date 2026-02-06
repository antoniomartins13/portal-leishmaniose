import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { AlertTriangleIcon, TrendingUpIcon, MapPinIcon } from 'lucide-react';
import { LatestNews } from '../components/LatestNews';
import 'leaflet/dist/leaflet.css';
export function HomePage() {
  const [stats, setStats] = useState({
    totalCases: 12587,
    newCases: 342,
    affectedRegions: 156
  });
  const [mapData, setMapData] = useState([
  {
    id: 1,
    lat: -15.7801,
    lng: -47.9292,
    cases: 245,
    region: 'Brasília'
  },
  {
    id: 2,
    lat: -23.5505,
    lng: -46.6333,
    cases: 189,
    region: 'São Paulo'
  },
  {
    id: 3,
    lat: -22.9068,
    lng: -43.1729,
    cases: 167,
    region: 'Rio de Janeiro'
  },
  {
    id: 4,
    lat: -12.9714,
    lng: -38.5014,
    cases: 203,
    region: 'Salvador'
  },
  {
    id: 5,
    lat: -8.0578,
    lng: -34.8829,
    cases: 156,
    region: 'Recife'
  },
  {
    id: 6,
    lat: -3.7172,
    lng: -38.5433,
    cases: 132,
    region: 'Fortaleza'
  },
  {
    id: 7,
    lat: -19.9167,
    lng: -43.9345,
    cases: 118,
    region: 'Belo Horizonte'
  },
  {
    id: 8,
    lat: -3.1019,
    lng: -60.025,
    cases: 224,
    region: 'Manaus'
  }]
  );
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Portal da Leishmaniose</h1>
            <p className="text-xl mb-8">
              Monitoramento e controle da Leishmaniose no Brasil. Dados
              atualizados, informações e serviços para profissionais e
              população.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/notificar"
                className="bg-white text-teal-700 hover:bg-teal-100 px-6 py-3 rounded-lg font-medium transition-colors">

                Notificar um Caso
              </a>
              <a
                href="/sobre"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">

                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="p-3 bg-blue-100 rounded-full">
                  <AlertTriangleIcon className="text-blue-700" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-blue-600 font-medium">
                    Total de Casos
                  </p>
                  <h3 className="text-3xl font-bold text-blue-900">
                    {stats.totalCases.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="p-3 bg-teal-100 rounded-full">
                  <TrendingUpIcon className="text-teal-700" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-teal-600 font-medium">
                    Novos Casos (30 dias)
                  </p>
                  <h3 className="text-3xl font-bold text-teal-900">
                    {stats.newCases.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="p-3 bg-green-100 rounded-full">
                  <MapPinIcon className="text-green-700" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-green-600 font-medium">
                    Regiões Afetadas
                  </p>
                  <h3 className="text-3xl font-bold text-green-900">
                    {stats.affectedRegions.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest News Section */}
      <LatestNews />
      {/* Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Mapa de Casos de Leishmaniose
          </h2>
          <div
            className="bg-white p-4 rounded-lg shadow-md"
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
                fillColor="#10b981"
                color="#047857"
                weight={1}
                fillOpacity={0.7}>

                  <Tooltip>
                    <div>
                      <strong>{point.region}</strong>
                      <br />
                      {point.cases} casos confirmados
                    </div>
                  </Tooltip>
                </CircleMarker>
              )}
            </MapContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              O mapa apresenta dados atualizados sobre casos confirmados de
              Leishmaniose no Brasil.
            </p>
          </div>
        </div>
      </section>
      {/* Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Informações Importantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-teal-700 mb-3">Sintomas</h3>
              <p className="text-gray-600 mb-4">
                Reconheça os sinais da Leishmaniose: febre prolongada, perda de
                peso, aumento do fígado e baço, entre outros.
              </p>
              <a
                href="/sobre#sintomas"
                className="text-teal-600 hover:text-teal-800 font-medium">

                Saiba mais →
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-teal-700 mb-3">
                Prevenção
              </h3>
              <p className="text-gray-600 mb-4">
                Medidas preventivas incluem uso de repelentes, telas em janelas
                e portas, e controle de animais reservatórios.
              </p>
              <a
                href="/sobre#prevencao"
                className="text-teal-600 hover:text-teal-800 font-medium">

                Saiba mais →
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-teal-700 mb-3">
                Tratamento
              </h3>
              <p className="text-gray-600 mb-4">
                O tratamento deve ser realizado sob orientação médica e varia
                conforme o tipo de leishmaniose.
              </p>
              <a
                href="/sobre#tratamento"
                className="text-teal-600 hover:text-teal-800 font-medium">

                Saiba mais →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>);

}