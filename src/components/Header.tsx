"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { MlLogo } from "@/components/MlLogo";
import { contactHref } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio", hideOnMobile: true },
  { href: "/curso", label: "Curso gratis", hideOnMobile: false },
  { href: "/curso/glosario", label: "Glosario", hideOnMobile: true },
  { href: "/#clases", label: "Clases", hideOnMobile: true },
];

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 12, () => false);
  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    if (href === "/curso") return pathname.startsWith("/curso") && !pathname.startsWith("/curso/glosario");
    return pathname.startsWith(href);
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="topbar" data-scrolled={scrolled}>
        <div className="container topbar-inner">
          <Link aria-label="vibecodingcoach by ML, inicio" className="brand" href="/">
            <span aria-hidden className="brand-word">
              vibe<span>coding</span>coach
            </span>
            <span aria-hidden className="brand-by">
              by
            </span>
            <MlLogo className="brand-logo" title="Miguel Liébana" />
          </Link>
          <nav aria-label="Principal" className="site-nav">
            <ul>
              {links.map(({ href, label, hideOnMobile }) => (
                <li className={hideOnMobile ? "nav-hide" : undefined} key={href}>
                  <Link aria-current={isCurrent(href) ? "page" : undefined} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a className="button primary" href={contactHref}>
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
