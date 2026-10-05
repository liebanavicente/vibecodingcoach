// The 10 points of the Google Maps (Business Profile) review. One source for the self-assessment on the website
// (/comercios/google, where the shop owner answers `pregunta`) and for the PDF report Miguel hands over
// (media/revision-google). Each point scores 0 (falta), 1 (mejorable) or 2 (bien): the review is out of 20.

export type Criterio = {
  id: string;
  titulo: string;
  /** What Miguel looks at when he reviews the profile himself. */
  como: string;
  /** The question for the shop owner, in plain words, with three answers from best to worst. */
  pregunta: string;
  opciones: [string, string, string];
  /** Advice when the point is not "bien". */
  mejora: string;
};

export const criterios: Criterio[] = [
  {
    id: "verificada",
    titulo: "Ficha reclamada y verificada",
    como: "En Maps, ¿sale «¿Es el propietario de este negocio?»? Si sale, nadie la gestiona.",
    pregunta: "¿Puedes entrar tú a cambiar los datos de tu ficha de Google (horario, fotos)?",
    opciones: ["Sí, la gestiono yo", "No lo sé", "No, o no tengo ficha"],
    mejora: "Reclama tu ficha en business.google.com: así solo tú puedes cambiar horarios, fotos y datos.",
  },
  {
    id: "categoria",
    titulo: "Nombre y categoría correctos",
    como: "El nombre es el del rótulo (sin palabras de relleno) y la categoría principal describe lo que vendes.",
    pregunta: "¿Tu ficha dice exactamente qué eres? Por ejemplo, «Pastelería» y no solo «Tienda».",
    opciones: ["Sí", "No estoy seguro", "No"],
    mejora: "Ajusta la categoría principal (p. ej. «Pastelería» en vez de «Tienda») y añade 2 o 3 secundarias.",
  },
  {
    id: "horario",
    titulo: "Horario completo y al día",
    como: "Están todos los días, coinciden con el cartel de la puerta y hay horario especial en festivos.",
    pregunta: "¿El horario de Google es el mismo que el de tu puerta, también en festivos y vacaciones?",
    opciones: ["Sí, siempre", "Casi, pero no pongo los festivos", "No, o no lo sé"],
    mejora: "Revisa el horario y añade los horarios especiales de festivos y vacaciones: evita clientes en la puerta cerrada.",
  },
  {
    id: "contacto",
    titulo: "Teléfono y web",
    como: "Hay un teléfono que se puede pulsar y un enlace a una web (no solo a Instagram o Facebook).",
    pregunta: "¿Tu ficha tiene un teléfono y un enlace a tu propia web?",
    opciones: ["Teléfono y web propia", "Solo teléfono, o enlace a Instagram", "Ninguno de los dos"],
    mejora: "Pon un teléfono que contestes y enlaza una web propia: es lo que más confianza da a quien no te conoce.",
  },
  {
    id: "fotos",
    titulo: "Fotos buenas y recientes",
    como: "Al menos 10 fotos: fachada (para encontrarte), interior, productos y logo. Alguna del último año.",
    pregunta: "¿Cuántas fotos tuyas hay en la ficha (fachada, interior, productos)?",
    opciones: ["10 o más, y alguna reciente", "Menos de 10", "Ninguna, o no lo sé"],
    mejora: "Sube 10 fotos con luz natural: fachada, interior, tus productos estrella y tu logo como foto de perfil.",
  },
  {
    id: "descripcion",
    titulo: "Descripción del negocio",
    como: "En «Información» hay un texto que cuenta qué haces, desde cuándo y qué te diferencia.",
    pregunta: "¿Tu ficha tiene un texto que cuenta qué haces y qué te diferencia?",
    opciones: ["Sí", "Algo muy corto", "No"],
    mejora: "Escribe 3 o 4 frases sobre qué haces y para quién, con las palabras que la gente busca (barrio, especialidad).",
  },
  {
    id: "resenas",
    titulo: "Nota y número de reseñas",
    como: "Bien: 4,3 o más con 20 reseñas o más. Mejorable: buena nota pero pocas reseñas.",
    pregunta: "¿Cuántas reseñas tienes y con qué nota media?",
    opciones: ["20 o más, con 4,3 o más", "Buena nota, pero menos de 20", "Nota baja o casi ninguna"],
    mejora: "Pide reseñas a tus clientes contentos con un QR en el mostrador o un enlace por WhatsApp (nunca reseñas falsas).",
  },
  {
    id: "respuestas",
    titulo: "Respuestas a las reseñas",
    como: "El negocio contesta, sobre todo las reseñas negativas y las de los últimos meses.",
    pregunta: "¿Contestas las reseñas, también las malas?",
    opciones: ["Siempre", "A veces", "Nunca"],
    mejora: "Contesta las reseñas, también las malas, con calma y en dos líneas: los futuros clientes leen tu respuesta.",
  },
  {
    id: "productos",
    titulo: "Productos, servicios o carta",
    como: "La ficha muestra productos, servicios o la carta con precios orientativos.",
    pregunta: "¿Aparecen en tu ficha tus productos, servicios o carta, con precios?",
    opciones: ["Sí", "Algunos", "No"],
    mejora: "Añade tus productos o servicios principales con foto y precio orientativo: ayuda a que te elijan.",
  },
  {
    id: "novedades",
    titulo: "Novedades y detalles",
    como: "Hay alguna publicación de los últimos 3 meses y están marcados atributos útiles (pago con tarjeta, accesible…).",
    pregunta: "¿Has publicado alguna novedad u oferta en tu ficha en los últimos 3 meses?",
    opciones: ["Sí", "Hace más tiempo", "Nunca"],
    mejora: "Publica una novedad al mes (oferta, producto nuevo) y marca los atributos: tarjeta, accesibilidad, wifi…",
  },
];

/** Score of an answer index (0 = best option) on the 0–2 scale. */
export const scoreOf = (option: number) => 2 - option;

export function verdict(total: number): [string, string] {
  if (total >= 16) return ["¡Muy bien!", "Tu ficha está cuidada. Con un par de retoques estarás entre las mejores de tu zona."];
  if (total >= 11) return ["Bien, con margen", "Tienes lo básico. Con las mejoras de abajo, más vecinos te encontrarán y te elegirán."];
  return ["Te estás perdiendo clientes", "Cuando alguien busca lo que vendes cerca, Google enseña antes las fichas más completas."];
}

/** The weakest points first (missing, then improvable), as advice. */
export function topImprovements(scores: Record<string, number>, max = 3) {
  return criterios
    .filter((c) => (scores[c.id] ?? 0) < 2)
    .sort((a, b) => (scores[a.id] ?? 0) - (scores[b.id] ?? 0))
    .slice(0, max);
}
