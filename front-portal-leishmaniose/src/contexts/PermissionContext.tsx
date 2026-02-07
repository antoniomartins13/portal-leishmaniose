import React, { createContext, ReactNode } from 'react'
import { User } from '../types/User'

interface PermissionContextType {
    can: (permission: string) => boolean
    hasRole: (role: string | string[]) => boolean
    canAction: (resource: string, action: string) => boolean
    user: User | null
}

export const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

interface PermissionProviderProps {
    children: ReactNode
    user: User | null
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children, user }) => {
    const can = (permission: string): boolean => {
        if (!user) return false
        return user.permissions?.includes(permission) ?? false
    }

    const hasRole = (role: string | string[]): boolean => {
        if (!user) return false
        if (typeof role === 'string') {
            return user.roles?.includes(role) ?? false
        }
        return role.some((r) => user.roles?.includes(r)) ?? false
    }

    const canAction = (resource: string, action: string): boolean => {
        return can(`${resource}.${action}`)
    }

    const value: PermissionContextType = {
        can,
        hasRole,
        canAction,
        user
    }

    return (
        <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>
    )
}
