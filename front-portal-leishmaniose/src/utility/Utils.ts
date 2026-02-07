export const objectToQueryString = (obj: Record<string, any>): string => {
  const params = new URLSearchParams()
  
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined) {
      params.append(key, String(obj[key]))
    }
  })

  return params.toString()
}

export const getErrorMessage = (error: any): string => {
  return (
    error?.response?.data?.title ||
    error?.response?.data?.message ||
    error?.message ||
    'Erro desconhecido'
  )
}

export const getSuccessMessage = (response: any): string => {
  return (
    response?.data?.message ||
    response?.message ||
    'Operação realizada com sucesso'
  )
}
