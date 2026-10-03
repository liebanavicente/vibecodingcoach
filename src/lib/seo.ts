import { site } from "@/lib/site";

/** Structured data (schema.org) shared by the pages. Kept to what the site really offers. */
export const siteUrl = "https://vibecoding.miguelliebana.com";

export const miguel = {
  "@type": "Person",
  "@id": `${siteUrl}/#miguel`,
  name: site.author,
  url: site.web,
  jobTitle: "Profesor de vibe coding y desarrollador web",
  description: "Maestro con 14 años de experiencia que enseña a principiantes a construir webs con IA.",
  knowsLanguage: ["es", "ca", "de", "en"],
  sameAs: [site.web, site.linkedin, site.github, site.instagram, site.tiktok],
};

export const website = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#web`,
  url: siteUrl,
  name: "vibecodingcoach",
  inLanguage: "es",
  publisher: { "@id": miguel["@id"] },
};

/** A free online course, as Google's course results expect it. */
export function course(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${siteUrl}${path}`,
    inLanguage: "es",
    isAccessibleForFree: true,
    provider: { "@type": "Person", name: site.author, url: site.web },
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", category: "Free" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT5H" },
  };
}
