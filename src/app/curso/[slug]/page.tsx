import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CopyButton } from "@/components/CopyButton";
import { LessonPlayer } from "@/components/LessonPlayer";
import { availableModules, getModule, slidesFor } from "@/content/curso";
import { contactHref } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: PageProps<"/curso/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const mod = getModule(slug);
  return mod ? { title: `Módulo ${mod.number}: ${mod.title}`, description: mod.summary } : {};
}

const anchor = (i: number) => `seccion-${i + 1}`;

export default async function ModulePage(props: PageProps<"/curso/[slug]">) {
  const { slug } = await props.params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const index = availableModules.indexOf(mod);
  const next = availableModules[index + 1];

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">
              Módulo {mod.number} · {mod.duration}
            </p>
            <h1>{mod.title}</h1>
            <p className="page-intro">{mod.summary}</p>
          </div>
          <Link className="button" href="/curso">
            <ArrowLeft aria-hidden size={18} weight="bold" /> Todos los módulos
          </Link>
        </div>

        <LessonPlayer slides={slidesFor(mod)} video={mod.video} />

        <div className="article-layout">
          <article className="prose">
            {mod.sections.map((s, i) => (
              <section key={s.title}>
                <h2 id={anchor(i)}>{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.prompt ? (
                  <div className="code-block">
                    <div className="code-bar">
                      <span>Prompt de ejemplo</span>
                      <CopyButton text={s.prompt} />
                    </div>
                    <pre>{s.prompt}</pre>
                  </div>
                ) : null}
                {s.tip ? (
                  <div className="callout" data-callout="Consejo">
                    <p>{s.tip}</p>
                  </div>
                ) : null}
              </section>
            ))}

            {mod.exercise ? (
              <div className="callout exercise" data-callout="Ejercicio">
                <h3>{mod.exercise.title}</h3>
                <ol>
                  {mod.exercise.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {mod.checklist ? (
              <section>
                <h2 id="checklist">Comprueba lo que has aprendido</h2>
                <ul className="task-list">
                  {mod.checklist.map((item) => (
                    <li key={item}>
                      <label>
                        <input type="checkbox" />
                        <span>{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          <aside className="article-aside">
            <div className="glass">
              <p className="label">Al terminar podrás…</p>
              <ul className="objectives">
                {mod.objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <nav aria-label="En esta lección" className="glass toc">
              <p className="label">En esta lección</p>
              <ol>
                {mod.sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#${anchor(i)}`}>{s.title}</a>
                  </li>
                ))}
                {mod.checklist ? (
                  <li>
                    <a href="#checklist">Checklist final</a>
                  </li>
                ) : null}
              </ol>
            </nav>
          </aside>
        </div>

        <div className="pager">
          {next ? (
            <Link className="button primary" href={`/curso/${next.slug}`}>
              Siguiente: Módulo {next.number} <ArrowRight aria-hidden size={18} weight="bold" />
            </Link>
          ) : (
            <p className="muted">Los siguientes módulos están en preparación.</p>
          )}
          <a className="button" href={contactHref}>
            ¿Te has atascado? Reserva una clase de prueba
          </a>
        </div>
      </div>
    </main>
  );
}
