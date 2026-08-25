import React from 'react'
import { CheckCircle2, MessageCircle, Trophy, Users } from 'lucide-react'
import SEO from '@/components/ui/SEO'
import Button from '@/components/buttons/Button'
import { buildWhatsAppUrl } from '@/utils/format'

const WHATSAPP_URL = buildWhatsAppUrl('529999062061', 'Información para el torneo de veteranos')

const prizes = [
  'Primer lugar: $2,000 en efectivo y $1,000 en consumo',
  'Segundo lugar: $1,000 en vale de consumo',
  'Trofeo para el equipo campeón',
  'Trofeo al campeón goleador',
  'Trofeo al portero con menos goles recibidos',
]

export default function TorneoVeteranosPage() {
  return (
    <>
      <SEO
        title="Torneo Bodegol 35+ — Fútbol en Mérida"
        description="Inscríbete al Torneo Bodegol de Veteranos 35+, uno de nuestros torneos de fútbol 5 vs 5 en Mérida. Consulta premios, inscripción y solicita información por WhatsApp."
        image="/images/promotions/torneo-veteranos-35.jpg"
        imageAlt="Torneo de Veteranos 35+ de fútbol 5 vs 5 en Mérida"
        path="/torneo-veteranos-35-merida"
      />

      <div className="pt-[var(--nav-height)]">
        <section className="relative overflow-hidden border-b border-line bg-background py-14 sm:py-20" aria-labelledby="torneo-title">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,105,15,0.55), transparent 48%)' }} aria-hidden="true" />
          <div className="site-container relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="t-label mb-4 text-primary">Torneos de fútbol en Mérida · Inscripciones abiertas</p>
              <h1 id="torneo-title" className="t-hero-title text-white">Torneo Bodegol de Veteranos 35+</h1>
              <p className="mt-5 max-w-2xl font-ui text-lg leading-relaxed text-content-secondary">
                El Torneo Bodegol forma parte de nuestros torneos de fútbol en Mérida. Esta edición está dirigida a jugadores veteranos de 35 años o más y se juega en formato de fútbol 5 contra 5. Iniciamos en septiembre y la inscripción es de <strong className="text-white">$3,000 por equipo</strong>.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg">
                  Pedir información del torneo
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-4"><Users className="text-primary" aria-hidden="true" /><div><p className="font-ui font-bold text-white">Categoría 35+</p><p className="text-sm text-content-muted">Formato 5 contra 5</p></div></div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-4"><Trophy className="text-primary" aria-hidden="true" /><div><p className="font-ui font-bold text-white">Premios y trofeos</p><p className="text-sm text-content-muted">Para equipos y jugadores</p></div></div>
              </div>
            </div>
            <img src="/images/promotions/torneo-veteranos-35.jpg" alt="Convocatoria del Torneo Bodegol de Veteranos 35+, fútbol 5 vs 5 en Mérida" width="1600" height="900" className="w-full rounded-2xl border border-primary/30 shadow-card-lg" />
          </div>
        </section>

        <section className="section-padding bg-surface" aria-labelledby="premios-title">
          <div className="site-container grid gap-10 lg:grid-cols-2">
            <div>
              <p className="t-label mb-3 text-primary">Premiación</p>
              <h2 id="premios-title" className="t-section-title text-white">Compite por el campeonato</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {prizes.map((prize) => <li key={prize} className="flex gap-3 font-ui text-content-secondary"><CheckCircle2 size={19} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />{prize}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/25 bg-background p-7 sm:p-9">
              <p className="t-label text-primary">Registro de equipos</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase text-white">$3,000 por equipo</h2>
              <p className="mt-4 font-ui leading-relaxed text-content-secondary">Cupo sujeto a disponibilidad. Solicita requisitos, calendario y proceso de inscripción directamente por WhatsApp.</p>
              <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg" fullWidth className="mt-7">
                Información para el torneo de veteranos
              </Button>
              <a href="tel:+529999062061" className="mt-4 block text-center font-ui text-sm font-semibold text-content-secondary hover:text-primary">999 906 2061</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
