import type { Metadata } from "next";
import { DemoCita } from "@/components/DemoCita";
import { EmbedMode } from "@/components/EmbedMode";

export const metadata: Metadata = {
  title: "Demo: WhatsApp con IA que da citas",
  description: "Habla con el asistente de una peluquería inventada y mira cómo reserva tu cita en la agenda del negocio, en directo.",
  alternates: { canonical: "/demo/cita" },
};

/** La demo se ve en esta web y, con ?origen=montajia, dentro de montajia.com (sin cabecera ni pie). */
export default async function DemoCitaPage({ searchParams }: { searchParams: Promise<{ origen?: string | string[] }> }) {
  const { origen } = await searchParams;
  const deMontajia = origen === "montajia";
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      {deMontajia && <EmbedMode />}
      <div className="container">
        {!deMontajia && (
          <div className="page-head">
            <div>
              <p className="eyebrow">Demo · proyecto de ejemplo</p>
              <h1>
                Un WhatsApp con IA que <span className="grad-text">da citas solo</span>
              </h1>
              <p className="page-intro">
                Escribe como si fueras un cliente de una peluquería de Cornellà (inventada). El asistente contesta, te ofrece
                huecos reales y, cuando confirmas, la cita aparece en la agenda del negocio. Es el tipo de cosa que aprenderás
                a construir con IA, sin ser programador.
              </p>
            </div>
          </div>
        )}
        <DemoCita origen={deMontajia ? "montajia" : "vibecoding"} />
      </div>
    </main>
  );
}
