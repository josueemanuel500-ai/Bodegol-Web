# 🚀 DEPLOYMENT — Bodegol

Sitio **Vite + React (SPA)**. Build: `npm run build` → carpeta **`dist/`** (lo que se publica).
Fallback de routing SPA incluido: `public/_redirects` (Cloudflare) y `public/.htaccess` (Apache/Hostinger).

---

## 🌐 Entornos

### Producción
| Parámetro | Valor |
|---|---|
| Dominio | **https://bodegol.com.mx** |
| Rama | **`main`** |
| Build command | `npm run build` |
| Output directory | `dist` |

### Desarrollo (staging)
| Parámetro | Valor |
|---|---|
| Dominio | **https://dev.bodegol.com.mx** |
| Rama | **`development`** |
| Build command | `npm run build` |
| Output directory | `dist` |

> ⚠️ **El entorno dev NO debe indexarse** en Google (evita contenido duplicado).
> Antes de publicar `dev.bodegol.com.mx`, aplica una de estas opciones **solo en dev**:
> - Servir un `robots.txt` con `User-agent: * / Disallow: /`, **o**
> - Añadir la cabecera `X-Robots-Tag: noindex` en Hostinger/Cloudflare para el subdominio dev, **o**
> - Proteger el subdominio con contraseña (Basic Auth) en Hostinger.
> Producción (`bodegol.com.mx`) mantiene el `robots.txt` normal (Allow).

---

## 🔀 Flujo de trabajo Git

```
development  ── rama de pruebas (staging)  → dev.bodegol.com.mx
main         ── rama de producción         → bodegol.com.mx
```

**Crear la rama de desarrollo (una sola vez):**
```bash
git checkout main
git pull origin main
git checkout -b development
git push -u origin development
```

**Ciclo recomendado:**
1. Trabaja siempre en **`development`**.
2. Haz commit y `git push origin development`.
3. Prueba en **https://dev.bodegol.com.mx**.
4. Si se aprueba, fusiona a producción:
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff development
   git push origin main
   ```
5. El push a `main` actualiza **https://bodegol.com.mx**.

> Regla de oro: **nunca** hagas commits directos a `main`. Todo pasa primero por `development` + dev.bodegol.com.mx.

---

## 🟣 Checklist Hostinger (2 sitios: prod + dev)
- [ ] **Sitio de producción**: dominio `bodegol.com.mx`, deploy desde GitHub rama **`main`**.
- [ ] **Sitio de desarrollo**: subdominio `dev.bodegol.com.mx`, deploy desde GitHub rama **`development`**.
- [ ] En ambos: Install `npm ci`, Build `npm run build`, Output/publish **`dist`**.
- [ ] Confirmar que el document root de cada sitio sirve el **contenido de `dist/`** (con su `.htaccess`).
- [ ] Node 18+ (ver `.nvmrc` = 20, `engines.node >= 18`).
- [ ] En el subdominio dev: activar noindex/Basic Auth (ver aviso arriba).

> Si tu plan de Hostinger **no ejecuta build** (solo clona a `public_html`): construye local (`npm run build`) y sube el contenido de `dist/`, o quita `dist/` de `.gitignore` y commitéalo. Servir la raíz del repo sin build **no** funciona.

## 🌐 Checklist DNS
- [ ] `bodegol.com.mx` (apex) → A/CNAME al hosting de producción.
- [ ] `www.bodegol.com.mx` → redirección 301 al apex (o viceversa; uno canónico).
- [ ] `dev.bodegol.com.mx` → registro **A/CNAME** apuntando al sitio de desarrollo en Hostinger.
- [ ] Propagación DNS verificada (`dig`, `nslookup` o whatsmydns.net).
- [ ] TTL bajo (300 s) mientras configuras; súbelo después.

## 🔒 Checklist SSL
- [ ] SSL (Let's Encrypt) emitido para **bodegol.com.mx** y **www**.
- [ ] SSL emitido para **dev.bodegol.com.mx** (certificado propio del subdominio).
- [ ] "Force HTTPS" activado en ambos.
- [ ] Si usas Cloudflare: SSL/TLS **Full (strict)** + "Always Use HTTPS".
- [ ] Sin contenido mixto (todo carga por https).

## ⏪ Checklist de Rollback (revertir producción)
Si un deploy a `main` rompe producción:
- [ ] **Opción A — revertir el commit** (recomendado, deja historial limpio):
  ```bash
  git checkout main
  git revert <hash-del-commit-malo>   # o: git revert HEAD
  git push origin main
  ```
- [ ] **Opción B — volver a un commit estable conocido:**
  ```bash
  git checkout main
  git reset --hard <hash-estable>
  git push --force-with-lease origin main
  ```
  (Usar con cuidado; reescribe historial.)
- [ ] **Opción C — Hostinger**: re-desplegar manualmente el commit/deploy anterior desde el panel (si guarda historial de despliegues).
- [ ] Tras el rollback: **purgar caché de Cloudflare** y verificar `bodegol.com.mx`.
- [ ] Antes de tocar `main`, **etiqueta** los releases estables para volver rápido:
  ```bash
  git tag -a v1.0.0 -m "Release estable" && git push origin v1.0.0
  ```

---

## 🔎 Google Search Console
- [ ] Propiedad **bodegol.com.mx** (dominio) + verificación TXT.
- [ ] Enviar `https://bodegol.com.mx/sitemap.xml`.
- [ ] **No** añadir dev.bodegol.com.mx a Search Console (o mantenerlo noindex).
- [ ] Validar JSON-LD en "Resultados enriquecidos".

## 🗺️ Google Maps (manual, post-deploy)
- [ ] Maps → Bodegol → Compartir → Insertar mapa → copiar URL del `src`.
- [ ] Pegar en `src/data/business.js → location.mapsEmbed`.
- [ ] (SEO local) `geo` real en el JSON-LD de `index.html` (no inventar coordenadas).

## Comandos
```bash
npm ci
npm run build     # dist/  (verificado: 0 errores)
npm run preview
npm run sitemap
```
