/**
 * Fields.jsx — Football Fields (cinematic, image-led)
 * Big immersive photo of the selected field + premium spec panel + feature strip.
 * Content from data/fields.js. Interaction & data API preserved.
 *
 * IMAGE per field — recommended: 1200 × 900 px (4:3 horizontal) WebP, máx 300 KB.
 *   field.image → public/images/fields/<id>.jpg
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Users, Star, MessageCircle, Lightbulb, Layers } from 'lucide-react'
import { fields, fieldsHeading } from '@/data/fields'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Button from '@/components/buttons/Button'
import { cn } from '@/utils/cn'

const STRIP = [
  { icon: Layers, label: 'Pasto sintético' },
  { icon: Lightbulb, label: 'Iluminación LED' },
  { icon: Users, label: 'Fútbol 5 vs 5' },
  { icon: Star, label: '5 canchas' },
]

export default function Fields() {
  const { business } = useBusiness()
  const [activeField, setActiveField] = useState(fields[0].id)
  const selected = fields.find((f) => f.id === activeField) || fields[0]
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp,
    selected.reservationMessage || `¡Hola! Quiero reservar la ${selected.name} en Bodegol. ¿Tienen disponibilidad?`)

  return (
    <SectionWrapper id="canchas" background="elevated" glow>
      <SectionHeading id="canchas-heading" eyebrow={fieldsHeading.eyebrow} title={fieldsHeading.title} subtitle={fieldsHeading.subtitle} />

      {/* Feature strip */}
      <div className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {STRIP.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2 text-content-secondary">
            <Icon size={17} strokeWidth={2} className="text-primary" aria-hidden="true" />
            <span className="font-ui text-sm">{label}</span>
          </span>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-10">
        {/* Selector */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {fields.map((field) => (
            <button key={field.id} onClick={() => setActiveField(field.id)}
              className={cn(
                'group flex-shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-200 lg:flex-shrink',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                activeField === field.id ? 'border-primary/50 bg-primary/10' : 'border-line bg-background/40 hover:border-line-strong'
              )}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-display text-base font-bold uppercase tracking-wide text-content-primary">{field.name}</p>
                  <p className={cn('mt-0.5 font-ui text-xs', activeField === field.id ? 'text-primary' : 'text-content-muted')}>{field.price}</p>
                </div>
                {field.featured && <Star size={15} className="flex-shrink-0 fill-primary text-primary" aria-hidden="true" />}
              </div>
            </button>
          ))}
        </div>

        {/* Immersive detail */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-line bg-background shadow-card-lg lg:col-span-3">
          <div className="relative">
            {/* IMAGE — 1200×900 (4:3) WebP, máx 300 KB */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <LazyImage src={selected.image} alt={selected.imageAlt} priority className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(3,17,38,0.95) 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
              <div>
                {selected.featured && <span className="t-label mb-1 block text-primary">Más solicitada</span>}
                <h3 className="t-card-title text-3xl text-white">{selected.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-black leading-none text-primary">{selected.price}</p>
                <p className="mt-1 text-xs text-white/70">{selected.priceNote}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-7">
            <p className="t-card-body">{selected.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ icon: Users, label: selected.capacity }, { icon: Layers, label: selected.surface }, { icon: Clock, label: 'Mín. 1 hora' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-surface-elevated p-3 text-center">
                  <Icon size={18} className="text-primary" strokeWidth={2} aria-hidden="true" />
                  <span className="font-ui text-xs leading-tight text-content-secondary">{label}</span>
                </div>
              ))}
            </div>
            <ul className="grid grid-cols-2 gap-2.5" aria-label={`Características de ${selected.name}`}>
              {selected.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-content-secondary">
                  <CheckCircle2 size={15} className="flex-shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />{feat}
                </li>
              ))}
            </ul>
            <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" icon={MessageCircle} fullWidth>
              Reservar {selected.name}
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
