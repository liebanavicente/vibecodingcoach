import type { Metadata } from "next";
import { Encargo } from "@/components/Encargo";
import { cleanAnswers, defaultAnswers } from "@/content/presupuesto";

export const metadata: Metadata = {
  title: "Encarga tu web",
  description:
    "Responde unas preguntas sencillas sobre tu negocio y tu web, ve una estimación al momento y envíamela. Te respondo en 24–48 horas con un precio cerrado.",
  alternates: { canonical: "/encargo" },
};

type Params = { [key: string]: string | string[] | undefined };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** The calculator links here with its answers in the URL (tipo, paginas, funciones, urgente), so nothing is asked twice. */
function fromQuery(q: Params) {
  if (!one(q.tipo)) return defaultAnswers;
  return cleanAnswers({
    type: one(q.tipo) as never,
    pages: Number(one(q.paginas)),
    features: (one(q.funciones) ?? "").split(",") as never,
    content: one(q.contenido) as never,
    urgent: one(q.urgente) === "1",
  });
}

export default async function EncargoPage({ searchParams }: { searchParams: Promise<Params> }) {
  const q = await searchParams;
  const origin = one(q.utm_source) ?? (one(q.tipo) ? "calculadora" : "web");
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container enc-page">
        <div className="page-head">
          <div>
            <p className="eyebrow">Te la hago yo · unos 3 minutos</p>
            <h1>
              Encarga <span className="grad-text">tu web</span>
            </h1>
            <p className="page-intro">
              Responde unas preguntas sencillas, sin tecnicismos. Al final ves una estimación y me lo envías: te contesto en
              24–48 horas con una propuesta y un precio cerrado.
            </p>
          </div>
        </div>
        <Encargo initial={fromQuery(q)} origin={origin.slice(0, 80)} />
      </div>
    </main>
  );
}
