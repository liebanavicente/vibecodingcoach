import Link from "next/link";
import type { CSSProperties } from "react";
import {
  AppWindow,
  ArrowRight,
  CalendarBlank,
  Calculator,
  EnvelopeSimple,
  IdentificationCard,
  RocketLaunch,
  Storefront,
  ChartBar,
  Chalkboard,
  Code,
  CursorClick,
  GraduationCap,
  Hammer,
  Lightbulb,
  Lightning,
  Play,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "@/components/BrandLogo";
import { CountUp } from "@/components/CountUp";
import { RibbonBg } from "@/components/RibbonBg";
import { SocialLinks } from "@/components/SocialLinks";
import { CourseScrollVideo } from "@/components/CourseScrollVideo";
import { HeroAnimator } from "@/components/HeroAnimator";
import { HowItWorks } from "@/components/HowItWorks";
import { IntroVideo } from "@/components/IntroVideo";
import { GSAP_SCRIPT, INTRO_SCRIPT } from "@/lib/intro";
import { MlLink } from "@/components/MlLogo";
import { ResourceMarquee } from "@/components/ResourceMarquee";
import { availableModules, modules } from "@/content/curso";
import { availableDigitalModules, digitalModules } from "@/content/competencias";
import { tools } from "@/content/herramientas";
import { budgetHref, contactHref } from "@/lib/site";
import { buildKinds, buildSteps, offers } from "@/content/oferta";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { miguel, website } from "@/lib/seo";

const perks = [
  { Icon: Lightning, text: "Sin experiencia previa" },
  { Icon: UsersThree, text: "Acompañamiento personalizado" },
  { Icon: ChartBar, text: "Resultados desde el primer día" },
];

const audiences = [
  {
    title: "Empiezas de cero",
    text: "Nunca has escrito una línea de código y la palabra «terminal» te da respeto. Perfecto: por ahí empezamos.",
  },
  {
    title: "Tienes un pequeño negocio",
    text: "Quieres tu propia web sin pagar a una agencia ni depender de nadie cada vez que hay que cambiar algo.",
  },
  {
    title: "Te estás reinventando",
    text: "Vienes de la educación u otro sector y quieres incorporar la IA y la tecnología a tu trabajo.",
  },
];

const method = [
  {
    Icon: Chalkboard,
    title: "Pedagogía, no jerga",
    text: "14 años como maestro me han enseñado a explicar lo difícil de forma sencilla y a adaptarme a tu ritmo.",
  },
  {
    Icon: Hammer,
    title: "Aprender haciendo",
    text: "Cada sesión termina con algo tuyo funcionando. Nada de teoría sin práctica.",
  },
  {
    Icon: Lightbulb,
    title: "Entender, no copiar",
    text: "Usamos la IA para construir, pero aprendes lo suficiente para no depender de ella a ciegas.",
  },
];

export const metadata: Metadata = { alternates: { canonical: "/" } };

const buildIcons = [Storefront, RocketLaunch, IdentificationCard, AppWindow];
const builds = buildKinds.map((b, i) => ({ ...b, Icon: buildIcons[i] }));

const tilePositions = ["t1", "t3", "t4", "t2", "t5"];

const codeLines = ["62%", "44%", "78%", "36%", "58%", "70%", "30%", "52%"];

function HeroVisual() {
  return (
    <div aria-hidden className="hero-visual">
      <div className="mock-window">
        <div className="mock-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-body">
          <div className="mock-side">
            <span className="tile">
              <Code size={20} weight="bold" />
            </span>
            <span />
            <span />
            <span />
          </div>
          <div className="mock-main">
            <div className="mock-prompt">
              <Sparkle size={16} weight="fill" />
              <p>Crea una web para mi negocio…</p>
              <span className="mock-send">
                <ArrowRight size={16} weight="bold" />
              </span>
            </div>
            <div className="mock-stage">
              <div className="mock-code">
                {codeLines.map((width, i) => (
                  <span key={i} style={{ width, "--i": i } as CSSProperties} />
                ))}
              </div>
              <div className="mock-preview">
                <div className="art" />
                <div className="bar" />
                <div className="bar short" />
                <div className="pill" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {tools.slice(0, tilePositions.length).map((tool, i) => (
        <div className={`float-tile ${tilePositions[i]}`} key={tool.name}>
          <BrandLogo logo={tool.logo} size={"src" in tool.logo ? 38 : 30} />
          {tool.name}
        </div>
      ))}
      <CursorClick className="float-cursor" size={56} weight="fill" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [miguel, website] }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: GSAP_SCRIPT }} />
      <IntroVideo />
      <div className="container">
        <HeroAnimator>
          <div className="hero-copy">
            <p className="eyebrow">
              <GraduationCap aria-hidden size={18} weight="fill" />
              Clases de vibe coding para principiantes
            </p>
            <h1>
              Construye tu primera web <span className="grad-text">con IA</span>, aunque nunca hayas programado.
            </h1>
            <p className="page-intro">
              Te enseño a usar <strong>Claude</strong>, <strong>Claude Code</strong>, <strong>Codex</strong>,{" "}
              <strong>Cursor</strong> y <strong>Antigravity</strong> desde cero, con la experiencia de 14 años como maestro: paso a paso, a tu ritmo y con palabras sencillas.
            </p>
            <div className="actions">
              <a className="button primary lg" href={contactHref}>
                <CalendarBlank aria-hidden size={22} weight="bold" />
                Reserva una clase de prueba gratis
                <span className="btn-dot arrow">
                  <ArrowRight aria-hidden size={18} weight="bold" />
                </span>
              </a>
              <Link className="button lg" href="/curso">
                <span className="btn-dot">
                  <Play aria-hidden size={16} weight="fill" />
                </span>
                Empieza el curso gratuito
                <ArrowRight aria-hidden size={18} weight="bold" />
              </Link>
            </div>
            <p className="hero-build">
              ¿Sin tiempo para aprender? <Link href="/#a-medida">Te la hago yo</Link> ·{" "}
              <Link href="/presupuesto">calcula tu precio en 1 minuto</Link>
            </p>
          </div>
          <div className="hero-media">
            <HeroVisual />
            <HowItWorks />
          </div>
          <RibbonBg position="hero" />
        </HeroAnimator>

        <div className="perks">
          {perks.map(({ Icon, text }) => (
            <div className="perk" key={text}>
              <span className="perk-icon">
                <Icon aria-hidden size={22} weight="fill" />
              </span>
              {text}
            </div>
          ))}
        </div>

        <section aria-labelledby="herramientas">
          <div className="section-head">
            <div>
              <p className="label">Por orden de uso</p>
              <h2 className="section-title" id="herramientas">
                Mis herramientas
              </h2>
            </div>
          </div>
          <ol className="tool-grid">
            {tools.map((tool, i) => (
              <li className="tool-card" key={tool.name}>
                <span className="tool-rank">{i + 1}</span>
                <span className="tool-logo">
                  <BrandLogo logo={tool.logo} size={"src" in tool.logo ? 56 : 30} />
                </span>
                <h3>{tool.name}</h3>
                <p>{tool.text}</p>
              </li>
            ))}
          </ol>
          <p className="label marquee-label">Y todo lo que lo rodea</p>
          <ResourceMarquee />
        </section>

        <section aria-labelledby="para-quien" className="section">
          <div className="section-head">
            <h2 className="section-title" id="para-quien">
              ¿Para quién es?
            </h2>
          </div>
          <div className="grid">
            {audiences.map((a, i) => (
              <div className="panel" key={a.title}>
                <span className="panel-num">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="como-enseno" className="section">
          <div className="section-head">
            <h2 className="section-title" id="como-enseno">
              Cómo enseño
            </h2>
          </div>
          <div className="grid">
            {method.map(({ Icon, title, text }) => (
              <div className="panel" key={title}>
                <span className="panel-icon">
                  <Icon aria-hidden size={24} weight="bold" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="curso" className="section has-ribbon">
          <RibbonBg />
          <div className="section-head">
            <div>
              <p className="label">Curso gratuito</p>
              <h2 className="section-title" id="curso">
                Vibe Coding <span className="grad-text">desde Cero</span>
              </h2>
            </div>
            <Link className="button" href="/curso">
              Ver el curso <ArrowRight aria-hidden size={18} weight="bold" />
            </Link>
          </div>
          <CourseScrollVideo />
          <ol className="module-list">
            {modules.slice(0, 3).map((m) => (
              <li key={m.slug}>
                {m.available ? (
                  <Link className="module-card" href={`/curso/${m.slug}`}>
                    <span className="step-mark">{m.number}</span>
                    <div>
                      <span className="label">{m.duration}</span>
                      <h3>{m.title}</h3>
                    </div>
                    <span className="badge">Gratis</span>
                  </Link>
                ) : (
                  <div className="module-card is-locked">
                    <span className="step-mark">{m.number}</span>
                    <div>
                      <span className="label">Próximamente</span>
                      <h3>{m.title}</h3>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="muted" style={{ marginTop: 14 }}>
            {availableModules.length} de {modules.length} módulos disponibles · lecciones en diapositivas y vídeo, con
            ejercicios y checklist.
          </p>
        </section>

        <section aria-labelledby="competencias" className="section has-ribbon">
          <RibbonBg />
          <div className="section-head">
            <div>
              <p className="label">Segundo curso gratuito · nivel cero</p>
              <h2 className="section-title" id="competencias">
                Competencias digitales <span className="grad-text">básicas</span>
              </h2>
              <p className="muted section-sub">
                ¿Aún no te manejas con el ordenador o el móvil? Empieza aquí: archivos, internet sin bulos, seguridad,
                trámites online y la IA del día a día.
              </p>
            </div>
            <Link className="button" href="/competencias-digitales">
              Ver el curso <ArrowRight aria-hidden size={18} weight="bold" />
            </Link>
          </div>
          <ol className="module-list">
            {digitalModules.slice(0, 3).map((m) => (
              <li key={m.slug}>
                {m.available ? (
                  <Link className="module-card" href={`/competencias-digitales/${m.slug}`}>
                    <span className="step-mark">{m.number}</span>
                    <div>
                      <span className="label">{m.duration}</span>
                      <h3>{m.title}</h3>
                    </div>
                    <span className="badge">Gratis</span>
                  </Link>
                ) : (
                  <div className="module-card is-locked">
                    <span className="step-mark">{m.number}</span>
                    <div>
                      <span className="label">Próximamente</span>
                      <h3>{m.title}</h3>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="muted" style={{ marginTop: 14 }}>
            {availableDigitalModules.length} de {digitalModules.length} módulos disponibles · también en clases
            individuales.
          </p>
        </section>

        <section aria-labelledby="clases-title" className="section" id="clases">
          <div className="section-head">
            <div>
              <p className="label">Precios de lanzamiento</p>
              <h2 className="section-title" id="clases-title">
                Clases
              </h2>
            </div>
          </div>
          <div className="offer-grid">
            {offers.map((o) => (
              <div className={`offer-card${o.featured ? " is-featured" : ""}`} key={o.name}>
                {o.featured ? <span className="offer-tag">Más elegida</span> : null}
                <p className="label">{o.detail}</p>
                <h3>{o.name}</h3>
                <p className={`offer-price${o.featured ? " grad-text" : ""}`}>{o.price}</p>
                <p className="offer-text">{o.text}</p>
                <a className={`button${o.featured ? " primary" : ""}`} href={contactHref}>
                  Quiero esta
                </a>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="a-medida-title" className="section has-ribbon" id="a-medida">
          <div className="section-head">
            <div>
              <p className="label">¿Sin tiempo para aprender?</p>
              <h2 className="section-title" id="a-medida-title">
                Te la hago yo
              </h2>
              <p className="muted section-sub">
                Me cuentas lo que necesitas y te entrego tu web publicada y lista para usar, con las mismas
                herramientas que enseño en clase.
              </p>
            </div>
          </div>
          <div className="build-grid">
            {builds.map(({ Icon, title, text }) => (
              <div className="panel" key={title}>
                <span className="panel-icon">
                  <Icon aria-hidden size={24} weight="bold" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="build-flow glass">
            <ol className="build-steps">
              {buildSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="build-num">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="build-cta">
              <p className="build-price">Presupuesto a medida</p>
              <p className="muted">Cada web es distinta. Calcula al momento una estimación de precio y plazo, y la concretamos sin compromiso.</p>
              <Link className="button primary lg" href="/presupuesto">
                <Calculator aria-hidden size={22} weight="bold" />
                Calcula tu presupuesto
                <span className="btn-dot arrow">
                  <ArrowRight aria-hidden size={18} weight="bold" />
                </span>
              </Link>
              <a className="build-alt" href={budgetHref}>
                <EnvelopeSimple aria-hidden size={16} weight="bold" /> O pídemelo por correo
              </a>
              <a className="build-alt" href={contactHref}>
                O cuéntamelo en una llamada gratis
              </a>
              <span className="build-shops">
                <Link href="/comercios">¿Tienes un comercio? Mira la web para comercios</Link>
                <Link href="/comercios/google">Test gratis: ¿cómo está tu ficha de Google?</Link>
              </span>
            </div>
          </div>
          <RibbonBg position="center" />
        </section>

        <section aria-labelledby="sobre-mi" className="section">
          <div className="section-head">
            <h2 className="section-title" id="sobre-mi">
              Sobre mí
            </h2>
          </div>
          <div className="about">
            <div className="about-facts">
              <MlLink className="about-logo" />
              <div>
                <CountUp className="grad-text" value={14} />
                <span className="muted">años como maestro</span>
              </div>
              <div>
                <CountUp className="grad-text" prefix="+" value={5} />
                <span className="muted">aplicaciones publicadas</span>
              </div>
              <div>
                <CountUp className="grad-text" value={4} />
                <span className="muted">idiomas: es, ca, de, en</span>
              </div>
            </div>
            <div className="about-copy">
              <p>
                Soy Miguel Liébana. Durante 14 años fui maestro de primaria y coordinador TIC, formando a alumnos y a
                otros profesores en el uso de la tecnología. Tengo un máster en TIC aplicadas a la educación.
              </p>
              <p>
                Hoy me estoy formando como desarrollador full-stack con IA y construyo aplicaciones reales: un portal
                para empleados, una plataforma de gestión para bandas de música, una tienda online con pagos… Casi
                todo con ayuda de la IA, y con la formación oficial de Anthropic sobre Claude Code (insignias{" "}
                <a className="about-badge" href="https://academy.claude.com/verify/5d19de20b0954f81da7d6fe4f060e5ec" rel="noreferrer" target="_blank">
                  Claude Code 101
                </a>{" "}
                y{" "}
                <a className="about-badge" href="https://academy.claude.com/verify/4da8487bb71ae62923a4e62f027bd914" rel="noreferrer" target="_blank">
                  Claude Code in Action
                </a>
                ).
              </p>
              <p>
                <strong>
                  Sé lo que es empezar desde cero porque lo estoy viviendo. Y sé enseñarlo porque es lo que he hecho
                  toda mi vida.
                </strong>
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sigueme" className="section has-ribbon">
          <div className="section-head">
            <div>
              <p className="label">Vídeos cortos cada semana</p>
              <h2 className="section-title" id="sigueme">
                Sígueme en redes
              </h2>
              <p className="muted section-sub">Trucos de vibe coding en un minuto, sin jerga. Si te sirven, ya sabes dónde estoy.</p>
            </div>
          </div>
          <SocialLinks />
          <RibbonBg position="bottom" />
        </section>

        <section className="section">
          <div className="cta-band">
            <div>
              <h2 className="section-title">¿Empezamos?</h2>
              <p>Escríbeme, cuéntame qué quieres construir y reservamos tu clase de prueba gratuita.</p>
            </div>
            <a className="button lg" href={contactHref}>
              Escríbeme
              <span className="btn-dot arrow">
                <ArrowRight aria-hidden size={18} weight="bold" />
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
