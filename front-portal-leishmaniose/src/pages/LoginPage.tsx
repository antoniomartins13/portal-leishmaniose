import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../hooks/useAuth'
import { authApi } from '../api/resources/authApi'
import { FormInput, FormButton, FormAlert } from '../components/Form'

interface LoginFormData {
  email: string
  password: string
}

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  })
  .required()

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      })

      // Salvar token e user no contexto
      login(response.user, response.token)

      // Redirecionar para dashboard
      navigate('/')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">L</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Portal da Leishmaniose
          </h1>
          <p className="text-gray-600 text-sm">
            Sistema de Monitoramento de Casos
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <FormAlert type="error" message={error} icon={<AlertCircle size={20} />} />
          </div>
        )}

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={Mail}
              required
            />

            <FormInput
              name="password"
              label="Senha"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <FormButton
              type="submit"
              label="Entrar"
              isLoading={isLoading}
            />
          </form>
        </FormProvider>

        {/* Divider */}
        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white text-gray-500">Demonstração</span>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-teal-50 rounded-lg p-4 text-xs text-gray-700">
          <p className="font-semibold text-teal-900 mb-2">Usuário Padrão:</p>
          <p>
            Email:{' '}
            <code className="bg-white px-2 py-1 rounded">
              admin@leishmaniose.gov.br
            </code>
          </p>
          <p>
            Senha: <code className="bg-white px-2 py-1 rounded">admin@123</code>
          </p>
        </div>
      </div>
    </div>
  )
}

