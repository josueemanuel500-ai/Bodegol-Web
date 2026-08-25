import React from 'react'
import { CheckCircle2, Clock3, MessageCircle, Trophy, Users } from 'lucide-react'
import SEO from '@/components/ui/SEO'
import Button from '@/components/buttons/Button'
import { buildWhatsAppUrl } from '@/utils/format'

const WHATSAPP_URL = buildWhatsAppUrl('529999062061', 'Información para el torneo femenil')

const tournamentDetails = [
  '10 jornadas más liguilla',
  'Dos tiempos de 22 minutos',
  'Máximo 15 jugadoras por equipo',
  'Uniformes con número, al menos en la playera',
  'Espinilleras obligatorias',
  'Tenis o multitaco; no se permiten tachones',
  'Cada equipo debe presentar balón número 4',
]

const prizes = [
  'Primer lugar: trofeo, $2,000 en efectivo y $1,000 en consumo',
  '50% de descuento en la inscripción del siguiente torneo para el primer lugar',
  'Segundo lugar: $1,000 en consumo y 30% de descuento en el siguiente torneo',
  'Trofeo para la campeona goleadora',
  'Trofeo para la portera menos goleada',
]

export default function TorneoFemenilPage() {
  return (
    <>
      <SEO
        title="Torneo Femenil Bodegol — Fútbol 5x5 en Mérida"
        description="Inscríbete al Torneo Femenil Bodegol de fútbol 5x5 en Mérida. Partidos sabatinos de 5 a 7 PM, premios e inscripción de $3,000 por equipo."
        image="/images/promotions/torneo-femenil-sabatino.jpg"
        imageAlt="Torneo Femenil Bodegol de fútbol 5x5 sabatino en Mérida"
        path="/torneo-femenil-merida"
      />

      <div className="pt-[var(--nav-height)]">
        <section className="relative overflow-hidden border-b border-line bg-background py-14 sm:py-20" aria-labelledby="torneo-femenil-title">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 45% 0%, rgba(236,0,117,0.5), transparent 50%)' }} aria-hidden="true" />
          <div className="site-container relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="t-label mb-4 text-primary">Torneo sabatino · Fútbol femenil en Mérida</p>
              <h1 id="torneo-femenil-title" className="t-hero-title text-white">Torneo Femenil Bodegol 5x5</h1>
              <p className="mt-5 max-w-2xl font-ui text-lg leading-relaxed text-content-secondary">
                Forma tu equipo y participa en nuestro torneo femenil libre. Los partidos se juegan los sábados de <strong className="text-white">5 a 7 PM</strong> y la inscripción es de <strong className="text-white">$3,000 por equipo</strong>.
              </p>
              <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg" className="mt-7">
                Solicitar información por WhatsApp
              </Button>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-4"><Users className="text-primary" aria-hidden="true" /><div><p className="font-ui font-bold text-white">Categoría libre</p><p className="text-sm text-content-muted">Formato 5 contra 5</p></div></div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-4"><Clock3 className="text-primary" aria-hidden="true" /><div><p className="font-ui font-bold text-white">Sábados</p><p className="text-sm text-content-muted">De 5 a 7 PM</p></div></div>
              </div>
            </div>
            <img src="/images/promotions/torneo-femenil-sabatino.jpg" alt="Convocatoria del Torneo Femenil Bodegol 5x5 sabatino en Mérida" width="1600" height="900" className="w-full rounded-2xl border border-primary/30 shadow-card-lg" />
          </div>
        </section>

        <section className="section-padding bg-surface" aria-labelledby="detalles-femenil-title">
          <div className="site-container grid gap-10 lg:grid-cols-2">
            <div>
              <p className="t-label mb-3 text-primary">Formato y requisitos</p>
              <h2 id="detalles-femenil-title" className="t-section-title text-white">Todo listo para competir</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {tournamentDetails.map((detail) => <li key={detail} className="flex gap-3 font-ui text-content-secondary"><CheckCircle2 size={19} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />{detail}</li>)}
              </ul>
              <p className="mt-6 font-ui font-semibold text-white">Arbitraje: $300 por partido</p>
            </div>
            <div className="rounded-3xl border border-primary/25 bg-background p-7 sm:p-9">
              <div className="flex items-center gap-3"><Trophy className="text-primary" aria-hidden="true" /><p className="t-label text-primary">Premiación</p></div>
              <ul className="mt-6 flex flex-col gap-3">
                {prizes.map((prize) => <li key={prize} className="flex gap-3 font-ui text-content-secondary"><CheckCircle2 size={19} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />{prize}</li>)}
              </ul>
              <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg" fullWidth className="mt-7">
                Información para el torneo femenil
              </Button>
              <a href="tel:+529999062061" className="mt-4 block text-center font-ui text-sm font-semibold text-content-secondary hover:text-primary">999 906 2061</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
