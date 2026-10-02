import { site } from "@/lib/site";

/** Content blocks shared by the resource guides. Tool names in "tools" must match herramientas.ts. */
export type Block =
  | { type: "text"; text: string }
  | { type: "steps"; title: string; items: string[] }
  | { type: "prompt"; title: string; text: string }
  | { type: "tip"; text: string }
  | { type: "warning"; text: string }
  | { type: "tools"; title: string; items: string[] }
  | { type: "compare"; bad: string; good: string }
  | { type: "cards"; items: { title: string; text: string }[] }
  | { type: "keys"; title: string; items: { key: string; text: string }[] }
  | { type: "dodont"; title: string; items: { bad: string; good: string }[] }
  | { type: "code"; title: string; text: string }
  | { type: "links"; title: string; items: { label: string; href: string; note: string }[] };

export const categories = ["Claude", "Buen uso", "Skills", "Revisión", "Imágenes", "Truquillos"] as const;
export type Category = (typeof categories)[number];

export type Resource = {
  slug: string;
  category: Category;
  title: string;
  summary: string;
  minutes: number;
  blocks: Block[];
};

export const resources: Resource[] = [
  {
    slug: "hablar-con-claude",
    category: "Claude",
    title: "Cómo hablarle a Claude para que te entienda",
    summary: "Seis hábitos sencillos que convierten respuestas genéricas en respuestas que de verdad te sirven.",
    minutes: 5,
    blocks: [
      {
        type: "text",
        text: "Claude no te conoce: no sabe quién eres, qué quieres conseguir ni cuánto sabes. Cuanto mejor se lo cuentes, mejor te responde. No hace falta ningún truco raro: háblale como a un compañero listo que acaba de llegar y todavía no sabe nada de tu proyecto.",
      },
      {
        type: "cards",
        items: [
          { title: "Cuéntale el contexto", text: "Quién eres, para qué es y qué nivel tienes: «Soy maestro, nunca he programado y quiero una web para mis clases»." },
          { title: "Di qué quieres al final", text: "No solo la tarea, también el resultado: «Quiero que las familias la vean bien desde el móvil»." },
          { title: "Enséñale un ejemplo", text: "Una captura, un enlace o un texto que te guste vale más que tres párrafos de explicación." },
          { title: "Pídele que te pregunte", text: "«Antes de empezar, hazme las preguntas que necesites.» Así no tiene que adivinar." },
          { title: "Pide el formato", text: "«En tres pasos», «en una tabla», «en menos de cien palabras». Te lo dará así." },
          { title: "Pide franqueza", text: "«Dime qué fallaría en esta idea.» Si no se lo pides, tiende a ser amable contigo." },
        ],
      },
      {
        type: "compare",
        bad: "Hazme una web para mi clase.",
        good: "Soy maestro de primaria y nunca he programado. Quiero una web sencilla para que las familias vean las tareas de la semana desde el móvil. Antes de empezar, hazme las preguntas que necesites.",
      },
      {
        type: "steps",
        title: "Aprovecha lo que ya sabe hacer",
        items: [
          "Súbele archivos: PDFs, documentos o capturas de pantalla. Los lee y trabaja sobre ellos.",
          "Usa los Proyectos de claude.ai: guardas instrucciones y documentos una vez y Claude los tiene en cuenta en todas las conversaciones de ese proyecto.",
          "Abre una conversación nueva cuando cambies de tema: las conversaciones muy largas acaban perdiendo el hilo.",
        ],
      },
      {
        type: "tip",
        text: "Si la respuesta no te convence, no empieces de cero: di qué no te gusta y por qué. Claude corrige muy bien cuando sabe qué está mal.",
      },
    ],
  },
  {
    slug: "claude-code-primer-dia",
    category: "Claude",
    title: "Claude Code: tu primer día",
    summary: "Qué es, cómo arrancar tu primera sesión y los atajos que vas a usar a diario.",
    minutes: 7,
    blocks: [
      {
        type: "text",
        text: "Claude Code es Claude trabajando directamente en tu ordenador: lee los archivos de tu proyecto, los modifica y ejecuta comandos por ti. Tú le explicas lo que quieres en lenguaje normal y él lo construye, pidiéndote permiso antes de tocar nada importante.",
      },
      { type: "tools", title: "Tu equipo básico", items: ["Claude Code", "GitHub", "Vercel"] },
      {
        type: "steps",
        title: "Tu primera sesión",
        items: [
          "Instálalo siguiendo la guía oficial de Anthropic (busca «Claude Code» en claude.com).",
          "Crea una carpeta para tu proyecto y abre una terminal dentro de ella.",
          "Escribe claude y pulsa Intro. Ya estás hablando con él.",
          "Escribe /init: Claude revisa la carpeta y crea un archivo CLAUDE.md con lo que necesita saber de tu proyecto.",
          "Pídele lo primero con tus palabras: «crea una página de inicio para mi peluquería».",
        ],
      },
      {
        type: "keys",
        title: "Los atajos que más vas a usar",
        items: [
          { key: "Shift + Tab", text: "Cambia de modo. En el modo plan, Claude piensa y te propone un plan sin tocar ningún archivo." },
          { key: "Esc", text: "Para a Claude en seco si ves que va por mal camino." },
          { key: "@", text: "Menciona un archivo concreto: «revisa @index.html»." },
          { key: "/clear", text: "Empieza una conversación limpia cuando cambies de tarea." },
          { key: "/compact", text: "Resume la conversación para liberar espacio sin perder el hilo." },
          { key: "/help", text: "Muestra todos los comandos disponibles." },
        ],
      },
      {
        type: "text",
        text: "El archivo CLAUDE.md es su memoria del proyecto: lo lee siempre al empezar. Apunta ahí lo importante (qué estás construyendo, tus colores, lo que no debe tocar) y no tendrás que repetirlo en cada sesión.",
      },
      {
        type: "prompt",
        title: "Primer mensaje para un proyecto nuevo",
        text: "Quiero crear [qué] para [quién]. Nunca he programado. Antes de escribir código, propón un plan sencillo por pasos y espera a que te diga que sí.",
      },
      {
        type: "tip",
        text: "Puedes arrastrar o pegar capturas de pantalla en la terminal. Si algo se ve mal, enséñaselo en lugar de describirlo.",
      },
      {
        type: "warning",
        text: "Lee lo que te pide antes de aceptar. Al principio, acepta los cambios uno a uno: así entiendes qué está haciendo y aprendes por el camino.",
      },
    ],
  },
  {
    slug: "aprender-con-claude",
    category: "Claude",
    title: "Usa Claude como profesor, no solo como ayudante",
    summary: "Si solo le pides que lo haga, dependes de él. Si le pides que te enseñe, aprendes mientras construyes.",
    minutes: 4,
    blocks: [
      {
        type: "text",
        text: "Es la diferencia entre que te hagan los deberes y que te los expliquen. Claude es un profesor paciente que nunca se cansa de repetir: aprovéchalo. Con cuatro peticiones distintas cambias por completo lo que aprendes.",
      },
      {
        type: "cards",
        items: [
          { title: "Explícame lo que has hecho", text: "«Explícame este código línea a línea como si tuviera doce años.»" },
          { title: "Dame pistas, no la solución", text: "«No me lo resuelvas: dame una pista y deja que lo intente yo.»" },
          { title: "Ponme a prueba", text: "«Hazme cinco preguntas tipo test sobre lo que hemos visto hoy.»" },
          { title: "¿Qué me falta?", text: "«¿Qué debería aprender para entender esto por mí mismo? Dámelo en orden.»" },
        ],
      },
      {
        type: "compare",
        bad: "Arréglame esto.",
        good: "Arréglame esto y explícame en dos frases qué estaba mal, para que no me vuelva a pasar.",
      },
      {
        type: "prompt",
        title: "Prompt de profesor particular",
        text: "A partir de ahora actúa como mi profesor. Soy principiante. Cuando te pregunte algo, explícamelo con un ejemplo sencillo, comprueba con una pregunta que lo he entendido y no avances hasta que responda.",
      },
      {
        type: "tip",
        text: "Al terminar cada sesión, pídele un resumen de lo que has aprendido en cinco puntos y guárdalo. En un mes tendrás tus propios apuntes.",
      },
    ],
  },
  {
    slug: "conecta-tus-herramientas",
    category: "Claude",
    title: "Conecta Claude con tus herramientas",
    summary: "Con los conectores, Claude puede publicar tu web, consultar tu base de datos o mirar tu calendario por ti.",
    minutes: 5,
    blocks: [
      {
        type: "text",
        text: "Por defecto Claude solo ve lo que le escribes. Los conectores (también llamados MCP) son como darle las llaves de otras aplicaciones: puede publicar tu web en Vercel, mirar los datos de tu Supabase o crear un evento en tu calendario, siempre con tu permiso.",
      },
      { type: "tools", title: "Algunos que uso", items: ["Vercel", "Supabase", "GitHub", "Figma"] },
      {
        type: "steps",
        title: "Cómo activarlos",
        items: [
          "En claude.ai: Ajustes → Conectores, y eliges los que quieras.",
          "En Claude Code: escribe /mcp para ver tus conectores y su estado, o añade uno nuevo con el comando claude mcp add.",
          "Autoriza la conexión en la web del servicio cuando te lo pida.",
          "Pídeselo con tus palabras: «publica esta web en Vercel».",
        ],
      },
      {
        type: "text",
        text: "Esta misma web se publicó así: Claude Code creó el proyecto en Vercel, le asignó el dominio y comprobó que funcionaba, sin que yo tuviera que abrir el panel de Vercel.",
      },
      {
        type: "warning",
        text: "Conecta solo lo que necesites y revisa qué permisos das. Un conector con acceso a tu correo puede leer tu correo.",
      },
    ],
  },
  {
    slug: "ventana-de-contexto",
    category: "Buen uso",
    title: "La ventana de contexto: la memoria de trabajo de la IA",
    summary: "Por qué la IA «se olvida» de lo que le dijiste hace un rato y cómo evitarlo.",
    minutes: 5,
    blocks: [
      {
        type: "text",
        text: "La IA no lo recuerda todo para siempre. Trabaja con una «ventana de contexto», que es como una mesa de tamaño fijo: todo lo que hay en la conversación (tus mensajes, sus respuestas, los archivos que lee) ocupa sitio. Cuando la mesa se llena, lo más antiguo se resume o se pierde, y empieza a olvidar detalles.",
      },
      {
        type: "dodont",
        title: "Mal uso vs buen uso",
        items: [
          { bad: "Una sola conversación eterna para todo el proyecto.", good: "Una conversación por tarea. Al terminar, /clear o conversación nueva." },
          { bad: "Pegar archivos enteros «por si acaso».", good: "Darle solo lo que necesita: el archivo o la parte concreta." },
          { bad: "Repetir las mismas instrucciones en cada sesión.", good: "Guardarlas en CLAUDE.md o en un Proyecto de claude.ai: se cargan solas." },
          { bad: "Seguir adelante cuando ya no se acuerda de lo que pediste.", good: "Pedir un resumen, guardarlo y empezar limpio a partir de él." },
        ],
      },
      {
        type: "steps",
        title: "Señales de que la mesa está llena",
        items: [
          "Repite errores que ya habíais corregido.",
          "Se olvida de decisiones que tomasteis hace un rato.",
          "Sus respuestas se vuelven más genéricas o más lentas.",
        ],
      },
      {
        type: "keys",
        title: "En Claude Code",
        items: [
          { key: "/context", text: "Muestra cuánto espacio de la ventana estás usando." },
          { key: "/compact", text: "Resume la conversación para liberar sitio sin perder el hilo." },
          { key: "/clear", text: "Vacía la mesa y empieza de cero." },
        ],
      },
      {
        type: "tip",
        text: "Al empezar una tarea grande, pídele que lea solo los archivos que importan y que te cuente qué ha entendido antes de tocar nada. Así no llena la mesa leyendo de más.",
      },
    ],
  },
  {
    slug: "orden-de-carpetas",
    category: "Buen uso",
    title: "Ordena tus proyectos (y la IA te lo agradecerá)",
    summary: "La IA trabaja dentro de la carpeta en la que la abres. Si todo está mezclado, ella también mezcla.",
    minutes: 4,
    blocks: [
      {
        type: "text",
        text: "Cuando abres Claude Code o Cursor, la IA ve todo lo que hay en esa carpeta. Si ahí conviven tres proyectos, fotos de las vacaciones y una carpeta llamada «nueva carpeta (2)», se confundirá, leerá de más y llenará su ventana de contexto con cosas que no tocan.",
      },
      {
        type: "dodont",
        title: "Mal uso vs buen uso",
        items: [
          { bad: "Proyectos sueltos en el Escritorio o en Descargas.", good: "Una carpeta madre (por ejemplo, Proyectos) y una subcarpeta por proyecto." },
          { bad: "Nombres como «web final DEFINITIVA 2».", good: "Nombres cortos, en minúsculas y sin espacios: peluqueria-web." },
          { bad: "Abrir la IA en tu carpeta de usuario, con todo tu ordenador a la vista.", good: "Abrirla siempre dentro de la carpeta del proyecto." },
          { bad: "Hacer copias de seguridad duplicando carpetas.", good: "Guardar versiones con Git (mira la guía de Git y GitHub)." },
        ],
      },
      {
        type: "code",
        title: "Una estructura que funciona",
        text: "Proyectos/\n├── peluqueria-web/\n│   ├── CLAUDE.md      ← lo que la IA debe saber\n│   ├── README.md      ← qué es y cómo arrancarlo\n│   ├── .env           ← tus claves (nunca a GitHub)\n│   └── src/           ← el código\n└── web-del-cole/\n    └── ...",
      },
      {
        type: "prompt",
        title: "Pídele que ordene por ti",
        text: "Revisa esta carpeta y propón una estructura ordenada. Explícame qué va en cada sitio y qué moverías, y espera a que te diga que sí antes de mover nada.",
      },
      {
        type: "warning",
        text: "Las contraseñas y claves van en un archivo .env, y ese archivo debe estar en el .gitignore para que nunca se suba a GitHub.",
      },
    ],
  },
  {
    slug: "git-y-github",
    category: "Buen uso",
    title: "Git y GitHub en 5 minutos",
    summary: "La máquina del tiempo de tu proyecto, explicada sin tecnicismos.",
    minutes: 6,
    blocks: [
      {
        type: "text",
        text: "Git es una máquina del tiempo para tu proyecto: guarda fotos de cómo estaba en cada momento, y puedes volver a cualquiera de ellas. GitHub es la nube donde guardas esas fotos para no perderlas, compartirlas y publicar tu web desde ahí.",
      },
      { type: "tools", title: "Lo que vas a usar", items: ["GitHub", "Claude Code"] },
      {
        type: "cards",
        items: [
          { title: "Repositorio", text: "La carpeta de tu proyecto junto con todo su historial." },
          { title: "Commit", text: "Una foto del proyecto con un mensaje: «añado el formulario de contacto»." },
          { title: "Push", text: "Subir tus commits a GitHub." },
          { title: "Pull", text: "Bajar a tu ordenador los cambios que hay en GitHub." },
          { title: "Rama", text: "Una copia paralela para probar algo sin romper lo que ya funciona." },
          { title: ".gitignore", text: "La lista de archivos que Git no debe guardar nunca, como tu .env." },
        ],
      },
      {
        type: "steps",
        title: "Tu primer repositorio, con ayuda de la IA",
        items: [
          "Crea una cuenta gratuita en github.com.",
          "Dentro de tu proyecto, pide: «inicializa Git, haz el primer commit y súbelo a un repositorio nuevo de GitHub».",
          "Cada vez que algo funcione: «haz commit de esto con un mensaje claro».",
          "Para volver atrás: «enséñame los últimos commits y vuelve al que funcionaba».",
        ],
      },
      {
        type: "dodont",
        title: "Mal uso vs buen uso",
        items: [
          { bad: "Un único commit gigante al final del día.", good: "Commits pequeños cada vez que algo funciona." },
          { bad: "Mensajes como «cambios» o «arreglo».", good: "Mensajes que dicen qué y por qué: «arreglo el botón de reservar en móvil»." },
          { bad: "Subir el archivo .env con tus claves.", good: "Comprobar que .env aparece en el .gitignore antes del primer push." },
        ],
      },
      {
        type: "keys",
        title: "Los comandos que verás pasar (no hace falta memorizarlos)",
        items: [
          { key: "git status", text: "Qué ha cambiado desde la última foto." },
          { key: "git add .", text: "Prepara los cambios para la foto." },
          { key: "git commit -m", text: "Hace la foto con su mensaje." },
          { key: "git push", text: "Sube las fotos a GitHub." },
          { key: "git log", text: "Muestra el historial de fotos." },
        ],
      },
      {
        type: "warning",
        text: "Si la IA va a ejecutar algo con «reset --hard» o «--force», pregúntale antes qué se va a perder. Son los comandos de Git que pueden borrar trabajo de verdad.",
      },
    ],
  },
  {
    slug: "despliegues-vercel",
    category: "Buen uso",
    title: "Publica en Vercel sin sustos",
    summary: "De tu ordenador a una web con dirección propia, y qué hacer cuando algo falla.",
    minutes: 5,
    blocks: [
      {
        type: "text",
        text: "Vercel convierte tu proyecto en una web con dirección propia. Lo más cómodo es conectarlo a tu repositorio de GitHub: cada vez que subes cambios, la web se actualiza sola. Así se publica esta misma web.",
      },
      { type: "tools", title: "La cadena completa", items: ["GitHub", "Vercel", "Next.js"] },
      {
        type: "steps",
        title: "La primera vez",
        items: [
          "Sube tu proyecto a GitHub (mira la guía de Git y GitHub).",
          "Entra en vercel.com con tu cuenta de GitHub y pulsa Add New → Project.",
          "Elige tu repositorio y pulsa Deploy. En un par de minutos tendrás un enlace .vercel.app.",
          "Para usar tu propio dominio: en el proyecto, Settings → Domains.",
        ],
      },
      {
        type: "text",
        text: "Cada push a la rama principal publica la web «de verdad» (producción). Las demás ramas crean una vista previa con su propio enlace: perfecta para enseñar un cambio antes de publicarlo.",
      },
      {
        type: "dodont",
        title: "Mal uso vs buen uso",
        items: [
          { bad: "Publicar sin haberlo probado en tu ordenador.", good: "Probar antes con npm run dev, y npm run build para detectar errores." },
          { bad: "Escribir las claves dentro del código.", good: "Guardarlas en Settings → Environment Variables de Vercel." },
          { bad: "Agobiarse cuando el despliegue falla.", good: "Abrir el registro del despliegue, copiar el error y pegárselo a la IA." },
        ],
      },
      {
        type: "tip",
        text: "Si algo se rompe en la web publicada, en Vercel puedes volver al despliegue anterior en un clic mientras lo arreglas con calma.",
      },
      {
        type: "warning",
        text: "El plan gratuito (Hobby) es para proyectos personales y no comerciales. Si vas a cobrar a través de tu web, revisa el plan Pro.",
      },
    ],
  },
  {
    slug: "skills",
    category: "Skills",
    title: "Skills: dale superpoderes a tu agente",
    summary: "Instrucciones empaquetadas que enseñan a tu agente a hacer algo concreto, y dónde encontrarlas.",
    minutes: 5,
    blocks: [
      {
        type: "text",
        text: "Una skill es una carpeta con un archivo SKILL.md: instrucciones, ejemplos y a veces pequeños scripts que tu agente lee cuando la tarea lo necesita. Es como darle a tu ayudante el manual de un experto justo en el momento en que lo va a usar.",
      },
      { type: "tools", title: "Funcionan con", items: ["Claude Code", "Codex", "Cursor"] },
      {
        type: "steps",
        title: "Dónde buscarlas",
        items: [
          "En los repositorios oficiales: Anthropic publica skills de ejemplo en github.com/anthropics/skills.",
          "En los marketplaces de plugins: en Claude Code escribe /plugin para explorar e instalar plugins que traen skills.",
          "En la documentación de tus herramientas: muchas publican la suya. La de Supabase, por ejemplo, se instala con «npx skills add supabase/agent-skills».",
          "En GitHub: busca «SKILL.md» junto al tema que te interese, por ejemplo «SKILL.md diseño web».",
        ],
      },
      {
        type: "prompt",
        title: "Pídele que la use",
        text: "Tengo instalada la skill de [nombre]. Úsala para [tarea] y dime en qué parte del proceso la has aplicado.",
      },
      {
        type: "warning",
        text: "Instala solo skills de fuentes que conozcas: pueden incluir scripts que se ejecutan en tu ordenador. Léelas antes, igual que leerías un programa antes de instalarlo.",
      },
      {
        type: "tip",
        text: "¿No encuentras la que necesitas? Pídele a tu agente que te ayude a escribir la tuya: describe la tarea que repites siempre y conviértela en una skill.",
      },
    ],
  },
  {
    slug: "segunda-opinion",
    category: "Revisión",
    title: "Usa otra IA como revisora",
    summary: "Ninguna IA acierta siempre. Pon a una a revisar el trabajo de otra y caza los errores antes que tus usuarios.",
    minutes: 4,
    blocks: [
      {
        type: "text",
        text: "Cada modelo tiene sus puntos fuertes y sus manías. Cuando algo importa (un plan, un diseño, un trozo de código), pídele a una segunda IA que lo revise. Es como enseñarle tu trabajo a un compañero antes de entregarlo.",
      },
      { type: "tools", title: "Combinaciones que uso", items: ["Claude", "Codex", "ChatGPT", "Gemini"] },
      {
        type: "cards",
        items: [
          { title: "Comparar", text: "Haz la misma pregunta a dos IAs y quédate con lo mejor de cada respuesta." },
          { title: "Revisar", text: "Pega el resultado de una IA en otra y pídele que busque errores y riesgos." },
          {
            title: "Repartir",
            text: "Planifica con una y construye con otra. El vídeo de esta web: el guion lo escribió Codex y el montaje lo hizo Claude Code.",
          },
        ],
      },
      {
        type: "prompt",
        title: "Prompt para pedir una revisión",
        text: "Actúa como revisor exigente. Esto lo ha hecho otra IA para conseguir [objetivo]: [pega aquí el resultado]. Busca errores, cosas que se puedan simplificar y riesgos. Ordénalos de más a menos importante y no reescribas nada todavía.",
      },
      {
        type: "tip",
        text: "Dile siempre a la revisora qué querías conseguir. Sin ese contexto revisará lo que ella haría, no lo que tú necesitas.",
      },
      {
        type: "warning",
        text: "Si dos IAs no se ponen de acuerdo, no elijas a ciegas: pide a cada una que justifique su respuesta y decide tú.",
      },
    ],
  },
  {
    slug: "fondos-e-imagenes",
    category: "Imágenes",
    title: "Fondos e imágenes que no parecen de plantilla",
    summary: "Buscarlos bien en Google Imágenes o pedírselos a la IA, y prepararlos para que tu web vuele.",
    minutes: 6,
    blocks: [
      {
        type: "text",
        text: "Un buen fondo cambia por completo cómo se ve una web. Tienes dos caminos: buscar imágenes que puedas usar legalmente o generarlas tú con IA. Los fondos de esta web, por ejemplo, están generados con IA.",
      },
      {
        type: "steps",
        title: "Buscarlos en Google Imágenes",
        items: [
          "Busca algo descriptivo, mejor en inglés: «abstract glass background peach».",
          "Abre Herramientas → Derechos de uso y elige Licencias Creative Commons.",
          "Entra en la web original y comprueba la licencia antes de usar la imagen.",
          "Alternativas con licencia libre para uso comercial: Unsplash y Pexels.",
        ],
      },
      { type: "tools", title: "Para generarlos", items: ["Higgsfield", "Google Flow", "Gemini", "ChatGPT"] },
      {
        type: "steps",
        title: "Generarlos con IA",
        items: [
          "Describe el estilo, los colores y la composición, no solo el tema.",
          "Pide formato vertical (9:16) para móvil y horizontal (16:9) para escritorio.",
          "Deja espacio vacío donde irá el texto.",
          "Para fondos en movimiento o vídeos cortos, Google Flow genera clips a partir de una descripción.",
        ],
      },
      {
        type: "compare",
        bad: "Hazme un fondo bonito para mi web.",
        good: "Fondo abstracto estilo cristal: burbujas translúcidas en melocotón y coral sobre blanco cálido, luz suave, centro despejado para texto, sin letras ni logos, formato vertical 9:16.",
      },
      {
        type: "prompt",
        title: "Prompt de fondo listo para copiar",
        text: "Fondo abstracto para una web, estilo glassmorphism: formas de cristal translúcido y burbujas suaves, tonos melocotón y naranja coral sobre blanco cálido, iluminación suave. Centro despejado para poner texto encima. Sin texto, sin logos, sin personas. Formato vertical 9:16.",
      },
      {
        type: "tip",
        text: "Antes de subirla, pide a tu agente: «convierte esta imagen a WebP con buena calidad». Los fondos de esta web pasaron de más de 1 MB a unos 20 KB cada uno sin que se note la diferencia.",
      },
      {
        type: "warning",
        text: "No uses imágenes con marcas, logos de otros o personas reconocibles sin permiso, aunque las haya generado una IA.",
      },
    ],
  },
  {
    slug: "truquillos",
    category: "Truquillos",
    title: "Truquillos que ahorran horas",
    summary: "Pequeños hábitos que marcan la diferencia entre pelearte con la IA y trabajar con ella.",
    minutes: 5,
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Pide un plan antes del código", text: "Empieza con «antes de escribir nada, explícame cómo lo harías». Corregir un plan es gratis; corregir código, no." },
          { title: "Una captura vale más que mil palabras", text: "Si algo se ve mal, haz una captura de pantalla y pégasela. La IA entiende imágenes." },
          { title: "Git es tu botón de deshacer", text: "Guarda una versión cada vez que algo funcione. Si la IA rompe algo, vuelves atrás en un segundo." },
          { title: "Pide que lo compruebe", text: "Termina tus peticiones con «y compruébalo antes de decirme que está hecho»." },
          { title: "Una cosa cada vez", text: "Si pides cinco cambios a la vez y algo falla, no sabrás cuál fue." },
          { title: "Pregunta el porqué", text: "Cuando algo funcione y no sepas por qué, pregúntalo. Así aprendes y no dependes." },
        ],
      },
      {
        type: "text",
        text: "Y el truco que más uso: las sesiones largas acaban perdiendo el hilo. Antes de cerrar una, pide un resumen en un archivo y empieza la siguiente pidiéndole que lo lea.",
      },
      {
        type: "prompt",
        title: "Prompt para cambiar de sesión sin perder nada",
        text: "Antes de cerrar, crea un archivo CONTEXTO.md con: qué hemos hecho, las decisiones que tomamos y por qué, qué queda pendiente y cualquier aviso importante para la próxima sesión.",
      },
      {
        type: "compare",
        bad: "Arréglalo.",
        good: "Al pulsar «Enviar» no pasa nada y en la consola aparece este error: [error]. Explícame la causa y arréglalo sin tocar el diseño.",
      },
    ],
  },
  {
    slug: "mantente-al-dia",
    category: "Truquillos",
    title: "Mantente al día sin volverte loco",
    summary: "A quién seguir y dónde mirar para enterarte de repositorios, skills y novedades antes que nadie.",
    minutes: 4,
    blocks: [
      {
        type: "text",
        text: "Las herramientas de IA cambian cada semana: salen funciones nuevas, skills, repositorios que te ahorran días de trabajo. No hace falta leerlo todo. Basta con seguir a unas pocas personas que lo prueban por ti y dedicarle diez minutos al día.",
      },
      {
        type: "cards",
        items: [
          { title: "X (Twitter)", text: "Lo más rápido: los equipos anuncian ahí primero. Sigue las cuentas oficiales, como @AnthropicAI y @claudeai, y a quienes las comentan con ejemplos." },
          { title: "YouTube", text: "Para verlo funcionando. Busca «Claude Code» o «vibe coding» y filtra por «esta semana»." },
          { title: "LinkedIn", text: "Casos reales de gente aplicándolo en su trabajo, muchos en español." },
          { title: "GitHub", text: "Repositorios en tendencia y listas «awesome» que recopilan skills, plantillas y herramientas." },
          { title: "Reddit", text: "Dudas y trucos de gente como tú. r/ClaudeAI es un buen punto de partida." },
        ],
      },
      {
        type: "steps",
        title: "Cómo encontrar a buenas personas que seguir",
        items: [
          "Busca el nombre de la herramienta y ordena por lo más reciente.",
          "Quédate con quien enseña proyectos reales y comparte el código, no solo titulares.",
          "Mira a quién siguen y citan esas personas: así llegas a las mejores.",
          "Haz una lista solo para IA y repásala diez minutos al día.",
        ],
      },
      {
        type: "links",
        title: "Fuentes oficiales para tener a mano",
        items: [
          { label: "Novedades de Anthropic", href: "https://www.anthropic.com/news", note: "Modelos y funciones nuevas de Claude." },
          { label: "Versiones de Claude Code", href: "https://github.com/anthropics/claude-code/releases", note: "Qué cambia en cada versión. Actívale el aviso con Watch." },
          { label: "Skills oficiales de Anthropic", href: "https://github.com/anthropics/skills", note: "Ejemplos listos para usar o adaptar." },
          { label: "Tendencias de GitHub", href: "https://github.com/trending", note: "Los repositorios que más crecen hoy." },
          { label: "Novedades de Vercel", href: "https://vercel.com/changelog", note: "Cambios en la plataforma donde publicas." },
          { label: "Comunidad r/ClaudeAI", href: "https://www.reddit.com/r/ClaudeAI/", note: "Preguntas, trucos y experiencias reales." },
        ],
      },
      {
        type: "tip",
        text: "En GitHub, pulsa Watch → Custom → Releases en los repositorios que uses: te avisará solo cuando salga una versión nueva, sin llenarte el correo.",
      },
      {
        type: "prompt",
        title: "Cuando veas una novedad, pásasela a Claude",
        text: "Te paso esto sobre [novedad]: [enlace o texto]. Explícame en tres frases qué es, si me sirve para mi proyecto de [tu proyecto] y cómo lo probaría sin romper nada.",
      },
      {
        type: "warning",
        text: "Que algo sea viral no significa que sea fiable. Mira la fecha, pruébalo primero en un proyecto de prueba y desconfía de repositorios o skills sin historial: pueden ejecutar código en tu ordenador.",
      },
      {
        type: "links",
        title: "Y si quieres, sígueme",
        items: [{ label: "Miguel Liébana en LinkedIn", href: site.linkedin, note: "Comparto lo que voy aprendiendo y los proyectos que construyo." }],
      },
    ],
  },
  {
    slug: "errores-tipicos",
    category: "Truquillos",
    title: "Los errores que cometemos todos al empezar",
    summary: "Y cómo evitarlos desde el primer día. Yo los he cometido todos.",
    minutes: 4,
    blocks: [
      {
        type: "cards",
        items: [
          { title: "Pedirlo todo de golpe", text: "Divide en pasos pequeños y comprueba cada uno antes de pasar al siguiente." },
          { title: "Aceptar sin leer", text: "Lee al menos qué archivos va a cambiar. Si no entiendes algo, pregunta antes de aceptar." },
          { title: "No guardar versiones", text: "Usa Git o, como mínimo, copia la carpeta cada vez que algo funcione." },
          { title: "Conversaciones eternas", text: "Cuando una conversación se alarga mucho, la calidad baja. Pide un resumen y empieza otra." },
          { title: "Dar por hecho que funciona", text: "Ábrelo tú en el navegador y en el móvil. Que no dé errores no significa que haga lo que querías." },
          { title: "Pegar contraseñas en el chat", text: "Nunca pegues claves de API ni contraseñas. Si se te escapa una, cámbiala en el servicio." },
        ],
      },
      {
        type: "warning",
        text: "El último es el más serio: lo que pegas en un chat queda guardado. Trata las claves como las llaves de casa.",
      },
      {
        type: "prompt",
        title: "Prompt de rescate cuando todo se ha liado",
        text: "Para. No cambies nada más. Explícame en qué estado está el proyecto, qué has cambiado en los últimos pasos y cuál crees que es el problema. Después propón cómo volver a la última versión que funcionaba.",
      },
    ],
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
