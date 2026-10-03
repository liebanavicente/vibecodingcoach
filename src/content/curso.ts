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
  /** YouTube video id of the lesson (e.g. the NotebookLM overview), shown above the slides. */
  youtube?: string;
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
    youtube: "c5AYpVE0K1E",
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
    youtube: "l0BfZHVDGL0",
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
    duration: "1 h",
    available: true,
    objectives: [
      "Entender qué pasa entre que alguien pulsa «Enviar» y el dato se guarda.",
      "Añadir a tu web un formulario de contacto que te llegue al correo.",
      "Guardar información en una base de datos y decidir quién puede verla.",
      "Conectar una IA gratuita a tu web sin dejar la clave a la vista.",
    ],
    sections: [
      {
        title: "Del escaparate a la tienda",
        points: [
          "Frontend: el escaparate que ve la gente",
          "Backend: la trastienda donde se trabaja",
          "Base de datos: el archivador donde se guarda todo",
        ],
        body: [
          "Hasta ahora tu web era un escaparate precioso: se ve, pero no hace nada. En este módulo vas a abrir la trastienda.",
          "Piensa en una tienda de barrio. El escaparate es el frontend: lo que ve la gente en el navegador. La trastienda es el backend: un servidor que recibe lo que la gente pide, comprueba que todo está bien y hace el trabajo. Y el archivador del fondo es la base de datos: donde se guardan los pedidos, los clientes o los mensajes para encontrarlos después.",
          "Cuando alguien rellena un formulario y pulsa «Enviar», el dato sale del escaparate, la trastienda lo revisa y, si todo está en orden, lo mete en el archivador o te lo manda por correo. La IA puede construir las tres partes; tu trabajo es entender por dónde viaja el dato.",
        ],
        tip: "Cuando la IA te hable de «servidor», «API» o «endpoint», piensa en la trastienda: es la parte que el visitante no ve.",
      },
      {
        title: "Tu primer formulario de contacto",
        points: [
          "Empieza por lo más simple: que te llegue un correo",
          "Formspree o Resend: planes gratis, sin montar servidor",
          "Pruébalo tú antes de publicarlo",
        ],
        body: [
          "El formulario más útil para un negocio es el de contacto: nombre, correo y mensaje. Y no necesitas montar nada complicado: servicios como Formspree o Resend reciben el formulario y te lo reenvían a tu correo. Los dos tienen plan gratuito, de sobra para empezar.",
          "Pídeselo a la IA indicando qué campos quieres, adónde debe llegar y qué ve la persona al enviarlo. Ese último detalle se olvida mucho y es importante: un «¡Gracias, te contesto en 24 horas!» da confianza.",
        ],
        prompt:
          "Añade a mi web un formulario de contacto con nombre, correo y mensaje, todos obligatorios. Usa Formspree para que los mensajes me lleguen a [tu correo]. Al enviarlo, muestra «¡Gracias! Te contesto en menos de 24 horas» sin recargar la página. Explícame paso a paso qué tengo que hacer yo en la web de Formspree.",
        tip: "Envíate tres mensajes de prueba: uno bien, uno con el correo mal escrito y uno vacío. Así compruebas que el formulario avisa de los errores.",
      },
      {
        title: "Guardar datos: tu primera base de datos",
        points: [
          "Una base de datos es como una hoja de cálculo con reglas",
          "Supabase: base de datos gratis y con panel visual",
          "Tablas, columnas y filas: un libro de visitas, una lista de reservas",
        ],
        body: [
          "Cuando quieres guardar información para usarla después (las reservas de la semana, los pedidos, los mensajes de un libro de visitas), el correo se queda corto. Necesitas una base de datos.",
          "Imagínala como una hoja de cálculo con reglas: cada tabla es una hoja (por ejemplo, «reservas»), cada columna es un dato (nombre, fecha, hora) y cada fila es una reserva. La diferencia es que tu web puede leer y escribir en ella sola.",
          "Supabase es la opción más cómoda para empezar: tiene plan gratuito, un panel donde ves tus tablas como en una hoja de cálculo y la IA sabe usarla muy bien. Créate una cuenta y un proyecto, y deja que la IA te guíe con el resto.",
        ],
        prompt:
          "Quiero que mi web guarde reservas en Supabase. Cada reserva tiene nombre, teléfono, fecha y hora. Primero explícame qué tabla vas a crear y qué columnas tendrá, y espera mi OK. Luego hazlo paso a paso y dime exactamente qué tengo que copiar del panel de Supabase y dónde guardarlo.",
      },
      {
        title: "Quién puede ver qué",
        points: [
          "Que cualquiera pueda escribir no significa que pueda leer",
          "Las reglas de acceso (RLS) van en la base de datos, no en la web",
          "Las claves secretas, en .env y nunca en el código",
        ],
        body: [
          "Aquí está el error más peligroso de quien empieza: una web de reservas donde cualquiera puede ver los teléfonos de todos los clientes. Que tu formulario deje escribir no significa que deba dejar leer.",
          "En Supabase esto se controla con reglas de acceso por fila (Row Level Security, o RLS). Por ejemplo: «cualquiera puede añadir una reserva, pero solo yo puedo verlas». Esas reglas viven en la base de datos, así que da igual lo que alguien toque en la web: el archivador sigue cerrado.",
          "Y las claves: Supabase te da una pública, que puede estar en la web, y otra secreta, que nunca debe salir de la trastienda. La secreta va en el archivo .env y no se sube a GitHub. Si una clave secreta se te escapa, cámbiala en el panel en ese momento.",
        ],
        prompt:
          "Revisa la seguridad de mi base de datos de Supabase: ¿está activado RLS en todas las tablas? ¿Puede alguien sin iniciar sesión leer datos que no debería? ¿Hay alguna clave secreta en el código del navegador? Explícame cada problema en lenguaje sencillo y propón el arreglo antes de tocar nada.",
        tip: "Tienes la lista completa de agujeros típicos en la guía «Vibe coding sin agujeros».",
      },
      {
        title: "Meter IA en tu web, gratis",
        points: [
          "Google Gemini tiene un plan gratuito, sin tarjeta",
          "La IA se llama desde la trastienda, nunca desde el navegador",
          "Pon un límite: qué responde y qué no",
        ],
        body: [
          "Ahora puedes hacer que tu web también piense: que responda a las preguntas frecuentes de tu negocio o que escriba una respuesta automática a cada reserva. Con Google Gemini es gratis para empezar: creas una clave en Google AI Studio y la guardas en tu .env.",
          "La regla de oro es la misma que con las claves de la base de datos: la llamada a la IA se hace desde la trastienda. Si la clave estuviera en el navegador, cualquiera podría copiarla y gastar tu cupo.",
          "Y dale límites: de qué temas puede hablar, qué tono usar y qué hacer cuando no sabe algo. Una IA sin instrucciones en la web de una peluquería acabará opinando de política.",
        ],
        prompt:
          "Añade a mi web un pequeño asistente que responda dudas sobre [tu negocio] usando la API gratuita de Google Gemini. La clave debe ir en .env y la llamada hacerse en el servidor, nunca en el navegador. Que solo hable de [horarios, precios y servicios], con tono cercano, y que si no sabe algo diga «Pregúntamelo por teléfono». Explícame cómo consigo la clave.",
        tip: "Los planes gratis tienen límites de uso. Pide a la IA que, si se agotan, el asistente muestre un mensaje amable en vez de romperse.",
      },
      {
        title: "Pruébalo como si fueras otra persona",
        points: [
          "Ventana de incógnito y móvil: así lo verán los demás",
          "Rompe tu formulario a propósito: vacío, raro, larguísimo",
          "Pide a la IA una lista de pruebas antes de publicar",
        ],
        body: [
          "Tú sabes cómo se usa tu web; tus visitantes, no. Antes de publicar, ábrela en una ventana de incógnito y en tu móvil, y úsala como lo haría alguien con prisa: deja campos vacíos, pon un correo sin arroba, pega un texto enorme, pulsa «Enviar» dos veces.",
          "Si algo falla, ya sabes qué hacer: copia el error, pégaselo a la IA y pídele que te lo explique antes de arreglarlo.",
        ],
        prompt:
          "Hazme una lista de 10 pruebas que debería hacer en mi formulario y mi base de datos antes de publicar la web, incluidas las de seguridad. Para cada una, dime qué debería pasar si todo está bien.",
      },
    ],
    exercise: {
      title: "Ejercicio: un libro de visitas que contesta",
      steps: [
        "Crea un proyecto gratis en Supabase.",
        "Pide a la IA una tabla «visitas» con nombre y mensaje, y un formulario en tu web para dejar un mensaje.",
        "Activa RLS para que cualquiera pueda escribir, pero solo tú puedas leer los mensajes desde el panel de Supabase.",
        "Añade una respuesta automática con Gemini: «¡Gracias, Ana! Qué bonito lo que dices de…».",
        "Prueba en incógnito y en el móvil, y pide a la IA que revise la seguridad antes de dar el ejercicio por terminado.",
      ],
    },
    checklist: [
      "Sé explicar qué hacen el frontend, el backend y la base de datos.",
      "Mi web tiene un formulario de contacto que me llega al correo.",
      "Sé crear una tabla en Supabase y guardar datos desde mi web.",
      "Tengo RLS activado y sé quién puede leer cada tabla.",
      "Mis claves secretas están en .env y no en el código.",
      "He conectado una IA gratuita llamándola desde el servidor.",
    ],
  },
  {
    slug: "modulo-4",
    number: 4,
    title: "Publicar y compartir",
    summary: "Sube tu proyecto a internet y consigue un enlace para compartir.",
    duration: "45 min",
    available: true,
    objectives: [
      "Guardar tu proyecto en GitHub y publicarlo en internet con Vercel.",
      "Entender qué pasa cada vez que cambias algo y lo vuelves a subir.",
      "Ponerle tu propio dominio a la web.",
      "Conseguir que se vea bien al compartirla y que Google la encuentre.",
    ],
    sections: [
      {
        title: "De tu ordenador a internet",
        points: [
          "En tu ordenador, la web solo la ves tú",
          "El hosting es un ordenador encendido siempre que la enseña al mundo",
          "Vercel, Netlify o Cloudflare Pages: gratis para empezar",
        ],
        body: [
          "Hasta ahora tu web vivía en tu ordenador: si lo apagas, desaparece, y nadie más puede verla. Publicarla es copiarla a un ordenador que está encendido día y noche y que se la enseña a quien escriba su dirección. Eso es el hosting.",
          "Para webs como las que haces en este curso hay opciones gratuitas muy buenas: Vercel, Netlify o Cloudflare Pages. Funcionan casi igual: conectas tu proyecto y en un par de minutos tienes un enlace para compartir.",
          "El camino que te recomiendo es el que uso para esta misma web: el código va a GitHub y Vercel lo publica desde allí. Así cada cambio que guardas se publica solo.",
        ],
      },
      {
        title: "Sube tu proyecto a GitHub",
        points: [
          "GitHub guarda tu proyecto en la nube, con todo su historial",
          "Commit: una foto del proyecto; push: subirla",
          "Pídeselo a la IA y que te explique cada paso",
        ],
        body: [
          "GitHub es como una carpeta en la nube que además recuerda cada versión de tu proyecto. Si algo se rompe, puedes volver atrás; si se te estropea el ordenador, tu web está a salvo.",
          "Dos palabras que vas a oír mucho: un commit es una foto del proyecto en un momento dado, con una frase que explica qué cambiaste. Un push es subir esas fotos a GitHub. La IA puede hacer las dos cosas por ti; pídele que te cuente qué hace mientras lo hace.",
        ],
        prompt:
          "Quiero subir este proyecto a GitHub por primera vez. Comprueba antes que no se va a subir ningún archivo con claves (como .env). Luego crea el repositorio, haz el primer commit y súbelo, explicándome en una frase cada paso.",
        tip: "Tienes la guía completa en «Git y GitHub en 5 minutos».",
      },
      {
        title: "Publica con Vercel",
        points: [
          "Entra con tu cuenta de GitHub e importa el proyecto",
          "Cada push publica una versión nueva sola",
          "Las claves del .env se copian a mano en Vercel",
        ],
        body: [
          "En vercel.com entra con tu cuenta de GitHub, pulsa «Add New → Project» y elige tu repositorio. Vercel detecta qué tipo de web es y la publica en uno o dos minutos con una dirección del tipo tu-proyecto.vercel.app. Ya puedes mandarla por WhatsApp.",
          "Desde ese momento, cada vez que subes un cambio a GitHub, Vercel publica una versión nueva sola. Si algo sale mal, puedes volver a la versión anterior con un clic en su panel.",
          "Ojo con las claves: tu archivo .env no se sube a GitHub (y está bien que no se suba), así que Vercel no las conoce. Tienes que copiarlas en Settings → Environment Variables. Si tu formulario o tu IA funcionan en tu ordenador pero no en internet, casi siempre es esto.",
        ],
        tip: "El plan gratuito de Vercel es para proyectos personales. Si tu web es de un negocio que cobra, mira su plan de pago o usa Netlify o Cloudflare Pages, que permiten uso comercial gratis.",
      },
      {
        title: "Tu propio dominio",
        points: [
          "tunegocio.com da confianza; tu-proyecto.vercel.app, menos",
          "Un dominio cuesta unos 10–15 € al año",
          "La IA te guía con los DNS, y el candado HTTPS es automático",
        ],
        body: [
          "Un enlace de vercel.app funciona, pero para un negocio queda mucho mejor tunegocio.com. Un dominio se compra por unos 10–15 € al año en sitios como Namecheap, Cloudflare o el propio Vercel.",
          "Después hay que decirle a internet que ese nombre apunta a tu web: eso son los DNS. Suena técnico, pero son dos o tres datos que se copian de un sitio a otro, y la IA te dice exactamente cuáles. El candado de «conexión segura» (HTTPS) lo pone Vercel solo.",
          "Si ya tienes un dominio, también puedes usar un subdominio, como hago yo con vibecoding.miguelliebana.com.",
        ],
        prompt:
          "Quiero que mi web de Vercel funcione con mi dominio [tudominio.com], que tengo comprado en [Namecheap, Cloudflare…]. Dime paso a paso qué tengo que tocar en Vercel y qué registros DNS tengo que añadir, y cómo sé que ha funcionado.",
      },
      {
        title: "Que se vea bien al compartirla",
        points: [
          "Título y descripción de cada página",
          "Imagen de vista previa: la que sale en WhatsApp",
          "Icono de la pestaña (favicon)",
        ],
        body: [
          "Cuando pegas un enlace en WhatsApp o en LinkedIn, aparece una tarjeta con título, descripción e imagen. Si tu web no las tiene, sale un enlace pelado y nadie lo pulsa.",
          "Esa imagen se llama imagen Open Graph y se prepara una vez: 1200×630 píxeles, con tu nombre, una frase y tus colores. Pídeselo a la IA junto con el título y la descripción de cada página y el icono de la pestaña.",
        ],
        prompt:
          "Prepara mi web para compartirla: título y descripción en cada página, una imagen de vista previa de 1200×630 con [nombre del negocio], [frase] y mis colores, y un favicon. Dime cómo comprobar que la vista previa sale bien en WhatsApp.",
        tip: "WhatsApp y las redes guardan la vista previa unos días. Si la cambias y no se actualiza, pega el enlace con ?v=2 al final.",
      },
      {
        title: "Que Google te encuentre",
        points: [
          "Mapa del sitio (sitemap) y robots.txt",
          "Google Search Console: dile a Google que existes",
          "Paciencia: tarda semanas, no horas",
        ],
        body: [
          "Publicar no significa que Google te encuentre. Ayúdale con dos archivos: el mapa del sitio (sitemap.xml), que lista todas tus páginas, y robots.txt, que le dice que puede entrar. La IA los crea en un minuto.",
          "Después da de alta tu web en Google Search Console (gratis): verificas que el dominio es tuyo y le envías el mapa del sitio. Ahí verás qué buscan las personas que llegan a ti.",
          "Y paciencia: Google tarda semanas en colocar una web nueva. Mientras tanto, compártela tú: WhatsApp, redes, tu firma de correo.",
        ],
        prompt:
          "Revisa lo básico de SEO de mi web: que tenga sitemap.xml y robots.txt, que cada página tenga título y descripción propios y que se vea bien en el móvil. Arregla lo que falte y explícame cómo darla de alta en Google Search Console.",
      },
    ],
    exercise: {
      title: "Ejercicio: publica tu libro de visitas",
      steps: [
        "Sube a GitHub el proyecto del Módulo 3, comprobando que el .env no se sube.",
        "Publícalo en Vercel y copia allí tus claves de Supabase y Gemini.",
        "Deja un mensaje en tu libro de visitas desde el móvil y comprueba que se guarda.",
        "Ponle título, descripción e imagen de vista previa, y pega el enlace en un chat de WhatsApp contigo mismo.",
        "Compártelo con tres personas y pídeles que dejen un mensaje: es tu primer feedback real.",
      ],
    },
    checklist: [
      "Mi proyecto está en GitHub y sin claves a la vista.",
      "Mi web está publicada y tiene un enlace que funciona en cualquier móvil.",
      "Sé qué pasa al subir un cambio y cómo volver atrás.",
      "Mis claves están configuradas en Vercel, no en el código.",
      "Al compartir el enlace sale una vista previa con imagen.",
      "Sé cómo dar de alta mi web en Google Search Console.",
    ],
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
