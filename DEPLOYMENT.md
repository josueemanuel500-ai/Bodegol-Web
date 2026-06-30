# 🚀 DEPLOYMENT — Bodegol

## ✅ Configuración confirmada
| Parámetro | Valor |
|---|---|
| Dominio canónico | **https://bodegol.com.mx** |
| Hosting | **Hostinger** (conectado a **GitHub** `josueemanuel500-ai/Bodegol-Web`) |
| Build command | **`npm run build`** |
| Output directory | **`dist`** |
| Node | **18+** (`.nvmrc` = 20 ; `engines.node >= 18`) |
| Tipo | SPA (Vite + React) con fallback de routing incluido |

> Tras el despliegue, reemplazarás manualmente: imágenes finales, favicon, logo, og-image y el embed de Google Maps.

---

## 1. Despliegue en Hostinger (GitHub auto-deploy)
1. En hPanel → **Sitio web → Deploy / Git**: conecta el repo `Bodegol-Web`, rama `main`.
2. Configura el pipeline de build:
   - **Install:** `npm ci` (usa `package-lock.json`) o `npm install`
   - **Build:** `npm run build`
   - **Output / publish dir:** `dist`
3. Asegúrate de que el **document root** sirva el contenido de **`dist/`**.
   - El `.htaccess` (incluido en `dist/` vía `public/.htaccess`) habilita el fallback SPA en Apache.
4. Activa **SSL** (Let's Encrypt) y **Force HTTPS** en hPanel.

> ⚠️ Si tu plan de Hostinger **no ejecuta un paso de build** (solo clona el repo a `public_html`),
> tienes dos opciones:
> - Construir localmente (`npm run build`) y subir el **contenido de `dist/`** a `public_html/`, **o**
> - Quitar `dist/` de `.gitignore`, commitear `dist/` y apuntar el document root a esa carpeta.
> El sitio **no** funciona sirviendo la raíz del repo sin build (el `index.html` de la raíz referencia `/src/main.jsx`).

**Verificación post-deploy (rutas SPA):** abre y **recarga** `https://bodegol.com.mx/terminos` y `/privacidad`.
Si cargan (no 404), el fallback funciona.

---

## 2. Dominio
- [ ] Dominio `bodegol.com.mx` activo y apuntando a Hostinger.
- [ ] Elegir canónico (apex `bodegol.com.mx`) y redirigir `www → apex` (301).
- [ ] Forzar HTTPS (301 http→https).
- [ ] El código ya usa `https://bodegol.com.mx` en: `seo.config.js`, `index.html` (canonical/OG/JSON-LD), `robots.txt`, `sitemap.xml`, `scripts/generate-sitemap.mjs`.

## 3. Cloudflare (si lo usas delante de Hostinger)
- [ ] Nameservers de Cloudflare en el registrador.
- [ ] `A`/`CNAME` al hosting con proxy activado.
- [ ] SSL/TLS: **Full (strict)**; "Always Use HTTPS" ON.
- [ ] Redirección www↔apex coherente con el canónico.
- [ ] **Purgar caché** después de cada deploy.

## 4. Google Search Console
- [ ] Propiedad de dominio **bodegol.com.mx** + verificación (TXT DNS).
- [ ] Enviar sitemap: `https://bodegol.com.mx/sitemap.xml`.
- [ ] Inspección de URL de la home → solicitar indexación.
- [ ] Validar JSON-LD en "Resultados enriquecidos".
- [ ] (Recomendado) Google Business Profile con la misma NAP.

## 5. Google Maps (manual, post-deploy)
- [ ] Maps → Bodegol → Compartir → **Insertar mapa** → copiar URL del `src`.
- [ ] Pegar en `src/data/business.js → location.mapsEmbed` (Contacto muestra el mapa real automáticamente).
- [ ] (SEO local) Añadir `geo` real al JSON-LD en `index.html` (no inventar coordenadas).

## 6. Checklist final de producción
**Manual (tú, post-deploy):**
- [ ] Reemplazar imágenes según `IMAGE_GUIDE.md` (hero desktop+móvil, canchas, comida/bebidas, galería, promos, paquetes, eventos).
- [ ] Reemplazar favicons + `apple-touch-icon` + `icon-192/512` + `og-image.jpg` con el logo final.
- [ ] Logo real en `public/images/logo/`.
- [ ] Pegar embed de Google Maps.
- [ ] Confirmar correo/redes: hoy usan `bodegol.mx` (`reservaciones@bodegol.mx`, `@bodegol.mx`) — ajusta en `data/business.js`, `data/contact.js`, `data/social.js` si el dominio real difiere.

**Técnico (ya verificado en este build):**
- [x] `npm run build` → 0 errores.
- [x] Favicons, manifest, robots, sitemap, OG, Twitter, JSON-LD, canonical presentes en `dist/`.
- [x] `_redirects` (Cloudflare) y `.htaccess` (Apache/Hostinger) para SPA.
- [x] Lazy loading, breakpoints responsive, alt texts, `lang="es"`, reduced-motion.
- [ ] (Recomendado) `npm run preview` + revisión móvil/desktop + Lighthouse ≥ 90 antes de anunciar.

**Limpieza local (opcional):**
- [ ] Borrar en el Explorador de Windows la carpeta vacía con llaves en `public/images/` (no afecta a Git/producción).

---

### Comandos
```bash
npm ci            # instala según package-lock
npm run build     # genera dist/  (lo que se publica)
npm run preview   # prueba local del build
npm run sitemap   # regenera public/sitemap.xml si cambian rutas
```
