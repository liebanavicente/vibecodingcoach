import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Qué datos recojo en esta web, para qué los uso y cómo puedes pedir que los borre.",
  alternates: { canonical: "/privacidad" },
};

// Plain-language privacy notice (GDPR art. 13) for the order form, the booking page and the analytics.
export default function PrivacidadPage() {
  return (
    <main className="main" id="contenido" tabIndex={-1}>
      <div aria-hidden className="page-bg calm" />
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Actualizada el 5 de octubre de 2026</p>
            <h1>Privacidad</h1>
            <p className="page-intro">Te lo cuento claro y corto: qué datos recojo, para qué y cómo puedes pedir que los borre.</p>
          </div>
        </div>
        <div className="prose glass legal">
          <h2>Quién es el responsable</h2>
          <p>
            {site.author}, que gestiona esta web. Puedes escribirme a <a href={`mailto:${site.email}`}>{site.email}</a> para
            cualquier cosa relacionada con tus datos.
          </p>
          <h2>Qué datos recojo y para qué</h2>
          <ul>
            <li>
              <strong>Encargo de web</strong> (<a href="/encargo">/encargo</a>): tu nombre, tu email o teléfono y lo que me cuentas de
              tu negocio. Solo para responderte con una propuesta y, si la aceptas, hacer tu web.
            </li>
            <li>
              <strong>Reservas y correos:</strong> si reservas una clase o me escribes, uso tus datos solo para atenderte.
            </li>
            <li>
              <strong>Estadísticas:</strong> Vercel Web Analytics cuenta visitas de forma anónima, sin cookies y sin identificarte.
            </li>
          </ul>
          <h2>Por qué puedo usarlos</h2>
          <p>Porque tú me los das y lo aceptas al enviar el formulario (consentimiento). Puedes retirarlo cuando quieras.</p>
          <h2>Cuánto tiempo los guardo</h2>
          <p>
            Los encargos que no siguen adelante, un año como máximo. Si trabajamos juntos, lo que exija la ley (facturación). Si me
            pides que los borre antes, los borro.
          </p>
          <h2>Quién más los ve</h2>
          <p>
            Nadie más los usa. Para guardarlos y avisarme me ayudan servicios que actúan por encargo mío: Supabase (base de datos,
            alojada en la Unión Europea), Resend (envío del aviso por email) y Vercel (alojamiento de la web). No vendo ni cedo tus
            datos.
          </p>
          <h2>Tus derechos</h2>
          <p>
            Puedes pedirme ver, corregir o borrar tus datos, o que deje de usarlos, escribiendo a{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Si crees que no los trato bien, puedes reclamar ante la Agencia
            Española de Protección de Datos (<a href="https://www.aepd.es">aepd.es</a>).
          </p>
        </div>
      </div>
    </main>
  );
}
