// Uploads rendered reels to the Vercel Blob store so Buffer can fetch them, and prints each public URL with its caption.
// Buffer copies the video when the post is created, so the blob only has to exist until then.
// Usage: npm run subir -- reel-15 palabras/rag palabras/git
// Needs BLOB_READ_WRITE_TOKEN in .env.local (npx vercel env pull .env.local).
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const envFile = join(here, "..", ".env.local");
const token = existsSync(envFile) && readFileSync(envFile, "utf8").match(/^BLOB_READ_WRITE_TOKEN="?([^"\n]+)"?/m)?.[1];
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local: run npx vercel env pull .env.local");
  process.exit(1);
}
const names = process.argv.slice(2);
if (!names.length) {
  console.error("Usage: npm run subir -- reel-15 palabras/rag");
  process.exit(1);
}

// Captions: palabras/<id>/caption.txt, or the first code block under "## Reel NN" in instagram.md.
const instagram = readFileSync(join(here, "instagram.md"), "utf8");
function captionFor(name) {
  const file = join(here, name, "caption.txt");
  if (existsSync(file)) return readFileSync(file, "utf8").trim();
  const number = name.match(/reel-(\d+)/)?.[1];
  const section = number && instagram.split(/^## /m).find((s) => s.startsWith(`Reel ${number} `));
  return section?.match(/```\n([\s\S]*?)```/)?.[1].trim() ?? null;
}

const results = [];
for (const name of names) {
  const video = join(here, name, "out", `${basename(name)}.mp4`);
  if (!existsSync(video)) {
    console.error(`skip ${name}: render it first (npm run reel -- ${name})`);
    continue;
  }
  // The CLI prints the URL on stderr, so read both streams.
  const run = spawnSync(
    "npx",
    ["-y", "vercel@latest", "blob", "put", video, "--pathname", `reels/${basename(name)}.mp4`, "--access", "public", "--allow-overwrite", "true", "--content-type", "video/mp4", "--rw-token", token],
    { encoding: "utf8", env: { ...process.env, VERCEL_OIDC_TOKEN: "" } },
  );
  const url = `${run.stdout}${run.stderr}`.match(/https:\/\/\S+\.mp4/)?.[0];
  if (!url) {
    console.error(`${name}: upload failed\n${run.stderr}`);
    continue;
  }
  results.push({ name, url, caption: captionFor(name) });
  console.error(`${name}: ${url}`);
}
console.log(JSON.stringify(results, null, 2));
