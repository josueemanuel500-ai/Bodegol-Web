/**
 * generate-sitemap.mjs — writes public/sitemap.xml
 * Run: npm run sitemap   (also safe to run before build)
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const SITE = 'https://bodegol.com.mx'
const routes = [
  { path: '/',                         priority: '1.0', changefreq: 'weekly'  },
  { path: '/canchas',                  priority: '0.9', changefreq: 'weekly'  },
  { path: '/reservaciones',            priority: '0.9', changefreq: 'weekly'  },
  { path: '/ver-partidos-en-merida',   priority: '0.9', changefreq: 'weekly'  },
  { path: '/torneo-veteranos-35-merida', priority: '0.9', changefreq: 'weekly' },
  { path: '/torneo-femenil-merida',      priority: '0.9', changefreq: 'weekly' },
  { path: '/menu',                     priority: '0.8', changefreq: 'monthly' },
  { path: '/promociones',              priority: '0.8', changefreq: 'weekly'  },
  { path: '/paquetes',                 priority: '0.7', changefreq: 'monthly' },
  { path: '/galeria',                  priority: '0.6', changefreq: 'monthly' },
  { path: '/faq',                      priority: '0.6', changefreq: 'monthly' },
  { path: '/privacidad',               priority: '0.3', changefreq: 'yearly'  },
  { path: '/terminos',                 priority: '0.3', changefreq: 'yearly'  },
]

const today = process.env.SITEMAP_DATE || new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml')
writeFileSync(out, xml)
console.log('sitemap.xml generated →', out)
