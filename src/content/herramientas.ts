import {
  siClaude,
  siCursor,
  siFigma,
  siFramer,
  siGithub,
  siGooglegemini,
  siKimi,
  siNextdotjs,
  siResend,
  siStripe,
  siSupabase,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

/** A brand mark: a Simple Icons path, an official image in public/logos ("fill" = app icon that fills its tile),
 * or a generic code glyph in a brand colour when no logo is available. */
export type Logo = { icon: SimpleIcon } | { src: string; fill?: boolean } | { generic: "code"; color: string };

/** Main tools, in the order Miguel uses them most. */
export const tools: { name: string; text: string; logo: Logo }[] = [
  { name: "Claude", logo: { icon: siClaude }, text: "Mi compañero para pensar: ideas, planes, textos y explicaciones paso a paso." },
  { name: "Claude Code", logo: { icon: siClaude }, text: "Un agente que construye proyectos completos directamente sobre tus archivos." },
  { name: "Codex", logo: { src: "/logos/codex.webp" }, text: "El agente de programación de OpenAI, para encargar tareas y revisar código." },
  { name: "Cursor", logo: { icon: siCursor }, text: "Un editor de código con la IA integrada, para ver y tocar cada archivo." },
  { name: "Antigravity", logo: { src: "/logos/antigravity.webp", fill: true }, text: "El entorno de desarrollo de Google pensado para trabajar con agentes." },
  { name: "VS Code", logo: { generic: "code", color: "#007ACC" }, text: "El editor gratuito más usado: ligero y con extensiones para todo, también para Claude Code." },
];

/** Everything around the main tools, shown in the moving banner. */
export const resources: { name: string; kind: string; logo: Logo }[] = [
  { name: "Higgsfield", kind: "Imagen y vídeo con IA", logo: { src: "/logos/higgsfield.webp", fill: true } },
  { name: "Google Flow", kind: "Vídeo con IA", logo: { src: "/logos/google-flow.webp", fill: true } },
  { name: "Vercel", kind: "Publicar webs", logo: { icon: siVercel } },
  { name: "Supabase", kind: "Base de datos", logo: { icon: siSupabase } },
  { name: "GitHub", kind: "Código", logo: { icon: siGithub } },
  { name: "Figma", kind: "Diseño", logo: { icon: siFigma } },
  { name: "Framer", kind: "Webs visuales", logo: { icon: siFramer } },
  { name: "Stripe", kind: "Pagos", logo: { icon: siStripe } },
  { name: "Resend", kind: "Emails", logo: { icon: siResend } },
  { name: "Next.js", kind: "Framework", logo: { icon: siNextdotjs } },
  { name: "Gemini", kind: "IA", logo: { icon: siGooglegemini } },
  { name: "ChatGPT", kind: "IA", logo: { src: "/logos/openai.webp" } },
  { name: "Kimi", kind: "IA", logo: { icon: siKimi } },
];

export const logoFor = (name: string) => [...tools, ...resources].find((item) => item.name === name)?.logo;
