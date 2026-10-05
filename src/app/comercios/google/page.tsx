import type { Metadata } from "next";
import Link from "next/link";
import { FichaGoogle } from "@/components/FichaGoogle";

export const metadata: Metadata = {
  title: "¿Cómo está tu ficha de Google? Autoevaluación gratis",
  description:
    "Diez preguntas sencillas sobre tu ficha de Google Maps. En 2 minutos sabes tu nota sobre 20 y qué mejorar para que te encuentren más clientes.",
  alternates: { canonical: "/comercios/google" },
};

export default function FichaGooglePage() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Para comercios · gratis · 2 minutos</p>
            <h1>
              ¿Cómo está tu <span className="grad-text">ficha de Google</span>?
            </h1>
            <p className="page-intro">
              Es lo primero que ven tus clientes cuando te buscan en el móvil. Responde 10 preguntas sencillas (ten a mano tu
              ficha en Google Maps) y te digo tu nota y qué mejorar primero.
            </p>
            <p className="shop-links">
              <Link href="/comercios">Webs para comercios, desde 150 €</Link>
              <Link href="/encargo?utm_source=ficha-google">Encarga tu web</Link>
            </p>
          </div>
        </div>
        <FichaGoogle />
      </div>
    </main>
  );
}
