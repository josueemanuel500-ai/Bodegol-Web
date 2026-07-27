/**
 * FaqPage.jsx — Preguntas frecuentes + contacto.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function FaqPage() {
  return (
    <>
      <SEO
        title="Preguntas Frecuentes y Contacto"
        description="Resuelve tus dudas sobre canchas, reservaciones y horarios en Bodegol, Mérida. También puedes contactarnos directamente."
        path="/faq"
      />
      <div className="pt-[var(--nav-height)]">
        <FAQ />
        <Contact />
      </div>
    </>
  )
}
