// Renders a reel folder (media/<name>/reel.html) frame by frame with the local Chrome and encodes it with ffmpeg.
// Usage: npm run reel -- <name> [--stills 1.2,5,9.4]   e.g. npm run reel -- reel-02
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const name = process.argv[2];
const here = join(dirname(fileURLToPath(import.meta.url)), name ?? "");
if (!name || !existsSync(join(here, "reel.html"))) {
  console.error("Usage: npm run reel -- <reel folder in media/>");
  process.exit(1);
}
const out = join(here, "out");
const framesDir = join(out, "frames");
const stillsArg = process.argv.indexOf("--stills");
const stills = stillsArg > -1 ? process.argv[stillsArg + 1].split(",").map(Number) : null;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--allow-file-access-from-files", "--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(here, "reel.html")).href, { waitUntil: "networkidle0" });
await page.evaluate(() => window.ready);
const stage = await page.$("#stage");

mkdirSync(out, { recursive: true });
if (stills) {
  for (const t of stills) {
    await page.evaluate((s) => window.renderAt(s), t);
    await stage.screenshot({ path: join(out, `still-${t.toFixed(2)}.png`) });
  }
  await browser.close();
  console.log(`stills written to ${out}`);
  process.exit(0);
}

rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });
const { frames, fps, audio, fadeAt } = await page.evaluate(() => ({
  frames: window.FRAMES,
  fps: window.FPS,
  audio: document.getElementById("stage").dataset.audio ?? null,
  fadeAt: document.getElementById("stage").dataset.audioFadeout ?? null,
}));
for (let f = 0; f < frames; f++) {
  await page.evaluate((s) => window.renderAt(s), f / fps);
  await stage.screenshot({ path: join(framesDir, `${String(f).padStart(5, "0")}.jpg`), type: "jpeg", quality: 94 });
  if (f % 90 === 0) console.log(`${name}: frame ${f}/${frames}`);
}
await browser.close();

const video = join(out, `${name}.mp4`);
const encode = ["-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
// Optional soundtrack: data-audio on #stage points to a clip (relative to the reel folder) that starts at 0 s.
const sound = audio
  ? ["-i", join(here, audio), "-map", "0:v", "-map", "1:a", "-c:a", "aac", "-b:a", "192k", ...(fadeAt ? ["-af", `afade=t=out:st=${fadeAt}:d=0.8`] : [])]
  : [];
execFileSync("ffmpeg", ["-v", "error", "-y", "-framerate", String(fps), "-i", join(framesDir, "%05d.jpg"), ...sound, ...encode, video], { stdio: "inherit" });
rmSync(framesDir, { recursive: true, force: true });
console.log(`video written to ${video}`);
