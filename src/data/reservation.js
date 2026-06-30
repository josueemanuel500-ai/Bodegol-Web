/**
 * reservation.js — Reservation Section Configuration
 *
 * ─── EDITABLE FIELDS ──────────────────────────────────────────────────────
 * heading         Section title and subtitle
 * timeSlots       Available time slots shown in the dropdown
 * guestOptions    Guest count options shown in the dropdown
 * occasions       Occasion type options (birthday, corporate, etc.)
 * fields          Form field configuration (label, placeholder, required)
 * successMessage  Message shown after successful reservation submission
 * whatsappFallback When reservationSystem feature is disabled, this WhatsApp
 *                  message is used for the CTA button instead
 *
 * INTEGRATION NOTE:
 *   When siteConfig.features.reservationSystem = true, the form POSTs to
 *   the API endpoint defined in services/reservation.service.js.
 *   When false, the CTA redirects to WhatsApp with a pre-filled message.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const reservationConfig = {
  heading: {
    eyebrow:  'Reservaciones',
    title:    'Asegura tu mesa',
    subtitle: 'Reserva en menos de 2 minutos. Confirmación inmediata por WhatsApp.',
  },

  // Time slots shown in the selector
  timeSlots: [
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00',
  ],

  // Number of guests dropdown options
  guestOptions: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20],

  // Occasion types
  occasions: [
    { value: '',             label: 'Selecciona una ocasión' },
    { value: 'casual',       label: 'Visita casual' },
    { value: 'birthday',     label: 'Cumpleaños' },
    { value: 'corporate',    label: 'Reunión de trabajo' },
    { value: 'anniversary',  label: 'Aniversario' },
    { value: 'bachelor',     label: 'Despedida de soltero/a' },
    { value: 'sports',       label: 'Ver partido' },
    { value: 'other',        label: 'Otro' },
  ],

  // Form field metadata
  fields: {
    name: {
      label:        'Nombre completo',
      placeholder:  'Tu nombre',
      required:     true,
    },
    phone: {
      label:        'Teléfono / WhatsApp',
      placeholder:  '999 123 4567',
      required:     true,
    },
    email: {
      label:        'Correo electrónico',
      placeholder:  'tu@correo.com',
      required:     false,
    },
    date: {
      label:        'Fecha',
      required:     true,
    },
    time: {
      label:        'Hora',
      required:     true,
    },
    guests: {
      label:        'Número de personas',
      required:     true,
    },
    occasion: {
      label:        'Ocasión',
      required:     false,
    },
    notes: {
      label:        'Notas especiales',
      placeholder:  'Alergias, preferencias, decoración...',
      required:     false,
      rows:         3,
    },
  },

  successMessage: {
    title:    '¡Reservación recibida!',
    body:     'Te contactaremos por WhatsApp en los próximos minutos para confirmar tu mesa.',
    icon:     'CheckCircle2',
  },

  // WhatsApp fallback when reservation system is disabled
  whatsappFallback: {
    label:   'Reservar por WhatsApp',
    message: 'Hola, me gustaría hacer una reservación en Bodegol.',
    source:  'reservation-section',
  },
}

export default reservationConfig
