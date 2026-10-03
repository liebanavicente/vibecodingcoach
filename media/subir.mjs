// Uploads rendered reels to the Vercel Blob store so Buffer can fetch them, and prints each public URL with its caption.
// Buffer copies the video when the post is created, so the blob only has to exist until then.
// Usage: npm run subir -- reel-15 palabras/rag palabras/git   (npm run publicar does this on its own)
import { existsSync } from "node:fs";
import { captionFor, upload, videoPath } from "./publicar/comun.mjs";

const names = process.argv.slice(2);
if (!names.length) {
  console.error("Usage: npm run subir -- reel-15 palabras/rag");
  process.exit(1);
}
const results = [];
for (const name of names) {
  if (!existsSync(videoPath(name))) {
    console.error(`skip ${name}: render it first (npm run reel -- ${name})`);
    continue;
  }
  const url = upload(name);
  results.push({ name, url, caption: captionFor(name) });
  console.error(`${name}: ${url}`);
}
console.log(JSON.stringify(results, null, 2));
