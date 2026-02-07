import React from 'react'

interface FormAlertProps {
  type: 'error' | 'success' | 'warning' | 'info'
  message: string
  icon?: React.ReactNode
}

const alertConfig = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: 'text-red-600',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    icon: 'text-green-600',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    icon: 'text-yellow-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600',
  },
}

export const FormAlert: React.FC<FormAlertProps> = ({ type, message, icon }) => {
  const config = alertConfig[type]

  return (
    <div
      className={`p-4 ${config.bg} border ${config.border} rounded-lg flex items-start space-x-3`}
    >
      {icon && <div className={`${config.icon} flex-shrink-0 mt-0.5`}>{icon}</div>}
      <div className={`${config.text} text-sm`}>{message}</div>
    </div>
  )
}
