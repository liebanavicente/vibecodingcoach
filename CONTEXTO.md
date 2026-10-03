# Contexto del proyecto vibecodingcoach

Traspaso de sesión (3 oct 2026). Leer antes de continuar.

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
  cabecera, pie, «Sobre mí» y favicon (`src/app/icon.svg`). Mantenerlo siempre visible. En la web
  va siempre como `MlLink`, que enlaza a miguelliebana.com en una pestaña nueva. Hero con ilustración de editor en CSS
  (`HeroVisual` en `src/app/page.tsx`) y franja de 3 ventajas. Todo el CSS en
  `src/app/globals.css` con clases propias (no utilidades de Tailwind).

### Estructura

- `src/app/page.tsx`: landing (hero, para quién, método, curso, oferta, «Te la hago yo», sobre mí).
  «Te la hago yo» (`#a-medida`): servicio de hacer la web por encargo, con presupuesto a medida (sin precio
  público); el botón abre un email con las preguntas para presupuestar (`budgetHref` en `src/lib/site.ts`).
  En el menú solo sale en móvil («Web a medida»), para que la barra de escritorio no se desborde.
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
- Animaciones con GSAP (gratis, también comercial): `src/components/HeroAnimator.tsx` monta la
  ilustración del hero pieza a pieza al entrar (espera a que se cierre el vídeo de entrada) y le da
  un leve desplazamiento con el scroll; `src/components/CountUp.tsx` hace contar los números de
  «Sobre mí»; `src/components/RouteAnimator.tsx` rellena la línea de la ruta de los dos cursos
  con el scroll, enciende cada paso y desliza las tarjetas; `src/components/CourseScrollVideo.tsx`
  muestra en la sección del curso de la portada un clip de Flow (una web construyéndose en un portátil)
  que se abre con un recorte y avanza con el scroll (`public/videos/curso-scroll.mp4`, codificado con
  fotograma clave cada 3 para que el scrub sea suave; fuente en `media/curso-video/clip.mp4`). Todas se desactivan con «reducir movimiento».
  `src/components/CourseAnimator.tsx` anima la cabecera de /curso y /competencias-digitales al
  entrar y revela cada título de sección (SplitText) al hacer scroll. El vídeo de la portada lleva
  desenfoques que siguen las letras inventadas por Flow (`BLURS` en `CourseScrollVideo.tsx`).
  Menú móvil: por debajo de 1280 px la cabecera muestra un botón hamburguesa que abre un panel a
  pantalla completa (`src/components/Header.tsx`, montado en <body> con un portal porque el blur de
  la cabecera lo atraparía). Se cierra con Escape, al pulsar un enlace o al cambiar de página.
  `html { overflow-x: clip }` evita el scroll lateral de las animaciones y los fondos a sangre.
  Fondo animado de cintas (`src/components/RibbonBg.tsx`, `public/videos/fondo-cintas.mp4`, bucle
  continuo hecho con un fundido desde `media/bg/bg.mp4`): detrás de las secciones de cursos de la
  portada y de las cabeceras de /curso, /competencias-digitales, /curso/prompts, /curso/glosario y
  /reservar. Solo se reproduce en pantalla; se usa poniendo `has-ribbon` al contenedor y
  `<RibbonBg />` como último hijo. Opacidad en `.ribbon-bg video` (globals.css). En móvil (≤960 px)
  usa `fondo-cintas-movil.mp4`, un corte vertical a 360 px (135 KB) que solo se descarga cuando la
  sección llega a la pantalla, sin desplazamiento con el scroll (el de 720 px, con varias copias a la vez,
  hacía pesado el scroll), sobre su imagen fija `fondo-cintas-movil.webp`. Además sale detrás del texto
  del hero de la portada (`position="hero"`, oculto en escritorio).
  `GSAP_SCRIPT` (`src/lib/intro.ts`) oculta la ilustración
  antes del primer pintado, con un respaldo CSS que la muestra a los 3 s si el JS no carga.
