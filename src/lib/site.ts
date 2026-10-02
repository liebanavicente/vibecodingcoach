export const site = {
  name: "Vibe Coding desde Cero",
  author: "Miguel Liébana",
  email: "mlieban3@gmail.com",
  linkedin: "https://linkedin.com/in/mliebanavicente",
  github: "https://github.com/liebanavicente",
  instagram: "https://www.instagram.com/vibecodingcoach_ml/",
  instagramHandle: "@vibecodingcoach_ml",
  web: "https://miguelliebana.com",
  /** Public booking page (e.g. https://cal.com/<usuario>/clase-de-prueba). Empty = book by email. */
  bookingUrl: "",
};

/** Every "reserve" button on the site goes to the booking page. */
export const contactHref = "/reservar";

export const emailBookingHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Clase de prueba - Vibe Coding",
)}&body=${encodeURIComponent(
  "Hola, Miguel:\n\nMe gustaría reservar una clase de prueba.\n\nLo que quiero construir: \nMi nivel: \nDías y horas que me van bien: \n\nGracias.",
)}`;
