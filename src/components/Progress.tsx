"use client";

import { useSyncExternalStore } from "react";

/** Checklist ticks live in this browser only (localStorage): a per-learner convenience, not an account. */
const EVENT = "vcc-progress";
const keyOf = (slug: string) => `vcc:progreso:${slug}`;

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function readRaw(slug: string) {
  try {
    return localStorage.getItem(keyOf(slug)) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): number[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function useDone(slug: string) {
  return parse(useSyncExternalStore(subscribe, () => readRaw(slug), () => "[]"));
}

function useAllDone(slugs: string[]) {
  const raw = useSyncExternalStore(subscribe, () => slugs.map(readRaw).join("|"), () => slugs.map(() => "[]").join("|"));
  return raw.split("|").map(parse);
}

export function Checklist({ slug, items }: { slug: string; items: string[] }) {
  const done = useDone(slug);

  function toggle(index: number) {
    const next = done.includes(index) ? done.filter((n) => n !== index) : [...done, index];
    try {
      localStorage.setItem(keyOf(slug), JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <>
      <ul className="task-list">
        {items.map((item, i) => (
          <li key={item}>
            <label>
              <input checked={done.includes(i)} onChange={() => toggle(i)} type="checkbox" />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      {done.length === items.length ? <p className="checklist-done">¡Módulo completado! Tu progreso se guarda en este navegador.</p> : null}
    </>
  );
}

export function ModuleProgress({ slug, total }: { slug: string; total: number }) {
  const count = Math.min(useDone(slug).length, total);
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <span className="mod-progress" title={`${count} de ${total} completado`}>
      <span className="mod-bar">
        <span style={{ width: `${pct}%` }} />
      </span>
      {pct === 100 ? "Completado" : `${pct}%`}
    </span>
  );
}

export function CourseProgress({ modules }: { modules: { slug: string; total: number }[] }) {
  const all = useAllDone(modules.map((m) => m.slug));
  const total = modules.reduce((sum, m) => sum + m.total, 0);
  const done = all.reduce((sum, list, i) => sum + Math.min(list.length, modules[i].total), 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="course-progress">
      <span className="label">Tu progreso</span>
      <strong className="grad-text">{pct}%</strong>
      <span className="mod-bar big">
        <span style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}
