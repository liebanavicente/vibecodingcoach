import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { MlLogo } from "@/components/MlLogo";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.author}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Aprende a construir tu primera web con IA, sin experiencia previa. Clases y curso gratuito de un maestro con 14 años de experiencia.",
};

export const viewport: Viewport = { themeColor: "#fdf7f3" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={inter.variable} lang="es">
      <body>
        <div aria-hidden className="page-bg" />
        <Header />
        {children}
        <footer className="container site-footer">
          <div className="footer-brand">
            <MlLogo className="footer-logo" title="Miguel Liébana" />
            <p>
              <strong>
                vibe<span>coding</span>coach
              </strong>{" "}
              by {site.author}
              <br />© {new Date().getFullYear()} · Maestro y desarrollador web
            </p>
          </div>
          <span className="site-footer-links">
            <a href={site.linkedin}>LinkedIn</a>
            <a href={site.github}>GitHub</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
