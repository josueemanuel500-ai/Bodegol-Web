/**
 * Fields.jsx — Sports Experience (canchas)
 * Image-led: large photo of the selected field + premium spec panel.
 * Tab selector keeps it interactive without an icon grid.
 * Content from data/fields.js.
 *
 * IMAGE per field — recommended: 1600 × 1000 px (16:10), .webp < 350 KB.
 *   field.image → public/images/fields/<id>.jpg
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Users, Star, MessageCircle } from 'lucide-react'
import { fields, fieldsHeading } from '@/data/fields'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Button from '@/components/buttons/Button'
import Badge from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export default function Fields() {
  const { business } = useBusiness()
  const [activeField, setActiveField] = useState(fields[0].id)
  const selected = fields.find((f) => f.id === activeField) || fields[0]
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp,
    `¡Hola! Quiero reservar la ${selected.name} en Bodegol. ¿Tienen disponibilidad?`)

  return (
    <SectionWrapper id="canchas" background="elevated">
      <SectionHeading id="canchas-heading" eyebrow={fieldsHeading.eyebrow} title={fieldsHeading.title} subtitle={fieldsHeading.subtitle} />

      <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-10">
        {/* Selector */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {fields.map((field) => (
            <button key={field.id} onClick={() => setActiveField(field.id)}
              className={cn(
                'flex-shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-200 lg:flex-shrink',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                activeField === field.id
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-line bg-background/40 hover:border-line-strong'
              )}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-base font-bold uppercase tracking-wide text-content-primary">{field.name}</p>
                  <p className={cn('mt-0.5 font-ui text-xs', activeField === field.id ? 'text-primary' : 'text-content-muted')}>{field.price}</p>
                </div>
                {field.featured && <Star size={15} className="mt-0.5 flex-shrink-0 fill-primary text-primary" aria-hidden="true" />}
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-3xl border border-line bg-background shadow-card lg:col-span-3">
          <div className="relative">
            {/* IMAGE — 1600×1000 (16:10) */}
            <LazyImage src={selected.image} alt={selected.imageAlt} aspectRatio="landscape" priority className="w-full" />
            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(3,17,38,0.9) 100%)' }} />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <h3 className="t-card-title text-2xl text-white">{selected.name}</h3>
              <div className="text-right">
                <p className="font-display text-2xl font-black text-primary">{selected.price}</p>
                <p className="text-xs text-white/70">{selected.priceNote}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-7">
            <p className="t-card-body">{selected.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ icon: Users, label: selected.capacity }, { icon: CheckCircle2, label: selected.surface }, { icon: Clock, label: 'Mín. 1 hora' }].map(({ icon: Icon, label }) => (
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
