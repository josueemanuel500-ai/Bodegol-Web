/**
 * NotFoundPage.jsx — 404 Page
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import SEO from '@/components/ui/SEO'
import Button from '@/components/buttons/Button'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Página no encontrada" />
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-8xl font-display font-bold text-brand-primary mb-4" aria-hidden="true">
            404
          </p>
          <h1 className="text-2xl font-display font-bold text-text-primary mb-3">
            Página no encontrada
          </h1>
          <p className="text-text-muted mb-8">
            La página que buscas no existe o fue movida. Vuelve al inicio para encontrar lo que necesitas.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button as={Link} to="/" variant="primary" icon={Home}>
              Ir al inicio
            </Button>
            <Button as="button" variant="ghost" icon={ArrowLeft} onClick={() => history.back()}>
              Volver
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
