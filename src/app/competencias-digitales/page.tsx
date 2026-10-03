import type { Metadata } from "next";
import Link from "next/link";
import { RibbonBg } from "@/components/RibbonBg";
import { ArrowRight, Clock, Lock } from "@phosphor-icons/react/dist/ssr";
import { CourseAnimator } from "@/components/CourseAnimator";
import { CourseProgress, ModuleProgress } from "@/components/Progress";
import { RouteAnimator } from "@/components/RouteAnimator";
import { availableDigitalModules, digitalModules } from "@/content/competencias";
import { GSAP_SCRIPT } from "@/lib/intro";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Competencias digitales básicas",
  description:
    "Curso gratuito para perderle el miedo al ordenador y al móvil: archivos, internet, bulos, seguridad, trámites online y la IA del día a día.",
};

const forWho = [
  { title: "Empiezas desde cero", text: "El ordenador o el móvil te imponen y prefieres que alguien te lo explique con calma." },
  { title: "Quieres hacerlo tú", text: "Pedir cita, mandar un archivo o hacer una videollamada sin tener que pedir ayuda cada vez." },
  { title: "Vuelves a trabajar", text: "Necesitas ponerte al día con las herramientas digitales que hoy se piden en cualquier empleo." },
];

export default function CompetenciasPage() {
  const first = availableDigitalModules[0];
  const progress = availableDigitalModules.map((m) => ({ slug: m.slug, total: m.checklist?.length ?? 0 }));

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <script dangerouslySetInnerHTML={{ __html: GSAP_SCRIPT }} />
      <CourseAnimator>
        <div className="page-head course-head has-ribbon" data-anim="head">
          <div>
            <p className="eyebrow">Curso gratuito · nivel cero</p>
            <h1>
              Competencias digitales <span className="grad-text">básicas</span>
            </h1>
            <p className="page-intro">
              Para perderle el miedo al ordenador y al móvil. Aprende a guardar y encontrar tus archivos, buscar en internet
              sin caer en bulos, protegerte de estafas y hacer tus trámites online. Paso a paso y con palabras sencillas.
            </p>
            <div className="actions">
              <Link className="button primary" href={`/competencias-digitales/${first.slug}`}>
                Empezar por el Módulo {first.number} <ArrowRight aria-hidden size={18} weight="bold" />
              </Link>
              <Link className="button" href={contactHref}>
                Prefiero clases con Miguel
              </Link>
            </div>
          </div>
          <aside className="glass course-stats">
            <CourseProgress modules={progress} />
            <dl>
              <div>
                <dt>Módulos</dt>
                <dd>
                  {availableDigitalModules.length}/{digitalModules.length}
                </dd>
              </div>
              <div>
                <dt>Nivel</dt>
                <dd>Cero</dd>
              </div>
              <div>
                <dt>Precio</dt>
                <dd>0 €</dd>
              </div>
            </dl>
          </aside>
          <RibbonBg position="top" />
        </div>

        <section aria-labelledby="para-quien-cd">
          <div className="section-head">
            <h2 className="section-title" id="para-quien-cd">
              ¿Para quién es?
            </h2>
          </div>
          <div className="grid">
            {forWho.map((a, i) => (
              <div className="panel" key={a.title}>
                <span className="panel-num">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="ruta-cd" className="section">
          <div className="section-head">
            <div>
              <p className="label">Paso a paso</p>
              <h2 className="section-title" id="ruta-cd">
                La ruta
              </h2>
            </div>
          </div>
          <RouteAnimator>
            <ol className="route">
              {digitalModules.map((m) => (
                <li className={m.available ? "route-item" : "route-item is-locked"} key={m.slug}>
                  <span className="route-node">{m.number}</span>
                  {m.available ? (
                    <Link className="route-card glass" href={`/competencias-digitales/${m.slug}`}>
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
          <p className="muted" style={{ marginTop: 14 }}>
            Basado en DigComp, el marco europeo de competencias digitales.
          </p>
        </section>

        <div className="section cta-band">
          <div>
            <h2 className="section-title">¿Prefieres que te lo enseñe en persona?</h2>
            <p>Clases individuales, con paciencia y a tu ritmo. La primera, de 30 minutos, es gratis.</p>
          </div>
          <Link className="button lg" href={contactHref}>
            Reservar clase de prueba
            <span className="btn-dot arrow">
              <ArrowRight aria-hidden size={18} weight="bold" />
            </span>
          </Link>
        </div>
      </CourseAnimator>
    </main>
  );
}
