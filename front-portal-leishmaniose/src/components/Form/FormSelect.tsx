import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface FormSelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  label: string
  options: FormSelectOption[]
  required?: boolean
  disabled?: boolean
  placeholder?: string
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required = true,
  disabled = false,
  placeholder = 'Selecione uma opção',
}) => {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition ${
              errors[name]
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors[name] && (
        <p className="text-red-600 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}
