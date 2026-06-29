/**
 * HomePage.jsx — Bodegol Main Landing Page
 *
 * Section order (mirrors the navigation and user journey):
 *   1. Hero          — Full-screen hero with CTA
 *   2. Highlights    — Quick selling points strip
 *   3. Fields        — Soccer fields with prices
 *   4. Menu          — Food & drinks with filter tabs
 *   5. Promotions    — Current deals and offers
 *   6. Packages      — Birthday & event packages
 *   7. Events        — Upcoming matches & events
 *   8. ReservationCTA— WhatsApp reservation banner
 *   9. Gallery       — Photo gallery
 *  10. Testimonials  — Customer reviews
 *  11. FAQ           — Accordion FAQ
 *  12. Contact       — Contact methods + hours + map
 *
 * To reorder: move the component. To hide: comment it out.
 * Footer is rendered by MainLayout, not here.
 */

import React from 'react'
import SEO            from '@/components/ui/SEO'
import Hero           from '@/components/sections/Hero'
import Highlights     from '@/components/sections/Highlights'
import Fields         from '@/components/sections/Fields'
import MenuSection    from '@/components/sections/Menu'
import Promotions     from '@/components/sections/Promotions'
import Packages       from '@/components/sections/Packages'
import Events         from '@/components/sections/Events'
import ReservationCTA from '@/components/sections/ReservationCTA'
import Gallery        from '@/components/sections/Gallery'
import Testimonials   from '@/components/sections/Testimonials'
import FAQ            from '@/components/sections/FAQ'
import Contact        from '@/components/sections/Contact'

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
      <ReservationCTA />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}
