/**
 * FAQ.jsx — Preguntas frecuentes (acordeón). Content from data/faq.js.
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { faqItems, faqHeading } from '@/data/faq'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/buttons/Button'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border transition-colors duration-200',
      isOpen ? 'border-primary/50 bg-surface' : 'border-line bg-surface hover:border-line-strong')}>
      <button onClick={onToggle} aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
        <span className={cn('font-ui text-base font-semibold leading-snug transition-colors duration-200', isOpen ? 'text-primary' : 'text-content-primary')}>
          {item.question}
        </span>
        <span className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200',
          isOpen ? 'bg-primary text-white' : 'bg-surface-elevated text-content-muted')} aria-hidden="true">
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="border-t border-line px-6 pb-5 pt-4 text-sm leading-relaxed text-content-secondary">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { business } = useBusiness()
  const [openId, setOpenId] = useState(faqItems[0]?.id)
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola! Tengo una pregunta sobre Bodegol.')
  const toggle = (id) => setOpenId((p) => (p === id ? null : id))

  return (
    <SectionWrapper id="faq" background="base">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="faq-heading" eyebrow={faqHeading.eyebrow} title={faqHeading.title} subtitle={faqHeading.subtitle} />
        <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <motion.div key={item.id} variants={ANIMATION.FADE_UP}>
              <AccordionItem item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-7 text-center">
          <p className="font-ui text-sm text-content-secondary">¿No encontraste tu respuesta? Escríbenos y te contestamos al momento.</p>
          <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md" icon={MessageCircle}>
            Preguntar por WhatsApp
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
