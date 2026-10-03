// Shared by npm run subir and npm run publicar: local env, captions and uploads to the Vercel Blob store.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const media = join(dirname(fileURLToPath(import.meta.url)), "..");
const envFile = join(media, "..", ".env.local");
const envText = existsSync(envFile) ? readFileSync(envFile, "utf8") : "";

/** A value from .env.local (or the environment), or undefined. */
export function env(name) {
  return process.env[name] || envText.match(new RegExp(`^${name}="?([^"\\n]+)"?`, "m"))?.[1];
}

/** The rendered video of a reel folder, e.g. "reel-15" or "palabras/rag". */
export const videoPath = (name) => join(media, name, "out", `${basename(name)}.mp4`);

// Captions: palabras/<id>/caption.txt, or the first code block under "## Reel NN" in instagram.md.
const instagram = readFileSync(join(media, "instagram.md"), "utf8");
export function captionFor(name) {
  const file = join(media, name, "caption.txt");
  if (existsSync(file)) return readFileSync(file, "utf8").trim();
  const number = name.match(/reel-(\d+)/)?.[1];
  const section = number && instagram.split(/^## /m).find((s) => s.startsWith(`Reel ${number} `));
  return section?.match(/```\n([\s\S]*?)```/)?.[1].trim() ?? null;
}

/** Uploads a rendered video to reels/<name>.mp4 in the Blob store and returns its public URL. */
export function upload(name) {
  const token = env("BLOB_READ_WRITE_TOKEN");
  if (!token) throw new Error("Missing BLOB_READ_WRITE_TOKEN in .env.local: run npx vercel env pull .env.local");
  const args = ["-y", "vercel@latest", "blob", "put", videoPath(name), "--pathname", `reels/${basename(name)}.mp4`];
  args.push("--access", "public", "--allow-overwrite", "true", "--content-type", "video/mp4", "--rw-token", token);
  // The CLI prints the URL on stderr, so read both streams.
  const run = spawnSync("npx", args, { encoding: "utf8", env: { ...process.env, VERCEL_OIDC_TOKEN: "" } });
  const url = `${run.stdout}${run.stderr}`.match(/https:\/\/\S+\.mp4/)?.[0];
  if (!url) throw new Error(`upload of ${name} failed\n${run.stderr}`);
  return url;
}
