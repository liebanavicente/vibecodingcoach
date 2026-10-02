export type Section = {
  title: string;
  /** Short key ideas shown on the slide; the body is the full text of the lesson. */
  points: string[];
  body: string[];
  prompt?: string;
  /** Label above the prompt box; defaults to "Prompt de ejemplo". */
  promptLabel?: string;
  tip?: string;
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  duration: string;
  available: boolean;
  objectives: string[];
  sections: Section[];
  exercise?: { title: string; steps: string[] };
  checklist?: string[];
  /** Recorded lesson: cues[i] is the second at which slide i starts. */
  video?: { src: string; poster?: string; cues: number[] };
};

export type Slide = {
  kind: "cover" | "list" | "prompt";
  eyebrow?: string;
  title: string;
  text?: string;
  items?: string[];
  prompt?: string;
};

export const modules: Module[] = [
  {
    slug: "modulo-0",
    number: 0,
    title: "Mentalidad y primeros pasos",
    summary:
      "Qué es el vibe coding, qué puede y qué no puede hacer la IA, y cómo preparar tu ordenador para empezar.",
    duration: "45 min",
    available: true,
    objectives: [
      "Explicar con tus palabras qué es el vibe coding.",
      "Distinguir qué tareas puedes delegar en la IA y cuáles necesitan tu criterio.",
      "Tener instalada una herramienta de IA para programar y haberla usado una vez.",
    ],
    sections: [
      {
        title: "¿Qué es el vibe coding?",
        points: [
          "Describes lo que quieres en lenguaje natural",
          "La IA escribe la mayor parte del código",
          "Tú pones la idea, el criterio y las correcciones",
        ],
        body: [
          "Vibe coding es construir software describiendo lo que quieres en lenguaje natural y dejando que una IA escriba la mayor parte del código. Tú pones la idea, el criterio y las correcciones; la IA pone la velocidad.",
          "No es magia ni sustituye aprender. Es como tener un compañero muy rápido que nunca se cansa, pero que a veces se equivoca con total seguridad. Tu trabajo es dirigirlo y revisar lo que hace.",
        ],
      },
      {
        title: "Lo que la IA hace bien (y lo que no)",
        points: [
          "Bien: estructura, estilos, explicar código y proponer arreglos",
          "Mal: adivinar lo que no le dices y ver sus propios errores",
          "Ahí entras tú: dirigir y revisar",
        ],
        body: [
          "Hace bien: generar estructura de páginas, escribir estilos, explicar código que no entiendes, proponer soluciones a errores y repetir tareas tediosas.",
          "Hace mal: adivinar lo que no le has dicho, saber si algo es lo que tu cliente o tú queréis de verdad, y detectar sola que se ha equivocado. Ahí entras tú.",
        ],
        tip: "Regla de oro: si no sabes explicar qué quieres, la IA tampoco lo sabrá construir.",
      },
      {
        title: "Elige tu herramienta",
        points: [
          "Claude: para pensar, aprender y empezar sin instalar nada",
          "Claude Code y Codex: agentes que construyen proyectos completos",
          "Cursor y Antigravity: editores con la IA integrada",
        ],
        body: [
          "Para empezar te basta con una. Si nunca has programado, empieza hablando con Claude en el navegador: te explica, te propone ideas y te escribe código que puedes copiar sin instalar nada.",
          "Cuando quieras construir proyectos completos, da el salto a Claude Code o Codex: son agentes que trabajan directamente sobre los archivos de tu proyecto. Si prefieres ver y tocar cada archivo, Cursor y Antigravity son editores de código con la IA integrada.",
          "En este curso usaremos sobre todo Claude y Claude Code, que son las que más uso, pero los principios valen para cualquiera.",
        ],
      },
      {
        title: "Tu primer contacto",
        points: [
          "Crea una carpeta llamada mi-primera-web",
          "Ábrela con tu herramienta y pega el prompt",
          "Abre el index.html en el navegador",
        ],
        body: [
          "Crea una carpeta vacía en tu ordenador llamada mi-primera-web, ábrela con tu herramienta y pídele lo siguiente:",
        ],
        prompt:
          "Crea una página web sencilla en un único archivo index.html que diga \"Hola, soy [tu nombre]\" con un fondo de color suave y el texto centrado. Explícame en dos frases qué has hecho.",
        tip: "Abre el index.html con doble clic. Si ves tu nombre en el navegador, acabas de hacer vibe coding.",
      },
    ],
    exercise: {
      title: "Ejercicio: cambia tu página",
      steps: [
        "Pide a la IA que cambie el color de fondo por tu color favorito.",
        "Pídele que añada una frase debajo de tu nombre contando a qué te dedicas.",
        "Pregúntale qué línea del archivo controla el color. Búscala tú y cámbiala a mano.",
      ],
    },
    checklist: [
      "Sé explicar qué es el vibe coding a alguien que no lo conoce.",
      "Tengo una herramienta de IA instalada y funcionando.",
      "He creado y abierto mi primer index.html.",
      "He hecho al menos un cambio a mano, sin la IA.",
    ],
  },
  {
    slug: "modulo-1",
    number: 1,
    title: "Hablar con la IA",
    summary:
      "Cómo escribir instrucciones claras, iterar sobre el resultado y salir de los errores sin frustrarte.",
    duration: "1 h 30 min",
    available: true,
    objectives: [
      "Escribir un prompt con contexto, objetivo y restricciones.",
      "Iterar en pasos pequeños en lugar de pedirlo todo de golpe.",
      "Resolver un error pegando el mensaje y pidiendo una explicación.",
    ],
    sections: [
      {
        title: "La estructura de un buen prompt",
        points: [
          "Contexto: qué construyes y para quién",
          "Objetivo: qué quieres ahora mismo",
          "Restricciones: estilo, tecnología y lo que no debe hacer",
        ],
        body: [
          "Un buen prompt tiene tres partes: contexto (qué estás construyendo y para quién), objetivo (qué quieres ahora mismo) y restricciones (lo que no debe hacer, el estilo, la tecnología).",
          "Compara \"hazme una web\" con esto:",
        ],
        prompt:
          "Estoy creando la web de una peluquería de barrio para clientes de 40 a 70 años. Crea la página de inicio en un único index.html con: nombre del negocio, horario, teléfono y un botón para llamar. Letra grande y fácil de leer, colores cálidos, sin animaciones.",
      },
      {
        title: "Pasos pequeños, siempre",
        points: [
          "Una tarea, comprobar, siguiente tarea",
          "Estructura → estilos → contenido → detalles",
          "Si algo falla, corrige antes de añadir nada",
        ],
        body: [
          "El error más común de quien empieza es pedir la web entera en un solo mensaje. La IA genera mucho código de golpe y, cuando algo falla, no sabes dónde.",
          "Trabaja como en clase: una tarea, comprobar, siguiente tarea. Primero la estructura, luego los estilos, luego el contenido, luego los detalles.",
        ],
        tip: "Después de cada cambio, abre la página y comprueba. Si funciona, sigue. Si no, corrige antes de añadir nada más.",
      },
      {
        title: "Cómo pedir cambios",
        points: [
          "Señala qué parte quieres cambiar",
          "«Mejóralo» no es una instrucción",
          "Di qué no te gusta y por qué",
        ],
        body: [
          "Sé concreto y señala qué parte quieres cambiar. \"Mejóralo\" no es una instrucción; \"haz el botón de llamar el doble de grande y de color verde\" sí lo es.",
          "Si el resultado no te gusta, di qué no te gusta y por qué. La IA aprende de tu feedback dentro de la conversación.",
        ],
      },
      {
        title: "Cuando algo se rompe",
        points: [
          "Los errores son normales: no empieces de cero",
          "Pega el mensaje de error completo",
          "Pide que te lo explique, no solo que lo arregle",
        ],
        body: [
          "Los errores son normales. No borres todo ni empieces de cero: copia el mensaje de error completo y pégalo a la IA.",
        ],
        prompt:
          "Me aparece este error: [pega aquí el error]. Explícame en lenguaje sencillo qué significa, por qué ha pasado y arréglalo.",
        tip: "Pedir que te explique el error, no solo que lo arregle, es lo que hace que aprendas en vez de depender.",
      },
    ],
    exercise: {
      title: "Ejercicio: la web de un negocio real",
      steps: [
        "Elige un negocio de tu barrio o uno imaginario.",
        "Escribe un prompt con contexto, objetivo y restricciones para su página de inicio.",
        "Mejora el resultado con al menos tres peticiones de cambio concretas.",
        "Rompe algo a propósito (borra una etiqueta) y usa la IA para entender y arreglar el error.",
      ],
    },
    checklist: [
      "Mis prompts incluyen contexto, objetivo y restricciones.",
      "Trabajo en pasos pequeños y compruebo cada cambio.",
      "Sé pedir cambios concretos en lugar de \"mejóralo\".",
      "Ante un error, pego el mensaje y pido una explicación.",
    ],
  },
  {
    slug: "modulo-2",
    number: 2,
    title: "Lo mínimo de código para no perderte",
    summary: "HTML y CSS básicos para entender lo que la IA escribe por ti.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "modulo-3",
    number: 3,
    title: "Funcionalidad real",
    summary: "Formularios y una base de datos sencilla para guardar información.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "modulo-4",
    number: 4,
    title: "Publicar y compartir",
    summary: "Sube tu proyecto a internet y consigue un enlace para compartir.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "modulo-5",
    number: 5,
    title: "Proyecto final",
    summary: "Construye tu propio proyecto de principio a fin, con acompañamiento.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
];

export const availableModules = modules.filter((m) => m.available);

export function getModule(slug: string) {
  return availableModules.find((m) => m.slug === slug);
}

export function slidesFor(mod: Module): Slide[] {
  const slides: Slide[] = [
    { kind: "cover", eyebrow: `Módulo ${mod.number} · ${mod.duration}`, title: mod.title, text: mod.summary },
    { kind: "list", eyebrow: "Objetivos", title: "Al terminar podrás…", items: mod.objectives },
  ];
  for (const section of mod.sections) {
    slides.push({ kind: "list", title: section.title, items: section.points, text: section.tip });
    if (section.prompt) slides.push({ kind: "prompt", eyebrow: "Pruébalo", title: section.title, prompt: section.prompt });
  }
  if (mod.exercise) slides.push({ kind: "list", eyebrow: "Ejercicio", title: mod.exercise.title, items: mod.exercise.steps });
  if (mod.checklist) slides.push({ kind: "list", eyebrow: "Repaso", title: "Comprueba lo que has aprendido", items: mod.checklist });
  return slides;
}
