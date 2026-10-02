# Contexto del proyecto vibecodingcoach

Traspaso de sesión (2 oct 2026). Leer antes de continuar.

## Quién y qué

Miguel Liébana quiere monetizar su experiencia con vibe coding dando clases.
Perfil real (de su CV): maestro titulado (UB) con 14 años de docencia y
coordinador TIC, máster en TIC aplicadas a la educación, developer full-stack
junior en bootcamp (Upgrade Hub, termina feb 2027), trabaja de recepcionista/
administrativo. Proyectos desplegados: ENERPRO, BandManager, material didáctico
HTML/CSS (materialdidacticocpweb.vercel.app), Apuntes Upgrade (IA que genera
tests y flashcards). Alemán C2, inglés B2.

## Decisiones tomadas

- **Posicionamiento:** tutor de principiantes absolutos, apoyado en su
  pedagogía. Descartado el ángulo de "coach de founders" porque no es creíble
  con su perfil.
- **Propuesta de valor:** "Enseño a principiantes absolutos a construir su
  primera web o app con IA, con la pedagogía de 14 años como maestro, no con
  jerga de programador."
- **Precios de lanzamiento (en la web):** clase de prueba gratis (30 min),
  clases 1:1 a 25 €/h, taller en grupo de 3 h a 30 €. Subir precios tras el
  bootcamp.
- **Web:** anuncio del servicio + curso gratuito "Vibe Coding desde Cero" como
  lead magnet. Hecha con Next.js en este repo, no con Framer.
- **Dominio:** subdominio de su dominio propio.

Detalle completo del plan y del currículo en [PLAN.md](./PLAN.md).

## Estado actual

- **Repo:** github.com/liebanavicente/vibecodingcoach, rama `main`.
- **Web en producción:** https://vibecoding.miguelliebana.com
- **Vercel:** equipo `mlieban3-s-projects`, proyecto `vibecodingcoach`
  (prj_HasbSZrNs3OIxdOqmnkjI6DVRa4S), conectado a GitHub: cada push a `main`
  despliega automáticamente. El dominio usa los DNS de Vercel.
- **Stack:** Next.js 16 (App Router, `src/`), React 19, Tailwind v4, TypeScript,
  iconos Phosphor. Ojo: Next 16 tiene cambios; consultar `node_modules/next/dist/docs/`.
- **Diseño:** cristal cálido según los mockups de Miguel (oct 2026): fondo melocotón
  con burbujas (`public/fondo-burbujas.webp`; `fondo-azul.webp` en las páginas del
  curso; `fondo-ondas.webp` en las diapositivas), degradado naranja→coral como acento,
  paneles de vidrio esmerilado, botones en cápsula, fuente Inter. Cabecera flotante con
  la marca «vibe**coding**coach by ML».
- **Marca personal:** logo ML de Miguel («ml_» en tecla blanca con sombra azul `#1f66ff`
  y cursor que parpadea), redibujado como SVG en `src/components/MlLogo.tsx` y usado en
  cabecera, pie, «Sobre mí» y favicon (`src/app/icon.svg`). Mantenerlo siempre visible. Hero con ilustración de editor en CSS
  (`HeroVisual` en `src/app/page.tsx`) y franja de 3 ventajas. Todo el CSS en
  `src/app/globals.css` con clases propias (no utilidades de Tailwind).

### Estructura

- `src/app/page.tsx`: landing (hero, para quién, método, curso, oferta, sobre mí).
- `src/app/curso/page.tsx`: índice del curso.
- `src/app/curso/[slug]/page.tsx`: página de cada módulo (generada estáticamente):
  reproductor de diapositivas + texto completo + índice lateral.
- `src/components/LessonPlayer.tsx`: lección audiovisual híbrida. Las diapositivas se
  generan solas desde el contenido (`slidesFor` en `curso.ts`, usando los `points` de
  cada sección). Si el módulo tiene `video: { src, poster?, cues }`, el vídeo se
  muestra al lado y mueve las diapositivas; `cues[i]` = segundo en que empieza la
  diapositiva i. Sin vídeo, se navega a mano (flechas, puntos, teclado, pantalla completa).
- `src/content/herramientas.ts`: herramientas principales por orden de uso (Claude,
  Claude Code, Codex, Cursor, Antigravity) y recursos del banner en movimiento
  (Higgsfield, Google Flow, Vercel, Supabase…). Para cambiarlos, editar solo ese archivo.
  Logos: los que existen en `simple-icons` se importan de ahí; Codex, OpenAI/ChatGPT,
  Antigravity, Higgsfield y Google Flow son imágenes que pasó Miguel, recortadas en
  `public/logos/`. El pie lleva la nota de marcas «sin afiliación».
