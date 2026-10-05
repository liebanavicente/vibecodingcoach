// "Herramienta de encargo" (/encargo): the questions a client answers so Miguel gets a complete brief. The website part
// (type, pages, features, urgency) uses the calculator's answers, so the estimate is the same everywhere.
import { type Answers, cleanAnswers, contentOptions, estimate, features, summary, webTypes } from "@/content/presupuesto";

export const goals = [
  "Que me llamen",
  "Que me escriban por WhatsApp",
  "Que reserven cita",
  "Que compren online",
  "Que vengan a la tienda",
  "Que pidan presupuesto",
  "Que me conozcan",
] as const;

export const assets = ["Logo", "Fotos propias", "Textos", "Dominio (tunegocio.com)", "Ficha en Google Maps", "Redes sociales"] as const;

export const styles = [
  { id: "calido", label: "Cálido y cercano", colors: ["#ff9a6b", "#ffe1cf", "#7a4b35"] },
  { id: "minimal", label: "Limpio y minimalista", colors: ["#ffffff", "#e7e9ee", "#141722"] },
  { id: "elegante", label: "Elegante", colors: ["#1d1d1f", "#c8a96a", "#f4efe6"] },
  { id: "colorido", label: "Divertido y colorido", colors: ["#ff5ea8", "#ffd23f", "#3bceac"] },
  { id: "natural", label: "Natural", colors: ["#6b8f71", "#e9e4d4", "#a26d4a"] },
  { id: "moderno", label: "Moderno y tecnológico", colors: ["#3c5bff", "#0f1222", "#7cf5ff"] },
] as const;

export const deadlines = [
  { id: "sin-prisa", label: "Sin prisa" },
  { id: "mes", label: "En un mes, más o menos" },
  { id: "urgente", label: "Lo antes posible" },
] as const;

export const budgets = ["Menos de 300 €", "300–600 €", "600–1.000 €", "Más de 1.000 €", "Aún no lo sé"] as const;

export const contactPrefs = ["WhatsApp", "Llamada", "Email"] as const;

export type Brief = {
  business: string;
  activity: string;
  goals: string[];
  web: Answers;
  assets: string[];
  styles: string[];
  references: string;
  deadline: (typeof deadlines)[number]["id"];
  budget: string;
  name: string;
  email: string;
  phone: string;
  contactPref: string;
  notes: string;
};

export const emptyBrief = (web: Answers): Brief => ({
  business: "",
  activity: "",
  goals: [],
  web,
  assets: [],
  styles: [],
  references: "",
  deadline: web.urgent ? "urgente" : "mes",
  budget: "Aún no lo sé",
  name: "",
  email: "",
  phone: "",
  contactPref: "Email",
  notes: "",
});

/** What the client has decides how much help with content they need (the calculator's "content" answer). */
export function contentFromAssets(has: string[]): Answers["content"] {
  const core = ["Logo", "Fotos propias", "Textos"].filter((a) => has.includes(a)).length;
  return core === 3 ? "todo" : core === 0 ? "nada" : "parte";
}

/** The website answers as the calculator needs them, derived from the brief. */
export function webAnswers(b: Brief): Answers {
  return cleanAnswers({ ...b.web, content: contentFromAssets(b.assets), urgent: b.deadline === "urgente" });
}

const pick = <T extends string>(list: readonly T[], values: unknown, max = 10) =>
  list.filter((v) => Array.isArray(values) && values.includes(v)).slice(0, max);
const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** Keeps only valid values and sensible lengths, whatever the browser sent. */
export function cleanBrief(raw: Partial<Brief>): Brief {
  const web = cleanAnswers(raw.web ?? {});
  return {
    business: text(raw.business, 120),
    activity: text(raw.activity, 600),
    goals: pick(goals, raw.goals),
    web,
    assets: pick(assets, raw.assets),
    styles: pick(
      styles.map((s) => s.id),
      raw.styles,
      2,
    ),
    references: text(raw.references, 600),
    deadline: deadlines.some((d) => d.id === raw.deadline) ? raw.deadline! : "mes",
    budget: budgets.includes(raw.budget as (typeof budgets)[number]) ? raw.budget! : "Aún no lo sé",
    name: text(raw.name, 120),
    email: text(raw.email, 200),
    phone: text(raw.phone, 40),
    contactPref: contactPrefs.includes(raw.contactPref as (typeof contactPrefs)[number]) ? raw.contactPref! : "Email",
    notes: text(raw.notes, 1000),
  };
}

export const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Plain-text brief for Miguel's email and for Claude: everything the client answered, plus the estimate. */
export function briefText(b: Brief) {
  const web = webAnswers(b);
  const e = estimate(web);
  const style = styles.filter((s) => b.styles.includes(s.id)).map((s) => s.label);
  const deadline = deadlines.find((d) => d.id === b.deadline)?.label;
  const type = webTypes.find((t) => t.id === web.type)?.label;
  const feats = features.filter((f) => web.features.includes(f.id)).map((f) => f.label);
  const content = contentOptions.find((c) => c.id === web.content)?.label;
  return [
    `ENCARGO: ${b.business}`,
    `A qué se dedica: ${b.activity}`,
    `Qué quiere que hagan los visitantes: ${b.goals.join(", ") || "sin indicar"}`,
    "",
    `Web: ${type}, ${web.pages} ${web.pages === 1 ? "página" : "páginas"}`,
    `Funciones: ${feats.join(", ") || "ninguna extra"}`,
    `Ya tiene: ${b.assets.join(", ") || "nada todavía"} (contenido: ${content})`,
    `Estilo: ${style.join(" y ") || "sin preferencia"}`,
    `Webs que le gustan: ${b.references || "ninguna"}`,
    `Plazo: ${deadline} · Presupuesto que tiene en mente: ${b.budget}`,
    "",
    `Contacto: ${b.name} · ${[b.email, b.phone].filter(Boolean).join(" · ")} · prefiere ${b.contactPref}`,
    b.notes ? `Comentarios: ${b.notes}` : "",
    "",
    // Only the estimate lines: the website answers are already listed above.
    ...summary(web, e).split("\n").slice(-2),
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}
