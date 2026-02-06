import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-react';
export function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!credentials.email || !credentials.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    // Mock login logic
    console.log('Login attempt:', credentials);
    // Simulate successful login
    if (
    credentials.email === 'gestor@exemplo.com' &&
    credentials.password === 'senha123')
    {
      window.location.href = '/gestor';
    } else if (
    credentials.email === 'pesquisador@exemplo.com' &&
    credentials.password === 'senha123')
    {
      window.location.href = '/pesquisador';
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesso ao Portal da Leishmaniose
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login para acessar o sistema
          </p>
        </div>
        {error &&
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircleIcon className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        }
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="E-mail" />

            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Senha" />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}>

                {showPassword ?
                <EyeOffIcon className="h-5 w-5 text-gray-400" /> :

                <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900">

                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500">

                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">

              Entrar
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500">

                Solicitar acesso
              </a>
            </p>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Acesso para demonstração
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setCredentials({
                      email: 'gestor@exemplo.com',
                      password: 'senha123'
                    });
                  }}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">

                  Gestor de Saúde
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setCredentials({
                      email: 'pesquisador@exemplo.com',
                      password: 'senha123'
                    });
                  }}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">

                  Pesquisador
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>);

}