- `src/content/recursos.ts`: recursos del curso (skills, otra IA como revisora, fondos e
  imágenes, truquillos, empezar…), escritos como bloques (`text`, `steps`, `prompt`, `tip`,
  `warning`, `tools`, `compare`, `cards`, `keys`, `dodont`, `code`, `links`, `table`) que pinta `src/components/Blocks.tsx`. Páginas en
  `/curso/recursos/[slug]`. Para añadir un recurso, añadir un objeto al array.
- Glosario: `/curso/glosario`, 48 términos en `src/content/glosario.ts` (IA, Herramientas,
  Código, Publicar), con buscador sin tildes y enlace a la guía relacionada (`guide`).
- Progreso del alumno: las checklists de cada módulo se guardan en el navegador
  (localStorage, `src/components/Progress.tsx`); la página del curso muestra el % por módulo.
- Vídeo de entrada: en la portada, `IntroVideo` reproduce `public/videos/como-funciona.mp4`
  a pantalla completa (silenciado, con «Saltar» y barra de progreso) solo en la primera
  visita de cada navegador y nunca con «reducir movimiento» (`src/lib/intro.ts`).
  El botón «Mira cómo funciona» del hero lo vuelve a abrir en un diálogo.
- Sección «Buen uso vs mal uso» en `/curso`: sale de los recursos de categoría «Buen uso»
  (ventana de contexto, orden de carpetas, Git y GitHub, despliegues en Vercel).
- Reels de Instagram: carpetas `media/reel-XX/` con un `reel.html` cada una. La plantilla
  compartida está en `media/kit/` (motor de animación `engine.js`, estilos `kit.css`, iconos).
  `npm run reel -- reel-02` renderiza a `media/reel-02/out/reel-02.mp4` (ignorado por git).
  Reel 01 = presentación con clips de Flow (`media/reel-01/clips/`); 02 = detector de
  vendehumos; 03 = así no / así sí; 04 = palabra del día (token); 05 = palabra del día (MCP,
  con logos reales de `media/kit/logos.js`); 06 = truco «pide un plan»; 07 = mito del ordenador caro. Textos de publicación,
  bio y calendario en `media/instagram.md`.
- `src/content/curso.ts`: **todo el contenido del curso**. Para publicar un
  módulo, rellenar `objectives`, `sections`, `exercise`, `checklist` y poner
  `available: true`.
- `src/lib/site.ts`: nombre, email de contacto y enlaces sociales.
- Reservas: todos los botones «Reservar» llevan a `/reservar` (`src/app/reservar/page.tsx`).
  Si `site.bookingUrl` (en `src/lib/site.ts`) está vacío, el botón abre un email ya redactado;
  al pegar ahí el enlace de Cal.com, abre el calendario. Instagram: @vibecodingcoach_ml
  (`site.instagram`), enlazado en el pie, en `/reservar` y en la guía «Mantente al día».

### Curso

- Módulos 0 (Mentalidad y primeros pasos) y 1 (Hablar con la IA): escritos y publicados.
- Módulos 2 a 5 (Código mínimo, Funcionalidad real, Publicar, Proyecto final):
  solo título y resumen, marcados como "Próximamente".
- Pendiente de Miguel: revisar el texto de los módulos 0 y 1 para que suene a él.
- Vídeos: ninguno grabado todavía. Flujo previsto: grabar la narración (con webcam o
  pantalla) pasando las diapositivas en pantalla completa, subir el mp4 (p. ej. a
  `public/videos/` o Vercel Blob) y anotar en `cues` el segundo de cada cambio.

## Pendientes / siguientes pasos

1. Probar a mano el reproductor (botones, teclado, pantalla completa): solo se revisó
   con capturas estáticas, no con clics.
2. Escribir el Módulo 2 (puede reutilizar su material HTML/CSS existente).
3. Enlazar esta web desde miguelliebana.com.
4. Pilotar el Módulo 1 gratis con 2-3 personas y recoger feedback (ver PLAN.md).
5. Darse de alta en Preply / Superprof / ADPList.
6. Crear la cuenta de Cal.com y pegar el enlace en `site.bookingUrl`. Mejoras posibles:
   imagen OG, analítica.

## Avisos

- **Vercel Hobby no permite uso comercial.** Al empezar a cobrar: pasar a Pro
  (~20 $/mes) o mover esta web a Cloudflare Pages / Netlify (gratis con uso comercial).
- **Framer:** se intentó usar `@framer/agent` con un remix de la plantilla
  "Lurais" (proyecto fp7ZKIPuGjEDAUymggZF). Desde la nube falló porque el proxy
  bloquea WebSockets; se abandonó en favor de Next.js. La API key de Framer
  quedó escrita en una conversación anterior: conviene regenerarla en Framer.
- Hay un `PROOF_PROJECT_BRIEF.md` de una sesión anterior (app "ValidaTuIdea")
  que no está en este repo; quedó descartado con el cambio de posicionamiento.
