/**
 * social.js — Social Media Links
 * ✏️  Update hrefs with real social profiles.
 */

export const socialLinks = [
  {
    id:       'instagram',
    platform: 'Instagram',
    label:    'Bodegol Mérida en Instagram',
    href:     'https://www.instagram.com/bodegol_merida/',
    icon:     'Instagram',
    active:   true,
  },
  {
    id:       'facebook',
    platform: 'Facebook',
    label:    'Bodegol Mérida en Facebook',
    href:     'https://www.facebook.com/bodegolmerida',
    icon:     'Facebook',
    active:   true,
  },
  {
    id:       'tiktok',
    platform: 'TikTok',
    label:    'Bodegol Mérida en TikTok',
    href:     'https://www.tiktok.com/@bodegolmerida',
    icon:     'Music2',
    active:   true,
  },
]

export const activeSocial = socialLinks.filter(s => s.active)
export default socialLinks
