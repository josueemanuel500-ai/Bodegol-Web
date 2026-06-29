/**
 * Toast.jsx — Toast Notification System
 *
 * Lightweight toast notifications rendered into a portal.
 * Includes ToastProvider (wraps app) and useToast hook.
 *
 * Usage:
 *   const { toast } = useToast()
 *   toast.success('¡Reservación enviada!')
 *   toast.error('Error al enviar. Intenta de nuevo.')
 *   toast.info('Recuerda confirmar por WhatsApp.')
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error:   XCircle,
  info:    Info,
  warning: AlertTriangle,
}

const STYLES = {
  success: 'border-l-status-success text-status-success',
  error:   'border-l-status-error text-status-error',
  info:    'border-l-brand-primary text-brand-primary',
  warning: 'border-l-status-warning text-status-warning',
}

let toastId = 0

function ToastItem({ toast, onDismiss }) {
  const Icon = ICONS[toast.type] || Info

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 64, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1 }}
      exit={{ opacity: 0, x: 64, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 w-80 bg-surface-base border border-border-default',
        'border-l-4 rounded-xl shadow-card-lg p-4',
        STYLES[toast.type]
      )}
    >
      <Icon size={18} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-ui font-semibold text-text-primary text-sm">{toast.title}</p>
        )}
        <p className={cn('text-sm text-text-secondary', toast.title ? 'mt-0.5' : '')}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Cerrar notificación"
        className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((type, messageOrOptions, title) => {
    const id = ++toastId
    const toast = typeof messageOrOptions === 'string'
      ? { id, type, message: messageOrOptions, title, duration: 4000 }
      : { id, type, duration: 4000, ...messageOrOptions }

    setToasts((prev) => [...prev, toast])

    if (toast.duration > 0) {
      setTimeout(() => dismiss(id), toast.duration)
    }

    return id
  }, [dismiss])

  const toast = {
    success: (msg, title) => addToast('success', msg, title),
    error:   (msg, title) => addToast('error',   msg, title),
    info:    (msg, title) => addToast('info',     msg, title),
    warning: (msg, title) => addToast('warning',  msg, title),
    dismiss,
  }

  const portal = typeof document !== 'undefined'
    ? createPortal(
        <div
          aria-live="polite"
          aria-label="Notificaciones"
          className="fixed bottom-6 right-6 z-toast flex flex-col gap-3 pointer-events-none"
        >
          <AnimatePresence mode="popLayout">
            {toasts.map((t) => (
              <div key={t.id} className="pointer-events-auto">
                <ToastItem toast={t} onDismiss={dismiss} />
              </div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )
    : null

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {portal}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

export default ToastProvider
