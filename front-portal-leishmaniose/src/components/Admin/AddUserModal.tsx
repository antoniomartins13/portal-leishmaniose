import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormInput, FormButton, FormSelect } from '../Form'

const createUserSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
  role: yup.string().required('Grupo é obrigatório'),
})

export type CreateUserFormData = yup.InferType<typeof createUserSchema>

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateUserFormData) => Promise<void>
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const methods = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
  })

  const handleFormSubmit = async (data: CreateUserFormData) => {
    try {
      await onSubmit(data)
      methods.reset()
      onClose()
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Adicionar Novo Usuário</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Nome"
              type="text"
              placeholder="Nome completo"
            />

            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="email@example.com"
            />

            <FormInput
              name="password"
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
            />

            <FormSelect
              name="role"
              label="Grupo"
              options={[
                { value: 'pesquisador', label: 'Pesquisador' },
                { value: 'gestor', label: 'Gestor' },
                { value: 'admin', label: 'Administrador' },
              ]}
            />

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  methods.reset()
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Cancelar
              </button>
              <FormButton
                type="submit"
                label="Adicionar"
                isLoading={methods.formState.isSubmitting}
                fullWidth
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
