import { type Cita, diasAbiertos, fechaLarga, horarioTexto, iniciosLibres, negocio, servicioPorId, servicios } from "@/content/demo-cita";
import { askGemini, type GeminiTurn, tooMany } from "@/lib/gemini";

/** Demo «WhatsApp con IA que da citas». El navegador manda la conversación y sus citas de la demo;
 * Gemini contesta en JSON y propone una acción, y el servidor la valida contra la agenda real antes de aceptarla. */

const MAX_TURNS = 14;
const MAX_CHARS = 400;
const LIMIT = "Uy, ahora mismo tengo muchísimos mensajes 😅 Prueba otra vez en un ratito.";
const ERROR = "Perdona, no me ha llegado bien. ¿Me lo repites?";

const schema = {
  type: "OBJECT",
  properties: {
    respuesta: { type: "STRING" },
    accion: {
      type: "OBJECT",
      properties: {
        tipo: { type: "STRING", enum: ["ninguna", "reservar", "cancelar"] },
        servicio: { type: "STRING" },
        fecha: { type: "STRING" },
        hora: { type: "STRING" },
        nombre: { type: "STRING" },
        citaId: { type: "STRING" },
      },
      required: ["tipo", "servicio", "fecha", "hora", "nombre", "citaId"],
    },
  },
  required: ["respuesta", "accion"],
};

function instrucciones(citas: Cita[]) {
  const dias = diasAbiertos(5);
  const huecos = dias
    .map((d) => {
      const porServicio = servicios.map((s) => `  - ${s.id}: ${iniciosLibres(d.fecha, s, citas).join(", ") || "completo"}`).join("\n");
      return `${d.etiqueta} (${d.fecha}):\n${porServicio}`;
    })
    .join("\n");
  const misCitas = citas.length
    ? citas.map((c) => `- id ${c.id}: ${servicioPorId(c.servicio)?.nombre} el ${fechaLarga(c.fecha)} (${c.fecha}) a las ${c.hora}, a nombre de ${c.nombre}`).join("\n")
    : "- ninguna";
  return `Eres el asistente de WhatsApp de ${negocio.tipo} ${negocio.nombre}, en ${negocio.lugar}. Es una DEMO con un negocio inventado.
Hoy es ${fechaLarga(dias[0]?.fecha ?? "")}. Horario: ${horarioTexto}.

Servicios (precio y duración, NO inventes otros):
${servicios.map((s) => `- ${s.id}: ${s.nombre}, ${s.precio} €, ${s.minutos} min`).join("\n")}

Horas de inicio LIBRES por día y servicio (solo puedes ofrecer estas):
${huecos}

Citas que ya tiene esta persona en la demo:
${misCitas}

Cómo hablas: como un WhatsApp de peluquería de barrio, cercano y breve (1–3 frases), en el idioma de la persona (castellano por defecto, también catalán o inglés). Algún emoji suelto, sin pasarte. Nunca inventes precios, servicios ni huecos.

Cómo reservas:
1. Averigua qué servicio quiere y qué día y franja le va. Si el servicio no está claro (por ejemplo, «cortarme el pelo» puede ser corte de caballero o corte y peinado), pregúntalo antes de ofrecer horas. Ofrece como máximo 3 horas libres concretas.
2. Antes de reservar necesitas: servicio, fecha, hora y un nombre (basta el nombre de pila; no pidas teléfono ni otros datos).
3. Solo cuando la persona confirme claramente, devuelve accion.tipo = "reservar" con servicio (id), fecha (AAAA-MM-DD), hora (HH:MM) y nombre, y en la respuesta confirma la cita en una frase.
4. Para anular, identifica la cita de la lista anterior y devuelve accion.tipo = "cancelar" con su citaId.
5. En cualquier otro caso, accion.tipo = "ninguna" y deja los demás campos de accion vacíos ("").
Si te preguntan algo que no tiene que ver con la peluquería, contesta con gracia que eres el asistente de citas de Tijereta y reconduce. Si preguntan quién ha hecho esto, di que es una demo de Miguel Liébana (MontajIA).`;
}

type Respuesta = { respuesta: string; accion: { tipo: string; servicio: string; fecha: string; hora: string; nombre: string; citaId: string } };

export async function POST(request: Request) {
  if (tooMany(request)) return Response.json({ text: LIMIT, kind: "limit" });
  let turns: GeminiTurn[], citas: Cita[];
  try {
    const body = (await request.json()) as { messages?: GeminiTurn[]; citas?: Cita[] };
    turns = (body.messages ?? [])
      .filter((t) => (t.role === "user" || t.role === "model") && typeof t.text === "string" && t.text.trim())
      .slice(-MAX_TURNS)
      .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_CHARS) }));
    citas = (body.citas ?? [])
      .filter((c) => c && typeof c.id === "string" && servicioPorId(c.servicio) && /^\d{4}-\d{2}-\d{2}$/.test(c.fecha) && /^\d{2}:\d{2}$/.test(c.hora))
      .slice(0, 10)
      .map((c) => ({ ...c, nombre: String(c.nombre).slice(0, 40) }));
  } catch {
    return Response.json({ text: ERROR, kind: "error" });
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") return Response.json({ text: ERROR, kind: "error" });

  const r = await askGemini(instrucciones(citas), turns, schema);
  if (!r.ok) return Response.json({ text: r.reason === "limit" ? LIMIT : ERROR, kind: r.reason === "limit" ? "limit" : "error" });

  let out: Respuesta;
  try {
    out = JSON.parse(r.text) as Respuesta;
  } catch {
    return Response.json({ text: ERROR, kind: "error" });
  }
  const a = out.accion;

  // La IA propone; la agenda decide.
  if (a?.tipo === "reservar") {
    const s = servicioPorId(a.servicio);
    const nombre = (a.nombre || "").trim().slice(0, 40);
    if (!s || !nombre || !iniciosLibres(a.fecha, s, citas).includes(a.hora)) {
      const alternativas = s ? diasAbiertos(5).flatMap((d) => iniciosLibres(d.fecha, s, citas).slice(0, 2).map((h) => `${fechaLarga(d.fecha)} a las ${h}`)).slice(0, 3) : [];
      return Response.json({
        text: `Uy, esa hora justo se me ha ocupado 🙈${alternativas.length ? ` ¿Te iría bien ${alternativas.join(", o ")}?` : " ¿Probamos otro día?"}`,
        kind: "ok",
      });
    }
    const cita: Cita = { id: Math.random().toString(36).slice(2, 8), fecha: a.fecha, hora: a.hora, servicio: s.id, nombre };
    return Response.json({ text: out.respuesta, kind: "ok", reserva: cita });
  }
  if (a?.tipo === "cancelar") {
    const cita = citas.find((c) => c.id === a.citaId);
    if (!cita) return Response.json({ text: "No encuentro esa cita 🤔 ¿Me dices qué día y a qué hora era?", kind: "ok" });
    return Response.json({ text: out.respuesta, kind: "ok", cancela: cita.id });
  }
  return Response.json({ text: out.respuesta || ERROR, kind: "ok" });
}
