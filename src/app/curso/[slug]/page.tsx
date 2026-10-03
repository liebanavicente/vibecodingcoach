import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleView } from "@/components/ModuleView";
import { availableModules, getModule } from "@/content/curso";
import { resources } from "@/content/recursos";
import { JsonLd } from "@/components/JsonLd";
import { course } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: PageProps<"/curso/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const mod = getModule(slug);
  return mod ? { title: `Módulo ${mod.number}: ${mod.title}`, description: mod.summary, alternates: { canonical: `/curso/${slug}` } } : {};
}

export default async function ModulePage(props: PageProps<"/curso/[slug]">) {
  const { slug } = await props.params;
  const mod = getModule(slug);
  if (!mod) notFound();
  return (
    <>
      <JsonLd data={course(`Módulo ${mod.number}: ${mod.title}`, mod.summary, `/curso/${slug}`)} />
      <ModuleView
        courseHref="/curso"
        links={resources.map((r) => ({ href: `/curso/recursos/${r.slug}`, title: r.title }))}
        linksTitle="Recursos útiles"
        mod={mod}
        modules={availableModules}
      />
    </>
  );
}
