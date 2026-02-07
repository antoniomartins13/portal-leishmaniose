import { useState, useCallback } from 'react'
import { notificationsApi, CreateNotificationRequest } from '../api/resources/notificationsApi'
import toast from 'react-hot-toast'

export const useNotification = () => {
  const [loading, setLoading] = useState(false)
  const [protocol, setProtocol] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submitNotification = useCallback(async (data: CreateNotificationRequest) => {
    setLoading(true)
    setError(null)
    try {
      const response = await notificationsApi.create(data)
      setProtocol(response.protocol)
      toast.success('Notificação enviada com sucesso!')
      return response
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Erro ao enviar notificação'
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setProtocol(null)
    setError(null)
  }, [])

  return { loading, protocol, error, submitNotification, reset }
}
