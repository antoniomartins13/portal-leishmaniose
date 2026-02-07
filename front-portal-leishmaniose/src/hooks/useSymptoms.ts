import { useState, useEffect, useCallback } from 'react'
import { symptomsApi, Symptom } from '../api/resources/symptomsApi'

export const useSymptoms = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSymptoms = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await symptomsApi.getAllActive()
      setSymptoms(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Erro ao carregar sintomas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSymptoms()
  }, [loadSymptoms])

  return { symptoms, loading, error, refresh: loadSymptoms }
}
