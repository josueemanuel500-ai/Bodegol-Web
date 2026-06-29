/**
 * Menu.jsx — Food & Drinks
 * Elegant image-led cards in a responsive grid; Chip filters; minimal text.
 * Content from data/menu.js.
 *
 * IMAGE per item — recommended: 800 × 800 px (1:1 square), .webp < 200 KB.
 *   item.image → public/images/menu/<id>.jpg
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { menuItems, menuCategories, menuHeading } from '@/data/menu'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import Chip from '@/components/ui/Chip'
import Button from '@/components/buttons/Button'

const TAG_VARIANTS = {
  popular: { variant: 'primary', label: 'Popular' },
  new: { variant: 'success', label: 'Nuevo' },
  spicy: { variant: 'warning', label: 'Picante' },
  vegetarian: { variant: 'success', label: 'Veg' },
}

function MenuItem({ item }) {
  const tag = item.tag ? TAG_VARIANTS[item.tag] : null
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-lg">
      <div className="relative aspect-square overflow-hidden">
        {/* IMAGE — 800×800 (1:1) */}
        <LazyImage src={item.image} alt={item.imageAlt} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.07]" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(3,17,38,0.8) 100%)' }} />
        {tag && <div className="absolute left-3 top-3"><Badge variant={tag.variant}>{tag.label}</Badge></div>}
        <p className="absolute bottom-3 right-3 font-display text-2xl font-black text-white">
          {item.price}<span className="ml-1 font-ui text-xs font-normal text-white/70">MXN</span>
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="t-card-title text-base">{item.name}</h3>
        <p className="line-clamp-2 text-sm leading-snug text-content-muted">{item.description}</p>
      </div>
    </motion.article>
  )
}

export default function MenuSection() {
  const { business } = useBusiness()
  const [active, setActive] = useState('all')
  const filtered = active === 'all'
    ? menuItems.filter((i) => i.available)
    : menuItems.filter((i) => i.available && i.category === active)
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola! Quiero ver el menú completo de Bodegol.')

  return (
    <SectionWrapper id="menu" background="base">
      <SectionHeading id="menu-heading" eyebrow={menuHeading.eyebrow} title={menuHeading.title} subtitle={menuHeading.subtitle} />

      <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtrar menú por categoría">
        {menuCategories.map((cat) => (
          <Chip key={cat.id} selected={active === cat.id} onClick={() => setActive(cat.id)}>{cat.label}</Chip>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => <MenuItem key={item.id} item={item} />)}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="font-ui text-sm text-content-muted">¿Listo para ordenar? Pide directo por WhatsApp.</p>
        <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" icon={MessageCircle}>
          Hacer pedido por WhatsApp
        </Button>
      </div>
    </SectionWrapper>
  )
}
