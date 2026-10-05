import { type Brief, briefText, cleanBrief, validEmail, webAnswers } from "@/content/encargo";
import { estimate } from "@/content/presupuesto";
import { tooMany } from "@/lib/gemini";
import { site } from "@/lib/site";

/** Receives a brief from /encargo: saves it in Supabase (insert-only table) and emails Miguel through Resend.
 * Either one is enough; if both fail, the visitor is offered the brief by email so no order is lost.
 * Env: SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY, and RESEND_API_KEY (all server-side only). */

async function save(b: Brief, text: string, origin: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  const web = webAnswers(b);
  const e = estimate(web);
  const res = await fetch(`${url}/rest/v1/encargos`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      negocio: b.business,
      actividad: b.activity,
      nombre: b.name,
      email: b.email || null,
      telefono: b.phone || null,
      contacto_preferido: b.contactPref,
      respuestas: { ...b, web },
      estimacion: { hours: e.hours, price: e.price, weeks: e.weeks },
      resumen: text,
      origen: origin,
    }),
  }).catch(() => null);
  return Boolean(res?.ok);
}

async function notify(b: Brief, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's test sender can write to the account's own address without verifying a domain.
      from: "vibecodingcoach <onboarding@resend.dev>",
      to: [site.email],
      reply_to: b.email || undefined,
      subject: `Nuevo encargo: ${b.business}`,
      text: `${text}\n\nResponde a este correo para escribir a ${b.name}${b.email ? "" : " (no dejó email: usa el teléfono)"}.`,
    }),
  }).catch(() => null);
  return Boolean(res?.ok);
}

export async function POST(request: Request) {
  if (tooMany(request)) return Response.json({ error: "Has enviado varias veces seguidas. Espera unos minutos, por favor." }, { status: 429 });
  let raw: Partial<Brief> & { website?: string; origin?: string; consent?: boolean };
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "No he podido leer el encargo. Inténtalo de nuevo." }, { status: 400 });
  }
  // Honeypot: people never see this field, bots fill it in. Pretend it worked.
  if (raw.website) return Response.json({ ok: true });

  const b = cleanBrief(raw);
  if (!b.business || !b.activity || !b.name) return Response.json({ error: "Faltan el nombre del negocio, a qué te dedicas o tu nombre." }, { status: 400 });
  if (!b.phone && !validEmail(b.email)) return Response.json({ error: "Déjame un email válido o un teléfono para responderte." }, { status: 400 });
  if (b.contactPref !== "Email" && b.phone.replace(/\D/g, "").length < 9) return Response.json({ error: `Para responderte por ${b.contactPref} necesito tu teléfono.` }, { status: 400 });
  if (b.email && !validEmail(b.email)) return Response.json({ error: "Revisa el email: parece que le falta algo." }, { status: 400 });
  if (raw.consent !== true) return Response.json({ error: "Marca la casilla de privacidad para poder enviarlo." }, { status: 400 });

  const text = briefText(b);
  const origin = typeof raw.origin === "string" ? raw.origin.slice(0, 80) : "web";
  const [saved, emailed] = await Promise.all([save(b, text, origin), notify(b, text)]);
  if (!saved && !emailed) return Response.json({ error: "No he podido enviarlo ahora.", fallback: text }, { status: 502 });
  return Response.json({ ok: true });
}
