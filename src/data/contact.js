/**
 * contact.js - Contact Section Configuration
 */

export const contactMethods = [
  {
    id:      'whatsapp',
    icon:    'MessageCircle',
    title:   'WhatsApp',
    value:   '+52 999 566 8248',
    action:  'Enviar mensaje',
    href:    null,
    type:    'whatsapp',
    primary: true,
  },
  {
    id:      'phone',
    icon:    'Phone',
    title:   'Telefono',
    value:   '+52 999 566 8248',
    action:  'Llamar ahora',
    href:    null,
    type:    'tel',
    primary: false,
  },
  {
    id:      'email',
    icon:    'Mail',
    title:   'Correo',
    value:   'reservaciones@bodegol.mx',
    action:  'Enviar correo',
    href:    null,
    type:    'email',
    primary: false,
  },
  {
    id:      'location',
    icon:    'MapPin',
    title:   'Ubicacion',
    value:   'Merida, Yucatan',
    action:  'Ver en mapa',
    href:    null,
    type:    'maps',
    primary: false,
  },
]

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
    label:       'Telefono / WhatsApp',
    placeholder: '999 566 8248',
    required:    true,
    autoComplete:'tel',
  },
  {
    id:          'email',
    type:        'email',
    label:       'Correo electronico',
    placeholder: 'tu@correo.com',
    required:    false,
    autoComplete:'email',
  },
  {
    id:          'message',
    type:        'textarea',
    label:       'Mensaje',
    placeholder: 'En que podemos ayudarte?',
    required:    true,
    rows:        4,
  },
]

export default contactMethods
