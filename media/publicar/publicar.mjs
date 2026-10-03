// Keeps the Buffer queue full: walks media/publicar/cola.json in order and adds to Buffer (Instagram and TikTok)
// every reel that is not there yet, until the plan's limit of scheduled posts is reached. Buffer puts each post in
// the channel's next free slot (its posting schedule). What is already in Buffer is recognised by the video name.
// Usage: npm run publicar            fill the queue (needs BUFFER_API_KEY in .env.local)
//        npm run publicar -- --plan  only show what would be added (add --limite 20 to preview further ahead)
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { captionFor, env, media, upload, videoPath } from "./comun.mjs";

const config = JSON.parse(readFileSync(join(media, "publicar", "cola.json"), "utf8"));
const key = env("BUFFER_API_KEY");
const planOnly = process.argv.includes("--plan") || !key;
const stamp = () => new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

async function buffer(query, variables) {
  const res = await fetch("https://api.buffer.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data;
}

// Every post Buffer knows about, as "<channelId>|<video name>", and how many are waiting to go out.
async function bufferState() {
  const seen = new Set();
  let scheduled = 0;
  let after = null;
  do {
    const data = await buffer(
      `query ($input: PostsInput!, $after: String) {
        posts(input: $input, first: 100, after: $after) {
          edges { node { channelId status assets { ... on VideoAsset { video { title } } } } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { input: { organizationId: config.organizacion }, after },
    );
    for (const { node } of data.posts.edges) {
      if (node.status === "scheduled") scheduled++;
      for (const asset of node.assets) if (asset.video?.title) seen.add(`${node.channelId}|${asset.video.title}`);
    }
    after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
  } while (after);
  return { seen, scheduled };
}

async function createPost(service, channelId, url, title, text) {
  const metadata = service === "instagram" ? { instagram: { type: "reel", shouldShareToFeed: true } } : undefined;
  const data = await buffer(
    `mutation ($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id dueAt } }
        ... on MutationError { message }
      }
    }`,
    {
      input: {
        channelId,
        mode: "addToQueue",
        schedulingType: "automatic",
        text,
        assets: [{ video: { url, metadata: { title } } }],
        metadata,
      },
    },
  );
  if (data.createPost.message) throw new Error(data.createPost.message);
  return data.createPost.post;
}

const { seen, scheduled } = key ? await bufferState() : { seen: new Set(), scheduled: 0 };
const limitArg = process.argv.indexOf("--limite");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : config.limite;
let free = limit - scheduled;
console.log(`[${stamp()}] ${scheduled}/${limit} programadas, ${free} huecos libres${key ? "" : " (sin BUFFER_API_KEY: solo plan)"}`);

const plan = [];
for (const name of config.cola) {
  if (free <= 0) break;
  const title = `${basename(name)}.mp4`;
  const channels = Object.entries(config.canales).filter(([, id]) => !seen.has(`${id}|${title}`));
  if (!channels.length) continue;
  if (!existsSync(videoPath(name))) {
    console.log(`  ${name}: falta el vídeo, se salta (npm run reel -- ${name})`);
    continue;
  }
  const text = captionFor(name);
  if (!text) {
    console.log(`  ${name}: falta el texto en instagram.md o caption.txt, se salta`);
    continue;
  }
  const take = channels.slice(0, free);
  free -= take.length;
  plan.push({ name, title, text, channels: take });
}

if (!plan.length) console.log("  Nada que añadir.");
for (const { name, title, text, channels } of plan) {
  if (planOnly) {
    console.log(`  + ${name} → ${channels.map(([service]) => service).join(" y ")}`);
    continue;
  }
  const url = upload(name);
  for (const [service, channelId] of channels) {
    const post = await createPost(service, channelId, url, title, text);
    console.log(`  + ${name} → ${service}, ${new Date(post.dueAt).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`);
  }
}
