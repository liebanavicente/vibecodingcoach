import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarBlank,
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
import { CourseScrollVideo } from "@/components/CourseScrollVideo";
import { HeroAnimator } from "@/components/HeroAnimator";
import { HowItWorks } from "@/components/HowItWorks";
import { IntroVideo } from "@/components/IntroVideo";
import { GSAP_SCRIPT, INTRO_SCRIPT } from "@/lib/intro";
import { MlLogo } from "@/components/MlLogo";
import { ResourceMarquee } from "@/components/ResourceMarquee";
import { availableModules, modules } from "@/content/curso";
import { availableDigitalModules, digitalModules } from "@/content/competencias";
import { tools } from "@/content/herramientas";
import { contactHref } from "@/lib/site";

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

const offers = [
  {
    name: "Clase de prueba",
    price: "Gratis",
    detail: "30 min · online",
    text: "Nos conocemos, vemos qué quieres construir y te llevas un plan claro para empezar.",
    featured: false,
  },
  {
    name: "Clases 1:1",
    price: "25 €/h",
    detail: "Online · a tu ritmo",
    text: "Sesiones individuales para construir tu proyecto con IA o ponerte al día con el ordenador y el móvil, con apoyo entre clases.",
    featured: true,
  },
  {
    name: "Taller en grupo",
    price: "30 €",
    detail: "3 h · grupos reducidos",
    text: "De cero a tu primera web publicada en una tarde, junto a otras personas que también empiezan.",
    featured: false,
  },
];

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

        <section aria-labelledby="sobre-mi" className="section">
          <div className="section-head">
            <h2 className="section-title" id="sobre-mi">
              Sobre mí
            </h2>
          </div>
          <div className="about">
            <div className="about-facts">
              <MlLogo className="about-logo" title="Miguel Liébana" />
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
                todo con ayuda de la IA.
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
