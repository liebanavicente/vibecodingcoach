/** What Miguel offers: shown on the home page and given to the site assistant, so both always agree. */

export const offers = [
  {
    name: "Clase de prueba",
    price: "Gratis",
    detail: "30 min · online",
    text: "Nos conocemos, vemos qué quieres construir y te llevas un plan claro para empezar.",
    featured: false,
  },
  {
    name: "Clases 1:1",
    price: "25 €/h",
    detail: "Online · a tu ritmo",
    text: "Sesiones individuales para construir tu proyecto con IA o ponerte al día con el ordenador y el móvil, con apoyo entre clases.",
    featured: true,
  },
  {
    name: "Taller en grupo",
    price: "30 €",
    detail: "3 h · grupos reducidos",
    text: "De cero a tu primera web publicada en una tarde, junto a otras personas que también empiezan.",
    featured: false,
  },
];

/** "Te la hago yo": websites built to order, quoted case by case. Icons are added on the home page. */
export const buildKinds = [
  { title: "Web para tu negocio", text: "Quién eres, qué ofreces, dónde estás y cómo contactarte. Lista para Google." },
  { title: "Página de un servicio o evento", text: "Una sola página pensada para que la gente reserve, se apunte o te escriba." },
  { title: "Portfolio o web personal", text: "Tu trabajo, tu currículum o tu proyecto, con tu propio dominio." },
  { title: "Una pequeña app a medida", text: "Reservas, formularios, un área privada o esa herramienta que siempre has querido." },
];

export const buildSteps = [
  { title: "Me cuentas tu idea", text: "Por email o en una llamada gratis de 30 minutos." },
  { title: "Te paso un presupuesto cerrado", text: "Precio y plazo por escrito antes de empezar. Sin sorpresas." },
  { title: "La construyo y la revisas", text: "Ves cómo avanza y pides cambios por el camino." },
  { title: "Te la entrego publicada", text: "Con tu dominio, y te enseño a cambiar textos y fotos tú solo." },
];
