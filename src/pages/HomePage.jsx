/**
 * HomePage.jsx — Bodegol landing experience
 *
 * Designed as ONE story, not isolated sections. Each block hands the visitor
 * to the next, building toward the final reservation call-to-action:
 *
 *   Hero → Why Bodegol → Sports Experience → Food & Drinks → Promotions →
 *   Packages → Events → Testimonials → Gallery → FAQ → Contact → Reservation CTA
 *
 * Architecture untouched: sections read their own data files; Footer renders in MainLayout.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Hero from '@/components/sections/Hero'
import Highlights from '@/components/sections/Highlights'      // "Why Bodegol"
import Fields from '@/components/sections/Fields'              // Sports Experience
import MenuSection from '@/components/sections/Menu'           // Food & Drinks
import Promotions from '@/components/sections/Promotions'
import Packages from '@/components/sections/Packages'
import Events from '@/components/sections/Events'
import Testimonials from '@/components/sections/Testimonials'
import Gallery from '@/components/sections/Gallery'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import ReservationCTA from '@/components/sections/ReservationCTA'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Canchas de Fútbol 7, Comida y Eventos en Mérida"
        description="Bodegol: 6 canchas de fútbol 7, pantallas gigantes, bar y restaurante en Mérida, Yucatán. Reserva tu cancha o mesa por WhatsApp al instante."
      />
      <Hero />
      <Highlights />
      <Fields />
      <MenuSection />
      <Promotions />
      <Packages />
      <Events />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <ReservationCTA />
    </>
  )
}
