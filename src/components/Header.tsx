"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  BookOpenText,
  Chalkboard,
  ChatCircleText,
  Desktop,
  House,
  InstagramLogo,
  List,
  Storefront,
  TiktokLogo,
  Translate,
  X,
} from "@phosphor-icons/react";
import { MlLink } from "@/components/MlLogo";
import { contactHref, site } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio", Icon: House, desktop: false },
  { href: "/curso", label: "Vibe coding", Icon: BookOpenText, desktop: true },
  { href: "/competencias-digitales", label: "Competencias digitales", Icon: Desktop, desktop: true },
  { href: "/curso/prompts", label: "Prompts", Icon: ChatCircleText, desktop: true },
  { href: "/curso/glosario", label: "Glosario", Icon: Translate, desktop: true },
  { href: "/#clases", label: "Clases", Icon: Chalkboard, desktop: true },
  { href: "/#a-medida", label: "Web a medida", Icon: Storefront, desktop: false },
];

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 12, () => false);
  const toggle = useRef<HTMLButtonElement>(null);
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    if (href === "/curso") return /^\/curso(\/|$)/.test(pathname) && !/^\/curso\/(glosario|prompts)/.test(pathname);
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    document.querySelector<HTMLElement>("#mobile-menu a")?.focus();
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  function close() {
    setOpenOn(null);
    toggle.current?.focus();
  }

  function onMenuKey(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="topbar" data-scrolled={scrolled}>
        <div className="container topbar-inner">
          <div className="brand">
            <Link aria-label="vibecodingcoach, inicio" className="brand-home" href="/">
              <span aria-hidden className="brand-word">
                vibe<span>coding</span>coach
              </span>
            </Link>
            <span aria-hidden className="brand-by">
              by
            </span>
            <MlLink className="brand-logo" />
          </div>
          <nav aria-label="Principal" className="site-nav">
            <ul>
              {links
                .filter((l) => l.desktop)
                .map(({ href, label }) => (
                  <li className="nav-desktop" key={href}>
                    <Link aria-current={isCurrent(href) ? "page" : undefined} href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link className="button primary" href={contactHref}>
                  Reservar
                </Link>
              </li>
              <li className="nav-mobile">
                <button
                  aria-controls="mobile-menu"
                  aria-expanded={open}
                  aria-label={open ? "Cerrar el menú" : "Abrir el menú"}
                  className="menu-toggle"
                  onClick={() => (open ? close() : setOpenOn(pathname))}
                  ref={toggle}
                  type="button"
                >
                  {open ? <X aria-hidden size={22} weight="bold" /> : <List aria-hidden size={22} weight="bold" />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {open
        ? // The header's backdrop blur would trap a fixed panel inside it, so the menu lives in <body>.
          createPortal(
            <div aria-label="Menú" aria-modal="true" className="mobile-menu" id="mobile-menu" onKeyDown={onMenuKey} role="dialog">
              <div className="mobile-menu-top">
                <span className="brand-word">
                  vibe<span>coding</span>coach
                </span>
                <button aria-label="Cerrar el menú" className="menu-toggle" onClick={close} type="button">
                  <X aria-hidden size={22} weight="bold" />
                </button>
              </div>
              <ul>
                {links.map(({ href, label, Icon }, i) => (
                  <li key={href} style={{ "--i": i } as CSSProperties}>
                    <Link aria-current={isCurrent(href) ? "page" : undefined} href={href} onClick={() => setOpenOn(null)}>
                      <span className="mobile-menu-icon">
                        <Icon aria-hidden size={22} weight="bold" />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mobile-menu-foot">
                <Link className="button primary lg" href={contactHref} onClick={() => setOpenOn(null)}>
                  Reserva una clase de prueba gratis
                </Link>
                <span className="mobile-menu-socials">
                  <a className="mobile-menu-social" href={site.instagram} rel="noreferrer" target="_blank">
                    <InstagramLogo aria-hidden size={20} weight="bold" /> Instagram
                  </a>
                  <a className="mobile-menu-social" href={site.tiktok} rel="noreferrer" target="_blank">
                    <TiktokLogo aria-hidden size={20} weight="bold" /> TikTok
                  </a>
                </span>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
