/**
 * social.js - Social Media Links
 */

export const socialLinks = [
  {
    id:       'instagram',
    platform: 'Instagram',
    label:    'Bodegol en Instagram',
    href:     'https://www.instagram.com/bodegol_merida',
    icon:     'Instagram',
    active:   true,
  },
  {
    id:       'facebook',
    platform: 'Facebook',
    label:    'Bodegol en Facebook',
    href:     'https://www.facebook.com/bodegolmerida',
    icon:     'Facebook',
    active:   true,
  },
  {
    id:       'tiktok',
    platform: 'TikTok',
    label:    'Bodegol en TikTok',
    href:     '',
    icon:     'Music2',
    active:   false,
  },
]

export const activeSocial = socialLinks.filter(s => s.active)
export default socialLinks
