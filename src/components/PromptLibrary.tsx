"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { CopyButton } from "@/components/CopyButton";
import { promptCategories, prompts, type PromptCategory } from "@/content/prompts";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Shows the prompt with its [fill-in] parts highlighted. */
function PromptText({ text }: { text: string }) {
  return (
    <pre>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith("[") ? (
          <mark className="fill" key={i}>
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </pre>
  );
}

export function PromptLibrary({ guides }: { guides: Record<string, string> }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory | null>(null);
  const q = normalize(query.trim());
  const shown = prompts.filter(
    (p) => (!category || p.category === category) && (!q || normalize(`${p.title} ${p.when} ${p.text}`).includes(q)),
  );

  return (
    <>
      <div className="glossary-tools">
        <label className="glossary-search glass">
          <MagnifyingGlass aria-hidden size={20} weight="bold" />
          <span className="visually-hidden">Buscar un prompt</span>
          <input onChange={(e) => setQuery(e.target.value)} placeholder="Busca: error, web, seguridad, reel…" type="search" value={query} />
        </label>
        <div aria-label="Filtrar por categoría" className="res-filters" role="group">
          <button aria-pressed={category === null} onClick={() => setCategory(null)} type="button">
            Todos <span>{prompts.length}</span>
          </button>
          {promptCategories.map((c) => (
            <button aria-pressed={category === c} key={c} onClick={() => setCategory(c)} type="button">
              {c} <span>{prompts.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="visually-hidden">
        {shown.length} prompts
      </p>

      {shown.length ? (
        <ul className="prompt-grid">
          {shown.map((p) => (
            <li className="prompt-card glass" id={p.id} key={p.id}>
              <div className="prompt-head">
                <span className="badge">{p.category}</span>
                <h2>{p.title}</h2>
                <p className="prompt-when">{p.when}</p>
              </div>
              <div className="code-block">
                <div className="code-bar">
                  <span>Prompt</span>
                  <CopyButton text={p.text} />
                </div>
                <PromptText text={p.text} />
              </div>
              {p.guide && guides[p.guide] ? (
                <Link className="term-guide" href={`/curso/recursos/${p.guide}`}>
                  Guía: {guides[p.guide]} <ArrowRight aria-hidden size={14} weight="bold" />
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="glossary-empty glass">
          <p>
            <strong>No encuentro «{query}».</strong> Prueba con otra palabra o pídeselo a Claude: «Escríbeme un prompt para
            [lo que quieres conseguir], con huecos para rellenar».
          </p>
        </div>
      )}
    </>
  );
}
