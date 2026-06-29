/**
 * FAQ.jsx — Frequently Asked Questions Section (accordion)
 * Content from src/data/faq.js
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { faqItems, faqHeading } from '@/data/faq'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={cn(
      'border rounded-xl overflow-hidden transition-colors duration-200',
      isOpen ? 'border-brand-primary/50 bg-surface-elevated' : 'border-border-default bg-surface-elevated hover:border-border-strong'
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
        aria-expanded={isOpen}
      >
        <span className={cn(
          'font-ui font-semibold text-sm leading-snug transition-colors duration-200',
          isOpen ? 'text-brand-primary' : 'text-text-primary'
        )}>
          {item.question}
        </span>
        <span className={cn(
          'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200',
          isOpen ? 'bg-brand-primary text-white' : 'bg-surface-raised text-text-muted'
        )} aria-hidden="true">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border-default pt-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { business } = useBusiness()
  const [openId, setOpenId] = useState(faqItems[0]?.id)

  const waUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola! Tengo una pregunta sobre Bodegol.'
  )

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  return (
    <SectionWrapper id="faq" background="base">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          id="faq-heading"
          eyebrow={faqHeading.eyebrow}
          title={faqHeading.title}
          subtitle={faqHeading.subtitle}
        />

        <motion.div
          variants={ANIMATION.STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-3"
        >
          {faqItems.map(item => (
            <motion.div key={item.id} variants={ANIMATION.FADE_UP}>
              <AccordionItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Fallback CTA */}
        <motion.div
          variants={ANIMATION.FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center p-6 rounded-2xl bg-surface-elevated border border-border-default"
        >
          <p className="text-text-secondary text-sm mb-4 font-ui">
            ¿No encontraste tu respuesta? Escríbenos y te contestamos al momento.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2.5 px-6 py-3 rounded-xl',
              'bg-brand-primary hover:bg-brand-primary-dark text-white',
              'font-ui font-bold text-sm transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
            )}
          >
            <MessageCircle size={17} aria-hidden="true" />
            Preguntar por WhatsApp
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
