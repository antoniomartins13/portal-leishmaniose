import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { X } from 'lucide-react'
import {
    Symptom,
    CreateSymptomRequest,
    UpdateSymptomRequest,
} from '../../api/resources/symptomsApi'
import { FormInput } from '../Form/FormInput'
import { FormButton } from '../Form/FormButton'

interface SymptomModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: CreateSymptomRequest | UpdateSymptomRequest) => Promise<void>
    symptom?: Symptom | null
    isLoading?: boolean
}

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().optional(),
    active: yup.boolean().optional(),
})

type FormData = yup.InferType<typeof schema>

export const SymptomModal: React.FC<SymptomModalProps> = ({
    isOpen,
    onClose,
    onSave,
    symptom,
    isLoading = false,
}) => {
    const methods = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            active: true,
        },
    })

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = methods

    // Preencher formulário ao editar
    useEffect(() => {
        if (symptom) {
            setValue('name', symptom.name)
            setValue('description', symptom.description || '')
            setValue('active', symptom.active)
        } else {
            reset({
                name: '',
                description: '',
                active: true,
            })
        }
    }, [symptom, setValue, reset])

    const onSubmit = async (data: FormData) => {
        await onSave(data)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {symptom ? 'Editar Sintoma' : 'Novo Sintoma'}
                </h2>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput
                            name="name"
                            label="Nome"
                            placeholder="Ex: Febre Alta"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descrição
                            </label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Breve descrição do sintoma"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="active"
                                {...register('active')}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                                Ativo
                            </label>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancelar
                            </button>
                            <FormButton
                                type="submit"
                                label={symptom ? 'Salvar Alterações' : 'Criar Sintoma'}
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
