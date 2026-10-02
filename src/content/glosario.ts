export const glossaryTopics = ["IA", "Herramientas", "Código", "Publicar"] as const;
export type GlossaryTopic = (typeof glossaryTopics)[number];

export type Term = {
  term: string;
  alias?: string;
  topic: GlossaryTopic;
  text: string;
  example?: string;
  /** Slug of a course resource that goes deeper. */
  guide?: string;
};

export const glossary: Term[] = [
  // IA
  { term: "IA generativa", topic: "IA", text: "Inteligencia artificial que crea contenido nuevo (texto, código, imágenes o vídeo) a partir de lo que le pides." },
  {
    term: "LLM",
    alias: "Modelo de lenguaje grande",
    topic: "IA",
    text: "El tipo de IA que hay detrás de Claude o ChatGPT. Ha aprendido de enormes cantidades de texto a predecir qué viene después, y eso le permite conversar, explicar y escribir código.",
    example: "Claude es un LLM.",
  },
  {
    term: "Modelo",
    topic: "IA",
    text: "Cada versión concreta de una IA. Los grandes razonan mejor pero son más lentos y caros; los pequeños responden más rápido.",
    example: "Claude Opus, Claude Sonnet y Claude Haiku son modelos de distinto tamaño.",
  },
  {
    term: "Prompt",
    topic: "IA",
    text: "Lo que le escribes a la IA: tu pregunta o tu instrucción. Cuanto más claro y con más contexto, mejor responde.",
    guide: "hablar-con-claude",
  },
  {
    term: "Token",
    topic: "IA",
    text: "La unidad en la que la IA trocea el texto, más o menos un trozo de palabra. Los límites de uso y de memoria se miden en tokens.",
    example: "Una palabra larga pueden ser dos o tres tokens; una página de texto, cientos.",
  },
  {
    term: "Ventana de contexto",
    alias: "Contexto",
    topic: "IA",
    text: "Todo lo que la IA puede tener en cuenta a la vez en una conversación: tus mensajes, sus respuestas y los archivos que lee. Cuando se llena, empieza a olvidar detalles.",
    example: "Como una mesa de trabajo de tamaño fijo.",
    guide: "ventana-de-contexto",
  },
  {
    term: "Alucinación",
    topic: "IA",
    text: "Cuando la IA se inventa algo y lo dice con total seguridad: una función que no existe o un dato falso. Por eso conviene comprobar lo importante.",
  },
  {
    term: "Agente",
    topic: "IA",
    text: "Una IA que no solo responde, sino que actúa: lee archivos, ejecuta comandos y encadena pasos hasta terminar una tarea.",
    example: "Claude Code y Codex son agentes.",
  },
  {
    term: "Multimodal",
    topic: "IA",
    text: "Que entiende más que texto: imágenes, capturas de pantalla, PDFs o audio.",
    example: "Por eso puedes pegarle a Claude una captura de un error.",
  },
  {
    term: "RAG",
    alias: "Generación aumentada por recuperación",
    topic: "IA",
    text: "Una técnica para que la IA responda usando tus propios documentos: primero busca los fragmentos que importan y después los usa para contestar. Así puede hablar de información que no estaba en su entrenamiento y decirte de dónde la ha sacado.",
    example: "Un chat que responde dudas de las familias usando el PDF del reglamento del cole.",
  },
  {
    term: "Embeddings",
    topic: "IA",
    text: "Una forma de convertir textos en listas de números que representan su significado. Los textos parecidos quedan «cerca», y eso permite buscar por significado y no solo por palabras exactas. Es la pieza que usa el RAG para encontrar lo relevante.",
    example: "«Coche» y «automóvil» quedan muy cerca aunque no compartan letras.",
  },
  {
    term: "Temperatura",
    topic: "IA",
    text: "Un ajuste que controla cuánto se arriesga la IA al elegir las palabras: baja da respuestas más previsibles y constantes; alta, más variadas y creativas, pero con más riesgo de errores. Se ajusta sobre todo cuando usas la IA desde una API.",
    example: "Baja para sacar los datos de una factura; más alta para inventar nombres para tu negocio.",
  },
  {
    term: "Vibe coding",
    topic: "IA",
    text: "Construir software describiendo lo que quieres en lenguaje normal y dejando que la IA escriba la mayor parte del código. Tú diriges, decides y revisas.",
  },

  // Herramientas
  {
    term: "MCP",
    alias: "Conector",
    topic: "Herramientas",
    text: "Model Context Protocol: un estándar para conectar la IA con otras aplicaciones, como Vercel, GitHub o tu calendario. Es como darle llaves, siempre con tu permiso.",
    guide: "conecta-tus-herramientas",
  },
  {
    term: "Skill",
    topic: "Herramientas",
    text: "Un paquete de instrucciones (un archivo SKILL.md) que enseña a un agente a hacer una tarea concreta.",
    guide: "skills",
  },
  {
    term: "Modo plan",
    topic: "Herramientas",
    text: "Un modo de Claude Code en el que piensa y te propone un plan sin tocar ningún archivo. Se activa con Shift + Tab.",
    guide: "claude-code-primer-dia",
  },
  {
    term: "CLAUDE.md",
    topic: "Herramientas",
    text: "Un archivo con lo que Claude debe saber de tu proyecto. Lo lee siempre al empezar: es su memoria del proyecto.",
    guide: "claude-code-primer-dia",
  },
  {
    term: "Editor de código",
    alias: "IDE",
    topic: "Herramientas",
    text: "El programa donde ves y escribes el código, con ayudas como colores, autocompletado y la IA integrada.",
    example: "VS Code, Cursor o Antigravity.",
  },
  {
    term: "Terminal",
    topic: "Herramientas",
    text: "Una ventana donde le das órdenes al ordenador escribiendo, en vez de con el ratón. Claude Code vive aquí.",
  },
  {
    term: "Comando",
    topic: "Herramientas",
    text: "Una orden que escribes en la terminal.",
    example: "npm run dev arranca tu web en tu ordenador.",
  },
  {
    term: "API",
    topic: "Herramientas",
    text: "La puerta por la que un programa habla con otro. Las webs usan APIs para pedir datos, cobrar, enviar emails o usar una IA.",
  },
  {
    term: "Clave de API",
    alias: "API key",
    topic: "Herramientas",
    text: "Una contraseña que identifica a tu programa ante un servicio. Si alguien la consigue, puede usar ese servicio a tu nombre y a tu cuenta.",
    guide: "errores-tipicos",
  },
  {
    term: "Node.js",
    topic: "Herramientas",
    text: "Lo que permite ejecutar JavaScript fuera del navegador. Casi todas las herramientas web modernas lo necesitan.",
    guide: "que-necesitas",
  },
  {
    term: "npm",
    topic: "Herramientas",
    text: "El almacén de piezas de JavaScript: con npm install descargas lo que tu proyecto necesita para funcionar.",
  },

  // Código
  { term: "HTML", topic: "Código", text: "El esqueleto de una web: títulos, párrafos, imágenes y botones." },
  { term: "CSS", topic: "Código", text: "La ropa de la web: colores, tamaños, tipografías y cómo se coloca cada cosa." },
  {
    term: "JavaScript",
    topic: "Código",
    text: "Lo que hace que la web reaccione: menús que se abren, formularios que se envían, cosas que cambian sin recargar la página.",
  },
  { term: "Frontend", topic: "Código", text: "La parte de la web que ves y tocas en el navegador." },
  {
    term: "Backend",
    topic: "Código",
    text: "La parte que no ves: el servidor que guarda los datos, comprueba contraseñas o procesa los pagos.",
  },
  {
    term: "Base de datos",
    topic: "Código",
    text: "Donde se guarda la información de forma ordenada: usuarios, reservas, pedidos.",
    example: "Supabase te da una base de datos sin montar ningún servidor.",
  },
  {
    term: "Framework",
    topic: "Código",
    text: "Un kit de piezas y normas para construir webs más rápido, sin empezar de cero.",
    example: "Next.js, con el que está hecha esta web.",
  },
  {
    term: "Localhost",
    topic: "Código",
    text: "Tu web funcionando solo en tu ordenador mientras la construyes. Nadie más la ve.",
    example: "localhost:3000",
  },
  { term: "Responsive", topic: "Código", text: "Que la web se adapta y se ve bien en móvil, tablet y ordenador." },
  { term: "Bug", topic: "Código", text: "Un fallo en el programa: algo que no hace lo que debería." },
  {
    term: "Depurar",
    alias: "Debug",
    topic: "Código",
    text: "Buscar y arreglar un bug. Con IA: copiar el error completo y pedirle que te explique la causa antes de arreglarlo.",
  },
  {
    term: "Variables de entorno",
    alias: ".env",
    topic: "Código",
    text: "Ajustes y claves secretas que el proyecto lee de un archivo aparte (.env) para no escribirlas en el código. Nunca se suben a GitHub.",
    guide: "orden-de-carpetas",
  },
  {
    term: "Código abierto",
    alias: "Open source",
    topic: "Código",
    text: "Código que cualquiera puede ver, usar y mejorar, según lo que permita su licencia.",
  },

  // Publicar
  {
    term: "Git",
    topic: "Publicar",
    text: "Una máquina del tiempo para tu proyecto: guarda versiones y te deja volver a cualquiera de ellas.",
    guide: "git-y-github",
  },
  {
    term: "GitHub",
    topic: "Publicar",
    text: "La nube donde guardas tus proyectos de Git para no perderlos, compartirlos y publicar desde ahí.",
    guide: "git-y-github",
  },
  { term: "Repositorio", topic: "Publicar", text: "La carpeta de un proyecto junto con todo su historial de versiones." },
  {
    term: "Commit",
    topic: "Publicar",
    text: "Una foto del proyecto en un momento dado, con un mensaje que explica qué ha cambiado.",
    guide: "git-y-github",
  },
  { term: "Rama", alias: "Branch", topic: "Publicar", text: "Una copia paralela del proyecto para probar algo sin romper la versión que funciona." },
  { term: "Push y pull", topic: "Publicar", text: "Push sube tus cambios a GitHub; pull baja a tu ordenador los que hay allí." },
  {
    term: "Despliegue",
    alias: "Deploy",
    topic: "Publicar",
    text: "Publicar tu proyecto en internet para que cualquiera pueda verlo.",
    guide: "despliegues-vercel",
  },
  {
    term: "Hosting",
    topic: "Publicar",
    text: "El servicio que guarda tu web y se la sirve a quien la visita.",
    example: "Vercel, donde está publicada esta web.",
  },
  { term: "Dominio", topic: "Publicar", text: "La dirección de tu web. Se alquila por años.", example: "miguelliebana.com" },
  {
    term: "Subdominio",
    topic: "Publicar",
    text: "Una dirección que cuelga de tu dominio. Si ya tienes el dominio, es gratis.",
    example: "vibecoding.miguelliebana.com",
  },
  {
    term: "Producción y vista previa",
    topic: "Publicar",
    text: "Producción es la web real que ve todo el mundo; una vista previa (preview) es una copia con su propio enlace para probar cambios antes de publicarlos.",
    guide: "despliegues-vercel",
  },
];

export const termId = (term: string) =>
  term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
