// Builds a "Palabra del día" reel (reel.html + caption.txt) for every glossary term, then optionally renders them.
// Usage:
//   npm run reels:palabras                 generate all and render the ones not rendered yet
//   npm run reels:palabras -- --only rag,git   only these terms (ids as in /curso/glosario#id)
//   npm run reels:palabras -- --no-render   only write the HTML and captions
//   npm run reels:palabras -- --force       re-render even if the video already exists
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { glossary, termId } from "../../src/content/glosario.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const render = !args.includes("--no-render");
const force = args.includes("--force");

// Terms that already have a hand-made reel.
const SKIP = new Set(["token", "mcp"]);

const TAGS = {
  IA: "#claudeai #chatgpt",
  Herramientas: "#claudecode #herramientasia",
  Código: "#programacion #desarrolloweb",
  Publicar: "#github #desarrolloweb",
};

const esc = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Big word size: long terms or long words need a smaller font to stay inside the frame. */
function wordSize(term) {
  const longestWord = Math.max(...term.split(" ").map((w) => w.length));
  const byWord = Math.floor(1700 / Math.max(longestWord, 4));
  const byTotal = term.length > 14 ? 150 : 400;
  return Math.max(110, Math.min(300, byWord, byTotal));
}

function html(t) {
  const hasExample = Boolean(t.example);
  const defEnd = 9.6;
  const exEnd = hasExample ? 13.4 : defEnd;
  const total = exEnd + 3.8;
  const defSize = t.text.length > 170 ? 46 : t.text.length > 110 ? 52 : 58;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Palabra del día · ${esc(t.term)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<link href="../../kit/kit.css" rel="stylesheet">
<script src="../../kit/icons.js"></script>
<style>
  .slide { background-image: url("../../../public/fondo-azul.webp"); }
  .slide.warm { background-image: url("../../../public/fondo-burbujas.webp"); }
  .word { margin: 50px 0 0; font-size: ${wordSize(t.term)}px; font-weight: 800; letter-spacing: -0.055em; line-height: 0.98; }
  .alias { margin-top: 26px; color: var(--muted); font-size: 44px; font-weight: 650; }
  .def { position: absolute; top: 330px; left: 70px; right: 70px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .def-card { margin-top: 50px; border-radius: 48px; padding: 52px 54px; text-align: left; }
  .def-card p { margin: 0; font-size: ${defSize}px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.36; }
  .topic { margin-top: 40px; }
  .ex-card { margin-top: 50px; border-radius: 48px; padding: 48px 54px; text-align: left; }
  .ex-card .label { display: block; margin-bottom: 18px; color: var(--accent-ink); font-size: 36px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
  .ex-card p { margin: 0; font-size: 54px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.32; }
</style>
</head>
<body>
<div id="stage" data-total="${total.toFixed(1)}">

  <section class="scene slide warm" data-start="0" data-end="2.8">
    <div class="brand-top" data-fx="fade" data-in="0"><svg class="ml" data-ml width="92"></svg><span class="wm">vibe<span>coding</span>coach</span></div>
    <div class="center">
      <span class="pill" data-fx="pop" data-in="0.15"><span data-icon="book"></span>Palabra del día</span>
      <p class="word grad" data-fx="bounce" data-in="0.45" data-dur="0.8">${esc(t.term)}</p>
      ${t.alias ? `<p class="alias" data-fx="up" data-in="1.1">${esc(t.alias)}</p>` : ""}
      <p class="body-l" data-fx="up" data-in="1.4" style="margin-top:44px">Te la explico en segundos.</p>
    </div>
  </section>

  <section class="scene slide" data-start="2.8" data-end="${defEnd}">
    <div class="def">
      <p class="h-m" data-fx="up" data-in="0.1">¿Qué es <span class="grad">${esc(t.term)}</span>?</p>
      <div class="def-card glass" data-fx="up" data-in="0.5"><p>${esc(t.text)}</p></div>
      <span class="pill topic" data-fx="pop" data-in="1.4"><span data-icon="sparkle"></span>${esc(t.topic)}</span>
    </div>
  </section>
${
  hasExample
    ? `
  <section class="scene slide warm" data-start="${defEnd}" data-end="${exEnd}">
    <div class="def">
      <p class="h-m" data-fx="up" data-in="0.1">Para que lo veas <span class="grad">claro</span></p>
      <div class="ex-card glass" data-fx="up" data-in="0.5"><span class="label">Ejemplo</span><p>${esc(t.example)}</p></div>
    </div>
  </section>
`
    : ""
}
  <section class="scene slide${hasExample ? "" : " warm"}" data-start="${exEnd}" data-end="${total.toFixed(1)}">
    <div class="center">
      <div data-fx="bounce" data-in="0.15" data-dur="0.85"><svg class="ml" data-ml width="280"></svg></div>
      <p class="cta-word wm" data-fx="up" data-in="0.6">vibe<span>coding</span>coach</p>
      <div data-fx="pop" data-in="1.1" data-dur="0.6"><div class="cta-btn" data-pulse="1.8"><span data-icon="book"></span>Todo el glosario, gratis</div></div>
      <p class="cta-sec" data-fx="up" data-in="1.6">${glossary.length} palabras explicadas sin jerga en</p>
      <div class="cta-url glass" data-fx="up" data-in="1.9">vibecoding.miguelliebana.com</div>
    </div>
  </section>

</div>
<script src="../../kit/engine.js"></script>
</body>
</html>
`;
}

function caption(t) {
  return `Palabra del día: ${t.term}${t.alias ? ` (${t.alias})` : ""}.

${t.text}
${t.example ? `\nEjemplo: ${t.example}\n` : ""}
¿Qué palabra explico en el próximo? Te leo en comentarios.

${glossary.length} palabras explicadas sin jerga en el glosario gratuito (enlace en el perfil).

#vibecoding #inteligenciaartificial #ia #glosario #aprenderaprogramar ${TAGS[t.topic]} #tecnologia
`;
}

const terms = glossary.filter((t) => (only ? only.includes(termId(t.term)) : !SKIP.has(termId(t.term))));
const index = [];
for (const t of terms) {
  const id = termId(t.term);
  const dir = join(here, id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "reel.html"), html(t));
  writeFileSync(join(dir, "caption.txt"), caption(t));
  index.push(`## ${t.term}\n\nVídeo: \`media/palabras/${id}/out/${id}.mp4\`\n\n\`\`\`\n${caption(t).trim()}\n\`\`\`\n`);
}
writeFileSync(join(here, "captions.md"), `# Palabra del día · textos de publicación\n\nGenerado por \`npm run reels:palabras\`. ${terms.length} reels.\n\n${index.join("\n")}`);
console.log(`generated ${terms.length} reels`);

if (render) {
  for (const t of terms) {
    const id = termId(t.term);
    if (!force && existsSync(join(here, id, "out", `${id}.mp4`))) continue;
    execFileSync("node", [join(root, "media", "render.mjs"), `palabras/${id}`], { stdio: "inherit" });
  }
}
