"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CalendarBlank, EnvelopeSimple, MagicWand, Play, Sparkle, X } from "@phosphor-icons/react";
import { type Answers, contentOptions, defaultAnswers, estimate, type Feature, features, MAX_PAGES, maintenance, RATE, REVISIONS, summary, webTypes } from "@/content/presupuesto";
import { contactHref, site } from "@/lib/site";

// The video player (Remotion) only downloads when someone asks to watch it.
const PresupuestoPlayer = dynamic(() => import("./PresupuestoPlayer"), { ssr: false, loading: () => <div className="calc-video-loading">Preparando el vídeo…</div> });

const eur = (n: number) => n.toLocaleString("es-ES");
const noSubscribe = () => () => {};

/** Budget and delivery-time calculator: a form (or a description the AI turns into the form) and a live estimate. */
export function Calculadora({ withAi }: { withAi: boolean }) {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState<"interpretar" | "explicar" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const e = useMemo(() => estimate(answers), [answers]);
  const videoDialog = useRef<HTMLDialogElement>(null);
  const [video, setVideo] = useState(false);
  // The page container keeps a transform from its entrance animation, which would trap a fixed bar; mount it in <body>.
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);

  function update(patch: Partial<Answers>) {
    setAnswers((a) => ({ ...a, ...patch }));
    setNote(null);
  }

  function toggleFeature(id: Feature) {
    update({ features: answers.features.includes(id) ? answers.features.filter((f) => f !== id) : [...answers.features, id] });
  }

  async function call(action: "interpretar" | "explicar") {
    setBusy(action);
    setNotice(null);
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, text: description, answers }),
      });
      const data = (await res.json()) as { answers?: Answers; text?: string; error?: string };
      if (data.error) setNotice(data.error);
      if (data.answers) {
        setAnswers(data.answers);
        setNote(null);
        setNotice("He rellenado el formulario con lo que me cuentas. Revísalo y cambia lo que haga falta.");
      }
      if (data.text) setNote(data.text);
    } catch {
      setNotice("No me llega la conexión. El formulario calcula igual sin la IA.");
    } finally {
      setBusy(null);
    }
  }

  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Presupuesto web - vibecodingcoach")}&body=${encodeURIComponent(
    `Hola, Miguel:\n\nHe calculado un presupuesto orientativo en tu web y me gustaría concretarlo.\n\n${summary(answers, e)}${
      description.trim() ? `\n\nLo que necesito: ${description.trim()}` : ""
    }\n\nMi nombre: \nCómo prefiero que me contactes: \n\nGracias.`,
  )}`;

  return (
    <div className="calc">
      <div className="calc-form">
        {withAi ? (
          <section className="calc-block glass">
            <h2>
              <MagicWand aria-hidden size={22} weight="bold" /> Cuéntamelo con tus palabras
            </h2>
            <p className="muted">Escribe qué necesitas y relleno el formulario por ti. Después puedes cambiar lo que quieras.</p>
            <textarea
              maxLength={1200}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Por ejemplo: tengo una peluquería y quiero que se vean mis servicios y precios, que la gente pida cita online y una galería de fotos. Tengo logo, pero no textos."
              rows={4}
              value={description}
            />
            <button className="button primary" disabled={busy !== null || description.trim().length < 10} onClick={() => void call("interpretar")} type="button">
              <Sparkle aria-hidden size={18} weight="fill" />
              {busy === "interpretar" ? "Leyendo…" : "Rellenar el formulario por mí"}
            </button>
          </section>
        ) : null}

        <section className="calc-block glass">
          <h2>¿Qué tipo de web necesitas?</h2>
          <div className="calc-types" role="radiogroup">
            {webTypes.map((t) => (
              <button
                aria-checked={answers.type === t.id}
                className="calc-option"
                key={t.id}
                onClick={() => update({ type: t.id, pages: t.pages })}
                role="radio"
                type="button"
              >
                <strong>{t.label}</strong>
                <span>{t.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="calc-block glass">
          <h2>¿Cuántas páginas o secciones?</h2>
          <div className="calc-pages">
            <input
              aria-label="Número de páginas"
              max={MAX_PAGES}
              min={1}
              onChange={(ev) => update({ pages: Number(ev.target.value) })}
              type="range"
              value={answers.pages}
            />
            <output>{answers.pages}</output>
          </div>
          <p className="muted">Por ejemplo: inicio, servicios, sobre mí, galería y contacto son 5.</p>
        </section>

        <section className="calc-block glass">
          <h2>¿Qué tiene que hacer?</h2>
          <div className="calc-chips">
            {features.map((f) => (
              <button aria-pressed={answers.features.includes(f.id)} key={f.id} onClick={() => toggleFeature(f.id)} type="button">
                {f.label}
              </button>
            ))}
          </div>
        </section>

        <section className="calc-block glass">
          <h2>¿Tienes el contenido?</h2>
          <div className="calc-chips" role="radiogroup">
            {contentOptions.map((c) => (
              <button aria-checked={answers.content === c.id} key={c.id} onClick={() => update({ content: c.id })} role="radio" type="button">
                {c.label}
              </button>
            ))}
          </div>
          <label className="calc-urgent">
            <input checked={answers.urgent} onChange={(ev) => update({ urgent: ev.target.checked })} type="checkbox" />
            La necesito con urgencia
          </label>
        </section>
      </div>

      {/* Phones: the result sits below the form, so a bar keeps the live range in view and jumps to it. */}
      {mounted
        ? createPortal(
            <a aria-hidden className="calc-sticky" href="#estimacion" tabIndex={-1}>
              <strong>
                {eur(e.price[0])}–{eur(e.price[1])} €
              </strong>
              <span>
                {e.hours[0]}–{e.hours[1]} h · {e.weeks[0]}–{e.weeks[1]} semanas · ver detalle ↓
              </span>
            </a>,
            document.body,
          )
        : null}

      <aside aria-live="polite" className="calc-result glass" id="estimacion">
        <p className="label">Estimación orientativa · precio de lanzamiento</p>
        <p className="calc-price">
          {eur(e.price[0])}–{eur(e.price[1])} €
        </p>
        <button
          className="calc-video-btn"
          onClick={() => {
            setVideo(true);
            videoDialog.current?.showModal();
          }}
          type="button"
        >
          <span className="play-icon">
            <Play aria-hidden size={16} weight="fill" />
          </span>
          Ver mi web en vídeo <span className="play-time">12 s</span>
        </button>
        <p className="calc-weeks">
          Unas {e.hours[0]}–{e.hours[1]} horas a {RATE} €/h · entrega en {e.weeks[0] === e.weeks[1] ? `${e.weeks[0]}` : `${e.weeks[0]}–${e.weeks[1]}`} semanas
        </p>
        <ul className="calc-lines">
          {e.lines.map((l) => (
            <li key={l.label}>
              <span>{l.label}</span>
              <span>
                {eur(l.price[0])}–{eur(l.price[1])} €
              </span>
            </li>
          ))}
          {answers.urgent ? (
            <li>
              <span>Urgencia</span>
              <span>+15 %</span>
            </li>
          ) : null}
        </ul>
        <p className="calc-small">
          Al mismo precio por hora que mis clases. Incluye {REVISIONS} rondas de cambios; lo que pase de ahí, por horas. Aparte: dominio (unos 10–15 € al año) y, si quieres, mantenimiento ({maintenance[0]}–{maintenance[1]} €/mes). El precio cerrado se acuerda en una llamada, según lo que necesites de verdad.
        </p>

        {notice ? <p className="calc-notice">{notice}</p> : null}
        {note ? <p className="calc-note">{note}</p> : null}

        {withAi && !note ? (
          <button className="button" disabled={busy !== null} onClick={() => void call("explicar")} type="button">
            <Sparkle aria-hidden size={18} weight="fill" />
            {busy === "explicar" ? "Escribiendo…" : "Explícame esta estimación"}
          </button>
        ) : null}
        <a className="button primary" href={mail}>
          <EnvelopeSimple aria-hidden size={18} weight="bold" />
          Pedir este presupuesto
        </a>
        <a className="calc-link" href={contactHref}>
          <CalendarBlank aria-hidden size={16} weight="bold" /> Hablarlo en una llamada gratis
        </a>
      </aside>

      <dialog
        aria-label="Vídeo: tu web y su estimación"
        className="video-dialog"
        onClick={(ev) => ev.target === videoDialog.current && videoDialog.current.close()}
        onClose={() => setVideo(false)}
        ref={videoDialog}
      >
        <button aria-label="Cerrar el vídeo" className="video-close" onClick={() => videoDialog.current?.close()} type="button">
          <X aria-hidden size={20} weight="bold" />
        </button>
        <div className="calc-video">{video ? <PresupuestoPlayer answers={answers} estimate={e} /> : null}</div>
      </dialog>
    </div>
  );
}
