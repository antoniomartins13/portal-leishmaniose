import React, { useState } from 'react';
import {
  SearchIcon,
  CalendarIcon,
  TagIcon,
  ChevronRightIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
export function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // Mock news data
  const newsArticles = [
  {
    id: 1,
    title: 'Novo medicamento para Leishmaniose é aprovado pela ANVISA',
    date: '2023-10-15',
    excerpt:
    'Um novo tratamento para Leishmaniose Visceral foi aprovado pela Agência Nacional de Vigilância Sanitária (ANVISA) e estará disponível no SUS a partir do próximo mês.',
    category: 'tratamento',
    image:
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  },
  {
    id: 2,
    title: 'Pesquisa identifica novo vetor da Leishmaniose em área urbana',
    date: '2023-10-10',
    excerpt:
    'Estudo realizado pela Fiocruz identificou uma nova espécie de flebotomíneo capaz de transmitir a Leishmaniose em ambientes urbanos.',
    category: 'pesquisa',
    image:
    'https://images.unsplash.com/photo-1581093196277-9f6e3bdc5561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  },
  {
    id: 3,
    title: 'Campanha de prevenção da Leishmaniose é lançada no Nordeste',
    date: '2023-10-05',
    excerpt:
    'O Ministério da Saúde lançou hoje uma nova campanha educativa sobre prevenção da Leishmaniose, focada especialmente nos estados do Nordeste.',
    category: 'prevencao',
    image:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  },
  {
    id: 4,
    title: 'Aumento de casos de Leishmaniose Visceral preocupa autoridades',
    date: '2023-09-28',
    excerpt:
    'Dados recentes mostram um aumento de 23% nos casos de Leishmaniose Visceral em comparação ao mesmo período do ano passado.',
    category: 'epidemiologia',
    image:
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  },
  {
    id: 5,
    title: 'Estudo revela eficácia de nova coleira repelente para cães',
    date: '2023-09-20',
    excerpt:
    'Pesquisadores da Universidade Federal do Paraná comprovaram a eficácia de uma nova coleira repelente que protege cães contra o mosquito transmissor da Leishmaniose.',
    category: 'prevencao',
    image:
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  },
  {
    id: 6,
    title:
    'Conferência Internacional sobre Leishmaniose acontecerá no Brasil',
    date: '2023-09-15',
    excerpt:
    'O Brasil sediará a próxima Conferência Internacional sobre Leishmaniose, que reunirá especialistas de todo o mundo para discutir avanços no combate à doença.',
    category: 'evento',
    image:
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.'
  }];

  const categories = [
  {
    id: 'all',
    name: 'Todas'
  },
  {
    id: 'tratamento',
    name: 'Tratamento'
  },
  {
    id: 'pesquisa',
    name: 'Pesquisa'
  },
  {
    id: 'prevencao',
    name: 'Prevenção'
  },
  {
    id: 'epidemiologia',
    name: 'Epidemiologia'
  },
  {
    id: 'evento',
    name: 'Eventos'
  }];

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
    activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Notícias e Atualizações
      </h1>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
          {categories.map((category) =>
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${activeCategory === category.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveCategory(category.id)}>

              {category.name}
            </button>
          )}
        </div>
      </div>
      {/* Featured Article */}
      {filteredNews.length > 0 &&
      <div className="mb-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-2/5">
                <img
                className="h-64 w-full object-cover md:h-full"
                src={filteredNews[0].image}
                alt={filteredNews[0].title} />

              </div>
              <div className="p-6 md:w-3/5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(filteredNews[0].date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="mx-2">•</span>
                  <TagIcon className="h-4 w-4 mr-1" />
                  <span className="capitalize">{filteredNews[0].category}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {filteredNews[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{filteredNews[0].excerpt}</p>
                <Link
                to={`/noticias/${filteredNews[0].id}`}
                className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">

                  Ler mais
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
      {/* News Grid */}
      {filteredNews.length > 1 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((article) =>
        <div
          key={article.id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">

              <img
            className="h-48 w-full object-cover"
            src={article.image}
            alt={article.title} />

              <div className="p-4 flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>
                    {new Date(article.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="mx-2">•</span>
                  <TagIcon className="h-3 w-3 mr-1" />
                  <span className="capitalize">{article.category}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
              </div>
              <div className="px-4 pb-4 mt-auto">
                <Link
              to={`/noticias/${article.id}`}
              className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm">

                  Ler mais
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
        )}
        </div> :
      searchTerm || activeCategory !== 'all' ?
      <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            Nenhuma notícia encontrada para a sua busca.
          </p>
          <button
          onClick={() => {
            setSearchTerm('');
            setActiveCategory('all');
          }}
          className="mt-4 text-teal-600 hover:text-teal-800 font-medium">

            Limpar filtros
          </button>
        </div> :
      null}
    </div>);

}