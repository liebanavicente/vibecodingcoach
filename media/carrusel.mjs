// Renders an Instagram carousel (media/<name>/carrusel.html): every .card is saved as a 1080x1350 PNG in out/.
// Brand logos come from simple-icons: <span data-si="instagram"></span>. The ML mark: <svg data-ml>.
// Usage: npm run carrusel -- carrusel-01
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import * as icons from "simple-icons";

const name = process.argv[2];
const here = join(dirname(fileURLToPath(import.meta.url)), name ?? "");
if (!name || !existsSync(join(here, "carrusel.html"))) {
  console.error("Usage: npm run carrusel -- <carousel folder in media/>");
  process.exit(1);
}
const brands = Object.fromEntries(
  Object.values(icons)
    .filter((icon) => icon?.slug)
    .map((icon) => [icon.slug, { path: icon.path, hex: icon.hex }]),
);
const ML = `<rect fill="var(--ml-blue)" height="74" rx="14" width="118" x="11.5" y="10.5"/><rect fill="white" height="74" rx="14" stroke="var(--ml-ink)" stroke-width="3" width="118" x="1.5" y="1.5"/><g fill="none" stroke="var(--ml-ink)" stroke-width="5.2"><path d="M19.6 59V36"/><path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3"/></g><rect fill="var(--ml-blue)" height="4.6" width="25.3" x="79.3" y="54.3"/>`;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--allow-file-access-from-files"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(here, "carrusel.html")).href, { waitUntil: "networkidle0" });
const count = await page.evaluate(
  (brands, ML) => {
    document.querySelectorAll("[data-si]").forEach((el) => {
      const icon = brands[el.dataset.si];
      if (icon) el.innerHTML = `<svg viewBox="0 0 24 24" fill="${el.dataset.color ?? `#${icon.hex}`}"><path d="${icon.path}"/></svg>`;
    });
    document.querySelectorAll("svg[data-ml]").forEach((svg) => {
      svg.setAttribute("viewBox", "0 0 132 86");
      svg.innerHTML = ML;
    });
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => card.querySelector(".page")?.replaceChildren(`${i + 1}/${cards.length}`));
    return cards.length;
  },
  brands,
  ML,
);
await page.evaluate(() => document.fonts.ready);
const out = join(here, "out");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const cards = await page.$$(".card");
for (const [i, card] of cards.entries()) await card.screenshot({ path: join(out, `${String(i + 1).padStart(2, "0")}.png`) });
await browser.close();
console.log(`${count} slides written to ${out}`);
