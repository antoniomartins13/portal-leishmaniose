import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { PermissionProvider } from './contexts/PermissionContext'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ProtectedRoute, Loading } from './components/common/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          {/* Rotas adicionais de recursos virão aqui */}
        </Route>
      </Routes>
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
