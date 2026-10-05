import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarBlank,
  Clock,
  DeviceMobile,
  ForkKnife,
  Globe,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { RibbonBg } from "@/components/RibbonBg";
import { buildSteps } from "@/content/oferta";
import { estimate, maintenance, REVISIONS } from "@/content/presupuesto";
import { contactHref } from "@/lib/site";

// Landing for neighbourhood shops, reached from the printed card's QR (media/tarjeta-comercios). Prices come from the
// same rules as the calculator, so the card, this page and /presupuesto always agree.
export const metadata: Metadata = {
  title: "Webs para comercios del barrio",
  description:
    "Webs sencillas para comercios: que te encuentren en Google, vean tus horarios y te llamen con un toque. Desde 150 €, lista en una o dos semanas.",
  alternates: { canonical: "/comercios" },
};

const eur = (n: number) => new Intl.NumberFormat("es-ES", { useGrouping: "always" }).format(n);
const simple = estimate({ type: "landing", pages: 1, features: [], content: "todo", urgent: false });
const full = estimate({ type: "negocio", pages: 5, features: ["contacto"], content: "parte", urgent: false });

const includes = [
  { Icon: DeviceMobile, title: "Se ve bien en el móvil", text: "Que es desde donde te buscan casi todos tus clientes." },
  { Icon: Clock, title: "Horarios siempre al día", text: "Abres, cierras, vacaciones: lo cambias tú en un minuto." },
  { Icon: MapPin, title: "Cómo llegar", text: "Tu dirección con el mapa, para que nadie se pierda." },
  { Icon: Phone, title: "Llamar o escribir con un toque", text: "Botón de llamada, WhatsApp o correo, sin buscar el número." },
  { Icon: ForkKnife, title: "Tu carta, servicios o productos", text: "Con fotos y precios, para que lleguen sabiendo qué quieren." },
  { Icon: Globe, title: "Tu propio dominio", text: "tucomercio.com, y que aparezca cuando te buscan en Google." },
];

export default function ComerciosPage() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head course-head has-ribbon">
          <div>
            <p className="eyebrow">Para comercios del barrio</p>
            <h1>
              Tu comercio, <span className="grad-text">también en internet</span>
            </h1>
            <p className="page-intro">
              Soy Miguel Liébana, vecino del barrio. Hago webs sencillas para comercios: que te encuentren en
              Google, vean tus horarios y te llamen o escriban con un toque. Sin tecnicismos y con un precio claro.
            </p>
            <div className="actions">
              <Link className="button primary" href="/presupuesto">
                <Calculator aria-hidden size={18} weight="bold" /> Calcula tu precio en 1 minuto
              </Link>
              <Link className="button" href={contactHref}>
                <CalendarBlank aria-hidden size={18} weight="bold" /> Hablamos 30 min, gratis
              </Link>
            </div>
          </div>
          <aside className="glass course-stats">
            <p className="label">Página para tu comercio</p>
            <p className="shop-price">
              desde <span className="grad-text">{eur(simple.price[0])} €</span>
            </p>
            <dl>
              <div>
                <dt>Entrega</dt>
                <dd>
                  {simple.weeks[0]}–{simple.weeks[1]} sem.
                </dd>
              </div>
              <div>
                <dt>Cambios</dt>
                <dd>{REVISIONS} rondas</dd>
              </div>
              <div>
                <dt>Ficha Google</dt>
                <dd>Gratis</dd>
              </div>
            </dl>
          </aside>
          <RibbonBg position="top" />
        </div>

        <section aria-labelledby="incluye" className="section">
          <div className="section-head">
            <h2 className="section-title" id="incluye">
              Qué incluye
            </h2>
          </div>
          <div className="grid">
            {includes.map(({ Icon, title, text }) => (
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

        <section aria-labelledby="precios" className="section">
          <div className="section-head">
            <div>
              <p className="label">Precios de lanzamiento</p>
              <h2 className="section-title" id="precios">
                Claro desde el principio
              </h2>
            </div>
          </div>
          <div className="offer-grid">
            <div className="offer-card is-featured">
              <span className="offer-tag">La más pedida</span>
              <p className="label">Una página · {simple.weeks[0]}–{simple.weeks[1]} semanas</p>
              <h3>Página para tu comercio</h3>
              <p className="offer-price grad-text">desde {eur(simple.price[0])} €</p>
              <p className="offer-text">
                Todo en una página: quién eres, qué ofreces, horarios, mapa y botones para llamar o escribirte.
              </p>
              <Link className="button primary" href="/presupuesto">
                Calcular la mía
              </Link>
            </div>
            <div className="offer-card">
              <p className="label">Varias páginas · {full.weeks[0]}–{full.weeks[1]} semanas</p>
              <h3>Web completa</h3>
              <p className="offer-price">
                {eur(full.price[0])}–{eur(full.price[1])} €
              </p>
              <p className="offer-text">
                Inicio, servicios, galería, sobre ti y contacto con formulario. Para contar más y aparecer mejor en Google.
              </p>
              <Link className="button" href="/presupuesto">
                Calcular la mía
              </Link>
            </div>
            <div className="offer-card">
              <p className="label">Antes que la web</p>
              <h3>Revisión de tu ficha de Google</h3>
              <p className="offer-price">Gratis</p>
              <p className="offer-text">
                Miro cómo sales en Google Maps (fotos, horarios, reseñas) y te digo qué mejorar. Sin compromiso.
              </p>
              <Link className="button" href={contactHref}>
                Pedir la revisión
              </Link>
            </div>
          </div>
          <p className="muted shop-note">
            Precio de lanzamiento, por horas a 25 €/h. Incluye {REVISIONS} rondas de cambios. Aparte: dominio (unos 10–15 € al
            año) y, si quieres que me ocupe yo, mantenimiento ({maintenance[0]}–{maintenance[1]} €/mes). El precio cerrado
            te lo doy por escrito antes de empezar.
          </p>
        </section>

        <section aria-labelledby="como" className="section">
          <div className="build-flow glass">
            <div>
              <h2 className="section-title" id="como">
                Cómo funciona
              </h2>
              <ol className="build-steps shop-steps">
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
            </div>
            <div className="build-cta">
              <p className="build-price">¿Hablamos?</p>
              <p className="muted">
                Pásate a contármelo o reserva una llamada de 30 minutos. Te digo qué haría y cuánto costaría, sin
                compromiso.
              </p>
              <Link className="button primary lg" href={contactHref}>
                Reservar llamada gratis
                <span className="btn-dot arrow">
                  <ArrowRight aria-hidden size={18} weight="bold" />
                </span>
              </Link>
              <Link className="build-alt" href="/presupuesto">
                <Calculator aria-hidden size={16} weight="bold" /> O calcula tu precio tú mismo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
