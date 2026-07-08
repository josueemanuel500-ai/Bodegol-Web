/**
 * WhatsAppButton.jsx — WhatsApp CTA Button
 *
 * Specialized button that opens a WhatsApp conversation with a pre-filled message.
 * Reads business.contact.whatsapp from BusinessContext.
 * Tracks clicks via AnalyticsContext.
 *
 * Props:
 *   message   string — override the default message from business.js
 *   source    string — analytics source label (e.g. 'hero', 'packages', 'footer')
 *   label     string — button text (default: 'Escribir por WhatsApp')
 *   size      passed through to Button
 *   variant   passed through to Button
 */

import React from 'react'
import { MessageCircle } from 'lucide-react'
import Button from './Button'
import { useBusiness } from '@/context/BusinessContext'
import { useAnalytics } from '@/context/AnalyticsContext'

export default function WhatsAppButton({
  message,
  source = 'unknown',
  label  = 'Escribir por WhatsApp',
  size   = 'md',
  variant= 'primary',
  className = '',
  ...rest
}) {
  const { business }  = useBusiness()
  const analytics     = useAnalytics()

  const whatsappMessage = encodeURIComponent(
    message || business.contact.whatsappMessage
  )
  const whatsappUrl = `https://wa.me/${business.contact.whatsapp}?text=${whatsappMessage}`

  const handleClick = () => {
    analytics.whatsappClick(source)
  }

  return (
    <Button
      as="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      icon={MessageCircle}
      onClick={handleClick}
      className={className}
      aria-label={`${label} — abre WhatsApp en nueva pestaña`}
      {...rest}
    >
      {label}
    </Button>
  )
}
