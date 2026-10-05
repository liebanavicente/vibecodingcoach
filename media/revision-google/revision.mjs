// Free Google Maps review for a neighbourhood shop: reads a review file (see ejemplo.json) and writes a one-page A4 PDF
// with Miguel's brand, a score out of 20, a traffic light per point, the 3 improvements that matter most and a QR to
// /comercios. Usage: node --no-warnings media/revision-google/revision.mjs media/revision-google/negocios/<negocio>.json
import { mkdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import QRCode from "qrcode";
import { estimate } from "../../src/content/presupuesto.ts";
import { CRITERIOS, verdict as verdictFor } from "./criterios.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2] ?? join(here, "ejemplo.json");
const data = JSON.parse(readFileSync(file, "utf8"));
const out = join(here, "out");
mkdirSync(out, { recursive: true });

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rows = CRITERIOS.map((c) => {
  const [score = 0, note = ""] = data.notas?.[c.id] ?? [];
  return { ...c, score: Math.max(0, Math.min(2, Number(score))), note };
});
const total = rows.reduce((s, r) => s + r.score, 0);
const verdict = verdictFor(total);
// The 3 improvements: the ones written in the file, or the weakest points (missing first, then improvable).
const mejoras = (data.mejoras?.length ? data.mejoras : rows.filter((r) => r.score < 2).sort((a, b) => a.score - b.score).map((r) => r.mejora)).slice(0, 3);
const price = estimate({ type: "landing", pages: 1, features: [], content: "todo", urgent: false }).price[0];
const url = "https://vibecoding.miguelliebana.com/comercios?utm_source=revision";
const qr = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#141722", light: "#0000" } });
const ml = `<svg class="ml" viewBox="0 0 132 86"><rect fill="#1f66ff" height="74" rx="14" width="118" x="11.5" y="10.5"/><rect fill="white" height="74" rx="14" stroke="#111" stroke-width="3" width="118" x="1.5" y="1.5"/><g fill="none" stroke="#111" stroke-width="5.2"><path d="M19.6 59V36"/><path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3"/></g><rect fill="#1f66ff" height="4.6" width="25.3" x="79.3" y="54.3"/></svg>`;
const MARK = ["✕", "~", "✓"];
const LABEL = ["Falta", "Mejorable", "Bien"];

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; }
  body { font-family: Inter, sans-serif; color: #141722; -webkit-font-smoothing: antialiased; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { position: relative; display: flex; flex-direction: column; width: 210mm; height: 297mm; overflow: hidden; padding: 11mm 14mm 8mm;
    background: radial-gradient(90mm 70mm at 100% 0%, rgba(255,148,64,0.28), transparent 70%), linear-gradient(180deg, #fff8f3, #fff 40%); }
  .grad { background: linear-gradient(120deg, #ff9440, #ff6a2c 45%, #f2452f); -webkit-background-clip: text; background-clip: text; color: transparent; }
  header { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 2.5mm; font-size: 4mm; font-weight: 800; letter-spacing: -0.03em; }
  .brand span { color: #ff6a2c; }
  .ml { width: 13mm; height: auto; }
  .date { color: #5d6272; font-size: 3.1mm; font-weight: 600; text-align: right; line-height: 1.4; }
  .hero { display: grid; grid-template-columns: 1fr 44mm; gap: 8mm; align-items: center; margin-top: 6mm; }
  h1 { font-size: 9mm; font-weight: 800; letter-spacing: -0.045em; line-height: 1.02; }
  .shop { margin-top: 2.5mm; color: #3b3f4c; font-size: 4.4mm; font-weight: 700; }
  .verdict { margin-top: 4mm; color: #3b3f4c; font-size: 3.5mm; line-height: 1.5; }
  .verdict b { color: #df4f1c; }
  .score { display: grid; place-items: center; width: 40mm; height: 40mm; margin-left: auto; border-radius: 50%;
    background: conic-gradient(#ff6a2c ${(total / 20) * 360}deg, rgba(20,23,34,0.08) 0); }
  .score div { display: grid; place-items: center; width: 31mm; height: 31mm; border-radius: 50%; background: white; text-align: center; }
  .score strong { font-size: 11mm; font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
  .score small { color: #5d6272; font-size: 3mm; font-weight: 700; }
  h2 { margin-top: 5.5mm; font-size: 4.6mm; font-weight: 800; letter-spacing: -0.03em; }
  table { width: 100%; margin-top: 2mm; border-collapse: collapse; font-size: 3mm; }
  td { padding: 1.5mm 2mm; border-top: 0.3mm solid rgba(20,23,34,0.08); vertical-align: top; line-height: 1.35; }
  td.mark { width: 8mm; }
  .dot { display: inline-grid; place-items: center; width: 5.4mm; height: 5.4mm; border-radius: 50%; color: white; font-size: 3mm; font-weight: 800; }
  .s0 .dot { background: #e5484d; } .s1 .dot { background: #f5a524; } .s2 .dot { background: #12a150; }
  td.what { width: 52mm; font-weight: 700; }
  td.what small { display: block; margin-top: 0.3mm; color: #5d6272; font-size: 2.6mm; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
  td.note { color: #3b3f4c; }
  .tips { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 2.5mm; }
  .tip { border-radius: 4mm; background: white; box-shadow: 0 1mm 4mm rgba(210,90,40,0.12); padding: 3.5mm; font-size: 3mm; line-height: 1.42; }
  .tip b { display: grid; place-items: center; width: 7mm; height: 7mm; margin-bottom: 2mm; border-radius: 2.2mm; background: linear-gradient(120deg, #ff9440, #f2452f); color: white; font-size: 3.6mm; }
  .cta { display: grid; margin-top: auto; grid-template-columns: 1fr 26mm; gap: 6mm; align-items: center; border-radius: 5mm;
    background: linear-gradient(135deg, #fff1e8, #ffe3d3); padding: 5mm 6mm; }
  .cta h3 { font-size: 4.8mm; font-weight: 800; letter-spacing: -0.03em; }
  .cta p { margin-top: 1.5mm; color: #3b3f4c; font-size: 3.2mm; line-height: 1.45; }
  .cta .who { margin-top: 2.5mm; font-weight: 700; color: #141722; }
  .qr { width: 26mm; height: 26mm; border-radius: 3mm; background: white; padding: 2mm; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .small { margin-top: 3mm; color: #8a8f9c; font-size: 2.5mm; }
</style>
</head>
<body>
  <section class="page">
    <header>
      <div class="brand">${ml}<div>vibe<span>coding</span>coach</div></div>
      <p class="date">Revisión gratuita<br>${esc(data.fecha)}</p>
    </header>
    <div class="hero">
      <div>
        <h1>Tu ficha de Google, <span class="grad">revisada</span></h1>
        <p class="shop">${esc(data.negocio)}${data.barrio ? ` · ${esc(data.barrio)}` : ""}</p>
        <p class="verdict"><b>${verdict[0]}.</b> ${verdict[1]}</p>
      </div>
      <div class="score"><div><span><strong>${total}</strong><small> / 20</small></span></div></div>
    </div>
    <h2>Punto por punto</h2>
    <table>
      ${rows
        .map(
          (r) => `<tr class="s${r.score}"><td class="mark"><span class="dot">${MARK[r.score]}</span></td><td class="what">${esc(r.titulo)}<small>${LABEL[r.score]}</small></td><td class="note">${esc(r.note || (r.score === 2 ? "Bien hecho." : r.mejora))}</td></tr>`,
        )
        .join("")}
    </table>
    <h2>Las 3 mejoras que más te ayudarían</h2>
    <div class="tips">${mejoras.map((m, i) => `<div class="tip"><b>${i + 1}</b>${esc(m)}</div>`).join("")}</div>
    <div class="cta">
      <div>
        <h3>¿Te echo una mano?</h3>
        <p>Puedo dejarte la ficha a punto contigo en una visita y, si quieres, hacerte una web sencilla desde ${price} € que enlace con ella.</p>
        <p class="who">Miguel Liébana · tu vecino que hace webs · mlieban3@gmail.com</p>
      </div>
      <div class="qr">${qr}</div>
    </div>
    <p class="small">Revisión hecha desde fuera, mirando tu ficha pública de Google Maps. Sin compromiso. vibecoding.miguelliebana.com/comercios</p>
  </section>
</body>
</html>`;

const name = basename(file, ".json");
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(out, `${name}.pdf`), format: "A4", printBackground: true });
await page.setViewport({ width: 800, height: 1131, deviceScaleFactor: 1.5 });
await (await page.$(".page")).screenshot({ path: join(out, `${name}.png`) });
await browser.close();
console.log(`${data.negocio}: ${total}/20 → ${join(out, `${name}.pdf`)}`);
