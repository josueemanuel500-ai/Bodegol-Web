# 📸 IMAGE_GUIDE — Bodegol

Guía para reemplazar todas las imágenes placeholder de forma sencilla.
**Formato preferido: WebP.** Mantén los placeholders hasta tener las fotos finales.
Las rutas de archivo se editan desde `src/data/*.js` (un solo lugar por sección).

> Las imágenes se muestran con `object-fit: cover` (recorte centrado). Coloca el
> punto de interés **al centro** y entrega la imagen en la proporción indicada.

---

## Resumen por sección

| Sección | Editar en (data) | Carpeta | Dimensiones | Formato | Máx | Orientación | Dónde aparece |
|---|---|---|---|---|---|---|---|
| **Hero (desktop)** | `data/hero.js` → `backgroundImage` | `public/images/hero/hero-stadium.jpg` | 1920×1080 (16:9) | WebP | 450 KB | Horizontal | Fondo de la portada (pantalla completa) |
| **Hero (móvil)** | `data/hero.js` → `backgroundImageMobile` | `public/images/hero/hero-stadium-mobile.jpg` | 1080×1350 (4:5) | WebP | 350 KB | Vertical | Fondo de la portada en móvil |
| **Canchas** | `data/fields.js` → `field.image` | `public/images/fields/cancha-1..5.jpg` | 1200×900 (4:3) | WebP | 300 KB | Horizontal | Sección "Nuestras Canchas" (foto grande por cancha) |
| **Comida** | `data/menu.js` → `item.image` | `public/images/food/<id>.jpg` | 1200×900 (4:3) | WebP | 300 KB | Horizontal | Tarjetas de "Comida y Bebidas" |
| **Bebidas** | `data/menu.js` → `item.image` | `public/images/drinks/<id>.jpg` | 1200×900 (4:3) | WebP | 300 KB | Horizontal | Tarjetas de "Comida y Bebidas" |
| **Galería** | `data/gallery.js` → `img.src` | `public/images/gallery/<id>.jpg` | 1200×800 (3:2) | WebP | 350 KB | Horizontal | Galería (masonry) |
| **Eventos** | `data/events.js` → `event.image` | `public/images/events/<id>.webp` | 1200×900 (4:3) | WebP | 300 KB | Horizontal | Sección "Eventos" |
| **Promociones** | `data/promotions.js` → `promo.image` | `public/images/promotions/<id>.jpg` | 1080×1080 (1:1) | WebP | 300 KB | Cuadrada | Tarjetas de "Promociones" |
| **Paquetes** | `data/packages.js` → `pkg.image` | `public/images/packages/<id>.jpg` | 1200×900 (4:3) | WebP | 300 KB | Horizontal | Sección "Cumpleaños, empresas y torneos" |
| **CTA final** (opcional) | — (ruta fija) | `public/images/cta/reservation-bg.jpg` | 2000×1100 (16:9) | WebP | 400 KB | Horizontal | Fondo del bloque de cierre |
| **¿Por qué Bodegol?** (opcional) | — (ruta fija) | `public/images/about/venue.jpg` | 1200×1500 (4:5) | WebP | 350 KB | Vertical | (Disponible si se usa la variante con foto) |

---

## Logo y marca

| Asset | Carpeta | Formato | Notas |
|---|---|---|---|
| Logo principal | `public/images/logo/` | **SVG** o PNG transparente | Editar rutas en `data/business.js → logo` |
| Open Graph | `public/images/logos/og-image.jpg` | **1200×630** JPG/WebP | Imagen al compartir en redes (placeholder incluido) |

## Favicons / PWA (en `public/`)

| Archivo | Tamaño | Formato |
|---|---|---|
| `favicon.svg` | vector | SVG |
| `favicon-32.png` | 32×32 (y 16×16) | PNG |
| `apple-touch-icon.png` | 180×180 | PNG |
| `icon-192.png` | 192×192 | PNG |
| `icon-512.png` | 512×512 | PNG (maskable) |

> Todos los favicons actuales son **placeholders** (la "B" naranja sobre navy). Reemplázalos con el logo final manteniendo los mismos nombres de archivo.

---

## Pasos para reemplazar una imagen

1. Exporta la foto en la proporción y tamaño de la tabla (preferible **WebP**).
2. Cópiala a la carpeta indicada con el **mismo nombre** que usa el archivo de datos
   (o cambia la ruta en `src/data/<seccion>.js`).
3. Actualiza el `alt` en el archivo de datos si cambia el contenido de la foto.
4. `npm run build` y listo.

## Optimización rápida (opcional)

```bash
# Convertir a WebP (requiere cwebp o ImageMagick)
cwebp -q 80 foto.jpg -o foto.webp
# o
convert foto.jpg -resize 1200x900^ -gravity center -extent 1200x900 -quality 80 foto.webp
```
