import React, { useEffect, useState, createElement } from 'react';
import {
  PrinterIcon,
  DownloadIcon,
  FilterIcon,
  ArrowLeftIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
export function ExportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    state: '',
    city: ''
  });
  const [records, setRecords] = useState([]);
  // Mock data - in a real application, this would come from an API
  const mockData = [
  {
    id: 1,
    neighborhood: 'Centro',
    symptoms_date: '2023-10-01',
    state: 'SP',
    city: 'São Paulo'
  },
  {
    id: 2,
    neighborhood: 'Copacabana',
    symptoms_date: '2023-09-28',
    state: 'RJ',
    city: 'Rio de Janeiro'
  },
  {
    id: 3,
    neighborhood: 'Boa Viagem',
    symptoms_date: '2023-10-05',
    state: 'PE',
    city: 'Recife'
  },
  {
    id: 4,
    neighborhood: 'Pituba',
    symptoms_date: '2023-09-22',
    state: 'BA',
    city: 'Salvador'
  },
  {
    id: 5,
    neighborhood: 'Meireles',
    symptoms_date: '2023-09-15',
    state: 'CE',
    city: 'Fortaleza'
  },
  {
    id: 6,
    neighborhood: 'Ponta Negra',
    symptoms_date: '2023-10-08',
    state: 'RN',
    city: 'Natal'
  },
  {
    id: 7,
    neighborhood: 'Jardins',
    symptoms_date: '2023-09-30',
    state: 'SP',
    city: 'São Paulo'
  },
  {
    id: 8,
    neighborhood: 'Santa Efigênia',
    symptoms_date: '2023-10-03',
    state: 'MG',
    city: 'Belo Horizonte'
  },
  {
    id: 9,
    neighborhood: 'Setor Bueno',
    symptoms_date: '2023-09-25',
    state: 'GO',
    city: 'Goiânia'
  },
  {
    id: 10,
    neighborhood: 'Batel',
    symptoms_date: '2023-10-07',
    state: 'PR',
    city: 'Curitiba'
  },
  {
    id: 11,
    neighborhood: 'Adrianópolis',
    symptoms_date: '2023-09-18',
    state: 'AM',
    city: 'Manaus'
  },
  {
    id: 12,
    neighborhood: 'Praia do Canto',
    symptoms_date: '2023-10-02',
    state: 'ES',
    city: 'Vitória'
  },
  {
    id: 13,
    neighborhood: 'Manaíra',
    symptoms_date: '2023-09-29',
    state: 'PB',
    city: 'João Pessoa'
  },
  {
    id: 14,
    neighborhood: 'Ponta Verde',
    symptoms_date: '2023-10-04',
    state: 'AL',
    city: 'Maceió'
  },
  {
    id: 15,
    neighborhood: 'Jatiúca',
    symptoms_date: '2023-09-20',
    state: 'AL',
    city: 'Maceió'
  },
  {
    id: 16,
    neighborhood: 'Aldeota',
    symptoms_date: '2023-10-06',
    state: 'CE',
    city: 'Fortaleza'
  },
  {
    id: 17,
    neighborhood: 'Botafogo',
    symptoms_date: '2023-09-27',
    state: 'RJ',
    city: 'Rio de Janeiro'
  },
  {
    id: 18,
    neighborhood: 'Itaim Bibi',
    symptoms_date: '2023-10-09',
    state: 'SP',
    city: 'São Paulo'
  },
  {
    id: 19,
    neighborhood: 'Caminho das Árvores',
    symptoms_date: '2023-09-24',
    state: 'BA',
    city: 'Salvador'
  },
  {
    id: 20,
    neighborhood: 'Ilha do Leite',
    symptoms_date: '2023-10-10',
    state: 'PE',
    city: 'Recife'
  },
  {
    id: 21,
    neighborhood: 'Pinheiros',
    symptoms_date: '2023-09-17',
    state: 'SP',
    city: 'São Paulo'
  },
  {
    id: 22,
    neighborhood: 'Funcionários',
    symptoms_date: '2023-10-11',
    state: 'MG',
    city: 'Belo Horizonte'
  },
  {
    id: 23,
    neighborhood: 'Lagoa Nova',
    symptoms_date: '2023-09-19',
    state: 'RN',
    city: 'Natal'
  },
  {
    id: 24,
    neighborhood: 'Moinhos de Vento',
    symptoms_date: '2023-10-12',
    state: 'RS',
    city: 'Porto Alegre'
  },
  {
    id: 25,
    neighborhood: 'Gruta de Lourdes',
    symptoms_date: '2023-09-21',
    state: 'AL',
    city: 'Maceió'
  }];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setRecords(mockData);
      setIsLoading(false);
    }, 800);
  }, []);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const applyFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      let filteredData = [...mockData];
      if (filters.startDate) {
        filteredData = filteredData.filter(
          (record) => record.symptoms_date >= filters.startDate
        );
      }
      if (filters.endDate) {
        filteredData = filteredData.filter(
          (record) => record.symptoms_date <= filters.endDate
        );
      }
      if (filters.state) {
        filteredData = filteredData.filter(
          (record) => record.state === filters.state
        );
      }
      if (filters.city) {
        filteredData = filteredData.filter((record) =>
        record.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }
      setRecords(filteredData);
      setIsLoading(false);
    }, 500);
  };
  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      state: '',
      city: ''
    });
    setIsLoading(true);
    setTimeout(() => {
      setRecords(mockData);
      setIsLoading(false);
    }, 500);
  };
  const handlePrint = () => {
    window.print();
  };
  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = [
    'ID',
    'Bairro',
    'Data de Início dos Sintomas',
    'Estado',
    'Cidade'];

    const csvContent = [
    headers.join(','),
    ...records.map((record) =>
    [
    record.id,
    record.neighborhood,
    record.symptoms_date,
    record.state,
    record.city].
    join(',')
    )].
    join('\n');
    // Create download link
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'casos_leishmaniose.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Controls - hidden when printing */}
      <div className="print:hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link
              to="/painel"
              className="mr-4 text-teal-600 hover:text-teal-800">

              <ArrowLeftIcon size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Exportar Dados de Casos
            </h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              <PrinterIcon className="mr-2 h-4 w-4" />
              Imprimir
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportar CSV
            </button>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <FilterIcon size={18} className="mr-2 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-800">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">

                <option value="">Todos os Estados</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="PE">Pernambuco</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="AM">Amazonas</option>
                <option value="GO">Goiás</option>
                <option value="ES">Espírito Santo</option>
                <option value="PB">Paraíba</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="AL">Alagoas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Digite o nome da cidade"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              Limpar
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
      {/* PDF-like content */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* PDF Header */}
        <div className="p-6 border-b border-gray-200 print:pb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Portal da Leishmaniose
              </h2>
              <p className="text-sm text-gray-500">
                Relatório de Casos por Bairro e Data de Início dos Sintomas
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
            <p>Total de registros: {records.length}</p>
            {(filters.startDate ||
            filters.endDate ||
            filters.state ||
            filters.city) &&
            <div className="mt-2">
                <p className="font-medium">Filtros aplicados:</p>
                <ul className="list-disc list-inside ml-2">
                  {filters.startDate &&
                <li>Data inicial: {filters.startDate}</li>
                }
                  {filters.endDate && <li>Data final: {filters.endDate}</li>}
                  {filters.state && <li>Estado: {filters.state}</li>}
                  {filters.city && <li>Cidade: {filters.city}</li>}
                </ul>
              </div>
            }
          </div>
        </div>
        {/* Table Content */}
        <div className="overflow-x-auto">
          {isLoading ?
          <div className="py-12 text-center">
              <p className="text-gray-500">Carregando dados...</p>
            </div> :
          records.length > 0 ?
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 print:bg-gray-100">
                <tr>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    ID
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Bairro
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Data de Início dos Sintomas
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Cidade
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) =>
              <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.neighborhood}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.symptoms_date).toLocaleDateString(
                    'pt-BR'
                  )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.state}
                    </td>
                  </tr>
              )}
              </tbody>
            </table> :

          <div className="py-12 text-center">
              <p className="text-gray-500">
                Nenhum registro encontrado com os filtros selecionados.
              </p>
            </div>
          }
        </div>
        {/* PDF Footer */}
        <div className="p-6 border-t border-gray-200 text-xs text-gray-500 print:pt-4">
          <p>
            Este relatório contém dados confidenciais e deve ser utilizado
            apenas para fins epidemiológicos.
          </p>
          <p>
            Portal da Leishmaniose © {new Date().getFullYear()} - Todos os
            direitos reservados
          </p>
          <p className="mt-1">Página 1 de 1</p>
        </div>
      </div>
    </div>);

}