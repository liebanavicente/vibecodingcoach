// Renders reel.html frame by frame with the local Chrome and encodes it with ffmpeg.
// Usage: node media/reel-01/render.mjs [--stills 1.2,5,9.4]   (stills = seconds to export as PNG previews)
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const here = dirname(fileURLToPath(import.meta.url));
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
const { frames, fps } = await page.evaluate(() => ({ frames: window.FRAMES, fps: window.FPS }));
for (let f = 0; f < frames; f++) {
  await page.evaluate((s) => window.renderAt(s), f / fps);
  await stage.screenshot({ path: join(framesDir, `${String(f).padStart(5, "0")}.jpg`), type: "jpeg", quality: 94 });
  if (f % 60 === 0) console.log(`frame ${f}/${frames}`);
}
await browser.close();

const video = join(out, "reel-01.mp4");
execFileSync("ffmpeg", [
  "-v", "error", "-y", "-framerate", String(fps), "-i", join(framesDir, "%05d.jpg"),
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", video,
], { stdio: "inherit" });
rmSync(framesDir, { recursive: true, force: true });
console.log(`video written to ${video}`);
