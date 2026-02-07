import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePermission } from '../../hooks/usePermission'
import { PermissionProvider } from '../../contexts/PermissionContext'

interface ProtectedRouteProps {
    requiredPermission?: string
    requiredRole?: string | string[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredPermission,
    requiredRole
}) => {
    const { user, loading } = useAuth()
    const { can, hasRole } = usePermission()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (requiredPermission && !can(requiredPermission)) {
        return <Forbidden />
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return <Forbidden />
    }

    return (
        <PermissionProvider user={user}>
            <Outlet />
        </PermissionProvider>
    )
}

export const Loading: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
    </div>
)

export const Forbidden: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-danger mb-2">403</h1>
            <p className="text-xl text-gray-600 mb-6">Acesso Negado</p>
            <p className="text-gray-500 mb-8">Você não tem permissão para acessar este recurso.</p>
            <a
                href="/"
                className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Voltar ao Início
            </a>
        </div>
    </div>
)