- Biblioteca de prompts: `/curso/prompts`, 33 prompts en `src/content/prompts.ts` (fuente
  única). Las guías los usan con un bloque `{ type: "prompt", id }`; los huecos van [entre
  corchetes] y se resaltan en la página.
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
  con logos reales de `media/kit/logos.js`); 06 = truco «pide un plan»; 07 = mito del ordenador caro; 08 = escena de acción de Flow
  (pit stop) + «trabajar en equipo: Google Flow + Claude», con el sonido del clip
  (`data-audio` en `#stage`); 09 = meme «y yo pagando» (clip de Flow con desenfoques que
  siguen logos reales: `data-box` en `engine.js`). Fondo animado en bucle para la plantilla de cristal: `<video class="bg-loop"
  data-video="../kit/bg/burbujas.mp4">` dentro de `#stage` (también `seda.mp4` y `cintas.mp4`); los clips de Flow se dejan en
  `media/bg/` y `npm run fondos` los convierte en bucle (guía y prompts en `media/kit/bg/README.md`). Plan B: plantilla «cine» (`media/kit/cine.css`, guía y
  prompts para Flow en `media/kit/CINE.md`): clip de Flow a pantalla completa con titular, subtítulos karaoke
  (`data-words`), barra de capítulos (`.hud`) y cámara lenta/zoom (`data-rate`, `data-zoom`); 14 = de idea a
  web en 3 pasos, primer reel con ella. Carruseles de Instagram: `media/carrusel-XX/carrusel.html` (una `.card`
  por imagen, 1080×1350) y `npm run carrusel -- carrusel-01` las guarda en `out/`; logos de marca con
  `data-si="<slug de simple-icons>"`; 01 = «Mis reels se publican solos» (Buffer). Textos de publicación,
  bio y calendario en `media/instagram.md`.
- Generador «Palabra del día»: `npm run reels:palabras` lee `src/content/glosario.ts`, crea
  `media/palabras/<id>/reel.html` + `caption.txt` por término (salvo token y mcp, hechos a mano),
  junta todos los textos en `media/palabras/captions.md` y renderiza los vídeos que falten.
  Opciones: `--only rag,git`, `--no-render`, `--force`. Publicación: programada a mano en
  Meta Business Suite (sin API de Instagram por ahora).
- Segundo curso «Competencias digitales básicas» (nivel cero, basado en DigComp):
  `/competencias-digitales`, contenido en `src/content/competencias.ts` (módulos 0 y 1
  escritos; 2–5 «próximamente»). Las lecciones de ambos cursos usan
  `src/components/ModuleView.tsx`. Los slugs no se repiten entre cursos (el progreso se
  guarda por slug).
- `src/content/curso.ts`: **todo el contenido del curso**. Para publicar un
  módulo, rellenar `objectives`, `sections`, `exercise`, `checklist` y poner
  `available: true`.
- `src/lib/site.ts`: nombre, email de contacto y enlaces sociales.
- Reservas: todos los botones «Reservar» llevan a `/reservar` (`src/app/reservar/page.tsx`).
  Si `site.bookingUrl` (en `src/lib/site.ts`) está vacío, el botón abre un email ya redactado;
  con un enlace, abre el calendario de reservas. Instagram: @vibecodingcoach_ml
  (`site.instagram`) y TikTok @vibecodingcoach_m (`site.tiktok`): tarjetas «Sígueme en redes» en la
  portada (tras «Sobre mí»), iconos en el pie y en el menú móvil (`src/components/SocialLinks.tsx`,
  hover con los colores de cada marca). Instagram también en `/reservar` y en la guía «Mantente al día».

### Curso

- Módulos 0 (Mentalidad y primeros pasos), 1 (Hablar con la IA) y 2 (Lo mínimo de código para no perderte:
  HTML, CSS, el inspector y pedir cambios precisos; enlaza su curso materialdidacticocpweb.vercel.app) y 3
  (Funcionalidad real: frontend/backend/base de datos, formulario con Formspree, Supabase, RLS y claves, IA gratis
  con Gemini en el servidor, pruebas) y 4 (Publicar y compartir: GitHub, Vercel y claves en Environment
  Variables, dominio y DNS, vista previa Open Graph, sitemap y Search Console): escritos y publicados. Los ejemplos de código van en `prompt` con `promptLabel` («Así se ve el HTML»).
