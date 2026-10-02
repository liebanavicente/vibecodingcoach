"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Asterisk, ImageSquare, MagicWand, PuzzlePiece, Scales } from "@phosphor-icons/react";
import { categories, type Category } from "@/content/recursos";

type Item = { slug: string; category: Category; title: string; summary: string; minutes: number };

const categoryIcon: Record<Category, typeof PuzzlePiece> = {
  Claude: Asterisk,
  Skills: PuzzlePiece,
  Revisión: Scales,
  Imágenes: ImageSquare,
  Truquillos: MagicWand,
};

export function ResourceGrid({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<Category | null>(null);
  const shown = filter ? items.filter((r) => r.category === filter) : items;
  const count = (c: Category) => items.filter((r) => r.category === c).length;

  return (
    <>
      <div aria-label="Filtrar recursos" className="res-filters" role="group">
        <button aria-pressed={filter === null} onClick={() => setFilter(null)} type="button">
          Todos <span>{items.length}</span>
        </button>
        {categories.map((c) => (
          <button aria-pressed={filter === c} key={c} onClick={() => setFilter(c)} type="button">
            {c} <span>{count(c)}</span>
          </button>
        ))}
      </div>
      <ul className="res-grid">
        {shown.map((r) => {
          const Icon = categoryIcon[r.category];
          return (
            <li key={r.slug}>
              <Link className="res-card glass" data-cat={r.category} href={`/curso/recursos/${r.slug}`}>
                <span className="res-icon">
                  <Icon aria-hidden size={26} weight="fill" />
                </span>
                <span className="res-meta">
                  <span className="badge">{r.category}</span>
                  <span className="muted">{r.minutes} min</span>
                </span>
                <h3>{r.title}</h3>
                <p>{r.summary}</p>
                <span className="res-go">
                  Leer <ArrowRight aria-hidden size={16} weight="bold" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
