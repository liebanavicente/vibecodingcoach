// Turns a course module into a YouTube lesson without voice: 1920x1080 slides that build themselves, with the
// lesson text (from src/content/curso.ts) as short captions timed to reading speed. Also writes the YouTube
// description with chapters. Render with npm run reel -- video-curso/<slug>.
// Usage: node --no-warnings media/video-curso/leccion.mjs modulo-0 [--musica musica.mp3]
//   --musica: a track in media/video-curso/ (e.g. from the YouTube Audio Library), mixed quietly under the video.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { modules } = await import("../../src/content/curso.ts");
const slug = process.argv[2];
const mod = modules.find((m) => m.slug === slug && m.available);
if (!mod) {
  console.error(`Usage: node --no-warnings media/video-curso/leccion.mjs <slug>  (${modules.filter((m) => m.available).map((m) => m.slug).join(", ")})`);
  process.exit(1);
}
const here = dirname(fileURLToPath(import.meta.url));
const musicArg = process.argv.indexOf("--musica");
const music = musicArg > -1 ? process.argv[musicArg + 1] : null;
if (music && !existsSync(join(here, music))) {
  console.error(`No encuentro media/video-curso/${music}`);
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const words = (s) => s.split(/\s+/).filter(Boolean).length;
// Reading time: about 2.6 words a second, never shorter than 2.6 s.
const readTime = (s) => Math.max(2.6, words(s) / 2.6 + 0.9);
const sentences = (paragraphs) =>
  paragraphs.flatMap((p) => p.split(/(?<=[.!?:])\s+(?=[¿¡A-ZÁÉÍÓÚÑ"«])/)).map((s) => s.trim()).filter(Boolean);
const brand = `<div class="brand"><svg class="ml" data-ml width="70"></svg><span class="wm">vibe<span>coding</span>coach</span><span class="mod">Módulo ${mod.number}</span></div>`;

let t = 0;
const scenes = [];
const chapters = [];

// A scene: heading, items that appear one by one, then captions held one after another at the bottom.
function scene({ eyebrow, title, items = [], code, tip, captions = [], chapter, extraClass = "" }) {
  const start = t;
  if (chapter) chapters.push([start, chapter]);
  let lt = 0.5;
  const parts = [brand, `<div class="body${extraClass}">`];
  if (eyebrow) parts.push(`<p class="eyebrow" data-fx="pop" data-in="0.1">${esc(eyebrow)}</p>`);
  parts.push(`<h2 data-fx="up" data-in="0.25">${esc(title)}</h2>`);
  if (items.length) {
    parts.push("<ul>");
    for (const item of items) {
      lt += 0.55;
      parts.push(`<li data-fx="up" data-in="${lt.toFixed(2)}">${esc(item)}</li>`);
    }
    parts.push("</ul>");
    // Time to read the list itself before the captions start.
    lt += words(items.join(" ")) / 3.2;
  }
  if (code) {
    lt += 0.5;
    const dur = Math.min(5, code.length / 45);
    parts.push(`<pre class="prompt" data-fx="up" data-in="${lt.toFixed(2)}"><span data-type="${esc(code)}" data-in="${(lt + 0.3).toFixed(2)}" data-dur="${dur.toFixed(2)}"></span></pre>`);
    lt += dur;
  }
  lt += 1.2;
  const capsFrom = lt;
  const caps = [];
  for (const c of captions) {
    const d = readTime(c);
    caps.push(`<p class="cap" data-hold="${lt.toFixed(2)},${(lt + d).toFixed(2)},0.25">${esc(c)}</p>`);
    lt += d + 0.25;
  }
  const capsTo = lt;
  if (tip) {
    parts.push(`<p class="tip" data-fx="up" data-in="${lt.toFixed(2)}">${esc(tip)}</p>`);
    lt += readTime(tip) + 0.6;
  }
  parts.push("</div>");
  // The caption band only shows while there is a sentence in it.
  if (caps.length) parts.push(`<div class="caps glass" data-hold="${(capsFrom - 0.1).toFixed(2)},${(capsTo - 0.15).toFixed(2)},0.3">${caps.join("")}</div>`);
  const duration = Math.max(lt + 0.6, 5);
  scenes.push(`  <section class="scene slide warm" data-start="${start.toFixed(2)}" data-end="${(start + duration).toFixed(2)}">\n    ${parts.join("\n    ")}\n  </section>`);
  t = start + duration;
}

// Cover
chapters.push([0, "Introducción"]);
const coverScene = `  <section class="scene slide warm" data-start="0" data-end="6.5">
    ${brand}
    <div class="body cover">
      <p class="eyebrow" data-fx="pop" data-in="0.2">Curso gratis · Vibe Coding desde Cero</p>
      <h1 data-fx="up" data-in="0.5">${esc(mod.title)}</h1>
      <p class="lead" data-fx="up" data-in="1.1">${esc(mod.summary)}</p>
      <p class="by" data-fx="up" data-in="1.8">Con Miguel Liébana, maestro durante 14 años</p>
    </div>
  </section>`;
scenes.push(coverScene);
t = 6.5;

scene({ eyebrow: "Objetivos", title: "Al terminar podrás…", items: mod.objectives, captions: ["Tómate tu tiempo: puedes pausar el vídeo cuando quieras."] });
for (const section of mod.sections) {
  scene({ chapter: section.title, title: section.title, items: section.points, captions: sentences(section.body), tip: section.tip });
  if (section.prompt) {
    scene({
      eyebrow: section.promptLabel ?? "Pruébalo",
      title: section.title,
      code: section.prompt,
      captions: [section.promptLabel ? "Léelo con calma: ya sabes qué hace cada parte." : "Copia este prompt y pégalo en tu herramienta de IA. Lo tienes también en la web del curso."],
    });
  }
}
if (mod.exercise) {
  scene({ chapter: "Ejercicio", eyebrow: "Ejercicio", title: mod.exercise.title, items: mod.exercise.steps, captions: ["Pausa el vídeo y hazlo ahora: se aprende haciendo."] });
}
if (mod.checklist) {
  scene({ chapter: "Repaso", eyebrow: "Repaso", title: "Comprueba lo que has aprendido", items: mod.checklist, captions: ["Si puedes marcarlo todo, estás listo para el siguiente módulo."] });
}

// Closing card
const next = modules.find((m) => m.number === mod.number + 1);
const closing = (start) => `  <section class="scene slide warm" data-start="${start.toFixed(2)}" data-end="${(start + 7).toFixed(2)}">
    <div class="center">
      <div data-fx="bounce" data-in="0.15" data-dur="0.85"><svg class="ml" data-ml width="220"></svg></div>
      <p class="cta-word wm" data-fx="up" data-in="0.6">vibe<span>coding</span>coach</p>
      <p class="h-m" data-fx="up" data-in="1.1" style="margin-top:30px">El curso completo, gratis, en</p>
      <div class="cta-url glass" data-fx="up" data-in="1.5">vibecoding.miguelliebana.com</div>
      ${next ? `<p class="cta-sec" data-fx="up" data-in="2.1">Siguiente: Módulo ${next.number} · ${esc(next.title)}</p>` : ""}
      <div data-fx="pop" data-in="2.7"><div class="cta-btn" data-pulse="3.2"><span data-icon="calendar"></span>Primera clase gratis</div></div>
    </div>
  </section>`;
scenes.push(closing(t));
const total = t + 7;

const audio = music ? ` data-audio="${esc(music)}" data-audio-volume="0.18" data-audio-fadeout="${(total - 2.5).toFixed(2)}"` : "";
const page = (body, length, depth = "../..", extra = "") => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Lección en vídeo · Módulo ${mod.number}: ${esc(mod.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=block" rel="stylesheet">
<link href="${depth}/kit/kit.css" rel="stylesheet">
<script src="${depth}/kit/icons.js"></script>
<style>
  /* Generated by media/video-curso/leccion.mjs from the course content: edit curso.ts, not this file. */
  #stage { width: 1920px; height: 1080px; }
  .slide::after { background: radial-gradient(70% 80% at 40% 45%, rgba(250, 251, 253, 0.9), rgba(250, 251, 253, 0.25)); }
  .brand { position: absolute; top: 50px; left: 110px; display: flex; align-items: center; gap: 16px; font-size: 32px; font-weight: 800; letter-spacing: -0.03em; }
  .brand .wm span { color: var(--orange); }
  .brand .mod { margin-left: 14px; border-radius: 999px; background: rgba(255, 112, 52, 0.12); color: var(--accent-ink); font-size: 24px; font-weight: 750; letter-spacing: 0; padding: 8px 18px; }
  .body { position: absolute; top: 150px; left: 110px; right: 110px; }
  .body.cover { top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; }
  .eyebrow { display: inline-block; margin: 0 0 22px; border: 2px solid rgba(255, 112, 52, 0.25); border-radius: 999px; background: rgba(255, 112, 52, 0.12); color: var(--accent-ink); font-size: 28px; font-weight: 750; padding: 9px 22px; }
  .cover .eyebrow { align-self: flex-start; }
  h1 { margin: 0; font-size: 124px; font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
  h2 { margin: 0; font-size: 82px; font-weight: 800; letter-spacing: -0.045em; line-height: 1.05; }
  .lead { max-width: 1300px; margin: 34px 0 0; color: var(--muted); font-size: 44px; font-weight: 500; line-height: 1.35; }
  .by { margin: 40px 0 0; color: var(--accent-ink); font-size: 32px; font-weight: 700; }
  ul { margin: 34px 0 0; padding: 0; list-style: none; }
  li { display: flex; gap: 22px; max-width: 1580px; font-size: 46px; font-weight: 600; line-height: 1.3; }
  li + li { margin-top: 22px; }
  li::before { flex: none; width: 18px; height: 18px; margin-top: 21px; border-radius: 50%; background: var(--grad); content: ""; }
  .tip { display: inline-block; max-width: 1580px; margin: 36px 0 0; border-left: 8px solid var(--orange); border-radius: 8px; background: rgba(255, 255, 255, 0.75); color: var(--accent-ink); font-size: 40px; font-weight: 700; line-height: 1.35; padding: 18px 28px; }
  .prompt { max-width: 1580px; min-height: 220px; margin: 36px 0 0; white-space: pre-wrap; border-radius: 28px; background: #1f1b26; box-shadow: inset 8px 0 0 var(--orange), 0 30px 60px rgba(31, 27, 38, 0.25); color: #f1edf7; font-family: "SFMono-Regular", Menlo, monospace; font-size: 40px; line-height: 1.5; padding: 36px 44px; }
  /* Lesson text: one sentence at a time in a band at the bottom. */
  .caps { position: absolute; left: 110px; right: 110px; bottom: 56px; height: 210px; border-radius: 36px; }
  .cap { position: absolute; inset: 0; display: flex; align-items: center; margin: 0; padding: 0 56px; font-size: 46px; font-weight: 600; line-height: 1.35; }
</style>
</head>
<body>
<div id="stage" data-total="${length.toFixed(2)}"${extra}>
${body}
</div>
<script src="${depth}/kit/engine.js"></script>
</body>
</html>
`;

const dir = join(here, slug);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "reel.html"), page(scenes.join("\n\n"), total, "../..", audio));
// Stand-alone opening and closing, to wrap a video made elsewhere (e.g. NotebookLM) with the brand: envolver.sh.
for (const [name, body, length] of [["entrada", coverScene.replace('data-end="6.5"', 'data-end="4.5"'), 4.5], ["cierre", closing(0), 7]]) {
  mkdirSync(join(dir, name), { recursive: true });
  writeFileSync(join(dir, name, "reel.html"), page(body, length, "../../.."));
}

const stamp = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const description = `Módulo ${mod.number} del curso gratuito Vibe Coding desde Cero: ${mod.title.charAt(0).toLowerCase() + mod.title.slice(1)}.
${mod.summary}

📚 Curso completo, gratis y con ejercicios: https://vibecoding.miguelliebana.com/curso/${slug}
🎓 Primera clase gratis (30 min): https://vibecoding.miguelliebana.com/reservar

Capítulos
${chapters.map(([s, name]) => `${stamp(s)} ${name}`).join("\n")}

Soy Miguel Liébana, maestro durante 14 años. Enseño a principiantes absolutos a construir su primera web con IA, sin jerga.
Instagram: https://www.instagram.com/vibecodingcoach_ml/ · TikTok: https://www.tiktok.com/@vibecodingcoach_m

#vibecoding #inteligenciaartificial #aprenderaprogramar #claude #crearunaweb
`;
writeFileSync(join(dir, "descripcion.txt"), description);
// For the NotebookLM overview wrapped by envolver.sh: no chapters (its structure is its own) and a credit line.
writeFileSync(
  join(dir, "descripcion-notebooklm.txt"),
  description
    .replace(/\nCapítulos\n[\s\S]*?\n\n/, "\n")
    .replace("Soy Miguel Liébana", "Resumen en vídeo creado con Gemini Notebook (NotebookLM) a partir del contenido del curso.\n\nSoy Miguel Liébana"),
);

// YouTube thumbnail (1280x720): npm run carrusel -- video-curso/<slug>/miniatura → miniatura/out/01.png
const thumbDir = join(dir, "miniatura");
mkdirSync(thumbDir, { recursive: true });
writeFileSync(
  join(thumbDir, "carrusel.html"),
  `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Miniatura · Módulo ${mod.number}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&display=block" rel="stylesheet">
<link href="../../../kit/kit.css" rel="stylesheet">
<style>
  /* Generated by media/video-curso/leccion.mjs. Big, short text: it has to read at phone size. */
  body { margin: 0; background: #ddd; }
  .card { position: relative; width: 1280px; height: 720px; overflow: hidden; background: url("../../../../public/fondo-burbujas.webp") center / cover; font-family: Inter, system-ui, sans-serif; color: var(--ink); }
  .card::after { position: absolute; inset: 0; background: radial-gradient(60% 80% at 35% 50%, rgba(250, 251, 253, 0.92), rgba(250, 251, 253, 0.1)); content: ""; }
  .card > * { position: relative; z-index: 1; }
  .copy { position: absolute; top: 70px; left: 70px; width: 820px; }
  .badge { display: inline-block; border-radius: 22px; background: var(--grad); box-shadow: 0 16px 34px rgba(242, 69, 47, 0.35); color: white; font-size: 44px; font-weight: 900; letter-spacing: -0.02em; padding: 12px 30px; }
  h1 { margin: 34px 0 0; font-size: ${mod.title.length > 26 ? 84 : 104}px; font-weight: 900; letter-spacing: -0.055em; line-height: 0.98; }
  .sub { margin: 30px 0 0; color: var(--accent-ink); font-size: 40px; font-weight: 800; letter-spacing: -0.02em; }
  .key { position: absolute; right: 70px; bottom: 80px; display: grid; place-items: center; width: 290px; height: 290px; border-radius: 70px; }
</style>
</head>
<body>
<section class="card">
  <div class="copy">
    <span class="badge">MÓDULO ${mod.number}</span>
    <h1>${esc(mod.title)}</h1>
    <p class="sub">Vibe coding desde cero · gratis</p>
  </div>
  <div class="key glass"><svg class="ml" data-ml width="200"></svg></div>
</section>
</body>
</html>
`,
);
console.log(`${scenes.length} escenas, ${stamp(total)} → ${join(dir, "reel.html")} y descripcion.txt`);
