import axios, { 
  AxiosError, 
  type AxiosInstance, 
  type InternalAxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import toast from 'react-hot-toast'

let currentRoute = window.location.pathname
const abortController = new AbortController()

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokenString = localStorage.getItem('token')
    const accessToken = tokenString ? JSON.parse(tokenString) : null

    if (window.location.pathname !== currentRoute) {
      currentRoute = window.location.pathname
      abortController.abort()
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    config.signal = abortController.signal
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<any>) => {
    // Verificação de cancelamento segura
    if (axios.isCancel(error)) {
        return Promise.reject(error)
    }

    const statusCode = error.response?.status
    const title = error.response?.data?.title || error.response?.data?.message

    if (statusCode === 401) {
      localStorage.clear()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    if (statusCode === 403) {
      toast.error(title || 'Acesso negado', { duration: 5000 })
    }

    if (statusCode === 500) {
      toast.error(
        'Ocorreu um erro interno do servidor.',
        { duration: 5000 }
      )
    }

    return Promise.reject(error)
  }
)

export { api }