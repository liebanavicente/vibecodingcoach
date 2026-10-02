import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CopyButton } from "@/components/CopyButton";
import { LessonPlayer } from "@/components/LessonPlayer";
import { Checklist } from "@/components/Progress";
import { type Module, slidesFor } from "@/content/curso";
import { contactHref } from "@/lib/site";

const anchor = (i: number) => `seccion-${i + 1}`;

type Props = {
  mod: Module;
  /** Published modules of this course, in order, to find the next one. */
  modules: Module[];
  /** Base URL of the course, e.g. "/curso". */
  courseHref: string;
  linksTitle: string;
  links: { href: string; title: string }[];
};

/** A lesson page: slide player, full text, exercise, checklist and side navigation. Shared by every course. */
export function ModuleView({ mod, modules, courseHref, linksTitle, links }: Props) {
  const index = modules.indexOf(mod);
  const next = modules[index + 1];

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
          <Link className="button" href={courseHref}>
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
                      <span>{s.promptLabel ?? "Prompt de ejemplo"}</span>
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
                <Checklist items={mod.checklist} slug={mod.slug} />
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
            <nav aria-label={linksTitle} className="glass toc">
              <p className="label">{linksTitle}</p>
              <ol>
                {links.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.title}</Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <div className="pager">
          {next ? (
            <Link className="button primary" href={`${courseHref}/${next.slug}`}>
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
