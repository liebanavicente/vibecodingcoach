import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { Blocks } from "@/components/Blocks";
import { getResource, resources } from "@/content/recursos";
import { contactHref } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/curso/recursos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const res = getResource(slug);
  return res ? { title: res.title, description: res.summary } : {};
}

export default async function ResourcePage(props: PageProps<"/curso/recursos/[slug]">) {
  const { slug } = await props.params;
  const res = getResource(slug);
  if (!res) notFound();

  const others = resources.filter((r) => r.slug !== res.slug);

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">
              Recurso · {res.category} · <Clock aria-hidden size={16} weight="bold" /> {res.minutes} min
            </p>
            <h1>{res.title}</h1>
            <p className="page-intro">{res.summary}</p>
          </div>
          <Link className="button" href="/curso#recursos">
            <ArrowLeft aria-hidden size={18} weight="bold" /> Todos los recursos
          </Link>
        </div>

        <div className="article-layout">
          <article className="prose">
            <Blocks blocks={res.blocks} />
          </article>
          <aside className="article-aside">
            <nav aria-label="Más recursos" className="glass toc">
              <p className="label">Más recursos</p>
              <ol>
                {others.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/curso/recursos/${r.slug}`}>{r.title}</Link>
                  </li>
                ))}
              </ol>
            </nav>
            <Link className="glass aside-glossary" href="/curso/glosario">
              <span className="label">¿Alguna palabra rara?</span>
              <strong>Abre el glosario →</strong>
            </Link>
            <div className="glass aside-cta">
              <p className="label">¿Lo vemos juntos?</p>
              <p>En una clase de prueba gratuita lo aplicamos a tu proyecto.</p>
              <a className="button primary" href={contactHref}>
                Reservar <ArrowRight aria-hidden size={16} weight="bold" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
