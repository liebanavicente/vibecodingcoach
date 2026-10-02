import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { GlossaryView } from "@/components/GlossaryView";
import { glossary } from "@/content/glosario";
import { resources } from "@/content/recursos";

export const metadata: Metadata = {
  title: "Glosario",
  description: "Qué significa MCP, LLM, token, contexto, commit o deploy: el vocabulario del vibe coding explicado sin jerga.",
};

export default function GlosarioPage() {
  const guides = Object.fromEntries(resources.map((r) => [r.slug, r.title]));

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Glosario · {glossary.length} palabras</p>
            <h1>
              El diccionario del <span className="grad-text">vibe coding</span>
            </h1>
            <p className="page-intro">
              Todas esas palabras que suenan a chino (MCP, token, commit, deploy…) explicadas sin jerga, con un ejemplo
              y un enlace a la guía si quieres saber más.
            </p>
          </div>
          <Link className="button" href="/curso">
            <ArrowLeft aria-hidden size={18} weight="bold" /> Volver al curso
          </Link>
        </div>
        <GlossaryView guides={guides} />
      </div>
    </main>
  );
}