- Módulo 5 (Proyecto final): solo título y resumen, «Próximamente»; se escribirá cuando haya alumnos.
- Pendiente de Miguel: revisar el texto de los módulos 0 a 4 para que suene a él.
- Vídeos para YouTube (sin voz ni avatar, decisión de Miguel): `node --no-warnings media/video-curso/leccion.mjs
  modulo-0 [--musica pista.mp3]` crea `media/video-curso/<slug>/reel.html` (1920×1080: diapositivas que se montan
  solas + el texto de la lección en frases al ritmo de lectura) y `descripcion.txt` con capítulos; se renderiza
  con `npm run reel -- video-curso/<slug>`; la música (Biblioteca de audio de YouTube, `musicadefondo.mp3`, no
  versionada) se añade después con `bash media/video-curso/musica.sh <slug>`. Miniatura: `npm run carrusel --
  video-curso/<slug>/miniatura`. Módulo 0 hecho (4:20).
  Alternativa que a Miguel le gustó más: el resumen en vídeo de NotebookLM (Gemini Notebook) del módulo, envuelto con
  nuestra entrada y cierre: `bash media/video-curso/envolver.sh modulo-0 notebooklm.mp4 393.7` (393.7 = segundo
  donde cortar antes de su pantalla final) → `out/<slug>-notebooklm-youtube.mp4`; descripción en
  `descripcion-notebooklm.txt`. Los vídeos de NotebookLM no se versionan. Se suben a mano a YouTube (miniatura,
  lista «Vibe coding desde cero · Curso gratis») y se enlazan en el módulo con `youtube: "<id>"` en `curso.ts`
  (se ve encima de las diapositivas). Publicados: Módulo 0 https://youtu.be/c5AYpVE0K1E · Módulo 1 https://youtu.be/l0BfZHVDGL0
- Vídeos del reproductor: ninguno grabado todavía. Flujo previsto: grabar la narración (con webcam o
  pantalla) pasando las diapositivas en pantalla completa, subir el mp4 (p. ej. a
  `public/videos/` o Vercel Blob) y anotar en `cues` el segundo de cada cambio.

## Pendientes / siguientes pasos

1. Probar a mano el reproductor (botones, teclado, pantalla completa): solo se revisó
   con capturas estáticas, no con clics.
2. Escribir los módulos 2–5 de Competencias. Vídeos de NotebookLM de los módulos 2–4 y actualizar descripciones
   de YouTube: Miguel lo hará todo junto cuando haya más contenido.
3. Enlazar esta web desde miguelliebana.com.
4. Pilotar el Módulo 1 gratis con 2-3 personas y recoger feedback (ver PLAN.md).
5. Darse de alta en Preply / Superprof / ADPList.
6. SEO: `src/app/sitemap.ts` y `robots.ts` (se generan del contenido), enlace canónico en cada página
   (`alternates.canonical`; no ponerlo en el layout) y datos estructurados JSON-LD (`src/components/JsonLd.tsx`,
   `src/lib/seo.ts`): Person + WebSite en la portada, Course en cursos y módulos, DefinedTermSet en el glosario y
   Article en las guías. Google Search Console: propiedad de dominio miguelliebana.com, verificada con un
   registro TXT en los DNS de Vercel (3 oct); sitemap enviado por Miguel. Analítica: Vercel Web Analytics (`<Analytics />` en `layout.tsx`, sin cookies; activarla en el panel de Vercel →
   Analytics). Siguiente: lista de email (MailerLite o Brevo) con un formulario «te aviso de cada módulo nuevo». Imagen para compartir (Open Graph) hecha: `src/app/opengraph-image.png`,
   generada desde `media/og/carrusel.html` con `npm run carrusel -- og` (copiar `out/01.png` encima); `metadataBase`
   en `layout.tsx`. Reservas con la agenda de citas de Google
   Calendar: https://calendar.app.google/uSv5gUWQeJT8efSM6 (Cal.com se abandonó: fallaba
   el inicio de sesión en el móvil).
