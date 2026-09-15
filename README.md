# Mary de Viaje — esqueleto técnico

Esto es el punto de partida técnico de la web. Ahora mismo es solo el
"esqueleto" (sin diseño final) pero ya está conectado a Vercel y a Sanity,
listo para desplegarse y empezar a construir encima.

## Qué hace ya

- Página de inicio que lee artículos desde Sanity (proyecto `mnrvihd5`)
- Página de detalle de artículo en `/guias/[slug]`
- Sitemap y robots.txt automáticos para SEO
- Metadatos base (título, descripción, Open Graph)
- **Sanity Studio embebido en `/studio`** — el panel donde Meri publica contenido,
  sin necesidad de ninguna otra herramienta ni cuenta aparte

No pasa nada si Sanity aún no tiene contenido: la web funciona igual,
mostrando un aviso de "aún no hay contenido publicado".

## El modelo de contenido (lo que Meri va a rellenar)

Un solo tipo de contenido, **Artículo**, con un desplegable "Tipo" (Guía / Blog /
Comparativa) para no complicar el panel desde el principio. Cada artículo tiene:
título, slug, país, resumen, imagen destacada, contenido con texto enriquecido,
links de afiliado (nombre + URL + descuento) y campos SEO opcionales.

## Cómo entra Meri a publicar

1. Ve a manage.sanity.io, entra en el proyecto `mnrvihd5` → **Members** → invítala
   con su email para que tenga acceso de editora.
2. Una vez desplegada la web, ella entra en `https://tu-dominio-o-url/studio` y
   se loguea con su cuenta.
3. Desde ahí crea artículos nuevos sin tocar nada de código.

## Cómo subir esto a tu repositorio de GitHub (sin usar la terminal)

1. Descarga y descomprime el archivo que te he dado.
2. Entra en tu repositorio: github.com/OscarDenamiel (el que uses para este proyecto).
3. Si el repo está vacío, verás un botón tipo "uploading an existing file" /
   "Add file → Upload files".
4. Arrastra **todo el contenido de la carpeta** `merideviaje-web` (no la carpeta
   en sí, sino lo que hay dentro) a esa zona de subida.
5. Baja hasta el final y dale a "Commit changes".

## Cómo conectarlo a Vercel

1. Entra en tu proyecto: vercel.com/meri-de-viaje
2. Si no está ya importado, dale a "Add New → Project" y selecciona el
   repositorio de GitHub que acabas de subir.
3. Vercel detecta automáticamente que es un proyecto Next.js — no hay que
   tocar nada de configuración de build.
4. Antes de darle a "Deploy", ve a **Settings → Environment Variables** y añade:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` → `mnrvihd5`
   - `NEXT_PUBLIC_SANITY_DATASET` → `production` (confírmalo en manage.sanity.io,
     normalmente se llama así por defecto)
5. Dale a Deploy. En 1-2 minutos tienes una URL tipo `meri-de-viaje.vercel.app`
   con la web ya viva.

## Lo que falta (próximas fases, no ahora)

- Comprar el dominio merideviaje.com y conectarlo en Vercel → Settings → Domains
- Definir los tipos de contenido en Sanity Studio (schema de "guía", "blog", etc.)
  para que Meri pueda empezar a publicar
- Aplicar el diseño real una vez lo tengamos en Claude Design
- Conectar Google Analytics 4 y Google Search Console

No necesitas instalar nada en tu ordenador (ni Node.js ni npm) para este
primer paso — todo el proceso de arriba se hace desde el navegador.
