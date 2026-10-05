// The 10 points of the free Google Maps review (Google Business Profile). Each one scores 0 (falta), 1 (mejorable) or
// 2 (bien), so the review is out of 20. `mejora` is the default advice when a point is not "bien"; a review file can
// override it with its own note.
export const CRITERIOS = [
  {
    id: "verificada",
    titulo: "Ficha reclamada y verificada",
    como: "En Maps, ¿sale «¿Es el propietario de este negocio?»? Si sale, nadie la gestiona.",
    mejora: "Reclama tu ficha en business.google.com: así solo tú puedes cambiar horarios, fotos y datos.",
  },
  {
    id: "categoria",
    titulo: "Nombre y categoría correctos",
    como: "El nombre es el del rótulo (sin palabras de relleno) y la categoría principal describe lo que vendes.",
    mejora: "Ajusta la categoría principal (p. ej. «Pastelería» en vez de «Tienda») y añade 2 o 3 secundarias.",
  },
  {
    id: "horario",
    titulo: "Horario completo y al día",
    como: "Están todos los días, coinciden con el cartel de la puerta y hay horario especial en festivos.",
    mejora: "Revisa el horario y añade los horarios especiales de festivos y vacaciones: evita clientes en la puerta cerrada.",
  },
  {
    id: "contacto",
    titulo: "Teléfono y web",
    como: "Hay un teléfono que se puede pulsar y un enlace a una web (no solo a Instagram o Facebook).",
    mejora: "Pon un teléfono que contestes y enlaza una web propia: es lo que más confianza da a quien no te conoce.",
  },
  {
    id: "fotos",
    titulo: "Fotos buenas y recientes",
    como: "Al menos 10 fotos: fachada (para encontrarte), interior, productos y logo. Alguna del último año.",
    mejora: "Sube 10 fotos con luz natural: fachada, interior, tus productos estrella y tu logo como foto de perfil.",
  },
  {
    id: "descripcion",
    titulo: "Descripción del negocio",
    como: "En «Información» hay un texto que cuenta qué haces, desde cuándo y qué te diferencia.",
    mejora: "Escribe 3 o 4 frases sobre qué haces y para quién, con las palabras que la gente busca (barrio, especialidad).",
  },
  {
    id: "resenas",
    titulo: "Nota y número de reseñas",
    como: "Bien: 4,3 o más con 20 reseñas o más. Mejorable: buena nota pero pocas reseñas.",
    mejora: "Pide reseñas a tus clientes contentos con un QR en el mostrador o un enlace por WhatsApp (nunca reseñas falsas).",
  },
  {
    id: "respuestas",
    titulo: "Respuestas a las reseñas",
    como: "El negocio contesta, sobre todo las reseñas negativas y las de los últimos meses.",
    mejora: "Contesta las reseñas, también las malas, con calma y en dos líneas: los futuros clientes leen tu respuesta.",
  },
  {
    id: "productos",
    titulo: "Productos, servicios o carta",
    como: "La ficha muestra productos, servicios o la carta con precios orientativos.",
    mejora: "Añade tus productos o servicios principales con foto y precio orientativo: ayuda a que te elijan.",
  },
  {
    id: "novedades",
    titulo: "Novedades y detalles",
    como: "Hay alguna publicación de los últimos 3 meses y están marcados atributos útiles (pago con tarjeta, accesible…).",
    mejora: "Publica una novedad al mes (oferta, producto nuevo) y marca los atributos: tarjeta, accesibilidad, wifi…",
  },
];
