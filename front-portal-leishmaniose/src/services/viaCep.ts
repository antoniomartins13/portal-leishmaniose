export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export interface AddressData {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

/**
 * Busca endereço pelo CEP usando a API ViaCEP
 */
export const fetchAddressByCep = async (cep: string): Promise<AddressData | null> => {
  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '')
  
  if (cleanCep.length !== 8) {
    return null
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data: ViaCepResponse = await response.json()

    if (data.erro) {
      return null
    }

    return {
      cep: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}
