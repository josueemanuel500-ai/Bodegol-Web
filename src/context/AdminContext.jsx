/**
 * AdminContext — estado del panel admin oculto (abrir/cerrar).
 * Se abre con 7 toques en el logo (ver useSecretTap + Hero).
 */
import React, { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openAdmin = useCallback(() => setOpen(true), [])
  const closeAdmin = useCallback(() => setOpen(false), [])
  return (
    <AdminContext.Provider value={{ open, openAdmin, closeAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin debe usarse dentro de <AdminProvider>')
  return ctx
}

export default AdminContext
