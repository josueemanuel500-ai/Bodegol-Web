/**
 * Menu.jsx — Food & Drinks (immersive image cards)
 * Portrait photography, price-on-image, Chip filters, minimal text.
 * Content from data/menu.js.
 *
 * IMAGE per item — recommended: 1200 × 900 px (4:3 horizontal) WebP, máx 300 KB.
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
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* IMAGE — 1200×900 (4:3) WebP, máx 300 KB */}
        <LazyImage src={item.image} alt={item.imageAlt} className="h-full w-full transition-transform duration-[600ms] group-hover:scale-[1.08]" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(3,17,38,0.92) 100%)' }} />
        {tag && <div className="absolute left-3 top-3"><Badge variant={tag.variant}>{tag.label}</Badge></div>}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
          <div className="min-w-0">
            <h3 className="t-card-title text-base text-white">{item.name}</h3>
            <p className="mt-0.5 line-clamp-1 text-xs text-white/60">{item.description}</p>
          </div>
          <p className="flex-shrink-0 font-display text-2xl font-black text-primary">
            {item.price}<span className="ml-0.5 font-ui text-[0.6rem] font-normal text-white/60">MXN</span>
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function MenuSection() {
  const { business } = useBusiness()
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? menuItems.filter((i) => i.available) : menuItems.filter((i) => i.available && i.category === active)
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola! Quiero ver el menú completo de Bodegol.')

  return (
    <SectionWrapper id="menu" background="base" glow>
      <SectionHeading id="menu-heading" eyebrow={menuHeading.eyebrow} title={menuHeading.title} subtitle={menuHeading.subtitle} />
      <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtrar menú por categoría">
        {menuCategories.map((cat) => (
          <Chip key={cat.id} selected={active === cat.id} onClick={() => setActive(cat.id)}>{cat.label}</Chip>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
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
