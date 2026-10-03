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
    duration: "45 min",
    available: true,
    objectives: [
      "Saber qué hace el HTML, qué hace el CSS y qué hace el JavaScript en una web.",
      "Leer un trozo de HTML y de CSS sin asustarte y entender qué está pasando.",
      "Usar el inspector del navegador para encontrar el nombre de lo que quieres cambiar.",
      "Pedir cambios a la IA nombrando el elemento y la propiedad exactos.",
    ],
    sections: [
      {
        title: "Una web es una casa",
        points: [
          "HTML: las paredes y las habitaciones (qué hay)",
          "CSS: la pintura y los muebles (cómo se ve)",
          "JavaScript: la electricidad (qué hace)",
        ],
        body: [
          "La IA escribe el código por ti, pero si no entiendes nada de lo que escribe, dependes de ella para todo, hasta para cambiar una coma. Este módulo no te convierte en programador: te da lo justo para no perderte.",
          "Piensa en una web como una casa. El HTML son las paredes y las habitaciones: decide qué hay y dónde (un título, un párrafo, una foto, un botón). El CSS es la pintura, los muebles y la decoración: decide cómo se ve todo eso. Y el JavaScript es la electricidad: hace que las cosas pasen cuando pulsas un botón.",
          "En casi todas las webs que hagas con IA verás los tres. Para empezar, con entender bien los dos primeros tienes de sobra.",
        ],
        tip: "No hace falta memorizar nada. Los profesionales consultan referencias todo el rato. Lo importante es saber para qué sirve cada cosa y dónde mirar.",
      },
      {
        title: "Leer HTML sin miedo",
        points: [
          "Las etiquetas van en parejas: <p> abre y </p> cierra",
          "Lo de dentro es el contenido que ves",
          "Los atributos dan detalles: href, src, class",
        ],
        body: [
          "El HTML está hecho de etiquetas: palabras entre los signos < y >. Casi siempre van en parejas: una abre y otra cierra con una barra. Todo lo que queda entre las dos es lo que se ve en la página.",
          "Algunas etiquetas llevan atributos, que son detalles extra: a dónde lleva un enlace (href), qué foto se muestra (src) o qué nombre le damos para decorarlo luego con CSS (class).",
          "Mira este trozo. Aunque nunca hayas visto HTML, seguro que adivinas qué aparece en pantalla:",
        ],
        promptLabel: "Así se ve el HTML",
        prompt:
          '<h1>Peluquería Carmen</h1>\n<p>Abierto de lunes a sábado, de 9:00 a 20:00.</p>\n<img src="fachada.jpg" alt="La fachada de la peluquería">\n<a class="boton-llamar" href="tel:+34600000000">Llamar ahora</a>',
      },
      {
        title: "Las etiquetas que verás casi siempre",
        points: [
          "<h1> a <h3>: títulos, de mayor a menor",
          "<p>, <a>, <img>, <button>: texto, enlaces, fotos y botones",
          "<header>, <section>, <footer>, <div>: las cajas que lo ordenan",
        ],
        body: [
          "<h1>, <h2> y <h3> son los títulos, del más importante al menos. Solo debería haber un <h1> por página: es el título principal.",
          "<p> es un párrafo. <a> es un enlace que lleva a otra página. <img> muestra una imagen y <button> es un botón.",
          "<ul> y <li> hacen listas con viñetas: <ul> es la lista entera y cada <li> es un punto.",
          "<header>, <section>, <footer> y <div> son cajas. No se ven, pero agrupan cosas: la cabecera, cada sección, el pie de página. Si una web fuera una casa, serían las habitaciones.",
        ],
        tip: "Con estas etiquetas entiendes la mayor parte de lo que la IA te escribe. Si te sale una que no conoces, pregúntale: «¿qué hace la etiqueta <nav>?».",
      },
      {
        title: "CSS: cómo se ve cada cosa",
        points: [
          "Primero eliges qué decorar (el selector)",
          "Luego dices cómo: propiedad: valor;",
          "La class conecta el HTML con su CSS",
        ],
        body: [
          "El CSS funciona siempre igual: primero eliges qué quieres decorar y, entre llaves, dices cómo, con líneas del tipo «propiedad: valor;».",
          "Lo que eliges se llama selector. Puede ser una etiqueta (h1, todos los títulos principales) o una class: un nombre que tú le pones a algo en el HTML. En el ejemplo de antes, el enlace tenía class=\"boton-llamar\"; en el CSS se escribe con un punto delante: .boton-llamar.",
          "Este CSS decora el título y el botón de la peluquería:",
        ],
        promptLabel: "Así se ve el CSS",
        prompt:
          "h1 {\n  color: #c2410c;\n  font-size: 40px;\n}\n\n.boton-llamar {\n  background: #16a34a;\n  color: white;\n  padding: 16px 32px;\n  border-radius: 999px;\n}",
      },
      {
        title: "Las propiedades que más vas a pedir",
        points: [
          "color, background y font-size: color, fondo y tamaño",
          "padding (relleno de dentro) y margin (espacio de fuera)",
          "border-radius para redondear y gap para separar",
        ],
        body: [
          "color cambia el color del texto y background el del fondo. font-size, el tamaño de la letra.",
          "padding y margin son los que más confunden. Imagina un cojín: el padding es el relleno de dentro (el espacio entre el texto y el borde del botón) y el margin es la distancia hasta el mueble de al lado (el espacio entre ese botón y lo demás).",
          "border-radius redondea las esquinas: con un número muy grande, el botón queda como una cápsula. Y cuando la IA coloca cosas en fila o en cuadrícula, verás display: flex o display: grid, con gap para el espacio entre ellas.",
        ],
        tip: "Los colores suelen ir en código hexadecimal, como #16a34a. No hace falta saberlos: el inspector te los muestra y la IA te los cambia si le dices «un verde más oscuro».",
      },
      {
        title: "El inspector: tocar sin romper",
        points: [
          "Clic derecho en cualquier cosa → «Inspeccionar»",
          "Ves su HTML y su CSS y puedes cambiarlos en directo",
          "Al recargar, todo vuelve a como estaba",
        ],
        body: [
          "Todos los navegadores traen una herramienta para ver las tripas de cualquier web: el inspector. Haz clic derecho sobre un título o un botón y elige «Inspeccionar» (o pulsa F12).",
          "Se abre un panel con dos partes: a un lado el HTML, con el elemento que has pulsado resaltado; al otro, su CSS. Puedes hacer doble clic en un texto o en un color y cambiarlo: la página cambia al momento.",
          "Lo mejor es que no rompes nada: los cambios solo existen en tu pantalla y desaparecen al recargar. Es el sitio perfecto para probar antes de pedir.",
          "Y te da algo muy valioso: el nombre exacto de lo que quieres cambiar. Si el inspector te dice que el botón tiene class=\"boton-llamar\", ya sabes cómo llamarlo cuando hables con la IA.",
        ],
      },
      {
        title: "Pedir cambios con las palabras justas",
        points: [
          "Di qué elemento (su class o su etiqueta)",
          "Di qué propiedad y qué valor quieres",
          "Añade «no toques nada más»",
        ],
        body: [
          "Ahora puedes hablar con la IA como habla un desarrollador, pero sin dejar de ser tú. Compara «pon el botón más bonito» con un prompt que nombra el elemento, la propiedad y el valor. El primero da una sorpresa; el segundo, lo que quieres.",
          "Para cambios pequeños, como un texto, un color o un tamaño, a veces es más rápido hacerlo tú directamente en el archivo. Y cada vez que lo haces, aprendes un poco más.",
          "¿Te ha picado la curiosidad? En materialdidacticocpweb.vercel.app tienes mi curso gratuito de HTML y CSS, paso a paso y con un editor para practicar en el navegador.",
        ],
        prompt:
          "En el botón con class \"boton-llamar\", cambia el padding a 20px 40px, el color de fondo a #c2410c y pon la letra en negrita. No toques nada más de la página.",
        tip: "«No toques nada más» evita que la IA aproveche para cambiar cosas que no le has pedido. Y si algo sale mal, Git te deja volver atrás: lo tienes en la guía de Git y GitHub.",
      },
    ],
    exercise: {
      title: "Ejercicio: retoca tu web a mano",
      steps: [
        "Abre la web que hiciste en el Módulo 1 en el navegador y en tu editor de código.",
        "Con el inspector, busca cómo se llama el título principal y el botón más importante.",
        "Cambia en el inspector el color del botón hasta que te guste y apunta el código del color.",
        "Ahora hazlo de verdad: cambia el texto del título en el HTML y ese color en el CSS. Guarda y recarga.",
        "Rompe algo a propósito (borra un </p>) y mira qué pasa. Luego pide a la IA que te explique el problema.",
        "Pide a la IA un cambio de espaciado usando el nombre del elemento y la palabra padding o margin.",
      ],
    },
    checklist: [
      "Sé explicar qué hacen el HTML, el CSS y el JavaScript.",
      "Distingo una etiqueta que abre de una que cierra.",
      "Sé qué es una class y cómo se escribe en el CSS.",
      "Uso el inspector para encontrar el nombre de lo que quiero cambiar.",
      "Distingo padding de margin.",
      "Pido cambios nombrando el elemento, la propiedad y el valor.",
    ],
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
    if (section.prompt) slides.push({ kind: "prompt", eyebrow: section.promptLabel ?? "Pruébalo", title: section.title, prompt: section.prompt });
  }
  if (mod.exercise) slides.push({ kind: "list", eyebrow: "Ejercicio", title: mod.exercise.title, items: mod.exercise.steps });
  if (mod.checklist) slides.push({ kind: "list", eyebrow: "Repaso", title: "Comprueba lo que has aprendido", items: mod.checklist });
  return slides;
}
