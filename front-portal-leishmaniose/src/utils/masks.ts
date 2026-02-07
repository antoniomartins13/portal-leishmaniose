/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export const maskCPF = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  
  if (digits.length <= 3) {
    return digits
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

/**
 * Remove máscara de CPF
 */
export const unmaskCPF = (value: string): string => {
  return value.replace(/\D/g, '')
}

/**
 * Aplica máscara de telefone ((00) 00000-0000)
 */
export const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : ''
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * Aplica máscara de CEP (00000-000)
 */
export const maskCEP = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  
  if (digits.length <= 5) {
    return digits
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}
