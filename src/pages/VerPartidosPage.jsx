import React from 'react'
import { MessageCircle, MapPin, Tv2, UtensilsCrossed } from 'lucide-react'
import SEO from '@/components/ui/SEO'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Button from '@/components/buttons/Button'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'

export default function VerPartidosPage() {
  const { business } = useBusiness()
  const whatsappUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola Bodegol! Quiero reservar una mesa para ver un partido. ¿Me comparten disponibilidad?'
  )

  return (
    <>
      <SEO
        title="Dónde ver partidos de fútbol en Mérida"
        description="Disfruta los partidos de fútbol en Mérida con pantallas gigantes, comida, bebidas y ambiente deportivo en Bodegol. Reserva tu mesa por WhatsApp."
        path="/ver-partidos-en-merida"
      />

      <main className="pt-[var(--nav-height)]">
        <section
          className="relative overflow-hidden border-b border-line bg-background py-20 sm:py-28"
          aria-labelledby="ver-partidos-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{ background: 'radial-gradient(circle at 50% 10%, rgba(255,105,15,0.32), transparent 45%)' }}
            aria-hidden="true"
          />
          <div className="site-container relative text-center">
            <p className="t-label mb-4 text-primary">Fútbol en vivo · Mérida, Yucatán</p>
            <h1 id="ver-partidos-heading" className="t-section-title mx-auto max-w-4xl text-white">
              El lugar para ver partidos de fútbol en Mérida
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-ui text-base leading-relaxed text-content-secondary sm:text-lg">
              Vive cada gol en pantallas gigantes, disfruta comida y bebidas, y comparte el mejor ambiente
              deportivo con tus amigos en Bodegol.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                as="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                icon={MessageCircle}
              >
                Reservar una mesa
              </Button>
              <Button
                as="a"
                href={business.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={MapPin}
              >
                Cómo llegar
              </Button>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                { icon: Tv2, text: 'Pantallas de alta definición' },
                { icon: UtensilsCrossed, text: 'Comida y bebidas' },
                { icon: MapPin, text: 'Zona Industrial de Mérida' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/70 p-4 text-content-secondary">
                  <Icon size={18} className="text-primary" aria-hidden="true" />
                  <span className="font-ui text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <Testimonials />
      </main>
    </>
  )
}
