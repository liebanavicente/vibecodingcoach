import { type Answers, contentOptions, estimate, features, MAX_PAGES, summary, webTypes } from "@/content/presupuesto";
import { askGemini, tooMany } from "@/lib/gemini";
import { site } from "@/lib/site";

/** Budget calculator helpers. "interpretar": turns a free description into form answers.
 * "explicar": writes a friendly note about an estimate that the server computes itself, so the AI never sets prices. */

const schema = {
  type: "OBJECT",
  properties: {
    type: { type: "STRING", enum: webTypes.map((t) => t.id) },
    pages: { type: "INTEGER" },
    features: { type: "ARRAY", items: { type: "STRING", enum: features.map((f) => f.id) } },
    content: { type: "STRING", enum: contentOptions.map((c) => c.id) },
    urgent: { type: "BOOLEAN" },
  },
  required: ["type", "pages", "features", "content", "urgent"],
};

/** Keeps only valid values, whatever the model or the browser sent. */
function clean(raw: Partial<Answers>): Answers {
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

const LIMIT = `Ahora mismo no puedo ayudarte con la IA (límite gratuito alcanzado). Usa el formulario o escríbeme a ${site.email}.`;
const ERROR = "No he podido hacerlo ahora. Usa el formulario, que calcula igual, o inténtalo en un momento.";

export async function POST(request: Request) {
  if (tooMany(request)) return Response.json({ error: LIMIT });
  let body: { action?: string; text?: string; answers?: Partial<Answers> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ERROR });
  }
  const text = (body.text ?? "").slice(0, 1200).trim();

  if (body.action === "interpretar") {
    if (text.length < 10) return Response.json({ error: "Cuéntame un poco más qué necesitas (al menos una frase)." });
    const system = `Conviertes la descripción de alguien que quiere una web en las respuestas de un formulario de presupuesto.
Tipos: ${webTypes.map((t) => `${t.id} = ${t.label} (${t.hint})`).join("; ")}.
Funciones: ${features.map((f) => `${f.id} = ${f.label}`).join("; ")}. Marca solo las que la persona pide o necesita claramente.
Contenido: ${contentOptions.map((c) => `${c.id} = ${c.label}`).join("; ")}. Si no lo dice, usa "parte".
pages: número de páginas o secciones que necesitará (1 a ${MAX_PAGES}); si no lo dice, el habitual para ese tipo.
urgent: true solo si dice que lo necesita muy pronto (días o una o dos semanas).`;
    const result = await askGemini(system, [{ role: "user", text }], schema);
    if (!result.ok) return Response.json({ error: result.reason === "limit" ? LIMIT : ERROR });
    try {
      return Response.json({ answers: clean(JSON.parse(result.text)) });
    } catch {
      return Response.json({ error: ERROR });
    }
  }

  if (body.action === "explicar") {
    const answers = clean(body.answers ?? {});
    const e = estimate(answers);
    const system = `Eres Miguel Liébana, que hace webs por encargo. Escribe en español, tuteando y con tono cercano, una respuesta de 3 a 5 frases a alguien que acaba de calcular un presupuesto orientativo.
- Usa exactamente esta estimación, sin cambiar ni añadir cifras: ${e.price[0]}–${e.price[1]} € y ${e.weeks[0]}–${e.weeks[1]} semanas.
- Explica en una frase qué es lo que más pesa en el precio, según lo elegido.
- Deja claro que es orientativa y que el precio cerrado se acuerda en una llamada gratis de 30 minutos, según lo que necesite de verdad.
- Si ves algo que conviene concretar (por ejemplo, cuántos productos, quién actualizará la web), menciónalo como pregunta.
- El dominio (unos 10–15 € al año) va aparte. No prometas nada más.
- Texto normal, sin negritas ni ningún formato markdown.`;
    const result = await askGemini(system, [{ role: "user", text: `${summary(answers, e)}${text ? `\nDescripción: ${text}` : ""}` }]);
    if (!result.ok) return Response.json({ error: result.reason === "limit" ? LIMIT : ERROR, estimate: e });
    return Response.json({ text: result.text, estimate: e });
  }

  return Response.json({ error: ERROR });
}
