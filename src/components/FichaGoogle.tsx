"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarBlank, EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { criterios, scoreOf, topImprovements, verdict } from "@/content/ficha-google";
import { contactHref, site } from "@/lib/site";

const MARK = ["✕", "~", "✓"];

/** Self-assessment of a shop's Google Maps profile: 10 plain questions, a score out of 20, advice and Miguel's contact. */
export function FichaGoogle() {
  const [business, setBusiness] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [shown, setShown] = useState(false);
  const result = useRef<HTMLElement>(null);

  const answered = Object.keys(answers).length;
  const scores = Object.fromEntries(criterios.map((c) => [c.id, scoreOf(answers[c.id] ?? 2)]));
  const total = criterios.reduce((sum, c) => sum + scores[c.id], 0);
  const [title, text] = verdict(total);
  const tips = topImprovements(scores);
  const weak = criterios.filter((c) => scores[c.id] < 2);

  useEffect(() => {
    if (shown) result.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [shown]);

  const name = business.trim() || "mi negocio";
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`Revisión de la ficha de Google · ${name}`)}&body=${encodeURIComponent(
    `Hola, Miguel:\n\nHe hecho la autoevaluación de la ficha de Google de ${name} y me sale un ${total} sobre 20.\n\n` +
      criterios.map((c) => `${MARK[scores[c.id]]} ${c.titulo}: ${c.opciones[answers[c.id] ?? 0]}`).join("\n") +
      `\n\nMe gustaría que me ayudaras a mejorarla.\n\nMi nombre: \nTeléfono o WhatsApp: \n\nGracias.`,
  )}`;

  return (
    <div className="gfa">
      <section className="gfa-form glass">
        <label className="gfa-business">
          Nombre de tu negocio (opcional)
          <input maxLength={80} onChange={(ev) => setBusiness(ev.target.value)} placeholder="Por ejemplo: Pastelería Ana" value={business} />
        </label>
        <ol className="gfa-list">
          {criterios.map((c, i) => (
            <li key={c.id}>
              <p className="gfa-q">
                <span>{i + 1}</span>
                {c.pregunta}
              </p>
              <div className="calc-chips" role="radiogroup" aria-label={c.pregunta}>
                {c.opciones.map((o, k) => (
                  <button aria-checked={answers[c.id] === k} key={o} onClick={() => setAnswers((a) => ({ ...a, [c.id]: k }))} role="radio" type="button">
                    {o}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="gfa-go">
          <span className="muted">{answered} de {criterios.length} respondidas</span>
          <button className="button primary lg" disabled={answered < criterios.length} onClick={() => setShown(true)} type="button">
            Ver mi resultado
          </button>
        </div>
      </section>

      {shown ? (
        <section aria-live="polite" className="gfa-result glass" ref={result}>
          <div className="gfa-head">
            <div className="gfa-score" style={{ "--p": `${(total / 20) * 360}deg` } as React.CSSProperties}>
              <span>
                <strong>{total}</strong>/20
              </span>
            </div>
            <div>
              <p className="label">{business.trim() || "Tu ficha de Google"}</p>
              <h2>{title}</h2>
              <p className="muted">{text}</p>
            </div>
          </div>

          {tips.length ? (
            <>
              <h3>Las {tips.length === 1 ? "mejora" : `${tips.length} mejoras`} que más te ayudarían</h3>
              <ol className="gfa-tips">
                {tips.map((c, i) => (
                  <li key={c.id}>
                    <b>{i + 1}</b>
                    <span>
                      <strong>{c.titulo}.</strong> {c.mejora}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="gfa-perfect">No veo nada que mejorar: ¡enhorabuena! El siguiente paso puede ser una web propia.</p>
          )}

          {weak.length > tips.length ? (
            <details className="gfa-more">
              <summary>Ver todos los puntos a mejorar ({weak.length})</summary>
              <ul>
                {weak.map((c) => (
                  <li key={c.id}>
                    <strong>{c.titulo}:</strong> {c.mejora}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}

          <div className="gfa-cta">
            <div>
              <h3>¿Te echo una mano?</h3>
              <p className="muted">
                Soy Miguel, tu vecino que hace webs. Te reviso la ficha gratis, te digo qué cambiar y, si quieres, te hago una web
                sencilla que enlace con ella.
              </p>
            </div>
            <div className="gfa-actions">
              <a className="button primary" href={mail}>
                <EnvelopeSimple aria-hidden size={18} weight="bold" /> Pídeme la revisión gratis
              </a>
              <Link className="button" href="/encargo?utm_source=ficha-google">
                <PaperPlaneTilt aria-hidden size={18} weight="bold" /> Encarga tu web
              </Link>
              <Link className="build-alt" href={contactHref}>
                <CalendarBlank aria-hidden size={16} weight="bold" /> O hablamos 30 min, gratis
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
