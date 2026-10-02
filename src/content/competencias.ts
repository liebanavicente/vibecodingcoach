import type { Module } from "@/content/curso";

/** "Competencias digitales básicas": a second course for people starting from zero with computers and phones.
 * Areas follow DigComp, the European digital competence framework. Slugs are unique across courses because the
 * checklist progress is stored per slug. */
export const digitalModules: Module[] = [
  {
    slug: "ordenador-y-movil",
    number: 0,
    title: "Tu ordenador y tu móvil, sin miedo",
    summary: "Perderle el miedo a la tecnología: manejar el ratón y la pantalla, y guardar y encontrar tus archivos.",
    duration: "45 min",
    available: true,
    objectives: [
      "Usar con soltura el ratón, el teclado y la pantalla táctil.",
      "Guardar tus documentos y fotos en carpetas ordenadas.",
      "Encontrar cualquier archivo aunque no recuerdes dónde lo guardaste.",
    ],
    sections: [
      {
        title: "No vas a romper nada",
        points: ["Casi todo tiene marcha atrás", "Deshacer: Ctrl + Z (Cmd + Z en Mac)", "Equivocarse es parte de aprender"],
        body: [
          "El miedo más común al empezar es «voy a estropear algo». La buena noticia: es muy difícil romper un ordenador o un móvil tocando. Casi todo lo que haces se puede deshacer.",
          "Si borras un texto sin querer, pulsa Ctrl + Z (en Mac, Cmd + Z) y vuelve. Si borras un archivo, va primero a la papelera y lo puedes recuperar. Si te pierdes en una pantalla, el botón de atrás o cerrar la ventana te devuelve a un sitio conocido.",
        ],
        tip: "Equivocarse es la forma normal de aprender. Cada error que resuelves es algo que ya sabes para siempre.",
      },
      {
        title: "Ratón, teclado y pantalla táctil",
        points: ["Clic para elegir, doble clic para abrir", "Botón derecho: más opciones", "En el móvil: tocar, mantener y deslizar"],
        body: [
          "Con el ratón, un clic selecciona algo y un doble clic (dos clics rápidos) lo abre. El botón derecho muestra un menú con más opciones, como copiar, renombrar o eliminar.",
          "En el móvil y la tablet, tocar equivale al clic; mantener el dedo pulsado muestra más opciones, y deslizar sirve para moverte entre pantallas o bajar por una página.",
          "Del teclado, con cuatro teclas haces casi todo: Intro para confirmar, la tecla de borrar, la barra espaciadora y Mayúsculas para escribir en mayúscula.",
        ],
      },
      {
        title: "Archivos y carpetas: tu armario digital",
        points: ["Un archivo es un documento, una foto o un vídeo", "Las carpetas son cajones para ordenarlos", "Pon nombres claros: «Factura luz enero»"],
        body: [
          "Piensa en el ordenador como un armario: los archivos (documentos, fotos, vídeos) son las cosas y las carpetas son los cajones donde las guardas.",
          "Ya tienes algunas carpetas hechas: Documentos, Imágenes y Descargas, que es donde va todo lo que bajas de internet. Para crear una nueva, haz clic con el botón derecho en un espacio vacío y elige «Nueva carpeta».",
          "Usa nombres que entiendas dentro de un año: «Factura luz enero 2026» es mucho mejor que «documento final (3)».",
        ],
        tip: "Una vez a la semana, mira tu carpeta de Descargas y mueve a su sitio lo que quieras conservar. Así nunca se convierte en un cajón desastre.",
      },
      {
        title: "Encontrar lo que has perdido",
        points: ["Usa el buscador de tu dispositivo", "Mira primero en Descargas", "Escribe una palabra del nombre"],
        body: [
          "¿No sabes dónde guardaste algo? No hace falta abrir carpeta por carpeta: usa el buscador. En Windows, pulsa la tecla de Windows y escribe. En Mac, pulsa Cmd + barra espaciadora. En el móvil, usa la barra de búsqueda de la pantalla de inicio (en iPhone, desliza hacia abajo desde el centro).",
          "Escribe una sola palabra que esté en el nombre del archivo, por ejemplo «factura», y aparecerá. Si lo bajaste de internet, casi seguro está en la carpeta Descargas.",
        ],
      },
    ],
    exercise: {
      title: "Ejercicio: ordena tu armario",
      steps: [
        "Crea una carpeta llamada «Papeles importantes» dentro de Documentos.",
        "Guarda dentro una foto o un documento cualquiera.",
        "Cámbiale el nombre por uno claro (botón derecho → Cambiar nombre).",
        "Cierra todo y encuéntralo usando solo el buscador.",
      ],
    },
    checklist: [
      "Sé hacer clic, doble clic y usar el botón derecho.",
      "Sé deshacer un error con Ctrl + Z o Cmd + Z.",
      "He creado una carpeta y le he puesto un nombre claro.",
      "Sé encontrar un archivo con el buscador.",
    ],
  },
  {
    slug: "buscar-y-contrastar",
    number: 1,
    title: "Buscar en internet y saber si es verdad",
    summary: "Encontrar lo que necesitas a la primera y distinguir la información fiable de los bulos y los anuncios.",
    duration: "1 h",
    available: true,
    objectives: [
      "Buscar con palabras clave y encontrar lo que necesitas a la primera.",
      "Distinguir los anuncios de los resultados normales.",
      "Detectar bulos y webs falsas antes de creerlas o reenviarlas.",
    ],
    sections: [
      {
        title: "Cómo buscar bien",
        points: ["Escribe palabras clave, no frases largas", "Añade el lugar: «farmacia de guardia Sabadell»", "Comillas para una frase exacta"],
        body: [
          "No hace falta escribirle al buscador como si fuera una persona. Funciona mejor con pocas palabras clave: «horario ambulatorio Sant Andreu» encuentra más rápido que «a qué hora abre el ambulatorio de mi barrio».",
          "Si buscas algo cerca, añade la ciudad o el barrio. Y si quieres una frase exacta, por ejemplo el título de una canción, ponla entre comillas.",
        ],
        prompt: "farmacia de guardia [tu ciudad] hoy",
        promptLabel: "Búsqueda de ejemplo",
      },
      {
        title: "Anuncios y resultados",
        points: ["Los primeros resultados pueden ser anuncios", "Llevan la etiqueta «Patrocinado»", "Para trámites, busca la web oficial"],
        body: [
          "Los primeros resultados de una búsqueda a menudo son anuncios: alguien ha pagado por salir ahí. Llevan la etiqueta «Patrocinado» o «Anuncio».",
          "No tienen por qué ser malos, pero ojo con los trámites: hay webs que cobran por gestiones que en la web oficial son gratis, como pedir cita o renovar documentos. Para eso, baja hasta encontrar la página oficial.",
        ],
        tip: "Las webs de la administración en España suelen terminar en .gob.es, o en el dominio de tu comunidad o ayuntamiento (por ejemplo, gencat.cat). Si una web de trámites te cobra por algo que debería ser gratis, desconfía.",
      },
      {
        title: "¿Es fiable esta web?",
        points: ["Mira bien la dirección de la web", "¿Quién lo dice y cuándo?", "El candado no garantiza que sea de fiar"],
        body: [
          "Antes de creerte algo, hazte tres preguntas. ¿Quién lo dice? Un organismo oficial, un periódico conocido o un experto con nombre no es lo mismo que una web sin autor. ¿Cuándo se publicó? Una noticia de hace años puede no valer hoy. ¿La dirección es la real? Las webs falsas copian el aspecto de las de verdad, pero la dirección cambia: «correos-envios.net» no es Correos.",
          "El candado junto a la dirección solo significa que la conexión va cifrada; las webs falsas también pueden tenerlo.",
        ],
      },
      {
        title: "Bulos: para antes de reenviar",
        points: ["Titular alarmista y sin fuente: sospecha", "«¡Reenvía a todos tus contactos!»: casi siempre es falso", "Compruébalo antes de compartir"],
        body: [
          "Un bulo es una noticia falsa que se comparte como si fuera verdad, sobre todo por WhatsApp y redes sociales. Suelen tener un titular que asusta o indigna, no dicen de dónde sale la información y piden que lo reenvíes a todo el mundo.",
          "Antes de reenviar algo, busca el titular en internet. Si es falso, lo más probable es que los verificadores (como Maldita.es o Newtral) ya lo hayan desmentido.",
        ],
        tip: "La mejor regla: si te provoca una emoción muy fuerte y te pide que lo compartas ya, espera cinco minutos y compruébalo.",
      },
    ],
    exercise: {
      title: "Ejercicio: detective de internet",
      steps: [
        "Busca el horario de tu centro de salud usando solo tres o cuatro palabras.",
        "En una búsqueda cualquiera, localiza qué resultados son anuncios.",
        "Busca la web oficial para pedir cita para renovar el DNI y fíjate en su dirección.",
        "Elige un mensaje reenviado que hayas recibido y comprueba si es verdad.",
      ],
    },
    checklist: [
      "Busco con palabras clave en lugar de frases largas.",
      "Distingo los anuncios de los resultados normales.",
      "Miro quién lo dice, cuándo y la dirección de la web.",
      "Compruebo las noticias antes de reenviarlas.",
    ],
  },
  {
    slug: "comunicarte",
    number: 2,
    title: "Correo, WhatsApp y videollamadas",
    summary: "Enviar emails con archivos adjuntos, usar WhatsApp con confianza y unirte a una videollamada.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "seguridad",
    number: 3,
    title: "Seguridad: contraseñas y estafas",
    summary: "Contraseñas seguras, la verificación en dos pasos y cómo reconocer los timos más habituales.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "tramites-online",
    number: 4,
    title: "Trámites online sin agobios",
    summary: "Pedir cita, descargar documentos y entender el certificado digital y Cl@ve.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
  {
    slug: "ia-en-tu-dia",
    number: 5,
    title: "La IA como ayudante del día a día",
    summary: "Usar ChatGPT o Claude para resolver dudas, escribir mensajes y entender documentos.",
    duration: "Próximamente",
    available: false,
    objectives: [],
    sections: [],
  },
];

export const availableDigitalModules = digitalModules.filter((m) => m.available);

export const getDigitalModule = (slug: string) => availableDigitalModules.find((m) => m.slug === slug);
