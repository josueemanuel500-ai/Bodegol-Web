/**
 * PrivacyPage.jsx — Aviso de Privacidad
 *
 * Static legal page. Content comes from data or CMS in the future.
 * Currently rendered as static text — replace with a fetched document
 * when a CMS or Supabase document store is integrated.
 */

import React from 'react'
import SEO from '@/components/ui/SEO'
import { useBusiness } from '@/context/BusinessContext'

export default function PrivacyPage() {
  const { business } = useBusiness()

  return (
    <>
      <SEO title="Aviso de Privacidad" />
      <article className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8">
          Aviso de Privacidad
        </h1>
        <p className="text-text-muted mb-6">
          <strong>{business.legalName}</strong> con RFC {business.rfc}, con domicilio en {business.location.fullAddress},
          es responsable del tratamiento de sus datos personales.
        </p>
        <p className="text-text-secondary leading-relaxed mb-6">
          Los datos personales que recabamos serán utilizados para: procesar reservaciones,
          comunicarnos con usted respecto a nuestros servicios, y enviar información de promociones
          (únicamente si usted lo autoriza).
        </p>
        <p className="text-text-secondary leading-relaxed mb-6">
          Para ejercer sus derechos ARCO (Acceso, Rectificación, Cancelación u Oposición),
          puede contactarnos en {business.contact.email}.
        </p>
        <p className="text-text-muted text-sm">
          Última actualización: enero 2025
        </p>
      </article>
    </>
  )
}
