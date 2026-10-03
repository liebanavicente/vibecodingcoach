import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PromptLibrary } from "@/components/PromptLibrary";
import { prompts } from "@/content/prompts";
import { resources } from "@/content/recursos";

export const metadata: Metadata = {
  title: "Biblioteca de prompts",
  description: "Prompts listos para copiar: empezar un proyecto, arreglar errores, diseño, seguridad, aprender y redes sociales.",
};

export default function PromptsPage() {
  const guides = Object.fromEntries(resources.map((r) => [r.slug, r.title]));

  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Biblioteca · {prompts.length} prompts</p>
            <h1>
              Prompts <span className="grad-text">listos para copiar</span>
            </h1>
            <p className="page-intro">
              Para empezar un proyecto, arreglar errores, diseñar, proteger tu web, aprender o crear contenido. Cópialos,
              rellena los huecos <mark className="fill">[entre corchetes]</mark> y pégalos en Claude, ChatGPT o tu agente.
            </p>
          </div>
          <Link className="button" href="/curso">
            <ArrowLeft aria-hidden size={18} weight="bold" /> Volver al curso
          </Link>
        </div>
        <PromptLibrary guides={guides} />
      </div>
    </main>
  );
}
