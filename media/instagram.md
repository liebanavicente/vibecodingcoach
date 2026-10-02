# Instagram · vibecodingcoach

## Bio

```
Miguel Liébana · 14 años de maestro
Te enseño a crear tu primera web con IA, sin saber programar
Curso gratis ↓
```

Enlace: `https://vibecoding.miguelliebana.com/?utm_source=instagram`
(el parámetro `utm_source` permite saber más adelante cuántas visitas llegan desde Instagram).

Fija en el perfil el **reel 01** (presentación): es la mejor carta de visita.

## Series

| Serie | Qué es | De dónde sale el contenido |
|---|---|---|
| Palabra del día | Un término del glosario en ~18 s | `src/content/glosario.ts` (48 palabras) |
| Así no / Así sí | Prompt malo vs prompt bueno | bloques `compare` de los recursos |
| Detector y trucos | Listas rápidas y trucos | recursos «Mantente al día», «Truquillos», «Errores típicos» |

Ritmo propuesto: 3 reels por semana (lunes palabra, miércoles así no / así sí, viernes truco).
Música: añádela desde Instagram al publicar; los reels salen sin sonido.

---

## Reel 02 · Detector de vendehumos

Portada: el primer fotograma con «¿Te quieren vender un curso de IA?».

```
Antes de pagar un curso de IA, pasa el detector.

6 señales de vendehumos:
1. Promete resultados mágicos
2. Nunca enseña el código
3. «Comenta CURSO y te lo envío»
4. Capturas de ingresos sin contexto
5. Comentarios de bots
6. Te mete prisa

¿Ves tres o más? Desconfía.

Soy maestro (14 años en el aula) y enseño a crear webs con IA desde cero. La guía completa, gratis, en el enlace de mi perfil.

Guárdalo para la próxima vez que te salga un anuncio así.

#vibecoding #inteligenciaartificial #ia #aprenderaprogramar #claudeai #cursosonline #emprendedores #tecnologia
```

## Reel 03 · Así no / Así sí

```
El problema no es la IA. Es cómo le hablas.

Así no: «Hazme una web para mi clase».
Así sí: cuéntale quién eres, para qué es, dónde se verá… y pídele que te haga preguntas antes de empezar.

La fórmula: contexto + objetivo + restricciones.

Pruébalo hoy con cualquier IA y cuéntame qué cambia.

Más prompts para copiar en el curso gratuito (enlace en el perfil).

#vibecoding #prompts #inteligenciaartificial #claudeai #chatgpt #ia #aprenderaprogramar #productividad
```

## Reel 04 · Palabra del día: token

```
Palabra del día: token.

Es el trocito en el que la IA divide el texto. Su memoria (la ventana de contexto) y los límites de tu plan se miden en tokens: por eso conviene pasarle solo lo que necesita.

¿Qué palabra quieres que explique en el próximo? Te leo en comentarios.

48 palabras explicadas sin jerga en el glosario gratuito (enlace en el perfil).

#vibecoding #inteligenciaartificial #ia #glosario #aprenderaprogramar #claudeai #tecnologia #educacion
```

## Reel 05 · Palabra del día: MCP

```
Palabra del día: MCP (Model Context Protocol).

Suena a chino, pero es fácil: es darle llaves a la IA para que use tus aplicaciones. Con tu permiso, puede publicar tu web en Vercel, mirar tus reservas en Supabase o ponerte una clase en el calendario.

Ojo: conecta solo lo que necesites. Un conector con acceso a tu correo puede leer tu correo.

¿Qué palabra explico en el próximo? Te leo en comentarios.

Glosario gratuito con 48 palabras, en el enlace del perfil.

#vibecoding #mcp #inteligenciaartificial #claudeai #ia #automatizacion #aprenderaprogramar #tecnologia
```

## Reel 06 · Truco: pide un plan antes del código

```
El truco que más tiempo me ahorra con la IA:

«Antes de escribir nada, explícame cómo lo harías por pasos y espera a que te diga que sí.»

Corregir un plan es gratis. Corregir código, no.

En Claude Code es aún más fácil: Shift + Tab y entras en modo plan.

Guárdalo y pruébalo en tu próximo proyecto. Más trucos gratis en el enlace del perfil.

#vibecoding #claudecode #inteligenciaartificial #productividad #prompts #ia #aprenderaprogramar #trucos
```

## Reel 07 · Mito: ¿necesitas un ordenador de 2.000 €?

```
¿Necesitas un ordenador de 2.000 € para crear webs con IA?

No. La IA trabaja en la nube, no en tu ordenador.

Lo que de verdad importa:
· 8 GB de RAM para empezar (16 GB, lo ideal)
· Un disco SSD
· Buena conexión a internet
· Una gráfica gaming… no hace falta

¿Mac o Windows? Los dos sirven. Si ya tienes ordenador, empieza con él.

Guía completa con precios y qué instalar, gratis en el enlace del perfil.

#vibecoding #inteligenciaartificial #ia #ordenadores #aprenderaprogramar #tecnologia #mac #windows
```

## Reel 08 · Trabajar en equipo: Google Flow + Claude

Rompe el patrón: arranca como una peli de acción, con sonido. Publícalo con su audio original (o baja el volumen si añades música).

```
¿Una peli? No. Un reel hecho entre dos IA.

Google Flow ha generado la escena: el coche, la lluvia, el pit stop y el sonido.
Claude ha escrito el guion, ha montado el vídeo y ha puesto cada texto y cada animación.

Y yo he puesto la idea. Esto es lo que se llama trabajar en equipo.

¿Quieres aprender a hacerlo tú? Curso gratuito en el enlace del perfil.

#vibecoding #googleflow #claudeai #inteligenciaartificial #ia #videoia #creatividad #aprenderaprogramar
```

---

## Próximos reels (misma plantilla)

- Palabra del día: ventana de contexto, alucinación, commit, deploy, RAG.
- Así no / Así sí: pedir un fondo («hazme un fondo bonito»), arreglar un error («arréglalo»).
- Trucos: Git es tu botón de deshacer, una captura vale más que mil palabras.
- Mitos: «La IA te va a quitar el trabajo de aprender», «Hay que saber inglés».
- Errores de principiante: pegar claves en el chat, conversaciones eternas.

Cómo crear uno nuevo: copia la carpeta de un reel parecido en `media/`, cambia los textos y tiempos de su `reel.html` y ejecuta `npm run reel -- <carpeta>`.
