import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { LucideIcon, Eye, EyeOff } from 'lucide-react'

interface FormInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  icon?: LucideIcon
  required?: boolean
  disabled?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  icon: Icon,
  required = true,
  disabled = false,
}) => {
  const { control, formState: { errors } } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === 'password'
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={20} />}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPasswordField ? 'pr-10' : 'pr-4'} py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition ${errors[name]
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          )}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-600 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}
