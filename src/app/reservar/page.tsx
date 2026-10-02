import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarBlank, Chats, ClipboardText, EnvelopeSimple, InstagramLogo, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { emailBookingHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserva tu clase de prueba",
  description: "30 minutos online y gratis para ver qué quieres construir con IA y llevarte un plan claro para empezar.",
};

const steps = [
  { Icon: CalendarBlank, title: "Eliges día y hora", text: "Reservas el hueco que mejor te venga, sin compromiso." },
  { Icon: VideoCamera, title: "Nos vemos 30 minutos", text: "Por videollamada. Me cuentas qué quieres construir y vemos por dónde empezar." },
  { Icon: ClipboardText, title: "Te llevas un plan", text: "Los primeros pasos, las herramientas que te convienen y qué evitar." },
];

const prepare = [
  "Piensa qué te gustaría construir, aunque sea una idea vaga.",
  "Ten a mano el ordenador que vas a usar.",
  "Si hay webs que te gustan, apunta los enlaces.",
];

export default function ReservarPage() {
  const hasCalendar = Boolean(site.bookingUrl);

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Clase de prueba · gratis</p>
            <h1>
              Reserva tu <span className="grad-text">clase de prueba</span>
            </h1>
            <p className="page-intro">
              30 minutos online para conocernos, ver qué quieres construir y que te lleves un plan claro para empezar.
              Sin compromiso y sin jerga.
            </p>
          </div>
        </div>

        <div className="grid">
          {steps.map(({ Icon, title, text }, i) => (
            <div className="panel" key={title}>
              <span className="panel-icon">
                <Icon aria-hidden size={24} weight="bold" />
              </span>
              <span className="panel-num">Paso {i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <section aria-labelledby="reservar-ahora" className="section booking">
          <div className="booking-card glass">
            <div>
              <h2 className="section-title" id="reservar-ahora">
                {hasCalendar ? "Elige tu hueco" : "Escríbeme y te propongo hora"}
              </h2>
              <p className="booking-text">
                {hasCalendar
                  ? "Se abre mi calendario con los horarios libres. Eliges uno y te llega la confirmación por email."
                  : "Te dejo el email ya redactado: solo tienes que rellenar qué quieres construir y cuándo te viene bien. Te contesto con propuestas de horario."}
              </p>
              <div className="actions">
                {hasCalendar ? (
                  <a className="button primary lg" href={site.bookingUrl} rel="noreferrer" target="_blank">
                    <CalendarBlank aria-hidden size={22} weight="bold" />
                    Ver horarios disponibles
                    <span className="btn-dot arrow">
                      <ArrowRight aria-hidden size={18} weight="bold" />
                    </span>
                  </a>
                ) : (
                  <a className="button primary lg" href={emailBookingHref}>
                    <EnvelopeSimple aria-hidden size={22} weight="bold" />
                    Escríbeme para reservar
                    <span className="btn-dot arrow">
                      <ArrowRight aria-hidden size={18} weight="bold" />
                    </span>
                  </a>
                )}
                <a className="button lg" href={site.instagram} rel="noreferrer" target="_blank">
                  <InstagramLogo aria-hidden size={22} weight="bold" />
                  Escríbeme por Instagram
                </a>
              </div>
              {hasCalendar ? (
                <p className="booking-alt">
                  ¿Prefieres el email? <a href={emailBookingHref}>Escríbeme a {site.email}</a>
                </p>
              ) : null}
            </div>
            <div className="booking-prepare">
              <p className="label">
                <Chats aria-hidden size={16} weight="bold" /> Para aprovecharla
              </p>
              <ul className="check-list">
                {prepare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="booking-alt">
                ¿Aún no lo tienes claro? Empieza por el <Link href="/curso">curso gratuito</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
