"use client";

import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatCircleDots, PaperPlaneRight, X } from "@phosphor-icons/react";
import { MlLogo } from "@/components/MlLogo";

type Turn = { role: "user" | "model"; text: string };

const SUGGESTIONS = ["¿Cuánto cuestan las clases?", "¿Qué cursos hay gratis?", "¿Me puedes hacer una web?"];
const GREETING: Turn = {
  role: "model",
  text: "¡Hola! Soy el asistente de vibecodingcoach. Pregúntame por las clases, los precios, los cursos gratis o las webs por encargo.",
};

/** Answers with links made clickable; everything else stays plain text. */
function Text({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)»]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a href={part} key={i} rel="noreferrer" target={part.includes("vibecoding.miguelliebana.com") ? undefined : "_blank"}>
            {part.replace(/^https:\/\//, "")}
          </a>
        ) : /@/.test(part) && /^[\w.+-]+@/.test(part) ? (
          <a href={`mailto:${part}`} key={i}>
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Floating chat that answers questions about the classes, prices, courses and services through /api/asistente. */
export function Asistente() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    const next = [...turns, { role: "user" as const, text }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    try {
      const res = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is ours, not the model's: leave it out of the conversation.
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = (await res.json()) as { text: string };
      setTurns((t) => [...t, { role: "model", text: data.text }]);
    } catch {
      setTurns((t) => [...t, { role: "model", text: "No me llega la conexión. Inténtalo de nuevo en un momento." }]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(draft);
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      toggle.current?.focus();
    }
  }

  return (
    <div className="assistant" onKeyDown={onKey}>
      {open ? (
        <section aria-label="Asistente de vibecodingcoach" className="assistant-panel glass" id="asistente" role="dialog">
          <header className="assistant-head">
            <MlLogo className="assistant-logo" title="vibecodingcoach" />
            <div>
              <strong>Asistente</strong>
              <span>Clases, precios, cursos y webs</span>
            </div>
            <button aria-label="Cerrar el asistente" className="assistant-close" onClick={() => setOpen(false)} type="button">
              <X aria-hidden size={18} weight="bold" />
            </button>
          </header>
          <div aria-live="polite" className="assistant-list" ref={list}>
            {turns.map((t, i) => (
              <p className={`assistant-msg ${t.role === "user" ? "is-user" : "is-bot"}`} key={i}>
                <Text text={t.text} />
              </p>
            ))}
            {busy ? (
              <p aria-label="Escribiendo" className="assistant-msg is-bot assistant-typing">
                <span />
                <span />
                <span />
              </p>
            ) : null}
            {turns.length === 1 ? (
              <div className="assistant-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => void ask(s)} type="button">
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <form className="assistant-form" onSubmit={submit}>
            <input
              aria-label="Tu pregunta"
              maxLength={600}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribe tu pregunta…"
              ref={input}
              value={draft}
            />
            <button aria-label="Enviar" disabled={busy || !draft.trim()} type="submit">
              <PaperPlaneRight aria-hidden size={18} weight="fill" />
            </button>
          </form>
          <p className="assistant-note">Responde una IA y puede equivocarse. No escribas datos personales.</p>
        </section>
      ) : null}
      <button
        aria-controls="asistente"
        aria-expanded={open}
        className="assistant-toggle"
        onClick={() => setOpen((o) => !o)}
        ref={toggle}
        type="button"
      >
        {open ? <X aria-hidden size={22} weight="bold" /> : <ChatCircleDots aria-hidden size={24} weight="fill" />}
        <span>{open ? "Cerrar" : "¿Dudas?"}</span>
      </button>
    </div>
  );
}
