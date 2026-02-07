import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormButton, FormInput } from '../Form'

interface Permission {
  id: number | string
  name: string
}

interface Role {
  id?: string
  name: string
  description?: string
  permissions?: Permission[]
}

interface EditRoleModalProps {
  isOpen: boolean
  role?: Role
  permissions: Permission[]
  onClose: () => void
  onSubmit: (id: string, name: string, permissions: string[]) => Promise<void>
}

const editRoleSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^[a-z_]+$/, 'Use apenas letras minúsculas e underscore'),
})

export const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen, role, permissions, onClose, onSubmit }) => {
  const methods = useForm<{ name: string }>({
    resolver: yupResolver(editRoleSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  })
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    if (role) {
      setSelected((role.permissions || []).map((p) => p.name))
      methods.reset({
        name: role.name || '',
      })
    } else {
      setSelected([])
    }
  }, [role, methods])

  const toggle = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]))
  }

  const submit = async (data: { name: string }) => {
    if (!role || !role.id) return
    await onSubmit(role.id, data.name, selected)
    onClose()
  }

  if (!isOpen || !role) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editar Grupo</h2>
        <p className="text-sm text-gray-600 mb-4">{role.name}</p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} className="space-y-4">
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
              <button onClick={onClose} type="button" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">Cancelar</button>
              <FormButton type="submit" label="Salvar" isLoading={methods.formState.isSubmitting} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditRoleModal
