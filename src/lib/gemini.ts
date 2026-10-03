/** Server-only calls to Google Gemini (free plan), shared by the site assistant and the budget calculator.
 * The key comes from GEMINI_API_KEY and never reaches the browser. */

// The light model answers in about a second without spending its output on long reasoning; if Google says it is
// overloaded (503) or failing, the bigger one answers instead. Both can be changed in the environment.
const MODELS = [
  { name: process.env.GEMINI_MODEL || "gemini-flash-lite-latest", thinking: "minimal" },
  { name: process.env.GEMINI_FALLBACK_MODEL || "gemini-flash-latest", thinking: "low" },
];

export type GeminiTurn = { role: "user" | "model"; text: string };
export type GeminiResult = { ok: true; text: string } | { ok: false; reason: "no-key" | "limit" | "error" };

// Best-effort brake per visitor (per server instance): 15 requests every 10 minutes.
const recent = new Map<string, number[]>();
export function tooMany(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  times.push(now);
  recent.set(ip, times);
  return times.length > 15;
}

/** Asks Gemini. With `schema`, the answer is JSON following that response schema. */
export async function askGemini(system: string, turns: GeminiTurn[], schema?: object): Promise<GeminiResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, reason: "no-key" };
  try {
    let res: Response | null = null;
    for (const model of MODELS) {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model.name}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
          // Reasoning tokens count against maxOutputTokens, so keep reasoning short and leave room for the answer.
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1500,
            thinkingConfig: { thinkingLevel: model.thinking },
            ...(schema ? { responseMimeType: "application/json", responseSchema: schema } : {}),
          },
        }),
        signal: AbortSignal.timeout(20_000),
      });
      if (res.status !== 503 && res.status < 500) break;
      console.error("gemini:", model.name, "no disponible", res.status);
    }
    if (!res) return { ok: false, reason: "error" };
    // 429 = the free plan's limits are used up for now.
    if (res.status === 429) return { ok: false, reason: "limit" };
    if (!res.ok) {
      console.error("gemini: respondió", res.status, (await res.text()).slice(0, 300));
      return { ok: false, reason: "error" };
    }
    const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] };
    const text = data.candidates?.[0]?.content?.parts
      ?.filter((p) => !p.thought)
      .map((p) => p.text ?? "")
      .join("")
      .trim();
    return text ? { ok: true, text } : { ok: false, reason: "error" };
  } catch (error) {
    console.error("gemini:", error);
    return { ok: false, reason: "error" };
  }
}
