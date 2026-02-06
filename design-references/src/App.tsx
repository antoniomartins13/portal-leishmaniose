import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotificationPage } from './pages/NotificationPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ManagerPage } from './pages/ManagerPage';
import { ResearcherPage } from './pages/ResearcherPage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ExportPage } from './pages/ExportPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notificar" element={<NotificationPage />} />
            <Route path="/painel" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gestor" element={<ManagerPage />} />
            <Route path="/pesquisador" element={<ResearcherPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/noticias/:id" element={<NewsDetailPage />} />
            <Route path="/exportar" element={<ExportPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>);

}