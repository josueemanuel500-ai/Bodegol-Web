/**
 * Packages.jsx — Birthday & event packages (luxury feel)
 * Large image header per package; makes visitors imagine celebrating here.
 * Content from data/packages.js.
 *
 * IMAGE per package — recommended: 1200 × 900 px (4:3), .webp < 300 KB.
 *   pkg.image → public/images/packages/<id>.jpg
 */
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Users, Clock, Minus } from 'lucide-react'
import { packages, packagesHeading } from '@/data/packages'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import Button from '@/components/buttons/Button'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Packages() {
  const { business } = useBusiness()

  return (
    <SectionWrapper id="packages" background="base">
      <SectionHeading id="packages-heading" eyebrow={packagesHeading.eyebrow} title={packagesHeading.title} subtitle={packagesHeading.subtitle} />

      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
        {packages.map((pkg) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, pkg.cta.message)
          const hot = pkg.highlighted
          return (
            <motion.article key={pkg.id} variants={ANIMATION.FADE_UP}
              className={cn(
                'relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300',
                hot ? 'border-primary/50 shadow-glow-primary md:-translate-y-3' : 'border-line bg-surface shadow-card hover:-translate-y-1 hover:shadow-card-lg'
              )}>
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* IMAGE — 1200×900 (4:3) */}
                <LazyImage src={pkg.image} alt={`Paquete ${pkg.name} en Bodegol`} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.15) 0%, rgba(3,17,38,0.92) 100%)' }} />
                {pkg.badge && <div className="absolute right-4 top-4"><Badge variant="primary">{pkg.badge}</Badge></div>}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="t-card-title text-2xl text-white">{pkg.name}</h3>
                  <p className="mt-0.5 font-ui text-sm text-white/75">{pkg.subtitle}</p>
                </div>
              </div>

              <div className={cn('flex flex-1 flex-col gap-5 p-7', hot && 'bg-surface')}>
                <div>
                  <p className="font-display text-3xl font-black text-primary">{pkg.priceLabel}</p>
                  <p className="font-ui text-xs text-content-muted">{pkg.priceNote}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 font-ui text-xs text-content-secondary">
                    <Users size={14} className="text-primary" strokeWidth={2} aria-hidden="true" />
                    {pkg.maxGuests ? `${pkg.minGuests}–${pkg.maxGuests} personas` : `${pkg.minGuests}+ personas`}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-ui text-xs text-content-secondary">
                    <Clock size={14} className="text-primary" strokeWidth={2} aria-hidden="true" />{pkg.duration}
                  </span>
                </div>
                <ul className="flex flex-1 flex-col gap-2.5">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-content-secondary">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />{feat}
                    </li>
                  ))}
                  {pkg.notIncluded?.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-content-muted">
                      <Minus size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />{feat}
                    </li>
                  ))}
                </ul>
                <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer"
                  variant={hot ? 'primary' : 'outline'} size="lg" icon={MessageCircle} fullWidth>
                  {pkg.cta.label}
                </Button>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
