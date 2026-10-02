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
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Curso gratuito</p>
            <h1>
              Vibe Coding <span className="grad-text">desde Cero</span>
            </h1>
            <p className="page-intro">
              Aprende a construir y publicar tu primera web con IA. Cada módulo es una lección en diapositivas y vídeo,
              con el texto completo, prompts que puedes copiar, un ejercicio práctico y una checklist para comprobar lo
              que has aprendido.
            </p>
          </div>
        </div>

        <ol className="module-list">
          {modules.map((m) => (
            <li key={m.slug}>
              {m.available ? (
                <Link className="module-card" href={`/curso/${m.slug}`}>
                  <span className="step-mark">{m.number}</span>
                  <div>
                    <span className="label">{m.duration}</span>
                    <h3>{m.title}</h3>
                    <p>{m.summary}</p>
                  </div>
                  <span className="badge">Disponible</span>
                </Link>
              ) : (
                <div className="module-card is-locked">
                  <span className="step-mark">{m.number}</span>
                  <div>
                    <span className="label">Próximamente</span>
                    <h3>{m.title}</h3>
                    <p>{m.summary}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="section cta-band">
          <div>
            <h2 className="section-title">¿Prefieres aprender con acompañamiento?</h2>
            <p>Reserva una clase de prueba gratuita y vemos juntos por dónde empezar con tu proyecto.</p>
          </div>
          <a className="button primary" href={contactHref}>
            Reservar clase de prueba
          </a>
        </div>
      </div>
    </main>
  );
}
