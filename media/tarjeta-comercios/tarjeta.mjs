// Business card for neighbourhood shops: front and back, 85×55 mm plus 3 mm bleed on every side, as a print-ready PDF
// (out/tarjeta.pdf, two pages) and PNG previews. The QR goes to /comercios; the price comes from the calculator rules.
// Usage: node --no-warnings media/tarjeta-comercios/tarjeta.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import QRCode from "qrcode";
import { estimate } from "../../src/content/presupuesto.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "out");
mkdirSync(out, { recursive: true });

const URL = "https://vibecoding.miguelliebana.com/comercios?utm_source=tarjeta";
const SHOWN_URL = "vibecoding.miguelliebana.com/comercios";
const price = estimate({ type: "landing", pages: 1, features: [], content: "todo", urgent: false }).price[0];
const qr = await QRCode.toString(URL, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#141722", light: "#0000" } });

const ml = `<svg class="ml" viewBox="0 0 132 86"><rect fill="#1f66ff" height="74" rx="14" width="118" x="11.5" y="10.5"/><rect fill="white" height="74" rx="14" stroke="#111" stroke-width="3" width="118" x="1.5" y="1.5"/><g fill="none" stroke="#111" stroke-width="5.2"><path d="M19.6 59V36"/><path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3"/></g><rect fill="#1f66ff" height="4.6" width="25.3" x="79.3" y="54.3"/></svg>`;
const check = `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
  @page { size: 91mm 61mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; }
  html, body { background: #888; }
  body { font-family: Inter, sans-serif; color: #141722; -webkit-font-smoothing: antialiased; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  /* 91×61 mm with bleed; everything important stays 6 mm from the edge (3 mm inside the cut). */
  .side { position: relative; width: 91mm; height: 61mm; overflow: hidden; page-break-after: always; break-after: page;
    background: radial-gradient(42mm 42mm at 88% 8%, rgba(255,148,64,0.55), transparent 70%),
                radial-gradient(50mm 40mm at 0% 100%, rgba(242,69,47,0.28), transparent 70%),
                linear-gradient(160deg, #fff7f1 0%, #ffe9dc 60%, #ffd9c6 100%); }
  .safe { position: absolute; inset: 6mm; }
  .grad { background: linear-gradient(120deg, #ff9440, #ff6a2c 45%, #f2452f); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .brand { display: flex; align-items: center; gap: 2mm; font-size: 2.6mm; font-weight: 800; letter-spacing: -0.03em; }
  .brand span { color: #ff6a2c; }
  .ml { width: 10mm; height: auto; display: block; }
  /* Front */
  .front h1 { margin-top: 5mm; font-size: 6.6mm; font-weight: 800; letter-spacing: -0.045em; line-height: 1.02; }
  .front .sub { margin-top: 2.2mm; color: #3b3f4c; font-size: 2.9mm; font-weight: 600; line-height: 1.3; }
  .front .who { position: absolute; left: 0; bottom: 0; color: #5d6272; font-size: 2.3mm; font-weight: 600; line-height: 1.35; }
  .front .who b { color: #141722; font-weight: 800; }
  .price { position: absolute; right: 0; bottom: 0; display: grid; justify-items: center; border-radius: 4mm; background: linear-gradient(120deg, #ff9440, #ff6a2c 45%, #f2452f); color: white; padding: 2mm 3.6mm 2.2mm; box-shadow: 0 1.5mm 4mm rgba(242,69,47,0.35); }
  .price small { font-size: 2.1mm; font-weight: 700; opacity: 0.9; }
  .price strong { font-size: 5.6mm; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
  /* Back */
  .back .safe { display: grid; grid-template-columns: 27mm 1fr; gap: 4.5mm; align-items: center; }
  .qr { display: grid; place-items: center; width: 27mm; height: 27mm; border-radius: 3mm; background: white; box-shadow: 0 1mm 3mm rgba(210,90,40,0.18); padding: 2mm; }
  .qr svg { width: 100%; height: 100%; }
  .back h2 { font-size: 4.3mm; font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; }
  .back ul { display: grid; gap: 1.3mm; margin-top: 2.2mm; padding: 0; list-style: none; }
  .back li { display: flex; align-items: center; gap: 1.4mm; font-size: 2.45mm; font-weight: 650; line-height: 1.2; }
  .back li svg { flex: none; width: 3mm; height: 3mm; color: #0d7a52; }
  .back .url { position: absolute; left: 6mm; right: 6mm; bottom: 4.6mm; display: flex; justify-content: space-between; color: #5d6272; font-size: 2.1mm; font-weight: 650; }
  .back .url b { color: #df4f1c; font-weight: 800; }
</style>
</head>
<body>
  <section class="side front">
    <div class="safe">
      <div class="brand">${ml}<div>vibe<span>coding</span>coach</div></div>
      <h1>Tu comercio,<br><span class="grad">también en internet</span></h1>
      <p class="sub">Webs sencillas para los comercios del barrio.</p>
      <p class="who"><b>Miguel Liébana</b><br>Tu vecino que hace webs</p>
      <div class="price"><small>desde</small><strong>${price} €</strong></div>
    </div>
  </section>
  <section class="side back">
    <div class="safe">
      <div class="qr">${qr}</div>
      <div>
        <h2>Escanéame:<br><span class="grad">mira qué incluye</span></h2>
        <ul>
          <li>${check}Se ve bien en el móvil</li>
          <li>${check}Horarios, mapa y botón de llamar</li>
          <li>${check}Calcula tu precio en 1 minuto</li>
          <li>${check}Revisión gratis en Google Maps</li>
        </ul>
      </div>
    </div>
    <p class="url"><b>${SHOWN_URL}</b><span>mlieban3@gmail.com</span></p>
  </section>
</body>
</html>`;

writeFileSync(join(out, "tarjeta.html"), html);
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(out, "tarjeta.pdf"), width: "91mm", height: "61mm", printBackground: true, pageRanges: "1-2" });
// PNG previews at ~380 dpi, with the 3 mm bleed (cut line 3 mm inside each edge).
await page.setViewport({ width: 400, height: 600, deviceScaleFactor: 4 });
const sides = await page.$$(".side");
for (const [i, side] of sides.entries()) await side.screenshot({ path: join(out, `${i ? "trasera" : "delantera"}.png`) });
await browser.close();
console.log(`desde ${price} € · QR → ${URL}\n→ ${join(out, "tarjeta.pdf")}`);
