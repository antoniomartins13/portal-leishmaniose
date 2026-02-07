import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormInput, FormButton } from '../Form'

const createRoleSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^[a-z_]+$/, 'Use apenas letras minúsculas e underscore'),
  display_name: yup.string().required('Nome de exibição é obrigatório'),
  description: yup.string(),
})

type CreateRoleFormData = yup.InferType<typeof createRoleSchema>

interface AddRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateRoleFormData) => Promise<void>
}

export const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const methods = useForm<CreateRoleFormData>({
    resolver: yupResolver(createRoleSchema),
    mode: 'onBlur',
  })

  const handleFormSubmit = async (data: CreateRoleFormData) => {
    try {
      await onSubmit(data)
      methods.reset()
      onClose()
    } catch (error) {
      console.error('Erro ao criar grupo:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Adicionar Novo Grupo</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Nome (slug)"
              type="text"
              placeholder="ex: gerenciador_casos"
              required
            />

            <FormInput
              name="display_name"
              label="Nome de Exibição"
              type="text"
              placeholder="ex: Gerenciador de Casos"
              required
            />

            <FormInput
              name="description"
              label="Descrição"
              type="text"
              placeholder="Descrição do grupo..."
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
