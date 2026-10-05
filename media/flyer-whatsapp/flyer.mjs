// WhatsApp flyer with the brand look: the three services with their prices, the free Google Maps test and the link.
// Two sizes: out/flyer.png (1080×1350, for chats) and out/flyer-estado.png (1080×1920, for WhatsApp Status).
// Prices come from the website content, so the flyer always matches it.
// Usage: node --no-warnings media/flyer-whatsapp/flyer.mjs
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BookOpenText, ChalkboardTeacher, MapPin, Storefront } from "@phosphor-icons/react/dist/ssr";
import puppeteer from "puppeteer-core";
import QRCode from "qrcode";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { offers } from "../../src/content/oferta.ts";
import { estimate } from "../../src/content/presupuesto.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "out");
mkdirSync(out, { recursive: true });

const icon = (Icon) => renderToStaticMarkup(createElement(Icon, { size: 52, weight: "bold" }));
const webFrom = estimate({ type: "landing", pages: 1, features: [], content: "todo", urgent: false }).price[0];
const classPrice = offers.find((o) => o.name === "Clases 1:1")?.price ?? "25 €/h";
const SITE = "vibecoding.miguelliebana.com";
const qr = await QRCode.toString(`https://${SITE}/?utm_source=flyer`, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#141722", light: "#0000" } });
const seda = `data:image/jpeg;base64,${readFileSync(join(here, "..", "remotion", "public", "seda.jpg")).toString("base64")}`;
const ml = `<svg class="ml" viewBox="0 0 132 86"><rect fill="#1f66ff" height="74" rx="14" width="118" x="11.5" y="10.5"/><rect fill="white" height="74" rx="14" stroke="#111" stroke-width="3" width="118" x="1.5" y="1.5"/><g fill="none" stroke="#111" stroke-width="5.2"><path d="M19.6 59V36"/><path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3"/></g><rect fill="#1f66ff" height="4.6" width="25.3" x="79.3" y="54.3"/></svg>`;

const services = [
  { Icon: Storefront, title: "Te la hago yo", text: "Webs para tu comercio o proyecto, publicadas y listas.", price: `desde ${webFrom} €` },
  { Icon: ChalkboardTeacher, title: "Clases 1:1", text: "Aprende a hacer tu web con IA, a tu ritmo. La primera, gratis.", price: classPrice },
  { Icon: BookOpenText, title: "Cursos gratis", text: "Tres cursos de cero a tu web, sin registro.", price: "0 €" },
];

const page = (story) => `
<section class="flyer${story ? " story" : ""}">
  <div class="veil"></div>
  <header><div class="brand">${ml}<span>vibe<b>coding</b>coach</span></div></header>
  <div class="head">
    <h1>¿Necesitas <span class="grad">una web</span>?</h1>
    <p class="sub">Te la hago yo o te enseño a hacerla, con IA y sin tecnicismos.</p>
  </div>
  <div class="services">
    ${services
      .map(
        (s) => `<div class="service glass"><div class="ico">${icon(s.Icon)}</div><div><strong>${s.title}</strong><p>${s.text}</p></div><em>${s.price}</em></div>`,
      )
      .join("")}
  </div>
  <p class="extra">${icon(MapPin)} <span><b>Gratis:</b> test de tu ficha de Google en 2 minutos</span></p>
  <footer class="glass">
    <div class="qr">${qr}</div>
    <div class="contact">
      <strong>${SITE}</strong>
      <span>Miguel Liébana · maestro durante 14 años y desarrollador web</span>
      <span class="mail">mlieban3@gmail.com</span>
    </div>
  </footer>
</section>`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { background: #777; font-family: Inter, sans-serif; color: #141722; -webkit-font-smoothing: antialiased; }
  .flyer { position: relative; display: flex; flex-direction: column; width: 1080px; height: 1350px; overflow: hidden; margin-bottom: 40px; padding: 70px 72px 64px;
    background: url("${seda}") center / cover; }
  .flyer.story { height: 1920px; padding: 150px 72px 170px; }
  .veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,249,244,0.82) 0%, rgba(255,249,244,0.55) 25%, rgba(255,249,244,0.45) 55%, rgba(255,249,244,0.82) 100%); }
  .flyer > *:not(.veil) { position: relative; }
  .glass { border: 2px solid rgba(255,255,255,0.92); background: rgba(255,255,255,0.74); box-shadow: 0 2px 0 rgba(255,255,255,0.9) inset, 0 30px 70px rgba(150,80,40,0.14); }
  .grad { background: linear-gradient(120deg, #ff9440, #ff6a2c 45%, #f2452f); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 40px; font-weight: 800; letter-spacing: -0.03em; }
  .brand b { color: #ff6a2c; }
  .ml { width: 96px; height: auto; }
  .head { margin-top: 40px; }
  .story .head { margin-top: 110px; }
  .story h1 { font-size: 108px; }
  .story .sub { font-size: 40px; }
  .story .service p { font-size: 29px; }
  .story footer { grid-template-columns: 180px 1fr; }
  .story .qr { width: 180px; height: 180px; }
  h1 { font-size: 88px; font-weight: 800; letter-spacing: -0.055em; line-height: 0.98; }
  .sub { margin-top: 18px; color: #3b3f4c; font-size: 36px; font-weight: 600; line-height: 1.3; }
  .services { display: grid; gap: 16px; margin-top: 38px; }
  .story .services { gap: 26px; margin-top: 90px; }
  .service { display: grid; grid-template-columns: 88px 1fr auto; align-items: center; gap: 24px; border-radius: 34px; padding: 20px 28px; }
  .story .service { padding: 34px 30px; }
  .ico { display: grid; place-items: center; width: 88px; height: 88px; border-radius: 28px; background: linear-gradient(120deg, #ff9440, #ff6a2c 45%, #f2452f); box-shadow: 0 14px 30px rgba(242,69,47,0.3); color: white; }
  .service strong { display: block; font-size: 44px; font-weight: 800; letter-spacing: -0.03em; }
  .service p { margin-top: 4px; color: #5d6272; font-size: 27px; font-weight: 600; line-height: 1.3; }
  .service em { border-radius: 999px; background: rgba(255,112,52,0.12); color: #df4f1c; font-size: 32px; font-style: normal; font-weight: 800; padding: 12px 22px; white-space: nowrap; }
  .extra { display: flex; align-items: center; gap: 14px; margin-top: 22px; color: #0d7a52; font-size: 31px; font-weight: 650; }
  .story .extra { margin-top: 40px; }
  .extra svg { width: 40px; height: 40px; flex: none; }
  .extra b { font-weight: 800; }
  footer { display: grid; grid-template-columns: 160px 1fr; gap: 30px; align-items: center; margin-top: auto; border-radius: 38px; padding: 22px 30px; }
  .qr { width: 160px; height: 160px; border-radius: 20px; background: white; padding: 12px; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .contact strong { display: block; font-size: 40px; font-weight: 800; letter-spacing: -0.03em; color: #df4f1c; }
  .contact span { display: block; margin-top: 8px; color: #3b3f4c; font-size: 28px; font-weight: 600; line-height: 1.3; }
  .contact .mail { color: #141722; font-weight: 750; }
</style>
</head>
<body>${page(false)}${page(true)}</body>
</html>`;

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const tab = await browser.newPage();
await tab.setViewport({ width: 1080, height: 1400 });
await tab.setContent(html, { waitUntil: "networkidle0" });
await tab.evaluate(() => document.fonts.ready);
const [chat, story] = await tab.$$(".flyer");
await chat.screenshot({ path: join(out, "flyer.png") });
await story.screenshot({ path: join(out, "flyer-estado.png") });
await browser.close();
console.log(`→ ${join(out, "flyer.png")} y flyer-estado.png (web desde ${webFrom} €, clases ${classPrice})`);
