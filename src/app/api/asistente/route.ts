import { assistantInstructions } from "@/lib/asistente";
import { site } from "@/lib/site";

/** Site assistant: the browser sends the chat, the server asks Google Gemini with the key from .env.
 * The key never reaches the browser. Errors come back as friendly messages instead of breaking the chat. */

type Turn = { role: "user" | "model"; text: string };

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_TURNS = 10;
const MAX_CHARS = 600;
const LIMIT_MESSAGE =
  `Ahora mismo estoy atendiendo muchas preguntas y he llegado a mi límite gratuito. Vuelve a intentarlo en un rato, o escríbeme a ${site.email} 🙂`;
const ERROR_MESSAGE = "Ups, no he podido responder ahora. Inténtalo de nuevo en un momento o escríbeme por correo electrónico.";

// Best-effort brake per visitor (per server instance): 15 questions every 10 minutes.
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  times.push(now);
  recent.set(ip, times);
  return times.length > 15;
}

const reply = (text: string, kind: "ok" | "limit" | "error") => Response.json({ text, kind });

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return reply("El asistente aún no está activado. Mientras tanto, escríbeme por correo electrónico.", "error");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooMany(ip)) return reply(LIMIT_MESSAGE, "limit");

  let turns: Turn[];
  try {
    const body = (await request.json()) as { messages?: Turn[] };
    turns = (body.messages ?? [])
      .filter((t) => (t.role === "user" || t.role === "model") && typeof t.text === "string" && t.text.trim())
      .slice(-MAX_TURNS)
      .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_CHARS) }));
  } catch {
    return reply(ERROR_MESSAGE, "error");
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") return reply(ERROR_MESSAGE, "error");

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: assistantInstructions() }] },
        contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
      }),
      signal: AbortSignal.timeout(20_000),
    });
    // 429 = the free plan's limits are used up for now.
    if (res.status === 429) return reply(LIMIT_MESSAGE, "limit");
    if (!res.ok) {
      console.error("asistente: Gemini respondió", res.status, (await res.text()).slice(0, 300));
      return reply(ERROR_MESSAGE, "error");
    }
    const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
    return reply(text || ERROR_MESSAGE, text ? "ok" : "error");
  } catch (error) {
    console.error("asistente:", error);
    return reply(ERROR_MESSAGE, "error");
  }
}
