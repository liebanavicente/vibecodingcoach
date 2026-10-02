import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { contactHref, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.author}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Aprende a construir tu primera web o app con IA, sin experiencia previa. Clases y material gratuito de un maestro con 14 años de experiencia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="font-semibold tracking-tight">
              vibe<span className="text-accent">coding</span>coach
            </Link>
            <div className="flex items-center gap-4 text-sm sm:gap-6">
              <Link href="/curso" className="hover:text-accent">
                Curso gratis
              </Link>
              <Link href="/#oferta" className="hidden hover:text-accent sm:inline">
                Clases
              </Link>
              <a
                href={contactHref}
                className="rounded-full bg-accent px-4 py-2 font-medium text-white hover:opacity-90"
              >
                Contacto
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
            <p>
              © {new Date().getFullYear()} {site.author}
            </p>
            <div className="flex gap-4">
              <a href={site.linkedin} className="hover:text-accent">
                LinkedIn
              </a>
              <a href={site.github} className="hover:text-accent">
                GitHub
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                Email
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
