# 🔐 SECURITY — Bodegol

> **Aviso importante:** ninguna protección de frontend es 100% segura.
> Cualquier imagen o texto visible públicamente puede capturarse con una
> **screenshot**, desde las **herramientas de red** del navegador o guardando el
> HTML. Las medidas de este proyecto **solo desalientan la copia casual**; no
> impiden a un usuario técnico obtener los recursos.

## 1. Protección de imágenes (implementada)
- **Clic derecho**: deshabilitado **solo sobre imágenes** (no en toda la página) vía
  `onContextMenu` en `LazyImage`, el lightbox de galería y avatares.
- **Arrastrar**: `draggable={false}` + `onDragStart` prevenido en las imágenes.
- **CSS** (solo imágenes): `-webkit-user-drag: none; user-select: none;` en `img` (global.css).
- **Watermark opcional** "Bodegol": componente `LazyImage` (prop `watermark`) e
  `ImageProtect`. Se activa con el flag `features.imageWatermark` en
  `src/config/site.config.js` (por defecto **false**). Cuando se activa, aparece una
  marca diagonal tenue en imágenes de **galería** y **promociones**.
- **No** se bloquea DevTools ni se usan scripts anti-inspección agresivos
  (perjudican UX, rendimiento, accesibilidad y SEO, y se saltan fácilmente).

## 2. Source maps
- Deshabilitados en producción: `vite.config.js → build.sourcemap: false`.
  El bundle publicado **no** expone el código fuente mapeado.

## 3. Cabeceras HTTP recomendadas
Configúralas en el hosting. En **Hostinger** ya vienen las básicas en `public/.htaccess`
(se copian a `dist/`). En **Cloudflare** (proxy) usa *Transform Rules → HTTP Response Headers*
o, en Cloudflare Pages, `public/_headers`.

| Cabecera | Valor recomendado | Para qué |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Evita adivinar el MIME type |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita el referer enviado |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=(), payment=(), usb=()` | Desactiva APIs sensibles |
| `X-Frame-Options` | `SAMEORIGIN` | Anti-clickjacking (equivalente a `frame-ancestors 'self'`) |
| `Content-Security-Policy` | ver abajo | Restringe orígenes de recursos |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Fuerza HTTPS (activar solo con SSL estable) |

### Content-Security-Policy sugerida
El sitio usa Google Fonts, estilos inline de React y un `<script type="application/ld+json">`
(JSON-LD), y puede incrustar Google Maps. Una CSP funcional:

```
Content-Security-Policy:
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  img-src 'self' data:;
  font-src 'self' https://fonts.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  script-src 'self' 'unsafe-inline';
  frame-src https://www.google.com https://maps.google.com;
  connect-src 'self';
```
Notas:
- `style-src 'unsafe-inline'` es necesario por los estilos inline de React/Tailwind arbitrarios.
- `script-src 'unsafe-inline'` cubre el bloque JSON-LD. Para endurecer, sustitúyelo por un
  **hash** del script (`'sha256-...'`) y quita `'unsafe-inline'`.
- `frame-src` solo si insertas el **embed** de Google Maps en Contacto.
- **Prueba primero en `dev.bodegol.com.mx`**: una CSP mal configurada puede bloquear
  fuentes, el mapa o el render. La línea CSP viene **comentada** en `.htaccess` para que
  la actives cuando la hayas validado.

## 4. Cómo activar en Hostinger
1. Verifica que `dist/.htaccess` llegó al `public_html` (se genera desde `public/.htaccess`).
2. Descomenta la línea `Content-Security-Policy` cuando la hayas probado.
3. Activa HSTS solo cuando el SSL esté estable (evita bloquear el sitio si algo falla con HTTPS).

## 5. Cómo activar en Cloudflare
- **Transform Rules → Modify Response Header**: añade las cabeceras de la tabla.
- **SSL/TLS**: Full (strict) + "Always Use HTTPS".
- Cloudflare Pages: usa `public/_headers` (incluido).

## 6. Archivos sensibles
`.htaccess` deniega el acceso a `.env`, `.log`, `.md`, `.yml`, `*.lock`, etc.
Nunca subas `.env` con secretos al repo (ya está en `.gitignore`).

## 7. Reporte de vulnerabilidades
Si detectas un problema de seguridad, contactar por WhatsApp/correo del negocio antes de divulgarlo.
