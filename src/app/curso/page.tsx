import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ImageSquare, Lock, MagicWand, PuzzlePiece, Scales } from "@phosphor-icons/react/dist/ssr";
import { CourseProgress, ModuleProgress } from "@/components/Progress";
import { availableModules, modules } from "@/content/curso";
import { resources, type Resource } from "@/content/recursos";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Curso gratuito",
  description:
    "Vibe Coding desde Cero: curso gratuito para aprender a construir webs con IA sin experiencia previa, con módulos, recursos y truquillos.",
};

const categoryIcon: Record<Resource["category"], typeof PuzzlePiece> = {
  Skills: PuzzlePiece,
  Revisión: Scales,
  Imágenes: ImageSquare,
  Truquillos: MagicWand,
};

export default function CursoPage() {
  const first = availableModules[0];
  const progress = availableModules.map((m) => ({ slug: m.slug, total: m.checklist?.length ?? 0 }));

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head course-head">
          <div>
            <p className="eyebrow">Curso gratuito</p>
            <h1>
              Vibe Coding <span className="grad-text">desde Cero</span>
            </h1>
            <p className="page-intro">
              Una ruta paso a paso para construir y publicar tu primera web con IA, y una caja de herramientas con
              recursos y truquillos para cuando ya estés en marcha.
            </p>
            <div className="actions">
              <Link className="button primary" href={`/curso/${first.slug}`}>
                Empezar por el Módulo {first.number} <ArrowRight aria-hidden size={18} weight="bold" />
              </Link>
              <a className="button" href="#recursos">
                Ver recursos
              </a>
            </div>
          </div>
          <aside className="glass course-stats">
            <CourseProgress modules={progress} />
            <dl>
              <div>
                <dt>Módulos</dt>
                <dd>
                  {availableModules.length}/{modules.length}
                </dd>
              </div>
              <div>
                <dt>Recursos</dt>
                <dd>{resources.length}</dd>
              </div>
              <div>
                <dt>Precio</dt>
                <dd>0 €</dd>
              </div>
            </dl>
          </aside>
        </div>

        <section aria-labelledby="ruta">
          <div className="section-head">
            <div>
              <p className="label">Paso a paso</p>
              <h2 className="section-title" id="ruta">
                La ruta
              </h2>
            </div>
          </div>
          <ol className="route">
            {modules.map((m) => (
              <li className={m.available ? "route-item" : "route-item is-locked"} key={m.slug}>
                <span className="route-node">{m.number}</span>
                {m.available ? (
                  <Link className="route-card glass" href={`/curso/${m.slug}`}>
                    <div>
                      <span className="label">
                        <Clock aria-hidden size={14} weight="bold" /> {m.duration}
                      </span>
                      <h3>{m.title}</h3>
                      <p>{m.summary}</p>
                    </div>
                    <ModuleProgress slug={m.slug} total={m.checklist?.length ?? 0} />
                  </Link>
                ) : (
                  <div className="route-card glass">
                    <div>
                      <span className="label">
                        <Lock aria-hidden size={14} weight="bold" /> Próximamente
                      </span>
                      <h3>{m.title}</h3>
                      <p>{m.summary}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="recursos-title" className="section" id="recursos">
          <div className="section-head">
            <div>
              <p className="label">Caja de herramientas</p>
              <h2 className="section-title" id="recursos-title">
                Recursos y <span className="grad-text">truquillos</span>
              </h2>
            </div>
          </div>
          <ul className="res-grid">
            {resources.map((r) => {
              const Icon = categoryIcon[r.category];
              return (
                <li key={r.slug}>
                  <Link className="res-card glass" href={`/curso/recursos/${r.slug}`}>
                    <span className="res-icon">
                      <Icon aria-hidden size={26} weight="fill" />
                    </span>
                    <span className="res-meta">
                      <span className="badge">{r.category}</span>
                      <span className="muted">{r.minutes} min</span>
                    </span>
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                    <span className="res-go">
                      Leer <ArrowRight aria-hidden size={16} weight="bold" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="section cta-band">
          <div>
            <h2 className="section-title">¿Prefieres aprender con acompañamiento?</h2>
            <p>Reserva una clase de prueba gratuita y vemos juntos por dónde empezar con tu proyecto.</p>
          </div>
          <a className="button lg" href={contactHref}>
            Reservar clase de prueba
            <span className="btn-dot arrow">
              <ArrowRight aria-hidden size={18} weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
