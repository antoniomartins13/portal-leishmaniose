import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { PermissionProvider } from './contexts/PermissionContext'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ProtectedRoute, Loading } from './components/common/ProtectedRoute'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { NotificationPage } from './pages/NotificationPage'
import { NewsPage } from './pages/NewsPage'
import { AboutPage } from './pages/AboutPage'
import { AdminPage } from './pages/AdminPage'
import { RolesPage } from './pages/RolesPage'
import { useAuth } from './hooks/useAuth'
import './index.css'

// Wrapper para fornecer PermissionProvider em rotas protegidas
const RootApp: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <PermissionProvider user={user}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/painel" element={<DashboardPage />} />
            <Route path="/notificar" element={<NotificationPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/sobre" element={<AboutPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/usuarios" element={<AdminPage />} />
              <Route path="/admin/grupos" element={<RolesPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </PermissionProvider>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <RootApp />
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App