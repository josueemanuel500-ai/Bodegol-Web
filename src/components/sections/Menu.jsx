/**
 * Menu.jsx — Food & Drinks Section
 * Filterable menu grid with category tabs. WhatsApp CTA to order.
 * Content from src/data/menu.js
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Tag } from 'lucide-react'
import { menuItems, menuCategories, menuHeading } from '@/data/menu'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage      from '@/components/ui/LazyImage'
import Badge          from '@/components/ui/Badge'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const TAG_VARIANTS = {
  popular:     { variant: 'primary',  label: '🔥 Popular' },
  new:         { variant: 'success',  label: '✨ Nuevo'   },
  spicy:       { variant: 'warning',  label: '🌶 Picante' },
  vegetarian:  { variant: 'success',  label: '🥬 Veg'    },
}

function MenuItem({ item }) {
  const tag = item.tag ? TAG_VARIANTS[item.tag] : null

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="group flex gap-4 p-4 rounded-2xl bg-surface-elevated border border-border-default hover:border-border-strong transition-all duration-200"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-surface-raised">
        <LazyImage
          src={item.image}
          alt={item.imageAlt}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-1.5">
        <div>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-display font-bold text-text-primary text-sm leading-tight">
              {item.name}
            </h3>
            {tag && <Badge variant={tag.variant} size="sm">{tag.label}</Badge>}
          </div>
          <p className="text-text-muted text-xs mt-1 leading-snug line-clamp-2">
            {item.description}
          </p>
        </div>
        <p className="font-display font-bold text-brand-primary text-lg">
          {item.price}
          <span className="text-text-muted text-xs font-ui font-normal ml-1">MXN</span>
        </p>
      </div>
    </motion.article>
  )
}

export default function MenuSection() {
  const { business } = useBusiness()
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? menuItems.filter(i => i.available)
    : menuItems.filter(i => i.available && i.category === active)

  const waUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola! Quiero ver el menú completo de Bodegol.'
  )

  return (
    <SectionWrapper id="menu" background="base">
      <SectionHeading
        id="menu-heading"
        eyebrow={menuHeading.eyebrow}
        title={menuHeading.title}
        subtitle={menuHeading.subtitle}
      />

      {/* Category Filter Tabs */}
      <div
        className="flex gap-2 flex-wrap justify-center mb-8"
        role="group"
        aria-label="Filtrar menú por categoría"
      >
        {menuCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            aria-pressed={active === cat.id}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-ui font-medium transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              active === cat.id
                ? 'bg-brand-primary text-white shadow-glow-green'
                : 'bg-surface-elevated text-text-secondary border border-border-default hover:border-border-strong hover:text-text-primary'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="text-text-muted text-sm font-ui">
          ¿Ves algo que te llama la atención? Pide directamente desde WhatsApp.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl',
            'bg-brand-primary hover:bg-brand-primary-dark text-white',
            'font-ui font-bold text-sm transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base'
          )}
        >
          <MessageCircle size={18} aria-hidden="true" />
          Hacer pedido por WhatsApp
        </a>
      </div>
    </SectionWrapper>
  )
}
