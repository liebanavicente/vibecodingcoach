// Turns a Flow clip into a seamless vertical background loop for the reels (media/kit/bg/<name>.mp4).
// The last `fade` seconds blend into the first ones, so the end meets the start with no jump.
// Usage: npm run fondos            converts every vertical clip in media/bg/ that has no loop yet
//        npm run fondos -- <clip.mp4> <name> [fade seconds, default 1.5]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "kit", "bg");
mkdirSync(outDir, { recursive: true });
const probe = (file, entries) =>
  execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entries, "-of", "csv=p=0", file]).toString().trim();

function makeLoop(input, name, fade = 1.5) {
  const out = join(outDir, `${name}.mp4`);
  const duration = Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", input]).toString().trim(),
  );
  // Fill a 9:16 frame whatever the clip's shape, then: [fade → end] cross-faded into [0 → fade].
  const frame = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p";
  const graph = [
    `[0:v]${frame},split[x][y]`,
    `[x]trim=start=${fade},setpts=PTS-STARTPTS[main]`,
    `[y]trim=end=${fade},setpts=PTS-STARTPTS[head]`,
    `[main][head]xfade=transition=fade:duration=${fade}:offset=${(duration - 2 * fade).toFixed(3)}[v]`,
  ].join(";");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", input, "-filter_complex", graph, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-movflags", "+faststart", out]);
  console.log(`loop written to ${out} (${(duration - fade).toFixed(2)} s)`);
}

const [input, name, fadeArg] = process.argv.slice(2);
if (input) {
  if (!name || !existsSync(input)) {
    console.error("Usage: npm run fondos -- <clip.mp4> <name> [fade seconds]");
    process.exit(1);
  }
  makeLoop(input, name, Number(fadeArg ?? 1.5));
} else {
  // Drop-in folder: every clip in media/bg/ becomes media/kit/bg/<same name>.mp4, once.
  const inbox = join(here, "bg");
  const clips = readdirSync(inbox).filter((f) => /\.(mp4|mov|webm)$/i.test(f));
  for (const file of clips) {
    const name = basename(file, extname(file));
    const [w, h] = probe(join(inbox, file), "stream=width,height").split(",").map(Number);
    if (h <= w) console.log(`skip ${file}: it is horizontal, backgrounds must be vertical (9:16)`);
    else if (existsSync(join(outDir, `${name}.mp4`))) console.log(`skip ${file}: media/kit/bg/${name}.mp4 already exists`);
    else makeLoop(join(inbox, file), name);
  }
}
