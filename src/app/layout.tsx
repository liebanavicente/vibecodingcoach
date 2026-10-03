import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { MlLink } from "@/components/MlLogo";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  // Lets the share image (opengraph-image.png) and other metadata use full URLs.
  metadataBase: new URL("https://vibecoding.miguelliebana.com"),
  title: {
    default: `${site.name} · ${site.author}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Aprende a construir tu primera web con IA, sin experiencia previa. Clases y curso gratuito de un maestro con 14 años de experiencia.",
  openGraph: { type: "website", locale: "es_ES", siteName: "vibecodingcoach by Miguel Liébana" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#fdf7f3" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={inter.variable} lang="es" suppressHydrationWarning>
      <body>
        <div aria-hidden className="page-bg" />
        <Header />
        {children}
        <footer className="container site-footer">
          <div className="footer-brand">
            <MlLink className="footer-logo" />
            <p>
              <strong>
                vibe<span>coding</span>coach
              </strong>{" "}
              by {site.author}
              <br />© {new Date().getFullYear()} · Maestro y desarrollador web
              <br />
              <span className="footer-note">
                Las marcas y logotipos citados pertenecen a sus respectivos propietarios. Sin afiliación ni patrocinio.
              </span>
            </p>
          </div>
          <span className="site-footer-links">
            <SocialLinks variant="icons" />
            <a href={site.linkedin}>LinkedIn</a>
            <a href={site.github}>GitHub</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </span>
        </footer>
        {/* Vercel Web Analytics: page views without cookies. */}
        <Analytics />
      </body>
    </html>
  );
}
