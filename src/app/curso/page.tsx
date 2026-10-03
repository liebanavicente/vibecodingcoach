import type { Metadata } from "next";
import Link from "next/link";
import { RibbonBg } from "@/components/RibbonBg";
import { ArrowRight, CheckCircle, Clock, Lock, XCircle } from "@phosphor-icons/react/dist/ssr";
import { CourseAnimator } from "@/components/CourseAnimator";
import { CourseProgress, ModuleProgress } from "@/components/Progress";
import { RouteAnimator } from "@/components/RouteAnimator";
import { ResourceGrid } from "@/components/ResourceGrid";
import { availableModules, modules } from "@/content/curso";
import { resources } from "@/content/recursos";
import { GSAP_SCRIPT } from "@/lib/intro";
import { contactHref } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { course } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curso gratuito",
  description:
    "Vibe Coding desde Cero: curso gratuito para aprender a construir webs con IA sin experiencia previa, con módulos, recursos y truquillos.",
  alternates: { canonical: "/curso" },
};

const goodUse = resources
  .filter((r) => r.category === "Buen uso")
  .map((r) => {
    const pair = r.blocks.find((b) => b.type === "dodont");
    return { slug: r.slug, title: r.title, minutes: r.minutes, pair: pair?.type === "dodont" ? pair.items[0] : null };
  });

export default function CursoPage() {
  const first = availableModules[0];
  const progress = availableModules.map((m) => ({ slug: m.slug, total: m.checklist?.length ?? 0 }));

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <JsonLd data={course("Vibe Coding desde Cero", "Curso gratuito para aprender a construir tu primera web con IA, sin experiencia previa.", "/curso")} />
      <div aria-hidden className="page-bg calm" />
      <script dangerouslySetInnerHTML={{ __html: GSAP_SCRIPT }} />
      <CourseAnimator>
        <div className="page-head course-head has-ribbon" data-anim="head">
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
              <Link className="button" href="/curso/recursos/que-necesitas">
                ¿Qué necesito?
              </Link>
              <Link className="button" href="/curso/prompts">
                Prompts
              </Link>
              <Link className="button" href="/curso/glosario">
                Glosario
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
          <RibbonBg position="top" />
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
          <RouteAnimator>
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
          </RouteAnimator>
        </section>

        <section aria-labelledby="buen-uso" className="section" id="buen-uso-vs-mal-uso">
          <div className="section-head">
            <div>
              <p className="label">Lo que nadie te cuenta</p>
              <h2 className="section-title" id="buen-uso">
                <span className="grad-text">Buen uso</span> <span className="muted-x">vs</span> mal uso
              </h2>
            </div>
          </div>
          <ul className="usage-grid">
            {goodUse.map((g) => (
              <li key={g.slug}>
                <Link className="usage-card glass" href={`/curso/recursos/${g.slug}`}>
                  <h3>{g.title}</h3>
                  {g.pair ? (
                    <div className="usage-pair">
                      <p className="is-bad">
                        <XCircle aria-hidden size={18} weight="fill" />
                        <span>
                          <span className="visually-hidden">Mal uso: </span>
                          {g.pair.bad}
                        </span>
                      </p>
                      <p className="is-good">
                        <CheckCircle aria-hidden size={18} weight="fill" />
                        <span>
                          <span className="visually-hidden">Buen uso: </span>
                          {g.pair.good}
                        </span>
                      </p>
                    </div>
                  ) : null}
                  <span className="res-go">
                    Ver la guía · {g.minutes} min <ArrowRight aria-hidden size={16} weight="bold" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
          <ResourceGrid items={resources.map(({ slug, category, title, summary, minutes }) => ({ slug, category, title, summary, minutes }))} />
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
      </CourseAnimator>
    </main>
  );
}
