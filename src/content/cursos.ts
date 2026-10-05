// Miguel's free courses, in the order he recommends them. Shown on cursos.miguelliebana.com (/cursos) and used by
// the assistant. The two courses in this project count their modules and hours from their own content; the HTML and
// CSS course lives in its own project (fundamentos-html-css), so its figures are written here by hand.
import { availableDigitalModules, digitalModules } from "@/content/competencias";
import { availableModules, modules } from "@/content/curso";
import { siteUrl } from "@/lib/seo";

export const coursesUrl = "https://cursos.miguelliebana.com";
export const htmlCssUrl = "https://html-css.miguelliebana.com";

/** "45 min", "1 h", "1 h 30 min" → minutes; anything else (e.g. "Próximamente") counts as 0. */
function minutes(duration: string) {
  const h = Number(duration.match(/(\d+)\s*h/)?.[1] ?? 0);
  const m = Number(duration.match(/(\d+)\s*min/)?.[1] ?? 0);
  return h * 60 + m;
}

const hours = (list: { duration: string }[]) => {
  const total = list.reduce((sum, m) => sum + minutes(m.duration), 0) / 60;
  return `~${Math.round(total * 2) / 2} h`.replace(".5", ",5");
};

export type Course = {
  id: string;
  title: string;
  level: string;
  /** Who it is for, in one line. */
  forWho: string;
  text: string;
  href: string;
  stats: { label: string; value: string }[];
  learn: string[];
};

export const courses: Course[] = [
  {
    id: "competencias-digitales",
    title: "Competencias digitales básicas",
    level: "Nivel cero",
    forWho: "Si el ordenador o el móvil todavía te imponen.",
    text: "Archivos, internet sin bulos, correo y videollamadas, seguridad y estafas, trámites online y la IA del día a día. Paso a paso y con palabras sencillas.",
    href: `${siteUrl}/competencias-digitales`,
    stats: [
      { label: "Módulos", value: `${availableDigitalModules.length}/${digitalModules.length}` },
      { label: "Duración", value: hours(availableDigitalModules) },
    ],
    learn: ["Ordenar y encontrar tus archivos", "Protegerte de estafas", "Hacer trámites con Cl@ve"],
  },
  {
    id: "html-css",
    title: "HTML y CSS desde cero",
    level: "Principiante",
    forWho: "Si quieres entender cómo está hecha una web por dentro.",
    text: "Lecciones cortas, ejemplos que editas y ves cambiar al momento, y ejercicios con pistas hasta que construyas tu primera página.",
    href: htmlCssUrl,
    stats: [
      { label: "Lecciones", value: "18" },
      { label: "Duración", value: "~11 h" },
      { label: "Ejercicios", value: "50" },
    ],
    learn: ["Escribir tu primera página", "Dar estilo con CSS", "Colocar con Flexbox y Grid"],
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding desde Cero",
    level: "Principiante",
    forWho: "Si quieres construir tu web o tu app con IA, sin saber programar.",
    text: "Cómo hablar con la IA, lo mínimo de código para no perderte, formularios y bases de datos, y publicar tu web con tu propio dominio.",
    href: `${siteUrl}/curso`,
    stats: [
      { label: "Módulos", value: `${availableModules.length}/${modules.length}` },
      { label: "Duración", value: hours(availableModules) },
      { label: "Vídeos", value: String(availableModules.filter((m) => m.youtube).length) },
    ],
    learn: ["Escribir buenos prompts", "Guardar datos con Supabase", "Publicar en Vercel"],
  },
];
