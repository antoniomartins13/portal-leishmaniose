import { useContext } from 'react'
import { PermissionContext } from '../contexts/PermissionContext'

export const usePermission = () => {
  const context = useContext(PermissionContext)

  if (context === undefined) {
    throw new Error('usePermission deve ser usado dentro de PermissionProvider')
  }

  return context
}
