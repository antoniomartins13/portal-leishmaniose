import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
export function LatestNews() {
  // Mock news data for the homepage component
  const latestNews = [
  {
    id: 1,
    title: 'Novo medicamento para Leishmaniose é aprovado pela ANVISA',
    date: '2023-10-15',
    category: 'tratamento'
  },
  {
    id: 2,
    title: 'Pesquisa identifica novo vetor da Leishmaniose em área urbana',
    date: '2023-10-10',
    category: 'pesquisa'
  },
  {
    id: 3,
    title: 'Campanha de prevenção da Leishmaniose é lançada no Nordeste',
    date: '2023-10-05',
    category: 'prevencao'
  }];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Últimas Notícias</h2>
          <Link
            to="/noticias"
            className="text-teal-600 hover:text-teal-800 flex items-center">

            Ver todas
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) =>
          <div
            key={news.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">

              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded capitalize">
                  {news.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(news.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{news.title}</h3>
              <Link
              to={`/noticias/${news.id}`}
              className="text-teal-600 hover:text-teal-800 text-sm font-medium">

                Ler mais
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>);

}