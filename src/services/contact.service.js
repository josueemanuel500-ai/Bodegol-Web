/**
 * contact.service.js — Contact Form Service
 *
 * Handles contact form submission.
 * Currently: sends via WhatsApp redirect (no backend required).
 * Future: can POST to an email API, Supabase function, or Raven backend.
 */

import api from './api.service'
import siteConfig from '@/config/site.config'
import { buildWhatsAppUrl } from '@/utils/format'

class ContactService {
  /**
   * Submit a contact form.
   * Strategy depends on what's available:
   *   1. If API is enabled → POST to /contact
   *   2. Otherwise → open WhatsApp with form data pre-filled
   *
   * @param {Object} data - { name, phone, email, message }
   * @param {string} whatsappNumber
   * @returns {Promise<{ method: 'api'|'whatsapp', url?: string }>}
   */
  async submit(data, whatsappNumber) {
    if (siteConfig.isDev) {
      console.log('[ContactService] submit:', data)
      await new Promise((res) => setTimeout(res, 800))

      // In dev, simulate WhatsApp redirect
      const url = this._buildWhatsAppMessage(data, whatsappNumber)
      return { method: 'whatsapp', url }
    }

    // Try API first; fall back to WhatsApp
    try {
      const result = await api.post('/contact', data)
      return { method: 'api', result }
    } catch {
      const url = this._buildWhatsAppMessage(data, whatsappNumber)
      return { method: 'whatsapp', url }
    }
  }

  _buildWhatsAppMessage(data, number) {
    const lines = [
      `*Mensaje desde el sitio web*`,
      `Nombre: ${data.name}`,
      `Teléfono: ${data.phone}`,
      data.email   ? `Correo: ${data.email}` : null,
      `Mensaje: ${data.message}`,
    ].filter(Boolean)

    return buildWhatsAppUrl(number, lines.join('\n'))
  }
}

export const contactService = new ContactService()
export default contactService
