"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { glossary, glossaryTopics, termId, type GlossaryTopic } from "@/content/glosario";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function GlossaryView({ guides }: { guides: Record<string, string> }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<GlossaryTopic | null>(null);

  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term, "es")), []);
  const q = normalize(query.trim());
  const shown = sorted.filter(
    (t) => (!topic || t.topic === topic) && (!q || normalize(`${t.term} ${t.alias ?? ""} ${t.text}`).includes(q)),
  );

  return (
    <>
      <div className="glossary-tools">
        <label className="glossary-search glass">
          <MagnifyingGlass aria-hidden size={20} weight="bold" />
          <span className="visually-hidden">Buscar en el glosario</span>
          <input onChange={(e) => setQuery(e.target.value)} placeholder="Busca una palabra: token, MCP, commit…" type="search" value={query} />
        </label>
        <div aria-label="Filtrar por tema" className="res-filters" role="group">
          <button aria-pressed={topic === null} onClick={() => setTopic(null)} type="button">
            Todas <span>{glossary.length}</span>
          </button>
          {glossaryTopics.map((t) => (
            <button aria-pressed={topic === t} key={t} onClick={() => setTopic(t)} type="button">
              {t} <span>{glossary.filter((g) => g.topic === t).length}</span>
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="visually-hidden">
        {shown.length} términos
      </p>

      {shown.length ? (
        <dl className="glossary-grid">
          {shown.map((t) => (
            <div className="term-card glass" id={termId(t.term)} key={t.term}>
              <dt>
                <span className="term-topic badge">{t.topic}</span>
                <strong>{t.term}</strong>
                {t.alias ? <span className="term-alias">{t.alias}</span> : null}
              </dt>
              <dd>
                <p>{t.text}</p>
                {t.example ? (
                  <p className="term-example">
                    <span>Ejemplo:</span> {t.example}
                  </p>
                ) : null}
                {t.guide && guides[t.guide] ? (
                  <Link className="term-guide" href={`/curso/recursos/${t.guide}`}>
                    {guides[t.guide]} <ArrowRight aria-hidden size={14} weight="bold" />
                  </Link>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="glossary-empty glass">
          <p>
            <strong>No encuentro «{query}».</strong> Pregúntaselo a Claude: «¿Qué significa {query || "esta palabra"}?
            Explícamelo como si nunca hubiera programado».
          </p>
        </div>
      )}
    </>
  );
}
