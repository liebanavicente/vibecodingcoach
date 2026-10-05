/** Budget calculator for "Te la hago yo": options, hours and the estimate. Miguel tunes the hours and the rate here.
 * Prices are hours × the same hourly rate as his classes (launch price), so building and teaching stay consistent.
 * The estimate is always a range (hours, price and weeks), never a closed quote: it is confirmed in a call. */

export type Range = [number, number];

/** €/hour, the same as a 1:1 class. */
export const RATE = 25;
/** Rounds of changes included; more are charged by the hour. */
export const REVISIONS = 2;

export const webTypes = [
  { id: "landing", label: "Página de un servicio o evento", hint: "Una sola página para que te escriban o reserven", hours: [6, 10], weeks: [1, 2], pages: 1 },
  { id: "portfolio", label: "Portfolio o web personal", hint: "Tu trabajo, tu currículum o tu proyecto", hours: [8, 14], weeks: [1, 2], pages: 3 },
  { id: "negocio", label: "Web para tu negocio", hint: "Quién eres, qué ofreces, dónde estás", hours: [14, 24], weeks: [2, 4], pages: 5 },
  { id: "app", label: "Una pequeña app a medida", hint: "Una herramienta que hace algo concreto", hours: [30, 60], weeks: [4, 8], pages: 3 },
] as const satisfies readonly { id: string; label: string; hint: string; hours: Range; weeks: Range; pages: number }[];

export type WebType = (typeof webTypes)[number]["id"];

export const features = [
  { id: "contacto", label: "Formulario de contacto", hours: [1, 2], weeks: [0, 0] },
  { id: "reservas", label: "Reservas o citas", hours: [6, 12], weeks: [1, 1] },
  { id: "tienda", label: "Tienda o pagos online", hours: [12, 24], weeks: [1, 2] },
  { id: "privada", label: "Área privada con usuarios", hours: [10, 20], weeks: [1, 2] },
  { id: "blog", label: "Blog o noticias que actualizas tú", hours: [4, 8], weeks: [0, 1] },
  { id: "idiomas", label: "Varios idiomas", hours: [4, 8], weeks: [0, 1] },
  { id: "ia", label: "Asistente con IA", hours: [4, 8], weeks: [0, 1] },
] as const satisfies readonly { id: string; label: string; hours: Range; weeks: Range }[];

export type Feature = (typeof features)[number]["id"];

export const contentOptions = [
  { id: "todo", label: "Tengo textos, fotos y logo", hours: [0, 0], weeks: [0, 0] },
  { id: "parte", label: "Tengo una parte", hours: [2, 4], weeks: [0, 1] },
  { id: "nada", label: "Necesito ayuda con todo", hours: [4, 8], weeks: [1, 1] },
] as const satisfies readonly { id: string; label: string; hours: Range; weeks: Range }[];

export type Content = (typeof contentOptions)[number]["id"];

/** Hours for each page beyond those included in the type. */
export const extraPage: Range = [1.5, 2];
/** Rush: costs more and saves time, never below one week. */
export const rush = { price: 1.15, weeks: 0.6 };
export const maintenance: Range = [15, 25];
export const MAX_PAGES = 20;

export type Answers = {
  type: WebType;
  pages: number;
  features: Feature[];
  content: Content;
  urgent: boolean;
};

export const defaultAnswers: Answers = { type: "negocio", pages: 5, features: ["contacto"], content: "parte", urgent: false };

/** Keeps only valid values, whatever the model or the browser sent. */
export function cleanAnswers(raw: Partial<Answers>): Answers {
  const type = webTypes.some((t) => t.id === raw.type) ? raw.type! : "negocio";
  const pages = Math.min(MAX_PAGES, Math.max(1, Math.round(Number(raw.pages) || webTypes.find((t) => t.id === type)!.pages)));
  return {
    type,
    pages,
    features: features.map((f) => f.id).filter((id) => raw.features?.includes(id)),
    content: contentOptions.some((c) => c.id === raw.content) ? raw.content! : "parte",
    urgent: raw.urgent === true,
  };
}

export type Estimate = { hours: Range; price: Range; weeks: Range; lines: { label: string; hours: Range; price: Range }[] };

const round25 = (n: number) => Math.round(n / 25) * 25;
const euros = (h: Range): Range => [h[0] * RATE, h[1] * RATE];

export function estimate(a: Answers): Estimate {
  const type = webTypes.find((t) => t.id === a.type) ?? webTypes[2];
  const lines: Estimate["lines"] = [{ label: type.label, hours: [...type.hours], price: euros(type.hours) }];
  const weeks: Range = [...type.weeks];

  const extra = Math.max(0, Math.min(a.pages, MAX_PAGES) - type.pages);
  if (extra) {
    const h: Range = [extra * extraPage[0], extra * extraPage[1]];
    lines.push({ label: `${extra} ${extra === 1 ? "página más" : "páginas más"}`, hours: h, price: euros(h) });
  }
  for (const f of features.filter((f) => a.features.includes(f.id))) {
    lines.push({ label: f.label, hours: [...f.hours], price: euros(f.hours) });
    weeks[0] += f.weeks[0];
    weeks[1] += f.weeks[1];
  }
  const content = contentOptions.find((c) => c.id === a.content) ?? contentOptions[1];
  if (content.hours[1]) lines.push({ label: "Ayuda con textos e imágenes", hours: [...content.hours], price: euros(content.hours) });
  weeks[0] += content.weeks[0];
  weeks[1] += content.weeks[1];

  const hours: Range = [Math.round(lines.reduce((s, l) => s + l.hours[0], 0)), Math.round(lines.reduce((s, l) => s + l.hours[1], 0))];
  const factor = a.urgent ? rush.price : 1;
  if (a.urgent) {
    weeks[0] = Math.max(1, Math.round(weeks[0] * rush.weeks));
    weeks[1] = Math.max(weeks[0], Math.round(weeks[1] * rush.weeks));
  }
  return { hours, price: [round25(hours[0] * RATE * factor), round25(hours[1] * RATE * factor)], weeks, lines };
}

/** Plain-text summary for the email and the AI explanation. */
export function summary(a: Answers, e: Estimate) {
  const type = webTypes.find((t) => t.id === a.type)?.label;
  const feats = features.filter((f) => a.features.includes(f.id)).map((f) => f.label);
  const content = contentOptions.find((c) => c.id === a.content)?.label;
  return [
    `Tipo: ${type}`,
    `Páginas: ${a.pages}`,
    `Funciones: ${feats.length ? feats.join(", ") : "ninguna extra"}`,
    `Contenido: ${content}`,
    `Urgente: ${a.urgent ? "sí" : "no"}`,
    `Estimación: ${e.hours[0]}–${e.hours[1]} horas a ${RATE} €/h = ${e.price[0]}–${e.price[1]} €${a.urgent ? " (con urgencia)" : ""} · ${e.weeks[0]}–${e.weeks[1]} semanas`,
    `Incluye ${REVISIONS} rondas de cambios. Precio de lanzamiento.`,
  ].join("\n");
}
