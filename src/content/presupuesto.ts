/** Budget calculator for "Te la hago yo": options, rates and the estimate. Rates are Miguel's to tune here.
 * The estimate is always a range (price and weeks), never a closed quote: it is confirmed in a call. */

export type Range = [number, number];

export const webTypes = [
  { id: "landing", label: "Página de un servicio o evento", hint: "Una sola página para que te escriban o reserven", price: [300, 600], weeks: [1, 2], pages: 1 },
  { id: "portfolio", label: "Portfolio o web personal", hint: "Tu trabajo, tu currículum o tu proyecto", price: [350, 700], weeks: [1, 2], pages: 3 },
  { id: "negocio", label: "Web para tu negocio", hint: "Quién eres, qué ofreces, dónde estás", price: [600, 1200], weeks: [2, 4], pages: 5 },
  { id: "app", label: "Una pequeña app a medida", hint: "Una herramienta que hace algo concreto", price: [1500, 3500], weeks: [4, 8], pages: 3 },
] as const satisfies readonly { id: string; label: string; hint: string; price: Range; weeks: Range; pages: number }[];

export type WebType = (typeof webTypes)[number]["id"];

export const features = [
  { id: "contacto", label: "Formulario de contacto", price: [50, 100], weeks: [0, 0] },
  { id: "reservas", label: "Reservas o citas", price: [300, 600], weeks: [1, 2] },
  { id: "tienda", label: "Tienda o pagos online", price: [600, 1200], weeks: [2, 3] },
  { id: "privada", label: "Área privada con usuarios", price: [400, 800], weeks: [1, 2] },
  { id: "blog", label: "Blog o noticias que actualizas tú", price: [200, 400], weeks: [1, 1] },
  { id: "idiomas", label: "Varios idiomas", price: [200, 400], weeks: [1, 1] },
  { id: "ia", label: "Asistente con IA", price: [200, 400], weeks: [1, 1] },
] as const satisfies readonly { id: string; label: string; price: Range; weeks: Range }[];

export type Feature = (typeof features)[number]["id"];

export const contentOptions = [
  { id: "todo", label: "Tengo textos, fotos y logo", price: [0, 0], weeks: [0, 0] },
  { id: "parte", label: "Tengo una parte", price: [100, 250], weeks: [0, 1] },
  { id: "nada", label: "Necesito ayuda con todo", price: [200, 400], weeks: [1, 1] },
] as const satisfies readonly { id: string; label: string; price: Range; weeks: Range }[];

export type Content = (typeof contentOptions)[number]["id"];

/** Each page beyond those included in the type. */
export const extraPage: Range = [60, 100];
/** Rush: costs more and saves time, never below one week. */
export const rush = { price: 1.25, weeks: 0.6 };
export const maintenance: Range = [20, 40];
export const MAX_PAGES = 20;

export type Answers = {
  type: WebType;
  pages: number;
  features: Feature[];
  content: Content;
  urgent: boolean;
};

export const defaultAnswers: Answers = { type: "negocio", pages: 5, features: ["contacto"], content: "parte", urgent: false };

export type Estimate = { price: Range; weeks: Range; lines: { label: string; price: Range }[] };

const round50 = (n: number) => Math.round(n / 50) * 50;

export function estimate(a: Answers): Estimate {
  const type = webTypes.find((t) => t.id === a.type) ?? webTypes[2];
  const lines: Estimate["lines"] = [{ label: type.label, price: [...type.price] }];
  const weeks: Range = [...type.weeks];

  const extra = Math.max(0, Math.min(a.pages, MAX_PAGES) - type.pages);
  if (extra) lines.push({ label: `${extra} ${extra === 1 ? "página más" : "páginas más"}`, price: [extra * extraPage[0], extra * extraPage[1]] });

  for (const f of features.filter((f) => a.features.includes(f.id))) {
    lines.push({ label: f.label, price: [...f.price] });
    weeks[0] += f.weeks[0];
    weeks[1] += f.weeks[1];
  }
  const content = contentOptions.find((c) => c.id === a.content) ?? contentOptions[1];
  if (content.price[1]) lines.push({ label: "Ayuda con textos e imágenes", price: [...content.price] });
  weeks[0] += content.weeks[0];
  weeks[1] += content.weeks[1];

  let price: Range = [lines.reduce((s, l) => s + l.price[0], 0), lines.reduce((s, l) => s + l.price[1], 0)];
  if (a.urgent) {
    price = [price[0] * rush.price, price[1] * rush.price];
    weeks[0] = Math.max(1, Math.round(weeks[0] * rush.weeks));
    weeks[1] = Math.max(weeks[0], Math.round(weeks[1] * rush.weeks));
  }
  return { price: [round50(price[0]), round50(price[1])], weeks, lines };
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
    `Estimación: ${e.price[0]}–${e.price[1]} € · ${e.weeks[0]}–${e.weeks[1]} semanas`,
  ].join("\n");
}
