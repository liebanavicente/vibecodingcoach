import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { availableModules, getModule } from "@/content/curso";
import { contactHref } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/curso/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const mod = getModule(slug);
  return mod ? { title: `Módulo ${mod.number}: ${mod.title}`, description: mod.summary } : {};
}

export default async function ModulePage(props: PageProps<"/curso/[slug]">) {
  const { slug } = await props.params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const index = availableModules.indexOf(mod);
  const next = availableModules[index + 1];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/curso" className="text-sm text-muted hover:text-accent">
        ← Volver al curso
      </Link>
      <p className="mt-8 font-mono text-sm text-accent">
        Módulo {mod.number} · {mod.duration}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        {mod.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{mod.summary}</p>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-semibold">Al terminar este módulo podrás…</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
          {mod.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {mod.sections.map((s, i) => (
        <section key={s.title} className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            <span className="mr-2 font-mono text-accent">{i + 1}.</span>
            {s.title}
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {s.prompt && (
            <figure className="mt-6">
              <figcaption className="mb-2 text-sm font-medium text-muted">
                Prompt de ejemplo
              </figcaption>
              <pre className="whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed">
                {s.prompt}
              </pre>
            </figure>
          )}
          {s.tip && (
            <p className="mt-6 rounded-xl border-l-4 border-accent bg-accent-soft p-4">
              {s.tip}
            </p>
          )}
        </section>
      ))}

      {mod.exercise && (
        <section className="mt-16 rounded-2xl border border-accent p-6">
          <h2 className="text-xl font-semibold">{mod.exercise.title}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            {mod.exercise.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {mod.checklist && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Comprueba lo que has aprendido</h2>
          <ul className="mt-4 space-y-3">
            {mod.checklist.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 size-4 accent-accent" />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        {next ? (
          <Link
            href={`/curso/${next.slug}`}
            className="rounded-full bg-accent px-6 py-3 text-center font-medium text-white hover:opacity-90"
          >
            Siguiente: Módulo {next.number} →
          </Link>
        ) : (
          <p className="text-muted">
            Los siguientes módulos están en preparación.
          </p>
        )}
        <a href={contactHref} className="text-center text-muted hover:text-accent">
          ¿Te has atascado? Reserva una clase de prueba
        </a>
      </nav>
    </article>
  );
}
