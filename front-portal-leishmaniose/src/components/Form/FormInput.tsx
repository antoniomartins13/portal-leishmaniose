import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { LucideIcon } from 'lucide-react'

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
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition ${
                errors[name]
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          )}
        />
      </div>
      {errors[name] && (
        <p className="text-red-600 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}
