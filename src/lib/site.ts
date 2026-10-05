export const site = {
  name: "Vibe Coding desde Cero",
  author: "Miguel Liébana",
  email: "mlieban3@gmail.com",
  linkedin: "https://linkedin.com/in/mliebanavicente",
  github: "https://github.com/liebanavicente",
  instagram: "https://www.instagram.com/vibecodingcoach_ml/",
  instagramHandle: "@vibecodingcoach_ml",
  tiktok: "https://www.tiktok.com/@vibecodingcoach_m",
  tiktokHandle: "@vibecodingcoach_m",
  youtube: "https://www.youtube.com/@vibecodingcoach_ml",
  youtubeHandle: "@vibecodingcoach_ml",
  web: "https://miguelliebana.com",
  /** Public booking page (Google Calendar appointment schedule). Empty = book by email. */
  bookingUrl: "https://calendar.app.google/uSv5gUWQeJT8efSM6",
};

/** Every "reserve" button on the site goes to the booking page. */
export const contactHref = "/reservar";

export const emailBookingHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Clase de prueba - Vibe Coding",
)}&body=${encodeURIComponent(
  "Hola, Miguel:\n\nMe gustaría reservar una clase de prueba.\n\nLo que quiero construir: \nMi nivel: \nDías y horas que me van bien: \n\nGracias.",
)}`;

/** "Te la hago yo": an email with the questions needed to quote a website. */
export const budgetHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Presupuesto web - vibecodingcoach",
)}&body=${encodeURIComponent(
  "Hola, Miguel:\n\nMe gustaría que me hicieras una web.\n\nPara qué es (negocio, proyecto, evento…): \nQué debería tener (páginas, formulario, reservas, tienda…): \nQué tengo ya (logo, textos, fotos, dominio): \nWebs que me gustan: \nPara cuándo la necesito: \nPresupuesto aproximado (opcional): \n\nGracias.",
)}`;
