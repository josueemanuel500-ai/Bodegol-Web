# Bodegol — Image Assets Guide

Place all images in their respective subfolder under `public/images/`.

## Recommended Formats
- Use `.webp` for photos (best quality/size ratio)
- Use `.jpg` as fallback if WebP isn't available
- Use `.svg` for logos and icons
- Use `.png` only for images needing transparency

## Folder Structure & Recommended Dimensions

### /images/hero/
| File              | Dimensions     | Description                    |
|-------------------|----------------|--------------------------------|
| hero-bg.jpg       | 1920×1080px    | Main hero background image     |

### /images/logo/
| File                     | Format | Description                   |
|--------------------------|--------|-------------------------------|
| bodegol-logo.svg         | SVG    | Main logo (dark background)   |
| bodegol-logo-white.svg   | SVG    | White version for dark bg     |
| bodegol-icon.svg         | SVG    | Icon-only mark                |

### /images/fields/
| File              | Dimensions     | Description                    |
|-------------------|----------------|--------------------------------|
| cancha-tigre.jpg  | 900×600px      | Cancha Tigre photo             |
| cancha-leon.jpg   | 900×600px      | Cancha León photo              |
| cancha-aguila.jpg | 900×600px      | Cancha Águila photo            |

### /images/food/
| File               | Dimensions  | Description                   |
|--------------------|-------------|-------------------------------|
| nachos.jpg         | 600×600px   | Nachos Bodegol                |
| papas.jpg          | 600×600px   | Papas a la Francesa           |
| deditos.jpg        | 600×600px   | Deditos de Queso              |
| alitas-bbq.jpg     | 600×600px   | Alitas BBQ                    |
| alitas-buffalo.jpg | 600×600px   | Alitas Buffalo                |
| alitas-mango.jpg   | 600×600px   | Alitas Mango Habanero         |
| hamburguesa.jpg    | 600×600px   | Hamburguesa Bodegol           |
| hotdog.jpg         | 600×600px   | Hot Dog Gourmet               |
| boneless.jpg       | 600×600px   | Boneless Cheddar              |

### /images/drinks/
| File          | Dimensions  | Description                   |
|---------------|-------------|-------------------------------|
| frappe.jpg    | 600×600px   | Frappé de la Casa             |
| michelada.jpg | 600×600px   | Michelada Bodegol             |
| aguas.jpg     | 600×600px   | Agua de Sabor                 |
| modelo.jpg    | 600×600px   | Modelo Especial               |
| heineken.jpg  | 600×600px   | Heineken                      |
| xx-lager.jpg  | 600×600px   | XX Lager                      |

### /images/promotions/
| File               | Dimensions  | Description                   |
|--------------------|-------------|-------------------------------|
| happy-hour.jpg     | 800×600px   | Happy Hour 2x1                |
| alitas.jpg         | 800×600px   | Miércoles de Alitas           |
| combo-partido.jpg  | 800×600px   | Combo Partido                 |
| madrugadores.jpg   | 800×600px   | Promo Madrugadores            |

### /images/packages/
| File                    | Dimensions   | Description                 |
|-------------------------|--------------|-----------------------------|
| paquete-cancha.jpg      | 900×500px    | Paquete Cancha image        |
| paquete-cumpleanos.jpg  | 900×500px    | Paquete Cumpleaños image    |
| paquete-grupal.jpg      | 900×500px    | Paquete Grupal image        |

### /images/gallery/
| File                 | Dimensions    | Notes                        |
|----------------------|---------------|------------------------------|
| cancha-noche.jpg     | 1200×800px    | Mix landscape/portrait       |
| alitas-bbq.jpg       | 800×800px     | Square works well            |
| ambiente-bar.jpg     | 1200×800px    | Landscape for wide shots     |
| cumpleanos.jpg       | 1200×800px    |                              |
| hamburguesa.jpg      | 800×800px     |                              |
| cancha-dia.jpg       | 1200×800px    |                              |
| michelada.jpg        | 800×800px     |                              |
| partido.jpg          | 1200×800px    |                              |
| cancha-aerial.jpg    | 1200×800px    | Drone/aerial shot            |
| evento-empresa.jpg   | 1200×800px    |                              |
| frappe.jpg           | 800×800px     |                              |
| vestidores.jpg       | 1200×800px    |                              |

### /images/events/
| File               | Dimensions   | Description                   |
|--------------------|--------------|-------------------------------|
| champions.jpg      | 900×600px    | Champions League graphic      |
| copa-mx.jpg        | 900×600px    | Copa MX graphic               |
| retro-80s.jpg      | 900×600px    | Noche Retro 80s               |

## Tips
1. Always optimize images before uploading (TinyPNG, Squoosh, or imagemin)
2. Use descriptive alt text (already defined in each data file)
3. Hero image should be the highest quality — it's the first thing users see
4. For food/drinks: clean white or dark background photos work best
5. Gallery images should show the real ambiance — candid, authentic photos
