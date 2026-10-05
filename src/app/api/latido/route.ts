/** Daily keep-alive (Vercel cron in vercel.json): a tiny query so the free Supabase project behind /encargo is not
 * paused after a week without orders. */
export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return Response.json({ ok: false, reason: "no-config" });
  const res = await fetch(`${url}/rest/v1/rpc/latido`, { method: "POST", headers: { apikey: key } }).catch(() => null);
  return Response.json({ ok: Boolean(res?.ok) });
}
