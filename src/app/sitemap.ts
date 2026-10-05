import type { MetadataRoute } from "next";
import { availableDigitalModules } from "@/content/competencias";
import { availableModules } from "@/content/curso";
import { resources } from "@/content/recursos";

const base = "https://vibecoding.miguelliebana.com";

/** Every public page, so search engines find them all. Generated from the same content as the pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${base}${path}`, priority });
  return [
    page("", 1),
    page("/curso", 0.9),
    page("/competencias-digitales", 0.9),
    page("/reservar", 0.8),
    page("/presupuesto", 0.8),
    page("/comercios", 0.8),
    page("/encargo", 0.8),
    page("/privacidad", 0.2),
    page("/curso/glosario", 0.8),
    page("/curso/prompts", 0.8),
    ...availableModules.map((m) => page(`/curso/${m.slug}`, 0.7)),
    ...availableDigitalModules.map((m) => page(`/competencias-digitales/${m.slug}`, 0.7)),
    ...resources.map((r) => page(`/curso/recursos/${r.slug}`, 0.6)),
  ];
}
