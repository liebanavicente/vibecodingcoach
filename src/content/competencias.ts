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
    duration: "1 h",
    available: true,
    objectives: [
      "Escribir un correo claro y enviar un archivo adjunto.",
      "Escribir a varias personas sin enseñar el correo de todas.",
      "Usar WhatsApp con tranquilidad: audios, fotos, documentos y grupos.",
      "Unirte a una videollamada y que te vean y te oigan bien.",
    ],
    sections: [
      {
        title: "Un correo que se entiende",
        points: ["Asunto corto que diga de qué va", "Saludo, lo importante primero, despedida", "Revisa la dirección antes de enviar"],
        body: [
          "Un correo se lee mejor si el asunto dice de qué va: «Factura de septiembre» es mejor que «Hola». Dentro, saluda, cuenta lo importante en las primeras líneas y despídete con tu nombre.",
          "Antes de pulsar «Enviar», mira bien la dirección: una letra cambiada y el correo le llega a otra persona o a nadie.",
        ],
        prompt:
          "Asunto: Factura de septiembre\n\nHola, Marta:\n\nTe envío la factura de septiembre en el archivo adjunto. Si ves algo que no cuadra, dímelo y lo revisamos.\n\nUn saludo,\nCarmen",
        promptLabel: "Correo de ejemplo",
      },
      {
        title: "Adjuntar archivos",
        points: ["El clip 📎 sirve para adjuntar", "Fotos y documentos de hasta unos 25 MB", "Para archivos grandes, comparte un enlace"],
        body: [
          "Para enviar un documento o una foto, busca el icono del clip 📎 al escribir el correo, elige el archivo y espera a que termine de cargarse antes de enviar.",
          "Los correos tienen un límite de tamaño (en Gmail, unos 25 MB). Si el archivo es más grande, como un vídeo, el propio correo te ofrecerá subirlo a Google Drive o a OneDrive y enviar un enlace en su lugar.",
        ],
        tip: "Antes de enviar, abre el adjunto con un clic para comprobar que es el archivo correcto. Es el despiste más habitual.",
      },
      {
        title: "Escribir a varias personas",
        points: ["Para: a quien va dirigido", "CC: con copia, todos ven a todos", "CCO: copia oculta, nadie ve a los demás"],
        body: [
          "Cuando escribes a varias personas tienes tres casillas. «Para» es la persona principal. «CC» (con copia) es para quien debe estar enterado; todos ven las direcciones de todos.",
          "«CCO» (con copia oculta) envía el correo a cada persona sin que vea a las demás. Úsalo siempre que escribas a un grupo que no se conoce entre sí, como los padres de una clase o los clientes de un negocio: así no compartes sus correos sin permiso.",
        ],
      },
      {
        title: "WhatsApp con confianza",
        points: ["Audios, fotos y documentos desde el clip o la cámara", "Dos marcas azules: lo ha leído", "Silencia los grupos que te agobian"],
        body: [
          "En WhatsApp puedes enviar mucho más que texto. Mantén pulsado el micrófono para grabar un audio; el clip te deja enviar fotos, documentos o tu ubicación.",
          "Las marcas junto a tu mensaje te dicen qué ha pasado: una gris, enviado; dos grises, entregado; dos azules, leído.",
          "Si un grupo no para de sonar, entra en él, toca su nombre y elige «Silenciar». Sigues recibiendo los mensajes, pero sin avisos. Y si te equivocas al enviar algo, mantén pulsado el mensaje y elige «Eliminar para todos».",
        ],
        tip: "En Ajustes → Privacidad puedes elegir quién ve tu foto, tu «última vez» o quién puede añadirte a grupos. Lo más tranquilo: «Mis contactos».",
      },
      {
        title: "Tu primera videollamada",
        points: ["WhatsApp para la familia; Meet o Zoom con un enlace", "Prueba cámara y micrófono antes", "Luz de frente y micrófono apagado si no hablas"],
        body: [
          "Para hablar con la familia, la videollamada de WhatsApp es lo más fácil: abre el chat y toca el icono de la cámara. Para una reunión, una clase o el médico te suelen mandar un enlace de Google Meet o de Zoom: tócalo a la hora indicada y sigue los pasos. Con Meet ni siquiera hace falta instalar nada en el ordenador.",
          "Unos minutos antes, comprueba que la cámara se ve y el micrófono se oye. Ponte con la luz de frente (una ventana delante, no detrás) y apaga el micrófono cuando no hables para que no se oiga el ruido de casa.",
        ],
      },
    ],
    exercise: {
      title: "Ejercicio: comunícate de tres formas",
      steps: [
        "Envíate un correo a ti mismo con un asunto claro y una foto adjunta, y comprueba que te llega.",
        "Escribe un correo a dos personas usando CCO.",
        "Envía por WhatsApp un audio corto y un documento a alguien de confianza.",
        "Silencia un grupo de WhatsApp y revisa tu privacidad en Ajustes.",
        "Haz una videollamada de prueba de cinco minutos con alguien de tu familia.",
      ],
    },
    checklist: [
      "Escribo correos con un asunto claro.",
      "Sé adjuntar un archivo y comprobar que es el correcto.",
      "Uso CCO cuando escribo a un grupo.",
      "Envío audios, fotos y documentos por WhatsApp.",
      "Sé silenciar un grupo y ajustar mi privacidad.",
      "Me he unido a una videollamada con la cámara y el micrófono bien.",
    ],
  },
  {
    slug: "seguridad",
    number: 3,
    title: "Seguridad: contraseñas y estafas",
    summary: "Contraseñas seguras, la verificación en dos pasos y cómo reconocer los timos más habituales.",
    duration: "1 h",
    available: true,
    objectives: [
      "Crear contraseñas seguras que puedas recordar, y no repetirlas.",
      "Activar la verificación en dos pasos en tu correo y en WhatsApp.",
      "Reconocer los timos más habituales por SMS, WhatsApp y teléfono.",
      "Saber qué hacer si te ha pasado.",
    ],
    sections: [
      {
        title: "Contraseñas que no se adivinan",
        points: ["Larga mejor que rara: una frase", "Una distinta para cada sitio", "Deja que el móvil las recuerde por ti"],
        body: [
          "Una contraseña segura no tiene por qué ser un lío de símbolos. Lo que más cuenta es que sea larga: una frase que solo tú entiendas, como «MiPerroLunaComeSardinas2024», es mucho más difícil de adivinar que «P@ss1».",
          "Lo más importante es no repetirla. Si usas la misma en todas partes y una web la pierde, los ladrones la prueban en tu correo y en tu banco.",
          "No hace falta memorizarlas todas: el móvil y el navegador (de Google o de Apple) pueden guardarlas por ti y rellenarlas solas. Así solo tienes que recordar la de tu móvil y la de tu correo.",
        ],
        tip: "Tu correo es la llave de todo: si alguien entra en él, puede cambiar las contraseñas del resto. Protégelo el primero.",
      },
      {
        title: "La verificación en dos pasos",
        points: ["Contraseña más un código que llega a tu móvil", "Actívala en el correo, el banco y WhatsApp", "Ese código no se le da a nadie, nunca"],
        body: [
          "La verificación en dos pasos añade una segunda cerradura: además de la contraseña, para entrar hace falta un código que te llega al móvil. Aunque alguien sepa tu contraseña, sin tu móvil no puede entrar.",
          "Actívala en tu correo (en Gmail: Cuenta de Google → Seguridad), en tu banco y en WhatsApp (Ajustes → Cuenta → Verificación en dos pasos, que te pide un PIN de seis cifras).",
          "Y la regla más importante de este módulo: esos códigos son solo para ti. Nadie de verdad, ni tu banco ni WhatsApp ni la policía, te los va a pedir.",
        ],
      },
      {
        title: "Los timos más habituales",
        points: ["SMS de «Correos» o de «tu banco» con un enlace", "«Hola mamá, se me ha roto el móvil»", "Llamadas de un falso técnico o un falso banco"],
        body: [
          "El SMS falso: «Tu paquete está retenido, paga 1,99 € aquí» o «Hemos bloqueado tu cuenta, entra aquí». El enlace lleva a una web que imita a la real para robarte los datos de la tarjeta o del banco.",
          "El «Hola mamá»: un número desconocido te escribe por WhatsApp haciéndose pasar por tu hijo o tu hija, que dice haber perdido el móvil y necesita que hagas un pago urgente.",
          "La llamada falsa: alguien que dice ser de tu banco, de Microsoft o de la compañía de la luz te avisa de un problema y te pide un código, instalar un programa o hacer un Bizum «para anularlo».",
        ],
        tip: "Todos tienen algo en común: prisa, miedo y que hagas algo ya. Cuando sientas esa prisa, cuelga, respira y comprueba por tu cuenta.",
      },
      {
        title: "Cómo comprobarlo",
        points: ["No pulses el enlace: entra tú en la web o la app", "Llama tú al número de siempre", "Pregunta a alguien antes de pagar"],
        body: [
          "Si te escribe «tu banco», no pulses el enlace: abre tú la aplicación del banco o llama al teléfono que aparece en tu tarjeta. Si te escribe «tu hijo» desde un número nuevo, llámale al número de siempre o hazle una pregunta que solo él sabría contestar.",
          "Y una regla con Bizum: recibir dinero nunca te exige hacer nada. Si para «recibir» te piden que aceptes una operación o que des un código, en realidad estás pagando.",
        ],
        prompt: "Me ha llegado este mensaje: [pega aquí el mensaje]. ¿Tiene pinta de estafa? Explícame en palabras sencillas qué señales lo delatan y qué debería hacer.",
        promptLabel: "Pregúntale a la IA",
      },
      {
        title: "Si ya te ha pasado",
        points: ["Llama a tu banco y bloquea la tarjeta", "Cambia la contraseña de la cuenta afectada", "Pide ayuda gratis en el 017"],
        body: [
          "Le pasa a mucha gente, también a quien sabe de tecnología, así que no te culpes: actúa rápido. Si has dado datos del banco o de la tarjeta, llama al banco enseguida y pide que la bloqueen.",
          "Si has dado una contraseña, cámbiala y activa la verificación en dos pasos. Si es la de tu correo, cámbiala la primera.",
          "En España tienes el 017, la línea gratuita de ayuda en ciberseguridad del INCIBE: te dicen qué hacer paso a paso. Y si has perdido dinero, denúncialo en la Policía o en la Guardia Civil.",
        ],
        tip: "Apunta el 017 en tus contactos con el nombre «Ayuda estafas». Ojalá no lo necesites.",
      },
    ],
    exercise: {
      title: "Ejercicio: pon tus cerraduras",
      steps: [
        "Cambia la contraseña de tu correo por una frase larga que no uses en ningún otro sitio.",
        "Activa la verificación en dos pasos en tu correo.",
        "Activa la verificación en dos pasos de WhatsApp y guarda el PIN en un lugar seguro.",
        "Busca en tus SMS o en tu WhatsApp un mensaje sospechoso y localiza las señales de estafa.",
        "Guarda el 017 en tus contactos.",
      ],
    },
    checklist: [
      "Mi correo tiene una contraseña larga que no uso en otro sitio.",
      "Tengo la verificación en dos pasos activada en el correo y en WhatsApp.",
      "Sé que nunca debo dar un código que me llega al móvil.",
      "Reconozco el SMS falso, el «Hola mamá» y la llamada falsa.",
      "Compruebo por mi cuenta antes de pagar o pulsar un enlace.",
      "Sé qué hacer y a quién llamar si me han estafado.",
    ],
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
