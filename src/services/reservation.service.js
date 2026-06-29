/**
 * reservation.service.js — Reservation API Service
 *
 * All reservation-related API calls go through this service.
 * Components never call the API directly.
 *
 * CURRENT STATE: Stub implementation.
 *   - createReservation() logs to console in dev and simulates a 1s delay.
 *   - Replace the stub with real api.post() calls when the backend is ready.
 *
 * INTEGRATION NOTE:
 *   When integrating with Raven POS or a custom backend:
 *   1. Set VITE_API_URL in .env
 *   2. Replace the stub in createReservation() with: return api.post('/reservations', data)
 *   3. The form component doesn't need to change at all.
 */

import api from './api.service'
import siteConfig from '@/config/site.config'
import { buildWhatsAppUrl } from '@/utils/format'

// ─── Types (JSDoc only — no TypeScript) ───────────────────────────────────
/**
 * @typedef {Object} ReservationData
 * @property {string} name
 * @property {string} phone
 * @property {string} [email]
 * @property {string} date       ISO date string
 * @property {string} time       e.g. '20:00'
 * @property {number} guests
 * @property {string} [occasion]
 * @property {string} [notes]
 */

class ReservationService {
  /**
   * Create a new reservation.
   * Returns the created reservation object on success.
   * Throws on failure.
   *
   * @param {ReservationData} data
   */
  async createReservation(data) {
    if (!siteConfig.features.reservationSystem) {
      throw new Error('Reservation system is not enabled.')
    }

    // ── STUB: replace with real API call ──
    if (siteConfig.isDev) {
      console.log('[ReservationService] createReservation (stub):', data)
      await new Promise((res) => setTimeout(res, 1000))
      return { id: `res-${Date.now()}`, status: 'pending', ...data }
    }

    return api.post('/reservations', data)
  }

  /**
   * Build a pre-filled WhatsApp URL for reservation requests.
   * Used as fallback when reservationSystem feature is disabled.
   *
   * @param {ReservationData} data
   * @param {string} whatsappNumber
   */
  buildWhatsAppReservation(data, whatsappNumber) {
    const lines = [
      `*Nueva Reservación*`,
      `Nombre: ${data.name}`,
      `Teléfono: ${data.phone}`,
      `Fecha: ${data.date}`,
      `Hora: ${data.time}`,
      `Personas: ${data.guests}`,
      data.occasion ? `Ocasión: ${data.occasion}` : null,
      data.notes    ? `Notas: ${data.notes}`       : null,
    ].filter(Boolean)

    return buildWhatsAppUrl(whatsappNumber, lines.join('\n'))
  }

  /**
   * Check availability for a given date/time/guests combination.
   * Stub — returns available: true always until backend is integrated.
   */
  async checkAvailability({ date, time, guests }) {
    if (siteConfig.isDev) {
      await new Promise((res) => setTimeout(res, 400))
      return { available: true, remainingSlots: 10 }
    }
    return api.get(`/reservations/availability?date=${date}&time=${time}&guests=${guests}`)
  }
}

export const reservationService = new ReservationService()
export default reservationService
