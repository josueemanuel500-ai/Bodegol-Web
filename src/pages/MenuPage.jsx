/**
 * MenuPage.jsx — Comida y bebidas.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import MenuSection from '@/components/sections/Menu'

export default function MenuPage() {
  return (
    <>
      <SEO
        title="Menú"
        description="Comida y bebidas en Bodegol, Mérida — disfruta mientras juegas o esperas tu turno."
        path="/menu"
      />
      <div className="pt-[var(--nav-height)]">
        <MenuSection />
      </div>
    </>
  )
}
