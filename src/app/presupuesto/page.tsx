import type { Metadata } from "next";
import { Calculadora } from "@/components/Calculadora";
import { RibbonBg } from "@/components/RibbonBg";

export const metadata: Metadata = {
  title: "Calcula el presupuesto de tu web",
  description: "Cuéntame qué web necesitas y te doy una estimación orientativa de precio y plazo al momento. El precio cerrado lo acordamos en una llamada gratis.",
  alternates: { canonical: "/presupuesto" },
};

export default function PresupuestoPage() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div className="container">
        <div className="page-head has-ribbon">
          <div>
            <p className="eyebrow">Te la hago yo · presupuesto orientativo</p>
            <h1>
              ¿Cuánto costaría <span className="grad-text">tu web</span>?
            </h1>
            <p className="page-intro">
              Elige lo que necesitas (o cuéntamelo con tus palabras) y te doy al momento una horquilla de precio y de plazo.
              No es un precio cerrado: lo concretamos juntos en una llamada gratis.
            </p>
          </div>
          <RibbonBg position="top" />
        </div>
        <Calculadora withAi={Boolean(process.env.GEMINI_API_KEY)} />
      </div>
    </main>
  );
}
