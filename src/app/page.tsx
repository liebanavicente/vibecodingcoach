import Link from "next/link";
import { availableModules } from "@/content/curso";
import { contactHref } from "@/lib/site";

const audiences = [
  {
    title: "Empiezas de cero",
    text: "Nunca has escrito una línea de código y la palabra \"terminal\" te da respeto. Perfecto: por ahí empezamos.",
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
    title: "Pedagogía, no jerga",
    text: "14 años como maestro me han enseñado a explicar lo difícil de forma sencilla y a adaptarme a tu ritmo.",
  },
  {
    title: "Aprender haciendo",
    text: "Cada sesión termina con algo tuyo funcionando. Nada de teoría sin práctica.",
  },
  {
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
    text: "Sesiones individuales para construir tu propio proyecto paso a paso, con apoyo entre clases.",
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

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
        <p className="mb-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
          Clases de vibe coding para principiantes
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Construye tu primera web con IA, aunque nunca hayas programado.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Te enseño a usar herramientas como Claude Code y Cursor con la
          pedagogía de 14 años como maestro, no con jerga de programador.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={contactHref}
            className="rounded-full bg-accent px-6 py-3 text-center font-medium text-white hover:opacity-90"
          >
            Reserva una clase de prueba gratis
          </a>
          <Link
            href="/curso"
            className="rounded-full border border-border px-6 py-3 text-center font-medium hover:border-accent hover:text-accent"
          >
            Empieza el curso gratuito
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            ¿Para quién es?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title}>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-2 text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Cómo enseño
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {method.map((m, i) => (
            <div key={m.title} className="rounded-2xl border border-border p-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{m.title}</h3>
              <p className="mt-2 text-muted">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent-soft">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Curso gratuito: Vibe Coding desde Cero
            </h2>
            <p className="mt-3 text-muted">
              Empieza hoy por tu cuenta. Lecciones con ejercicios prácticos y
              una checklist para comprobar lo que has aprendido.{" "}
              {availableModules.length} módulos ya disponibles.
            </p>
          </div>
          <Link
            href="/curso"
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-center font-medium text-white hover:opacity-90"
          >
            Ver el curso
          </Link>
        </div>
      </section>

      <section id="oferta" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Clases
        </h2>
        <p className="mt-3 text-muted">
          Precios de lanzamiento mientras formo a mis primeros alumnos.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <div
              key={o.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                o.featured ? "border-accent bg-surface" : "border-border"
              }`}
            >
              <h3 className="font-semibold">{o.name}</h3>
              <p className="mt-4 text-3xl font-semibold">{o.price}</p>
              <p className="text-sm text-muted">{o.detail}</p>
              <p className="mt-4 flex-1 text-muted">{o.text}</p>
              <a
                href={contactHref}
                className={`mt-6 rounded-full px-4 py-2 text-center font-medium ${
                  o.featured
                    ? "bg-accent text-white hover:opacity-90"
                    : "border border-border hover:border-accent hover:text-accent"
                }`}
              >
                Quiero esta
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Sobre mí
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              Soy Miguel Liébana. Durante 14 años fui maestro de primaria y
              coordinador TIC, formando a alumnos y a otros profesores en el
              uso de la tecnología. Tengo un máster en TIC aplicadas a la
              educación.
            </p>
            <p>
              Hoy me estoy formando como desarrollador full-stack con IA y
              construyo aplicaciones reales: un portal para empleados, una
              plataforma de gestión para bandas de música, una tienda online
              con pagos… Casi todo con ayuda de la IA.
            </p>
            <p>
              Sé lo que es empezar desde cero porque lo estoy viviendo. Y sé
              enseñarlo porque es lo que he hecho toda mi vida.
            </p>
          </div>
          <a
            href={contactHref}
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Escríbeme y empezamos
          </a>
        </div>
      </section>
    </>
  );
}
