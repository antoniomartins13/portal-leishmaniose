import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { User } from '../types/User'

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    login: (user: User, token: string) => void
    logout: () => void
    setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // Recuperar user e token do localStorage ao montar
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            try {
                const parsedToken = JSON.parse(storedToken)
                const parsedUser = JSON.parse(storedUser)
                setToken(parsedToken)
                setUserState(parsedUser)
            } catch (error) {
                console.error('Erro ao recuperar dados do localStorage:', error)
                localStorage.clear()
            }
        }

        setLoading(false)
    }, [])

    const login = useCallback((user: User, token: string) => {
        setUserState(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }, [])

    const logout = useCallback(() => {
        setUserState(null)
        setToken(null)
        localStorage.clear()
    }, [])

    const setUser = useCallback((user: User | null) => {
        setUserState(user)
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [])

    const value: AuthContextType = {
        user,
        token,
        loading,
        login,
        logout,
        setUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
