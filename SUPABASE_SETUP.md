# 🗄️ SUPABASE_SETUP — Panel admin de Promociones (Bodegol)

Deja el panel oculto conectado a Supabase para editar promociones sin tocar código.
**Sin Supabase la web funciona igual** (usa las promos estáticas de `data/promotions.js`);
el panel mostrará un aviso de "no configurado".

## Cómo se abre el panel
En la portada, **toca 7 veces el logo** (dentro de ~3 s). Se abre un panel con
**efecto cristal**: inicias sesión y gestionas las promociones (crear / editar / activar / eliminar).

---

## 1. Crear el proyecto y las llaves
1. Crea un proyecto en https://supabase.com
2. En **Project Settings → API** copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
3. Pégalas en tu `.env` (local) y en las variables de entorno de Hostinger/Cloudflare (producción).
   > La `anon key` es pública por diseño (va en el navegador). La seguridad la da RLS (abajo).

## 2. Crear la tabla `promotions`
En **SQL Editor** ejecuta:

```sql
create table if not exists public.promotions (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  tag          text,
  description  text,
  schedule     text,
  image        text,
  image_alt    text,
  cta_label    text,
  cta_message  text,
  sort         int  default 0,
  active       boolean default true,
  created_at   timestamptz default now()
);

alter table public.promotions enable row level security;

-- Lectura: el público ve solo activas; el admin autenticado ve todas.
create policy "promos_read" on public.promotions
  for select using ( active = true or auth.role() = 'authenticated' );

-- Escritura: solo usuarios autenticados (admin).
create policy "promos_insert" on public.promotions
  for insert to authenticated with check ( true );
create policy "promos_update" on public.promotions
  for update to authenticated using ( true ) with check ( true );
create policy "promos_delete" on public.promotions
  for delete to authenticated using ( true );
```

## 3. Crear el usuario admin
1. **Authentication → Providers**: activa **Email** (email + contraseña).
2. **Authentication → Users → Add user**: crea tu correo y contraseña de admin.
3. **Authentication → Settings**: desactiva **"Allow new users to sign up"**
   para que nadie más pueda registrarse (solo tú creas admins desde el panel).

## 4. (Opcional) Cargar las promos actuales
Para no empezar en blanco, inserta las de `data/promotions.js`:

```sql
insert into public.promotions (title, tag, description, schedule, image, image_alt, cta_label, cta_message, sort, active) values
('Happy Hour','Diario','Cervezas nacionales 2×1 y cocteles con 30% OFF. De lunes a viernes.','Lun–Vie · 5:00 – 7:00 PM','/images/promotions/happy-hour.jpg','Cervezas 2x1 Happy Hour Bodegol','Quiero aprovechar','¡Hola! Vi que tienen Happy Hour 2x1. ¿A qué hora está disponible hoy?',1,true),
('Combo Partido','Días de partido','Jarra de cerveza + orden de botana + entrada al área de pantallas a precio especial.','Días de partido','/images/promotions/combo-partido.jpg','Combo partido Bodegol pantallas','Ver próximos partidos','¡Hola! ¿Cuándo es el próximo partido con el combo especial?',2,true),
('Madrugadores','Entre semana','Renta de cancha a precio especial en los primeros horarios del día.','Lun–Vie · Primeros horarios','/images/promotions/madrugadores.jpg','Promo madrugadores renta de cancha','Reservar cancha','¡Hola! Quiero la promo madrugadores. ¿Qué horarios tienen?',3,true);
```

## 5. Campos de una promoción
`title` (obligatorio), `tag`, `description`, `schedule`, `image` (ruta como
`/images/promotions/archivo.jpg`), `image_alt`, `cta_label`, `cta_message`,
`sort` (menor = primero), `active` (visible o no).

## Notas de seguridad
- La escritura requiere sesión (Supabase Auth). Sin login no se puede modificar nada.
- El panel es solo un atajo visual; la protección real es **RLS + Auth** en Supabase.
- Recuerda poner las variables `VITE_SUPABASE_*` también en el hosting de producción.

---

## 8. Mantener el proyecto activo — cron-job.org (evitar pausa)
El plan gratis de Supabase **pausa** el proyecto tras ~7 días sin actividad.
Con un ping periódico (que hace un `SELECT` mínimo) se mantiene despierto.

En **https://cron-job.org** crea un cronjob:

- **Título:** `Bodegol – Supabase keep-alive`
- **URL:**
  ```
  https://vucytmlgksahnoqtbyhf.supabase.co/rest/v1/promotions?select=id&limit=1
  ```
- **Método:** `GET`
- **Headers** (Advanced → Headers) — usa tu **anon key** (es pública, seguro):
  ```
  apikey: <VITE_SUPABASE_ANON_KEY>
  Authorization: Bearer <VITE_SUPABASE_ANON_KEY>
  ```
- **Frecuencia:** cada día (o cada 12 h). Debe ser < 7 días.
- Guarda, activa y haz un **Test run**: debe responder **200** con un JSON pequeño (`[{"id":"..."}]`).

Notas:
- Nunca uses aquí la `service_role key`; solo la `anon`.
- Un `SELECT` por la API REST cuenta como actividad y mantiene el proyecto activo.
- (Opcional) En vez de la tabla, puedes apuntar el cron a un **Edge Function** de "ping".
