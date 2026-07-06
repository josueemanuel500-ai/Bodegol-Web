# 🎨 ASSET_REPLACEMENT_GUIDE — Bodegol

Lista **exacta** de archivos a reemplazar (mismos nombres y rutas → cero cambios de código).
Si prefieres otros nombres, cámbialos en el archivo de datos indicado.
Todas las fotos se muestran con recorte centrado (`object-fit: cover`): centra el sujeto.

**Formatos:** fotos → **WebP** (mejor peso) o **JPG**. Logo → **SVG** (ideal) o **PNG** transparente.
Íconos/favicon → **SVG + PNG**. OG → **JPG o WebP**.

> Nota: los archivos actuales usan extensión `.jpg`/`.webp`. Si subes **WebP** conservando el
> nombre `.jpg` (p. ej. exportas WebP y lo renombras a `.jpg`), funciona igual porque la ruta no cambia;
> pero lo más limpio es subir el mismo nombre/extensión que aparece abajo, o actualizar la ruta en `data/`.

---

## 1. Logo — `public/images/logo/`  · edita rutas en `src/data/business.js`
| Archivo | Formato | Tamaño | Uso |
|---|---|---|---|
| `bodegol-logo.svg` | SVG (o PNG transp.) | vector | Logo principal |
| `bodegol-logo-white.svg` | SVG | vector | Versión en blanco (sobre fondo oscuro) |
| `bodegol-icon.svg` | SVG | vector | Isotipo / marca compacta |

## 2. Favicon / PWA — `public/`  · referenciados en `index.html` y `site.webmanifest`
| Archivo | Formato | Tamaño |
|---|---|---|
| `favicon.svg` | SVG | vector |
| `favicon-32.png` | PNG | 32×32 (y 16×16 si quieres) |
| `apple-touch-icon.png` | PNG | 180×180 |
| `icon-192.png` | PNG | 192×192 |
| `icon-512.png` | PNG | 512×512 (maskable) |

## 3. Open Graph — `public/images/logos/`  · referenciado en `index.html` + `seo.config.js`
| Archivo | Formato | Tamaño |
|---|---|---|
| `og-image.jpg` | JPG o WebP | **1200×630** |

## 4. Hero — `public/images/hero/`  · edita en `src/data/hero.js`
| Archivo | Formato | Tamaño | Orientación |
|---|---|---|---|
| `hero-stadium.jpg` | WebP/JPG | 1920×1080 (16:9), ≤450 KB | Horizontal (desktop) |
| `hero-stadium-mobile.jpg` | WebP/JPG | 1080×1350 (4:5), ≤350 KB | Vertical (móvil) |

## 5. Canchas — `public/images/fields/`  · edita en `src/data/fields.js`  · 1200×900 (4:3), ≤300 KB
| Archivo |
|---|
| `cancha-1.jpg` |
| `cancha-2.jpg` |
| `cancha-3.jpg` |
| `cancha-4.jpg` |
| `cancha-5.jpg` |

## 6. Comida — `public/images/food/`  · edita en `src/data/menu.js`  · 1200×900 (4:3), ≤300 KB
| Archivo |
|---|
| `boneless.jpg` · `hamburguesa.jpg` · `hot-dog.jpg` · `dedos-queso.jpg` |
| `aros-cebolla.jpg` · `plato-botanero.jpg` · `totitos-preparados.jpg` |

## 7. Bebidas — `public/images/drinks/`  · edita en `src/data/menu.js`  · 1200×900 (4:3), ≤300 KB
| Archivo |
|---|
| `frappes.jpg` · `micheladas.jpg` · `cocteles.jpg` |

## 8. Galería — `public/images/gallery/`  · edita en `src/data/gallery.js`  · 1200×800 (3:2), ≤350 KB
| Archivo |
|---|
| `cancha-noche.jpg` · `cancha-dia.jpg` · `cancha-aerial.jpg` · `partido.jpg` · `vestidores.jpg` |
| `alitas-bbq.jpg` · `hamburguesa.jpg` · `michelada.jpg` · `frappe.jpg` |
| `ambiente-bar.jpg` · `cumpleanos.jpg` · `evento-empresa.jpg` |

## 9. Eventos — `public/images/events/`  · edita en `src/data/events.js`  · 1200×900 (4:3), ≤300 KB
| Archivo |
|---|
| `champions.webp` · `copa-mx.webp` · `retro-80s.webp` |

## 10. Promociones — `public/images/promotions/`  · edita en `src/data/promotions.js`  · 1080×1080 (1:1), ≤300 KB
| Archivo |
|---|
| `happy-hour.jpg` · `alitas.jpg` · `combo-partido.jpg` · `madrugadores.jpg` |

## 11. Paquetes / Eventos — `public/images/packages/`  · edita en `src/data/packages.js`  · 1200×900 (4:3), ≤300 KB
| Archivo |
|---|
| `paquete-cancha.jpg` · `paquete-cumpleanos.jpg` · `paquete-grupal.jpg` |

## 12. (Opcional) CTA final — `public/images/cta/`  · ruta fija en `ReservationCTA.jsx`
| Archivo | Tamaño |
|---|---|
| `reservation-bg.jpg` | 2000×1100 (16:9), ≤400 KB — fondo tenue del cierre |

---

## Ajustes de exportación recomendados
- **WebP**: calidad **78–82** (fotos), sin exceder el peso máx de cada tabla.
- **JPG**: calidad **80**, progresivo.
- **PNG**: solo para logo/íconos con transparencia.
- **SVG**: logo e íconos vectoriales (minificar; sin metadatos innecesarios).
- Exporta a las **dimensiones exactas** (no subas 5000 px y dejes que el navegador reduzca).
- Convertir rápido:
  ```bash
  cwebp -q 80 foto.jpg -o foto.webp
  # o con ImageMagick, forzando encuadre:
  convert foto.jpg -resize 1200x900^ -gravity center -extent 1200x900 -quality 80 foto.webp
  ```

## Qué NO necesitas subir
- **Testimonios**: usan iniciales por defecto (`avatar: null`) — no requieren imagen. Si quieres fotos reales,
  añade la ruta en `src/data/testimonials.js` (p. ej. `public/images/team/<archivo>`).
- `src/components/sections/Services.jsx` es un componente **heredado no usado** en el homepage → sus rutas `/images/services/` no aplican.

---

## ✅ Confirmación: todas las rutas de imagen del sitio están documentadas
| Sección (live) | Carpeta | Archivo de datos |
|---|---|---|
| Hero | `hero/` | `data/hero.js` |
| Canchas | `fields/` | `data/fields.js` |
| Comida | `food/` | `data/menu.js` |
| Bebidas | `drinks/` | `data/menu.js` |
| Galería | `gallery/` | `data/gallery.js` |
| Eventos | `events/` | `data/events.js` |
| Promociones | `promotions/` | `data/promotions.js` |
| Paquetes | `packages/` | `data/packages.js` |
| Logo | `logo/` | `data/business.js` |
| Open Graph | `logos/` | `index.html` + `config/seo.config.js` |
| Favicons/PWA | `public/` (raíz) | `index.html` + `site.webmanifest` |
| CTA final (opcional) | `cta/` | `sections/ReservationCTA.jsx` |
