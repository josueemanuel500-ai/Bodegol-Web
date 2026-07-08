# ✅ LAUNCH_CHECKLIST — Bodegol

Checklist para el lanzamiento final. Reemplaza placeholders y valida todo
**primero en `dev.bodegol.com.mx`** y, tras aprobar, en producción.
Detalle de tamaños de imagen: ver **IMAGE_GUIDE.md**.

---

## 1. 🖼️ Reemplazo de imágenes (placeholders → finales)
Formato preferido **WebP**. Editar rutas en `src/data/*.js` si cambian los nombres.
- [ ] Hero desktop — `public/images/hero/hero-stadium.jpg` — 1920×1080, ≤450 KB
- [ ] Hero móvil — `public/images/hero/hero-stadium-mobile.jpg` — 1080×1350, ≤350 KB
- [ ] Canchas (5) — `public/images/fields/cancha-1..5.jpg` — 1200×900, ≤300 KB
- [ ] Comida — `public/images/food/<id>.jpg` — 1200×900, ≤300 KB
- [ ] Bebidas — `public/images/drinks/<id>.jpg` — 1200×900, ≤300 KB
- [ ] Galería — `public/images/gallery/<id>.jpg` — 1200×800, ≤350 KB
- [ ] Promociones — `public/images/promotions/<id>.jpg` — 1080×1080, ≤300 KB
- [ ] Paquetes — `public/images/packages/<id>.jpg` — 1200×900, ≤300 KB
- [ ] Eventos — `public/images/events/<id>.webp` — 1200×900, ≤300 KB
- [ ] (Opcional) CTA — `public/images/cta/reservation-bg.jpg` — 2000×1100
- [ ] Revisar que el **encuadre** se vea bien (las imágenes se recortan al centro).
- [ ] Actualizar `alt` en `data/*.js` si cambia el contenido de la foto.

## 2. 🏷️ Reemplazo del logo
- [ ] Logo final (SVG o PNG transparente) en `public/images/logo/`.
- [ ] Actualizar rutas en `src/data/business.js → logo` (main/white/icon).
- [ ] (Opcional) Sustituir la "B" del Hero/Footer por el logo real si se desea.

## 3. 🔖 Favicon
- [ ] `public/favicon.svg` (vector) con el logo real.
- [ ] `public/favicon-32.png` (32×32, y 16×16 si aplica).
- [ ] `public/apple-touch-icon.png` (180×180).
- [ ] `public/icon-192.png` (192×192) y `public/icon-512.png` (512×512, maskable).
- [ ] Mantener los **mismos nombres de archivo** (ya referenciados en `index.html` y `site.webmanifest`).
- [ ] Verificar en pestaña del navegador y al "Añadir a pantalla de inicio".

## 4. 🔗 Open Graph image
- [ ] `public/images/logos/og-image.jpg` — **1200×630** (JPG/WebP).
- [ ] Incluir logo + claim ("Fútbol 5v5 · Mérida").
- [ ] Probar la vista previa compartiendo un enlace en WhatsApp y Facebook.
- [ ] (Opcional) Validar en https://www.opengraph.xyz o el Sharing Debugger de Facebook.

## 5. 🗺️ Google Maps embed
- [ ] Google Maps → Bodegol → Compartir → **Insertar mapa** → copiar URL del `src`.
- [ ] Pegar en `src/data/business.js → location.mapsEmbed`.
- [ ] Confirmar que la sección **Contacto** muestra el mapa real (ya no el placeholder).
- [ ] (Opcional SEO local) Añadir `geo` (lat/long reales) al JSON-LD en `index.html`.
- [ ] Verificar que el botón "Ver en Google Maps" (`mapsUrl`) abre la ubicación correcta.

## 6. 🔎 Google Search Console
- [ ] Alta de propiedad de dominio **bodegol.com.mx** + verificación TXT DNS.
- [ ] Confirmar cobertura de la home (Inspección de URL) y solicitar indexación.
- [ ] Revisar "Resultados enriquecidos" (JSON-LD LocalBusiness válido).
- [ ] **No indexar** dev.bodegol.com.mx.

## 7. 🗂️ Envío de sitemap
- [ ] Sitemap accesible en `https://bodegol.com.mx/sitemap.xml`.
- [ ] Enviarlo en Search Console → Sitemaps.
- [ ] Si cambian rutas, regenerar con `npm run sitemap` y volver a desplegar.
- [ ] `robots.txt` de producción apunta al sitemap (ya configurado).

## 8. 📱 Pruebas en móvil
- [ ] Probar en **iOS Safari** y **Android Chrome** reales.
- [ ] Hero a pantalla completa sin recortes raros (usa `100svh`).
- [ ] Botones full-width y fáciles de tocar (áreas ≥ 44px).
- [ ] Scroll fluido; sin desbordes horizontales.
- [ ] Secciones: Hero, Canchas, Comida, Precios, Promos, Eventos, Galería, Testimonios, FAQ, Contacto, CTA final.
- [ ] Acordeón de FAQ abre/cierra bien.
- [ ] Lighthouse móvil (Perf/SEO/Accesibilidad/Best Practices) ≥ 90.

## 9. 💬 Pruebas de CTA de WhatsApp
- [ ] Hero → "Reserva tu cancha" abre WhatsApp con el mensaje correcto.
- [ ] Canchas → "Reservar {cancha}" incluye el nombre de la cancha.
- [ ] Precios → cada plan abre WhatsApp con su mensaje.
- [ ] Promociones → cada tarjeta abre WhatsApp con su mensaje.
- [ ] FAQ → "Preguntar por WhatsApp".
- [ ] Contacto → CTA principal + tarjeta de teléfono (`tel:`) + email (`mailto:`).
- [ ] CTA final → "Reserva tu cancha" + botón de teléfono.
- [ ] Número correcto en todos: **999 566 8248** (`wa.me/529995668248`).
- [ ] Probar en un teléfono con WhatsApp instalado (abre la app, no la web).

---

### Antes de anunciar públicamente
- [ ] Todo validado en `dev.bodegol.com.mx`.
- [ ] Merge `development → main` y deploy a producción.
- [ ] Purgar caché (Cloudflare/Hostinger).
- [ ] Etiquetar release estable: `git tag v1.0.0`.
