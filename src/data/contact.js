/**
 * contact.js — Contact Section Configuration
 *
 * Controls the content displayed in the Contact section: cards, form fields, CTAs.
 * The actual business phone/email/address come from business.js.
 * This file controls HOW the contact section is displayed.
 */

// Contact method cards (visible alongside the form)
export const contactMethods = [
  {
    id:      'whatsapp',
    icon:    'MessageCircle',
    title:   'WhatsApp',
    value:   '+52 999 123 4567',
    action:  'Enviar mensaje',
    href:    null,   // null = build dynamically from business.contact.whatsapp
    type:    'whatsapp',
    primary: true,
  },
  {
    id:      'phone',
    icon:    'Phone',
    title:   'Teléfono',
    value:   '+52 999 123 4567',
    action:  'Llamar ahora',
    href:    null,   // built from business.contact.phoneTel
    type:    'tel',
    primary: false,
  },
  {
    id:      'email',
    icon:    'Mail',
    title:   'Correo',
    value:   'contacto@bodegol.mx',
    action:  'Enviar correo',
    href:    null,   // built from business.contact.email
    type:    'email',
    primary: false,
  },
  {
    id:      'location',
    icon:    'MapPin',
    title:   'Ubicación',
    value:   'Calle 60 Norte #123, Mérida',
    action:  'Ver en mapa',
    href:    null,   // built from business.location.mapsUrl
    type:    'maps',
    primary: false,
  },
]

// Contact form fields configuration
export const contactFormFields = [
  {
    id:          'name',
    type:        'text',
    label:       'Nombre completo',
    placeholder: 'Tu nombre',
    required:    true,
    autoComplete:'name',
  },
  {
    id:          'phone',
    type:        'tel',
    label:       'Teléfono / WhatsApp',
    placeholder: '999 123 4567',
    required:    true,
    autoComplete:'tel',
  },
  {
    id:          'email',
    type:        'email',
    label:       'Correo electrónico',
    placeholder: 'tu@correo.com',
    required:    false,
    autoComplete:'email',
  },
  {
    id:          'message',
    type:        'textarea',
    label:       'Mensaje',
    placeholder: '¿En qué podemos ayudarte?',
    required:    true,
    rows:        4,
  },
]

export default contactMethods
