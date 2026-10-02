/** Content blocks shared by the resource guides. Tool names in "tools" must match herramientas.ts. */
export type Block =
  | { type: "text"; text: string }
  | { type: "steps"; title: string; items: string[] }
  | { type: "prompt"; title: string; text: string }
  | { type: "tip"; text: string }
  | { type: "warning"; text: string }
  | { type: "tools"; title: string; items: string[] }
  | { type: "compare"; bad: string; good: string }
  | { type: "cards"; items: { title: string; text: string }[] };

export type Resource = {
  slug: string;
  category: "Skills" | "Revisión" | "Imágenes" | "Truquillos";
  title: string;
  summary: string;
  minutes: number;
  blocks: Block[];
};

export const resources: Resource[] = [
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
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
