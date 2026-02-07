import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { FormInput } from '../components/Form/FormInput'
import { FormSelect } from '../components/Form/FormSelect'
import { FormButton } from '../components/Form/FormButton'
import { useNotification } from '../hooks/useNotification'
import { useSymptoms } from '../hooks/useSymptoms'
import { maskCPF, maskCEP } from '../utils/masks'
import { fetchAddressByCep } from '../services/viaCep'
import toast from 'react-hot-toast'

// Schema de validação
const notificationSchema = yup.object({
    name: yup.string().optional(),
    cpf: yup
        .string()
        .required('CPF é obrigatório')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    cep: yup.string().required('CEP é obrigatório'),
    state: yup.string().required('Estado é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    neighborhood: yup.string().optional(),
    symptoms_date: yup.string().required('Data dos sintomas é obrigatória'),
    symptom_ids: yup.array().of(yup.number().required()).optional(),
    details: yup.string().optional(),
    terms: yup
        .boolean()
        .oneOf([true], 'Você deve aceitar os termos')
        .required('Você deve aceitar os termos'),
})

type NotificationFormData = yup.InferType<typeof notificationSchema>

const BRAZILIAN_STATES = [
    { value: '', label: 'Selecione o estado' },
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
]

export const NotificationPage: React.FC = () => {
    const { loading, protocol, submitNotification, reset } = useNotification()
    const { symptoms: availableSymptoms, loading: loadingSymptoms } = useSymptoms()

    const [selectedSymptomIds, setSelectedSymptomIds] = useState<number[]>([])
    const [submitted, setSubmitted] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [loadingCep, setLoadingCep] = useState(false)

    const methods = useForm<NotificationFormData>({
        resolver: yupResolver(notificationSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            cpf: '',
            email: '',
            cep: '',
            state: '',
            city: '',
            neighborhood: '',
            symptoms_date: '',
            details: '',
            terms: false,
        },
    })

    const { register, handleSubmit, setValue, watch, formState: { errors } } = methods

    // Handle CPF mask
    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCPF(e.target.value)
        setValue('cpf', masked, { shouldValidate: true })
    }

    // Handle CEP mask and auto-fill
    const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCEP(e.target.value)
        setValue('cep', masked, { shouldValidate: true })

        // Se o CEP estiver completo (00000-000), busca o endereço
        const cleanCep = masked.replace(/\D/g, '')
        if (cleanCep.length === 8) {
            setLoadingCep(true)
            try {
                const address = await fetchAddressByCep(cleanCep)
                if (address) {
                    setValue('state', address.state, { shouldValidate: true })
                    setValue('city', address.city, { shouldValidate: true })
                    setValue('neighborhood', address.neighborhood, { shouldValidate: true })
                    toast.success('Endereço preenchido automaticamente!')
                } else {
                    toast.error('CEP não encontrado')
                }
            } catch {
                toast.error('Erro ao buscar CEP')
            } finally {
                setLoadingCep(false)
            }
        }
    }

    // Handle symptom checkbox toggle
    const toggleSymptom = (symptomId: number) => {
        setSelectedSymptomIds((prev) => {
            if (prev.includes(symptomId)) {
                return prev.filter((id) => id !== symptomId)
            }
            return [...prev, symptomId]
        })
    }

    const onSubmit = async (data: NotificationFormData) => {
        setFormError(null)
        try {
            await submitNotification({
                ...data,
                symptom_ids: selectedSymptomIds.length > 0 ? selectedSymptomIds : undefined,
            })
            setSubmitted(true)
        } catch (err: any) {
            setFormError(err?.response?.data?.message || 'Erro ao enviar notificação')
        }
    }

    const handleReset = () => {
        reset()
        setSubmitted(false)
        setSelectedSymptomIds([])
        setFormError(null)
        methods.reset()
    }

    // Tela de sucesso
    if (submitted && protocol) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Notificação Enviada com Sucesso!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Obrigado por contribuir com o monitoramento da Leishmaniose. Um
                            e-mail de confirmação com os detalhes foi enviado para <strong>{watch('email')}</strong>.
                            Verifique também a caixa de spam.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Número de protocolo: <strong className="text-teal-600">{protocol}</strong>
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleReset}
                                className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                            >
                                Nova Notificação
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Notificar um Caso de Leishmaniose
                </h1>

                {/* Alerta de confidencialidade */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                As informações fornecidas neste formulário são confidenciais e
                                serão utilizadas apenas para fins de monitoramento
                                epidemiológico.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Erro de formulário */}
                {formError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{formError}</p>
                            </div>
                        </div>
                    </div>
                )}

                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-md rounded-lg p-6"
                    >
                        <div className="space-y-6">
                            {/* Nome (opcional) */}
                            <FormInput
                                name="name"
                                label="Nome Completo (opcional)"
                                placeholder="Seu nome completo"
                                required={false}
                            />

                            {/* CPF */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    CPF <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('cpf')}
                                    onChange={handleCPFChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.cpf ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="000.000.000-00"
                                />
                                {errors.cpf && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <FormInput
                                name="email"
                                label="E-mail"
                                type="email"
                                placeholder="seu@email.com"
                                required
                            />

                            {/* CEP com busca automática */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    CEP <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        {...register('cep')}
                                        onChange={handleCEPChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                                        placeholder="00000-000"
                                        maxLength={9}
                                    />
                                    {loadingCep && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="h-5 w-5 text-teal-600 animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Digite o CEP para preencher automaticamente o endereço
                                </p>
                            </div>

                            {/* Estado e Cidade */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormSelect
                                    name="state"
                                    label="Estado"
                                    options={BRAZILIAN_STATES}
                                    required
                                />

                                <FormInput
                                    name="city"
                                    label="Cidade"
                                    placeholder="Sua cidade"
                                    required
                                />
                            </div>

                            {/* Bairro */}
                            <FormInput
                                name="neighborhood"
                                label="Bairro"
                                placeholder="Seu bairro"
                            />

                            {/* Data dos sintomas */}
                            <FormInput
                                name="symptoms_date"
                                label="Data de início dos sintomas"
                                type="date"
                                required
                            />

                            {/* Sintomas (checkboxes) */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Sintomas observados
                                </label>
                                {loadingSymptoms ? (
                                    <div className="flex items-center text-gray-500">
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Carregando sintomas...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {availableSymptoms.map((symptom) => (
                                            <div key={symptom.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`symptom-${symptom.id}`}
                                                    checked={selectedSymptomIds.includes(symptom.id)}
                                                    onChange={() => toggleSymptom(symptom.id)}
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor={`symptom-${symptom.id}`}
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    {symptom.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Detalhes */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Detalhes adicionais
                                </label>
                                <textarea
                                    {...register('details')}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Forneça informações adicionais que possam ser relevantes"
                                />
                            </div>

                            {/* Termos */}
                            <div className="flex items-start">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    {...register('terms')}
                                    className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                    Concordo com a{' '}
                                    <a href="#" className="text-teal-600 hover:underline">
                                        Política de Privacidade
                                    </a>{' '}
                                    e autorizo o uso dos dados para fins epidemiológicos.
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-sm text-red-600">{errors.terms.message}</p>
                            )}

                            {/* Submit */}
                            <div className="pt-4">
                                <FormButton
                                    type="submit"
                                    label="Enviar Notificação"
                                    isLoading={loading}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
