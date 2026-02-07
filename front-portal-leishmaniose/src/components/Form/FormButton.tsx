import React from 'react'

interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset'
  label: string
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
  icon?: React.ReactNode
}

const variantConfig = {
  primary: 'bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400',
  secondary: 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400',
  danger: 'bg-red-600 hover:bg-red-700 disabled:bg-gray-400',
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'submit',
  label,
  isLoading = false,
  disabled = false,
  onClick,
  variant = 'primary',
  fullWidth = true,
  icon,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} ${variantConfig[variant]} text-white font-semibold py-2.5 rounded-lg transition duration-300 flex items-center justify-center space-x-2`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        <>
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
