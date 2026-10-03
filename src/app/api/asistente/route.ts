import { assistantInstructions } from "@/lib/asistente";
import { askGemini, type GeminiTurn, tooMany } from "@/lib/gemini";
import { site } from "@/lib/site";

/** Site assistant: the browser sends the chat, the server asks Gemini. Errors come back as friendly messages. */

const MAX_TURNS = 10;
const MAX_CHARS = 600;
const LIMIT_MESSAGE = `Ahora mismo estoy atendiendo muchas preguntas y he llegado a mi límite gratuito. Vuelve a intentarlo en un rato, o escríbeme a ${site.email} 🙂`;
const ERROR_MESSAGE = "Ups, no he podido responder ahora. Inténtalo de nuevo en un momento o escríbeme por correo electrónico.";
const OFF_MESSAGE = "El asistente aún no está activado. Mientras tanto, escríbeme por correo electrónico.";

const reply = (text: string, kind: "ok" | "limit" | "error") => Response.json({ text, kind });

export async function POST(request: Request) {
  if (tooMany(request)) return reply(LIMIT_MESSAGE, "limit");
  let turns: GeminiTurn[];
  try {
    const body = (await request.json()) as { messages?: GeminiTurn[] };
    turns = (body.messages ?? [])
      .filter((t) => (t.role === "user" || t.role === "model") && typeof t.text === "string" && t.text.trim())
      .slice(-MAX_TURNS)
      .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_CHARS) }));
  } catch {
    return reply(ERROR_MESSAGE, "error");
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") return reply(ERROR_MESSAGE, "error");

  const result = await askGemini(assistantInstructions(), turns);
  if (result.ok) return reply(result.text, "ok");
  if (result.reason === "limit") return reply(LIMIT_MESSAGE, "limit");
  return reply(result.reason === "no-key" ? OFF_MESSAGE : ERROR_MESSAGE, "error");
}
