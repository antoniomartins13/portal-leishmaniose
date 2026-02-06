import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  TagIcon,
  ClockIcon,
  ShareIcon } from
'lucide-react';
export function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  // Mock news data - in a real application, this would be fetched from an API
  const newsArticles = [
  {
    id: '1',
    title: 'Novo medicamento para Leishmaniose é aprovado pela ANVISA',
    date: '2023-10-15',
    category: 'tratamento',
    image:
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>A Agência Nacional de Vigilância Sanitária (ANVISA) aprovou um novo medicamento para o tratamento da Leishmaniose Visceral, doença que afeta milhares de brasileiros anualmente, principalmente nas regiões Norte e Nordeste do país.</p>
      <p>O medicamento, desenvolvido após uma década de pesquisas em parceria entre universidades brasileiras e laboratórios internacionais, apresentou eficácia superior a 85% nos testes clínicos, com menos efeitos colaterais que as terapias atualmente disponíveis.</p>
      <h3>Avanço no tratamento</h3>
      <p>De acordo com o Dr. Carlos Mendonça, pesquisador responsável pelo desenvolvimento do medicamento, "este é um avanço significativo no tratamento da Leishmaniose Visceral, pois oferece uma alternativa mais segura e eficaz para os pacientes, especialmente aqueles em condições mais graves".</p>
      <p>O novo tratamento estará disponível no Sistema Único de Saúde (SUS) a partir do próximo mês, beneficiando pacientes de todo o país. A expectativa é que cerca de 5.000 pessoas sejam tratadas com o novo medicamento ainda este ano.</p>
      <h3>Sobre a Leishmaniose Visceral</h3>
      <p>A Leishmaniose Visceral, também conhecida como Calazar, é a forma mais grave da doença, afetando órgãos internos como fígado, baço e medula óssea. Se não tratada adequadamente, pode levar à morte em até 90% dos casos.</p>`,
    author: 'Equipe Editorial',
    readTime: '5 minutos'
  },
  {
    id: '2',
    title: 'Pesquisa identifica novo vetor da Leishmaniose em área urbana',
    date: '2023-10-10',
    category: 'pesquisa',
    image:
    'https://images.unsplash.com/photo-1581093196277-9f6e3bdc5561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>Um estudo conduzido pela Fundação Oswaldo Cruz (Fiocruz) identificou uma nova espécie de flebotomíneo capaz de transmitir a Leishmaniose em ambientes urbanos, o que pode explicar o aumento de casos da doença em grandes cidades brasileiras nos últimos anos.</p>
      <p>A pesquisa, publicada na revista científica PLOS Neglected Tropical Diseases, analisou insetos coletados em parques e áreas verdes de cinco capitais brasileiras, encontrando uma variante do mosquito-palha que se adaptou ao ambiente urbano.</p>
      <h3>Adaptação ao ambiente urbano</h3>
      <p>"O que torna esta descoberta preocupante é a capacidade deste vetor de se reproduzir em ambientes com menor vegetação, típicos de centros urbanos", explica a Dra. Luiza Gomes, entomologista e líder da pesquisa.</p>
      <p>Segundo os pesquisadores, esta adaptação pode estar relacionada às mudanças climáticas e ao desmatamento, que forçam os vetores a buscar novos habitats.</p>
      <h3>Implicações para o controle da doença</h3>
      <p>A descoberta exigirá uma revisão nas estratégias de controle da Leishmaniose em áreas urbanas, com novas abordagens para combater este vetor específico.</p>
      <p>O Ministério da Saúde já foi notificado sobre os resultados da pesquisa e está trabalhando em conjunto com a Fiocruz para desenvolver protocolos atualizados de vigilância e controle.</p>`,
    author: 'Dr. Paulo Ribeiro',
    readTime: '7 minutos'
  },
  {
    id: '3',
    title: 'Campanha de prevenção da Leishmaniose é lançada no Nordeste',
    date: '2023-10-05',
    category: 'prevencao',
    image:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>O Ministério da Saúde, em parceria com as secretarias estaduais de saúde da região Nordeste, lançou hoje uma ampla campanha de prevenção contra a Leishmaniose, focada especialmente nos estados com maior incidência da doença.</p>
      <p>A iniciativa, denominada "Leishmaniose: Prevenir é Proteger", inclui ações educativas em escolas, unidades de saúde e comunidades, além de distribuição de material informativo e treinamento de agentes comunitários.</p>
      <h3>Foco na educação</h3>
      <p>"Nossa principal arma contra a Leishmaniose é a informação. Quando a população conhece as formas de prevenção, conseguimos reduzir significativamente o número de casos", afirmou João Silva, coordenador nacional da campanha.</p>
      <p>Entre as medidas preventivas destacadas estão o uso de repelentes, instalação de telas em portas e janelas, limpeza de quintais e terrenos, e cuidados específicos com animais domésticos.</p>
      <h3>Ações para proteção de animais</h3>
      <p>A campanha também aborda a importância da proteção dos cães, principais reservatórios urbanos da doença, com recomendações sobre o uso de coleiras repelentes e a importância de levar os animais regularmente ao veterinário.</p>
      <p>Serão distribuídas 50 mil coleiras repelentes para famílias em situação de vulnerabilidade social em áreas endêmicas.</p>`,
    author: 'Mariana Costa',
    readTime: '4 minutos'
  },
  {
    id: '4',
    title: 'Aumento de casos de Leishmaniose Visceral preocupa autoridades',
    date: '2023-09-28',
    category: 'epidemiologia',
    image:
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>Dados recentes divulgados pelo Sistema de Informação de Agravos de Notificação (SINAN) revelam um aumento preocupante de 23% nos casos de Leishmaniose Visceral em comparação ao mesmo período do ano passado.</p>
      <p>O crescimento foi observado principalmente em municípios de médio porte das regiões Norte e Centro-Oeste, áreas que tradicionalmente não apresentavam alta incidência da doença.</p>
      <h3>Fatores para o aumento</h3>
      <p>Segundo especialistas, diversos fatores podem estar contribuindo para este cenário, incluindo mudanças climáticas, expansão urbana desordenada, desmatamento e falhas nas ações de controle vetorial.</p>
      <p>"Estamos observando uma expansão geográfica da doença para áreas anteriormente não endêmicas, o que representa um desafio adicional para as autoridades sanitárias", explica o Dr. Roberto Almeida, epidemiologista da Universidade Federal do Pará.</p>
      <h3>Resposta das autoridades</h3>
      <p>O Ministério da Saúde anunciou a criação de uma força-tarefa para investigar o aumento de casos e implementar medidas emergenciais nas áreas mais afetadas.</p>
      <p>Entre as ações previstas estão o reforço das equipes de vigilância epidemiológica, intensificação do controle vetorial e capacitação de profissionais de saúde para diagnóstico precoce da doença.</p>`,
    author: 'Equipe Editorial',
    readTime: '6 minutos'
  },
  {
    id: '5',
    title: 'Estudo revela eficácia de nova coleira repelente para cães',
    date: '2023-09-20',
    category: 'prevencao',
    image:
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>Uma pesquisa realizada pela Universidade Federal do Paraná comprovou a alta eficácia de um novo modelo de coleira repelente que protege cães contra o mosquito transmissor da Leishmaniose por até 12 meses.</p>
      <p>O estudo, que durou três anos e envolveu mais de 500 cães em diferentes regiões do país, mostrou uma redução de 95% na taxa de infecção nos animais que utilizaram a nova coleira, em comparação com o grupo controle.</p>
      <h3>Tecnologia inovadora</h3>
      <p>"A inovação está na formulação de liberação lenta dos componentes repelentes, que mantém a eficácia por um período muito mais longo que as opções atuais do mercado", explica a Profa. Dra. Camila Rodrigues, coordenadora da pesquisa.</p>
      <p>Além da maior durabilidade, a coleira utiliza componentes menos tóxicos, reduzindo os riscos de efeitos adversos nos animais.</p>
      <h3>Impacto na saúde pública</h3>
      <p>Considerando que os cães são os principais reservatórios urbanos da Leishmaniose Visceral, a proteção eficaz destes animais representa um importante avanço para o controle da doença em humanos.</p>
      <p>A expectativa é que a nova coleira esteja disponível no mercado ainda este ano, com versões subsidiadas para programas de saúde pública em áreas endêmicas.</p>`,
    author: 'Dr. André Martins',
    readTime: '5 minutos'
  },
  {
    id: '6',
    title:
    'Conferência Internacional sobre Leishmaniose acontecerá no Brasil',
    date: '2023-09-15',
    category: 'evento',
    image:
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `<p>O Brasil foi escolhido para sediar a XII Conferência Internacional sobre Leishmaniose (WorldLeish), que acontecerá em Salvador, Bahia, entre os dias 15 e 19 de maio de 2024.</p>
      <p>O evento, que ocorre a cada quatro anos, reunirá mais de 1.500 especialistas de todo o mundo para discutir os últimos avanços científicos no diagnóstico, tratamento e prevenção da doença.</p>
      <h3>Reconhecimento internacional</h3>
      <p>"A escolha do Brasil para sediar este importante evento reflete o reconhecimento internacional da excelência das pesquisas brasileiras sobre Leishmaniose", afirma o Dr. Fernando Souza, presidente do comitê organizador.</p>
      <p>O país é responsável por aproximadamente 20% da produção científica mundial sobre a doença e abriga alguns dos principais centros de pesquisa dedicados ao tema.</p>
      <h3>Programação e temas</h3>
      <p>A conferência abordará temas como novos tratamentos, estratégias de controle vetorial, vacinas em desenvolvimento, impactos das mudanças climáticas na distribuição da doença e políticas públicas para áreas endêmicas.</p>
      <p>Além das apresentações científicas, o evento contará com workshops práticos, sessões de pôsteres e oportunidades de networking entre pesquisadores, profissionais de saúde e representantes de agências de saúde pública.</p>`,
    author: 'Juliana Mendes',
    readTime: '4 minutos'
  }];

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = newsArticles.find((article) => article.id === id);
    setArticle(foundArticle);
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id]);
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-700">Notícia não encontrada</p>
        <Link
          to="/noticias"
          className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800">

          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Voltar para notícias
        </Link>
      </div>);

  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/noticias"
          className="inline-flex items-center text-teal-600 hover:text-teal-800">

          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Voltar para notícias
        </Link>
      </div>
      {/* Article header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
          <span className="mx-2">•</span>
          <TagIcon className="h-4 w-4 mr-1" />
          <span className="capitalize">{article.category}</span>
          <span className="mx-2">•</span>
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{article.readTime} de leitura</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-600">Por {article.author}</p>
      </div>
      {/* Featured image */}
      <div className="mb-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-md" />

      </div>
      {/* Article content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: article.content
          }} />

      </div>
      {/* Share buttons */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div>
          <span className="text-gray-600 mr-2">Compartilhar:</span>
          <div className="inline-flex space-x-2">
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <ShareIcon className="h-4 w-4" />
            </button>
            {/* Additional share buttons would go here */}
          </div>
        </div>
        <Link to="/noticias" className="text-teal-600 hover:text-teal-800">
          Ver mais notícias
        </Link>
      </div>
      {/* Related articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Notícias relacionadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.
          filter(
            (relatedArticle) =>
            relatedArticle.id !== article.id &&
            relatedArticle.category === article.category
          ).
          slice(0, 3).
          map((relatedArticle) =>
          <div
            key={relatedArticle.id}
            className="bg-white rounded-lg shadow-md overflow-hidden">

                <img
              className="h-48 w-full object-cover"
              src={relatedArticle.image}
              alt={relatedArticle.title} />

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">
                    {relatedArticle.title}
                  </h3>
                  <Link
                to={`/noticias/${relatedArticle.id}`}
                className="text-teal-600 hover:text-teal-800 font-medium text-sm">

                    Ler mais
                  </Link>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>);

}