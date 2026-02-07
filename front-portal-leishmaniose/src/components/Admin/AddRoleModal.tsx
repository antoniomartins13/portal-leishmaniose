import React, { useState } from 'react'
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
})

type CreateRoleFormData = yup.InferType<typeof createRoleSchema>

interface AddRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; permissions: string[] }) => Promise<void>
  permissions: { id: number | string; name: string }[]
}

export const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, permissions, onClose, onSubmit }) => {
  const methods = useForm<CreateRoleFormData>({
    resolver: yupResolver(createRoleSchema),
    mode: 'onBlur',
  })

  const [selected, setSelected] = useState<string[]>([])

  const toggle = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]))
  }

  const handleFormSubmit = async (data: CreateRoleFormData) => {
    try {
      await onSubmit({ name: data.name, permissions: selected })
      methods.reset()
      setSelected([]) // Limpa as permissões selecionadas
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
              label="Nome"
              type="text"
              placeholder="ex: gerenciador_casos"
              required
            />

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto">
              {permissions.map((perm) => (
                <label key={perm.name} className="flex items-center space-x-2">
                  <input type="checkbox" checked={selected.includes(perm.name)} onChange={() => toggle(perm.name)} />
                  <span className="text-sm text-gray-700">{perm.name}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  methods.reset()
                  setSelected([]) // Limpa as permissões selecionadas
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
