/**
 * TermsPage.jsx — Términos y Condiciones
 */

import React from 'react'
import SEO from '@/components/ui/SEO'
import { useBusiness } from '@/context/BusinessContext'

export default function TermsPage() {
  const { business } = useBusiness()

  return (
    <>
      <SEO title="Términos y Condiciones" />
      <article className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8">
          Términos y Condiciones
        </h1>
        <p className="text-text-muted mb-6">
          Al usar los servicios de <strong>{business.name}</strong>, aceptas los siguientes términos.
        </p>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-3 mt-8">
          1. Reservaciones
        </h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Las reservaciones quedan confirmadas únicamente con la respuesta escrita de {business.name}.
          El tiempo de tolerancia es de 15 minutos. Pasado ese tiempo, la mesa puede ser asignada a otro cliente.
        </p>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-3 mt-8">
          2. Cancelaciones
        </h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Las cancelaciones deben realizarse con mínimo 2 horas de anticipación. Eventos privados
          requieren cancelación con 48 horas de anticipación.
        </p>
        <p className="text-text-muted text-sm mt-12">
          Última actualización: enero 2025. {business.legalName}. {business.rfc}.
        </p>
      </article>
    </>
  )
}
