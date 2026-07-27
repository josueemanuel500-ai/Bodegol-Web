/**
 * PaquetesPage.jsx — Paquetes de fiestas y eventos.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Packages from '@/components/sections/Packages'

export default function PaquetesPage() {
  return (
    <>
      <SEO
        title="Paquetes de Fiestas y Eventos"
        description="Organiza tu fiesta o evento deportivo en Bodegol, Mérida — paquetes para cumpleaños y torneos."
        path="/paquetes"
      />
      <div className="pt-[var(--nav-height)]">
        <Packages />
      </div>
    </>
  )
}
