/**
 * social.js — Social Media Links
 * ✏️  Update hrefs with real social profiles.
 */

export const socialLinks = [
  {
    id:       'instagram',
    platform: 'Instagram',
    label:    'Bodegol en Instagram',
    href:     'https://instagram.com/bodegol.mx',
    icon:     'Instagram',
    active:   true,
  },
  {
    id:       'facebook',
    platform: 'Facebook',
    label:    'Bodegol en Facebook',
    href:     'https://facebook.com/bodegol.mx',
    icon:     'Facebook',
    active:   true,
  },
  {
    id:       'tiktok',
    platform: 'TikTok',
    label:    'Bodegol en TikTok',
    href:     'https://tiktok.com/@bodegol.mx',
    icon:     'Music2',
    active:   true,
  },
]

export const activeSocial = socialLinks.filter(s => s.active)
export default socialLinks
