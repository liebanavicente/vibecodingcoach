/** Main tools, in the order Miguel uses them most. */
export const tools = [
  { name: "Claude", text: "Mi compañero para pensar: ideas, planes, textos y explicaciones paso a paso." },
  { name: "Claude Code", text: "Un agente que construye proyectos completos directamente sobre tus archivos." },
  { name: "Codex", text: "El agente de programación de OpenAI, para encargar tareas y revisar código." },
  { name: "Cursor", text: "Un editor de código con la IA integrada, para ver y tocar cada archivo." },
  { name: "Antigravity", text: "El entorno de desarrollo de Google pensado para trabajar con agentes." },
] as const;

/** Everything around the main tools, shown in the moving banner. */
export const resources = [
  { name: "Higgsfield", kind: "Imagen y vídeo con IA" },
  { name: "Google Flow", kind: "Vídeo con IA" },
  { name: "Vercel", kind: "Publicar webs" },
  { name: "Supabase", kind: "Base de datos" },
  { name: "GitHub", kind: "Código" },
  { name: "Figma", kind: "Diseño" },
  { name: "Framer", kind: "Webs visuales" },
  { name: "Stripe", kind: "Pagos" },
  { name: "Resend", kind: "Emails" },
  { name: "Next.js", kind: "Framework" },
  { name: "Gemini", kind: "IA" },
  { name: "ChatGPT", kind: "IA" },
  { name: "Kimi", kind: "IA" },
];
