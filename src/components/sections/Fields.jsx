/**
 * Fields.jsx — Soccer Fields Section
 * Shows Bodegol's canchas with prices, features, and WhatsApp reservation CTA.
 * Content from src/data/fields.js
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Users, Star, MessageCircle } from 'lucide-react'
import { fields, fieldsHeading } from '@/data/fields'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper  from '@/components/ui/SectionWrapper'
import SectionHeading  from '@/components/ui/SectionHeading'
import LazyImage       from '@/components/ui/LazyImage'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Fields() {
  const { business } = useBusiness()
  const [activeField, setActiveField] = useState(fields[0].id)
  const selected = fields.find(f => f.id === activeField) || fields[0]

  const waUrl = (msg) => buildWhatsAppUrl(business.contact.whatsapp, msg)

  const bookingMessage = `¡Hola! Quiero reservar la ${selected.name} en Bodegol. ¿Tienen disponibilidad?`

  return (
    <SectionWrapper id="canchas" background="base">
      <SectionHeading
        id="canchas-heading"
        eyebrow={fieldsHeading.eyebrow}
        title={fieldsHeading.title}
        subtitle={fieldsHeading.subtitle}
      />

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">

        {/* ── Field Selector Tabs (left column on desktop) ───── */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => setActiveField(field.id)}
              className={cn(
                'flex-shrink-0 lg:flex-shrink text-left px-4 py-4 rounded-xl border transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                activeField === field.id
                  ? 'bg-brand-primary/10 border-brand-primary/50 text-text-primary'
                  : 'bg-surface-elevated border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-sm leading-tight">
                    {field.name}
                  </p>
                  <p className={cn(
                    'text-xs mt-0.5 font-ui',
                    activeField === field.id ? 'text-brand-primary' : 'text-text-muted'
                  )}>
                    {field.price}
                  </p>
                </div>
                {field.featured && (
                  <Star size={14} className="text-brand-accent flex-shrink-0 mt-0.5 fill-brand-accent" aria-hidden="true" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* ── Field Detail Panel (right) ──────────────────────── */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-3 bg-surface-elevated border border-border-default rounded-2xl overflow-hidden"
        >
          {/* Image */}
          <LazyImage
            src={selected.image}
            alt={selected.imageAlt}
            aspectRatio="landscape"
            className="w-full"
          />

          {/* Content */}
          <div className="p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-xl text-text-primary">{selected.name}</h3>
                <p className="text-text-secondary text-sm mt-1 leading-relaxed">{selected.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-brand-primary font-display font-bold text-xl">{selected.price}</p>
                <p className="text-text-muted text-xs">{selected.priceNote}</p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Users, label: selected.capacity },
                { icon: CheckCircle2, label: selected.surface },
                { icon: Clock, label: 'Mín. 1 hora' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-raised text-center">
                  <Icon size={16} className="text-brand-primary" aria-hidden="true" />
                  <span className="text-xs text-text-secondary font-ui leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="grid grid-cols-2 gap-2" aria-label={`Características de ${selected.name}`}>
              {selected.features.map(feat => (
                <li key={feat} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 size={14} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={waUrl(bookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl',
                'bg-brand-primary hover:bg-brand-primary-dark text-white',
                'font-ui font-bold text-sm transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
              )}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Reservar {selected.name} por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
