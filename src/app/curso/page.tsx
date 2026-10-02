import type { Metadata } from "next";
import Link from "next/link";
import { modules } from "@/content/curso";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Curso gratuito",
  description:
    "Vibe Coding desde Cero: curso gratuito para aprender a construir webs con IA sin experiencia previa.",
};

export default function CursoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-accent">Curso gratuito</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Vibe Coding desde Cero
      </h1>
      <p className="mt-4 text-lg text-muted">
        Aprende a construir y publicar tu primera web con IA. Cada módulo tiene
        objetivos claros, ejemplos de prompts que puedes copiar, un ejercicio
        práctico y una checklist para comprobar lo que has aprendido.
      </p>

      <ol className="mt-12 space-y-4">
        {modules.map((m) => {
          const content = (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm text-accent">
                  Módulo {m.number}
                </span>
                <span className="text-sm text-muted">{m.duration}</span>
              </div>
              <h2 className="mt-1 text-xl font-semibold">{m.title}</h2>
              <p className="mt-2 text-muted">{m.summary}</p>
            </>
          );

          return (
            <li key={m.slug}>
              {m.available ? (
                <Link
                  href={`/curso/${m.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-6 hover:border-accent"
                >
                  {content}
                </Link>
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-6 opacity-60">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 rounded-2xl bg-accent-soft p-6">
        <h2 className="font-semibold">¿Prefieres aprender con acompañamiento?</h2>
        <p className="mt-2 text-muted">
          Reserva una clase de prueba gratuita y vemos juntos por dónde empezar
          con tu proyecto.
        </p>
        <a
          href={contactHref}
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2 font-medium text-white hover:opacity-90"
        >
          Reservar clase de prueba
        </a>
      </div>
    </div>
  );
}
