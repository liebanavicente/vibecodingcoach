// Turns a Flow clip into a seamless vertical background loop for the reels (media/kit/bg/<name>.mp4).
// The last `fade` seconds blend into the first ones, so the end meets the start with no jump.
// Usage: npm run reel:fondo -- <clip.mp4> <name> [fade seconds, default 1.5]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [input, name, fadeArg] = process.argv.slice(2);
if (!input || !name || !existsSync(input)) {
  console.error("Usage: npm run reel:fondo -- <clip.mp4> <name> [fade seconds]");
  process.exit(1);
}
const fade = Number(fadeArg ?? 1.5);
const outDir = join(dirname(fileURLToPath(import.meta.url)), "kit", "bg");
mkdirSync(outDir, { recursive: true });
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