7. Reels: Miguel prefiere la plantilla de cristal de siempre con fondo animado de Flow (no la «cine», que
   queda como plan B). Fondos listos en `media/kit/bg/`: `burbujas` (el principal), `seda` (centro libre,
   bueno para mucho texto) y `cintas`. Aún no se ha publicado ningún reel con fondo animado.
   Demo de prueba (no versionada): `media/_demo/out/reel-06-con-burbujas.mp4`.
8. Publicación de reels con **Buffer**, automatizada. Organización «My organization» (plan gratis: 3 canales,
   10 publicaciones programadas a la vez). Canales: Instagram @vibecodingcoach_ml (6ac02fceea19ca0bde5b0ee0,
   huecos mar 19:45 / mié 18:25 / jue 10:49) y TikTok @vibecodingcoach_m (6abfd978ea19ca0bde55e36d, huecos
   lun 09:06 / sáb 17:57 / dom 09:09) y YouTube «Vibecodingcoach» (6ac118ecea19ca0bde64c568, huecos jue 20:08 / vie
   18:54 / sáb 19:34; los reels salen como Shorts, categoría 27 Educación, título = primera línea del texto); los huecos se cambian en la web de Buffer (la API no deja).
   - **Orden:** `media/publicar/cola.json` (lista editable a mano: palabras del glosario y reels intercalados).
   - **`npm run publicar`:** mira qué hay ya en Buffer (por el nombre del vídeo), y añade en orden lo que falta, en
     Instagram y TikTok, hasta llenar los 10 huecos. Sube cada vídeo a Vercel Blob (almacén
     `vibecodingcoach-reels`) porque Buffer solo acepta enlaces; Buffer lo coloca en el siguiente hueco libre.
     `--plan` solo enseña lo que haría. Necesita `BUFFER_API_KEY` (de publish.buffer.com/settings/api) y
     `BLOB_READ_WRITE_TOKEN` en `.env.local` (no versionado).
   - **Automático:** `media/publicar/com.vibecodingcoach.publicar.plist` lo lanza cada día a las 09:00 en el Mac
     (instrucciones dentro del archivo; registro en `media/publicar/registro.log`).
   - Sin la clave, Claude hace lo mismo con el MCP de Buffer (`create_post`, Instagram con
     `metadata.instagram = { type: "reel", shouldShareToFeed: true }`; al editar hay que reenviar `assets` y
     `metadata`). Publicar al momento, siempre con confirmación de Miguel.
   - Guía didáctica en la web: `/curso/recursos/publicar-en-automatico` (categoría «Automatizar») y prompt
     `publicar-en-automatico` en la biblioteca. Arranque diario instalado en `~/Library/LaunchAgents`.
   - Estado 3 oct: 10/10 programadas (agente, alucinación, API, backend y reel 11 en las dos redes), todas con
     texto y en automático. Los reels 10, 12 y 13 salieron sin texto. Reels 01, 07 y 08 se publicaron a mano
     (fuera de la cola); el 14 («cine», plan B) tampoco está en la cola. OpusClip MCP conectado, sin usar.

## Avisos

- **Vercel Hobby no permite uso comercial.** Al empezar a cobrar: pasar a Pro
  (~20 $/mes) o mover esta web a Cloudflare Pages / Netlify (gratis con uso comercial).
- **Framer:** se intentó usar `@framer/agent` con un remix de la plantilla
  "Lurais" (proyecto fp7ZKIPuGjEDAUymggZF). Desde la nube falló porque el proxy
  bloquea WebSockets; se abandonó en favor de Next.js. La API key de Framer
  quedó escrita en una conversación anterior: conviene regenerarla en Framer.
- Hay un `PROOF_PROJECT_BRIEF.md` de una sesión anterior (app "ValidaTuIdea")
  que no está en este repo; quedó descartado con el cambio de posicionamiento.
