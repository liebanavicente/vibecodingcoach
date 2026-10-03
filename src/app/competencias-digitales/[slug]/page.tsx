import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleView } from "@/components/ModuleView";
import { availableDigitalModules, getDigitalModule } from "@/content/competencias";
import { JsonLd } from "@/components/JsonLd";
import { course } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableDigitalModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: PageProps<"/competencias-digitales/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const mod = getDigitalModule(slug);
  return mod ? { title: `${mod.title} · Competencias digitales`, description: mod.summary, alternates: { canonical: `/competencias-digitales/${slug}` } } : {};
}

export default async function DigitalModulePage(props: PageProps<"/competencias-digitales/[slug]">) {
  const { slug } = await props.params;
  const mod = getDigitalModule(slug);
  if (!mod) notFound();
  return (
    <>
      <JsonLd data={course(mod.title, mod.summary, `/competencias-digitales/${slug}`)} />
      <ModuleView
        courseHref="/competencias-digitales"
        links={[
          { href: "/curso/glosario", title: "Glosario: palabras raras explicadas" },
          { href: "/curso/recursos/que-necesitas", title: "Qué ordenador y qué programas necesitas" },
          { href: "/curso", title: "¿Quieres crear tu propia web? Curso de vibe coding" },
        ]}
        linksTitle="También te puede servir"
        mod={mod}
        modules={availableDigitalModules}
      />
    </>
  );
}
