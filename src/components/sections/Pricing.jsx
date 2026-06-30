/**
 * Pricing.jsx — Field Rental Pricing (premium cinematic cards)
 * Content from data/pricing.js. WhatsApp reservation CTA.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle, Star } from 'lucide-react'
import { pricingPlans, pricingHeading } from '@/data/pricing'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/buttons/Button'
import Badge from '@/components/ui/Badge'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Pricing() {
  const { business } = useBusiness()
  return (
    <SectionWrapper id="pricing" background="elevated" glow>
      <SectionHeading id="pricing-heading" eyebrow={pricingHeading.eyebrow} title={pricingHeading.title} subtitle={pricingHeading.subtitle} />
      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {pricingPlans.map((plan) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, plan.cta.message)
          const hot = plan.popular
          return (
            <motion.article key={plan.id} variants={ANIMATION.FADE_UP}
              className={cn('relative flex flex-col gap-6 overflow-hidden rounded-3xl border p-8 transition-all duration-300',
                hot ? 'border-primary/50 shadow-glow-primary md:-translate-y-2' : 'border-line bg-background shadow-card hover:-translate-y-1 hover:shadow-card-lg')}
              style={hot ? { background: 'linear-gradient(160deg, var(--surface) 0%, var(--background) 100%)' } : undefined}>
              {hot && <div className="absolute right-5 top-5"><Badge variant="primary" icon={Star}>Más popular</Badge></div>}
              <h3 className="t-card-title text-xl">{plan.name}</h3>
              <div className="flex flex-col gap-3">
                {plan.tiers.map((t, i) => (
                  <div key={t.label} className={cn('flex items-end justify-between gap-3 rounded-2xl border bg-surface-elevated px-5 py-4',
                    i === 0 && hot ? 'border-primary/40' : 'border-line')}>
                    <span className="font-ui text-sm text-content-secondary">{t.label}</span>
                    <span className="font-display text-4xl font-black leading-none text-primary">
                      {t.price}<span className="ml-1 align-baseline font-ui text-xs font-normal text-content-muted">{t.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
              <ul className="flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-content-secondary">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />{f}
                  </li>
                ))}
              </ul>
              <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer" variant={hot ? 'primary' : 'outline'} size="lg" icon={MessageCircle} fullWidth>
                {plan.cta.label}
              </Button>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
