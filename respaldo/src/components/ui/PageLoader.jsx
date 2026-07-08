/**
 * PageLoader.jsx — Branded full-page loader for Suspense (Bodegol DS)
 */
import React from 'react'

export default function PageLoader() {
  return (
    <div role="status" aria-label="Cargando…"
      className="fixed inset-0 z-[500] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <img src="/images/logo/bodegol-logo.png" alt="Bodegol" draggable={false} className="h-24 w-auto select-none animate-pulse" />
        <div className="h-6 w-6 rounded-full border-2 border-line-strong border-t-primary animate-spin" />
        <span className="sr-only">Cargando Bodegol…</span>
      </div>
    </div>
  )
}
