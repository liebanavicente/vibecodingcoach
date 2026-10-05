import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { CursosHero } from "@/components/CursosHero";
import { JsonLd } from "@/components/JsonLd";
import { RibbonBg } from "@/components/RibbonBg";
import { courses, coursesUrl } from "@/content/cursos";
import { GSAP_SCRIPT } from "@/lib/intro";
import { siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

// Served at cursos.miguelliebana.com (see the host rewrite in next.config.ts). Links are absolute because on that
// host every other path is redirected to vibecoding.miguelliebana.com.
export const metadata: Metadata = {
  title: {
    absolute: "Cursos gratis de Miguel Liébana · ordenador, HTML y CSS, y webs con IA",
  },
  description:
    "Tres cursos gratuitos y sin registro, de nivel cero a construir tu propia web con IA: competencias digitales básicas, HTML y CSS desde cero y Vibe Coding desde Cero.",
  alternates: { canonical: coursesUrl },
  openGraph: { url: coursesUrl },
};

const catalog = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cursos gratuitos de Miguel Liébana",
  itemListElement: courses.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: c.title,
      description: c.text,
      url: c.href,
      inLanguage: "es",
      isAccessibleForFree: true,
      provider: { "@type": "Person", name: site.author, url: site.web },
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "EUR",
        category: "Free",
      },
    },
  })),
};

export default function CursosPage() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <JsonLd data={catalog} />
      <script dangerouslySetInnerHTML={{ __html: GSAP_SCRIPT }} />
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <CursosHero>
          <div className="hero-copy">
            <p className="eyebrow">Gratis · sin registro · a tu ritmo</p>
            <h1>
              Mis cursos, <span className="grad-text">de cero a tu web</span>
            </h1>
            <p className="page-intro">
              Soy Miguel Liébana, maestro durante 14 años y desarrollador web. Estos son mis cursos gratuitos, ordenados
              para que avances paso a paso: empieza por el que te toque y sigue cuando estés listo.
            </p>
            <div className="actions">
              <a className="button primary" href="#lista">
                Ver los cursos <ArrowDown aria-hidden size={18} weight="bold" />
              </a>
              <a className="button" href={`${siteUrl}/reservar`}>
                Clase de prueba gratis
              </a>
            </div>
          </div>
          <RibbonBg position="top" />
        </CursosHero>

        <ol className="catalog" id="lista">
          {courses.map((c, i) => (
            <li key={c.id}>
              <a className="catalog-card glass" href={c.href}>
                <span className="step-mark">{i + 1}</span>
                <div className="catalog-body">
                  <p className="label">
                    {c.level} · {c.forWho}
                  </p>
                  <h2>{c.title}</h2>
                  <p className="catalog-text">{c.text}</p>
                  <ul className="catalog-learn">
                    {c.learn.map((l) => (
                      <li key={l}>
                        <Check aria-hidden size={16} weight="bold" /> {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="catalog-side">
                  <dl>
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="button primary">
                    Empezar <ArrowRight aria-hidden size={18} weight="bold" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>

        <section aria-labelledby="acompanado" className="section">
          <div className="catalog-cta glass">
            <div>
              <h2 className="section-title" id="acompanado">
                ¿Prefieres que te <span className="grad-text">acompañe</span>?
              </h2>
              <p className="muted">
                Clases 1:1 para ir a tu ritmo y resolver tus dudas. La primera, de 30 minutos, es gratis. Y si lo que
                quieres es tener tu web sin aprender a hacerla, también te la hago yo.
              </p>
            </div>
            <div className="actions">
              <a className="button primary" href={`${siteUrl}/reservar`}>
                Reservar clase gratis
              </a>
              <a className="button" href={siteUrl}>
                Conocer vibecodingcoach
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
