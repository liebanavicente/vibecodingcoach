"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import {
  assets,
  type Brief,
  budgets,
  contactPrefs,
  deadlines,
  emptyBrief,
  goals,
  styles,
  validEmail,
  webAnswers,
} from "@/content/encargo";
import { type Answers, estimate, features, MAX_PAGES, RATE, REVISIONS, webTypes } from "@/content/presupuesto";
import { site } from "@/lib/site";

const eur = (n: number) => new Intl.NumberFormat("es-ES", { useGrouping: "always" }).format(n);
const STEPS = ["Tu negocio", "Objetivo", "Tu web", "Funciones", "Qué tienes", "Estilo", "Plazo", "Contacto", "Resumen"];

function toggle<T>(list: T[], value: T, max = Infinity) {
  if (list.includes(value)) return list.filter((v) => v !== value);
  return list.length >= max ? [...list.slice(1), value] : [...list, value];
}

/** Step-by-step order form: one question per screen, a live estimate at the end, sent to /api/encargo. */
export function Encargo({ initial, origin }: { initial: Answers; origin: string }) {
  const [b, setB] = useState<Brief>(() => emptyBrief(initial));
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const web = useMemo(() => webAnswers(b), [b]);
  const e = useMemo(() => estimate(web), [web]);
  const set = (patch: Partial<Brief>) => setB((old) => ({ ...old, ...patch }));
  const setWeb = (patch: Partial<Answers>) => setB((old) => ({ ...old, web: { ...old.web, ...patch } }));

  // Move focus to each new question so keyboard and screen-reader users follow along (not on the first render).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, status]);

  const hasPhone = b.phone.replace(/\D/g, "").length >= 9;
  // WhatsApp or a call need a phone; email needs a valid address.
  const reachable = b.contactPref === "Email" ? validEmail(b.email) : hasPhone && (b.email === "" || validEmail(b.email));
  const contactOk = b.name.trim() !== "" && reachable && consent;
  const canGo = [b.business.trim() !== "" && b.activity.trim() !== "", true, true, true, true, true, true, contactOk, true][step];

  async function send() {
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/encargo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...b, web, consent, website: honey, origin }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; fallback?: string };
      if (data.ok) return setStatus("sent");
      setError(data.error ?? "No he podido enviarlo.");
      setFallback(data.fallback ?? null);
    } catch {
      setError("No me llega la conexión.");
    }
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="enc glass enc-done">
        <CheckCircle aria-hidden className="enc-done-icon" size={56} weight="fill" />
        <h2 ref={heading} tabIndex={-1}>
          ¡Recibido, {b.name.split(" ")[0]}!
        </h2>
        <p className="muted">
          Me llega todo ordenado. Te escribo {b.contactPref === "Email" ? "por email" : `por ${b.contactPref}`} en 24–48 horas
          con una propuesta y un precio cerrado. Sin compromiso.
        </p>
        <div className="actions">
          <Link className="button" href="/cursos">
            Mientras, mira mis cursos gratis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="enc glass">
      <div className="enc-progress" aria-hidden>
        <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <p className="enc-step">
        Paso {step + 1} de {STEPS.length} · {STEPS[step]}
      </p>

      {step === 0 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Cómo se llama tu negocio o proyecto?
          </h2>
          <input aria-label="Nombre del negocio" autoComplete="organization" maxLength={120} onChange={(ev) => set({ business: ev.target.value })} placeholder="Por ejemplo: Pastelería Ana" value={b.business} />
          <label className="enc-label" htmlFor="enc-activity">
            ¿A qué te dedicas? Cuéntamelo como a un vecino.
          </label>
          <textarea id="enc-activity" maxLength={600} onChange={(ev) => set({ activity: ev.target.value })} placeholder="Hago tartas por encargo y tengo un obrador en el barrio. Mis clientes suelen ser familias para cumpleaños y bodas." rows={4} value={b.activity} />
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Qué quieres que hagan quienes visiten tu web?
          </h2>
          <p className="muted">Elige todas las que quieras.</p>
          <div className="calc-chips">
            {goals.map((g) => (
              <button aria-pressed={b.goals.includes(g)} key={g} onClick={() => set({ goals: toggle(b.goals, g) })} type="button">
                {g}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Qué tipo de web encaja contigo?
          </h2>
          <div className="calc-types" role="radiogroup">
            {webTypes.map((t) => (
              <button aria-checked={b.web.type === t.id} className="calc-option" key={t.id} onClick={() => setWeb({ type: t.id, pages: t.pages })} role="radio" type="button">
                <strong>{t.label}</strong>
                <span>{t.hint}</span>
              </button>
            ))}
          </div>
          <label className="enc-label" htmlFor="enc-pages">
            ¿Cuántas páginas o secciones? Inicio, servicios, sobre mí, galería y contacto son 5.
          </label>
          <div className="calc-pages">
            <input id="enc-pages" max={MAX_PAGES} min={1} onChange={(ev) => setWeb({ pages: Number(ev.target.value) })} type="range" value={b.web.pages} />
            <output>{b.web.pages}</output>
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Qué tiene que poder hacer?
          </h2>
          <p className="muted">Si no lo sabes, no marques nada: lo vemos juntos.</p>
          <div className="calc-chips">
            {features.map((f) => (
              <button aria-pressed={b.web.features.includes(f.id)} key={f.id} onClick={() => setWeb({ features: toggle(b.web.features, f.id) })} type="button">
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Qué tienes ya?
          </h2>
          <p className="muted">Lo que falte, te ayudo a prepararlo.</p>
          <div className="calc-chips">
            {assets.map((a) => (
              <button aria-pressed={b.assets.includes(a)} key={a} onClick={() => set({ assets: toggle(b.assets, a) })} type="button">
                {a}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 5 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Qué estilo te gusta?
          </h2>
          <p className="muted">Elige uno o dos.</p>
          <div className="enc-styles">
            {styles.map((s) => (
              <button aria-pressed={b.styles.includes(s.id)} className="enc-style" key={s.id} onClick={() => set({ styles: toggle(b.styles, s.id, 2) })} type="button">
                <span className="enc-swatch" aria-hidden>
                  {s.colors.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                {s.label}
              </button>
            ))}
          </div>
          <label className="enc-label" htmlFor="enc-refs">
            ¿Hay alguna web que te guste? Pega el enlace o dime cuál (opcional).
          </label>
          <textarea id="enc-refs" maxLength={600} onChange={(ev) => set({ references: ev.target.value })} placeholder="La web de la panadería de la esquina, o el Instagram de…" rows={3} value={b.references} />
        </fieldset>
      ) : null}

      {step === 6 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Para cuándo la necesitas?
          </h2>
          <div className="calc-chips" role="radiogroup">
            {deadlines.map((d) => (
              <button aria-checked={b.deadline === d.id} key={d.id} onClick={() => set({ deadline: d.id })} role="radio" type="button">
                {d.label}
              </button>
            ))}
          </div>
          <p className="enc-label">¿Tienes un presupuesto en mente? Me ayuda a proponerte lo que encaje.</p>
          <div className="calc-chips" role="radiogroup">
            {budgets.map((x) => (
              <button aria-checked={b.budget === x} key={x} onClick={() => set({ budget: x })} role="radio" type="button">
                {x}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 7 ? (
        <fieldset className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            ¿Cómo te contacto?
          </h2>
          <div className="enc-fields">
            <label>
              Tu nombre
              <input autoComplete="name" maxLength={120} onChange={(ev) => set({ name: ev.target.value })} value={b.name} />
            </label>
            <label>
              Email{b.contactPref === "Email" ? "" : " (opcional)"}
              <input autoComplete="email" inputMode="email" maxLength={200} onChange={(ev) => set({ email: ev.target.value.trim() })} type="email" value={b.email} />
            </label>
            <label>
              Teléfono{b.contactPref === "Email" ? " (opcional)" : ""}
              <input autoComplete="tel" inputMode="tel" maxLength={40} onChange={(ev) => set({ phone: ev.target.value })} type="tel" value={b.phone} />
            </label>
          </div>
          <p className="enc-label">¿Cómo prefieres que te responda?</p>
          <div className="calc-chips" role="radiogroup">
            {contactPrefs.map((c) => (
              <button aria-checked={b.contactPref === c} key={c} onClick={() => set({ contactPref: c })} role="radio" type="button">
                {c}
              </button>
            ))}
          </div>
          <label className="enc-label" htmlFor="enc-notes">
            ¿Algo más que deba saber? (opcional)
          </label>
          <textarea id="enc-notes" maxLength={1000} onChange={(ev) => set({ notes: ev.target.value })} rows={3} value={b.notes} />
          {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
          <input aria-hidden autoComplete="off" className="enc-honey" name="website" onChange={(ev) => setHoney(ev.target.value)} tabIndex={-1} value={honey} />
          <label className="enc-consent">
            <input checked={consent} onChange={(ev) => setConsent(ev.target.checked)} type="checkbox" />
            <span>
              Acepto que Miguel Liébana use estos datos solo para responder a mi encargo, como explica la{" "}
              <Link href="/privacidad" target="_blank">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {b.email && !validEmail(b.email) ? <p className="calc-notice">Revisa el email: parece que le falta algo.</p> : null}
          {b.contactPref !== "Email" && b.phone && !hasPhone ? <p className="calc-notice">Revisa el teléfono: parece que le faltan números.</p> : null}
        </fieldset>
      ) : null}

      {step === 8 ? (
        <div className="enc-q">
          <h2 ref={heading} tabIndex={-1}>
            Repasa tu encargo
          </h2>
          <div className="enc-summary">
            <dl>
              <div>
                <dt>Negocio</dt>
                <dd>{b.business}</dd>
              </div>
              <div>
                <dt>Web</dt>
                <dd>
                  {webTypes.find((t) => t.id === web.type)?.label} · {web.pages} {web.pages === 1 ? "página" : "páginas"}
                </dd>
              </div>
              <div>
                <dt>Funciones</dt>
                <dd>{features.filter((f) => web.features.includes(f.id)).map((f) => f.label).join(", ") || "Ninguna extra"}</dd>
              </div>
              <div>
                <dt>Objetivo</dt>
                <dd>{b.goals.join(", ") || "Sin indicar"}</dd>
              </div>
              <div>
                <dt>Estilo</dt>
                <dd>{styles.filter((s) => b.styles.includes(s.id)).map((s) => s.label).join(" y ") || "Sin preferencia"}</dd>
              </div>
              <div>
                <dt>Contacto</dt>
                <dd>
                  {b.name} · {b.contactPref}
                </dd>
              </div>
            </dl>
            <aside className="enc-estimate">
              <p className="label">Estimación orientativa</p>
              <p className="calc-price">
                {eur(e.price[0])}–{eur(e.price[1])} €
              </p>
              <p className="calc-weeks">
                {e.hours[0]}–{e.hours[1]} h a {RATE} €/h · {e.weeks[0]}–{e.weeks[1]} semanas
              </p>
              <p className="calc-small">
                Incluye {REVISIONS} rondas de cambios. Te paso el precio cerrado por escrito antes de empezar.
              </p>
            </aside>
          </div>
          {error ? (
            <div className="calc-notice">
              {error}{" "}
              {fallback ? (
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Encargo: ${b.business}`)}&body=${encodeURIComponent(fallback)}`}>
                  Envíamelo por correo con todo ya escrito
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="enc-nav">
        {step > 0 ? (
          <button className="button" onClick={() => setStep(step - 1)} type="button">
            <ArrowLeft aria-hidden size={18} weight="bold" /> Atrás
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button className="button primary" disabled={!canGo} onClick={() => setStep(step + 1)} type="button">
            Siguiente <ArrowRight aria-hidden size={18} weight="bold" />
          </button>
        ) : (
          <button className="button primary" disabled={status === "sending"} onClick={() => void send()} type="button">
            <PaperPlaneTilt aria-hidden size={18} weight="bold" /> {status === "sending" ? "Enviando…" : "Enviar a Miguel"}
          </button>
        )}
      </div>
    </div>
  );
}
