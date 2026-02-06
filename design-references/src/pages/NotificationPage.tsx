import React, { useState } from 'react';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
export function NotificationPage() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    state: '',
    city: '',
    neighborhood: '',
    symptoms_date: '',
    symptoms: [],
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          symptoms: [...prev.symptoms, value]
        };
      } else {
        return {
          ...prev,
          symptoms: prev.symptoms.filter((symptom) => symptom !== value)
        };
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (
    !formData.cpf ||
    !formData.email ||
    !formData.state ||
    !formData.city ||
    !formData.symptoms_date)
    {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    // Submit form logic would go here
    console.log('Form submitted:', formData);
    // Show success message
    setSubmitted(true);
    setError(null);
  };
  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircleIcon size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Notificação Enviada com Sucesso!
            </h2>
            <p className="text-gray-600 mb-6">
              Obrigado por contribuir com o monitoramento da Leishmaniose. Um
              e-mail de confirmação foi enviado para {formData.email}.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Número de protocolo:{' '}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    cpf: '',
                    email: '',
                    state: '',
                    city: '',
                    neighborhood: '',
                    symptoms_date: '',
                    symptoms: [],
                    details: ''
                  });
                }}
                className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors">

                Nova Notificação
              </button>
            </div>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Notificar um Caso de Leishmaniose
        </h1>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircleIcon className="h-5 w-5 text-blue-500" />
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
        {error &&
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircleIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        }
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6">

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nome Completo (opcional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Seu nome completo" />

            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                CPF <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="000.000.000-00"
                required />

            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="seu@email.com"
                required />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required>

                  <option value="">Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Sua cidade"
                  required />

              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Bairro
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Seu bairro" />

            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Data de início dos sintomas{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="symptoms_date"
                value={formData.symptoms_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required />

            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Sintomas observados
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fever"
                    name="symptoms"
                    value="fever"
                    checked={formData.symptoms.includes('fever')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label htmlFor="fever" className="ml-2 text-sm text-gray-700">
                    Febre
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="weight_loss"
                    name="symptoms"
                    value="weight_loss"
                    checked={formData.symptoms.includes('weight_loss')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label
                    htmlFor="weight_loss"
                    className="ml-2 text-sm text-gray-700">

                    Perda de peso
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="skin_lesions"
                    name="symptoms"
                    value="skin_lesions"
                    checked={formData.symptoms.includes('skin_lesions')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label
                    htmlFor="skin_lesions"
                    className="ml-2 text-sm text-gray-700">

                    Lesões na pele
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enlarged_organs"
                    name="symptoms"
                    value="enlarged_organs"
                    checked={formData.symptoms.includes('enlarged_organs')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label
                    htmlFor="enlarged_organs"
                    className="ml-2 text-sm text-gray-700">

                    Aumento do fígado/baço
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fatigue"
                    name="symptoms"
                    value="fatigue"
                    checked={formData.symptoms.includes('fatigue')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label
                    htmlFor="fatigue"
                    className="ml-2 text-sm text-gray-700">

                    Fadiga
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anemia"
                    name="symptoms"
                    value="anemia"
                    checked={formData.symptoms.includes('anemia')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

                  <label
                    htmlFor="anemia"
                    className="ml-2 text-sm text-gray-700">

                    Anemia
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Detalhes adicionais
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Forneça informações adicionais que possam ser relevantes">
              </textarea>
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                required />

              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                Concordo com a{' '}
                <a href="#" className="text-teal-600 hover:underline">
                  Política de Privacidade
                </a>{' '}
                e autorizo o uso dos dados para fins epidemiológicos.
              </label>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors">

                Enviar Notificação
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>);

}