"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Flowing glass ribbons behind a section. Place it as the last child of an element with class "has-ribbon".
 * It only plays while on screen, fades in and drifts with scroll; with reduced motion it stays a still image.
 * Phones get a light portrait cut (fondo-cintas-movil.mp4) over its still (fondo-cintas-movil.webp);
 * "hero" only shows on phones. */
export function RibbonBg({ position = "center" }: { position?: "top" | "center" | "bottom" | "hero" }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", phone: "(max-width: 960px)" }, (context) => {
        const { motion, phone } = context.conditions ?? {};
        const el = video.current;
        const host = root.current?.parentElement;
        if (!motion || !el || !host || getComputedStyle(root.current!).display === "none") return;
        gsap.fromTo(root.current, { autoAlpha: 0 }, {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: host, start: "top 85%", once: true },
        });

        // Phones get a small 360px cut (135 KB) and no scroll drift; several big decoders at once made scrolling heavy.
        // The file only loads once the section first reaches the screen.
        const src = phone ? "/videos/fondo-cintas-movil.mp4" : "/videos/fondo-cintas.mp4";
        if (!phone) {
          gsap.fromTo(el, { yPercent: -6 }, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
        // Both layers are translucent, so the still steps aside once the video draws frames.
        const onPlaying = () => root.current?.classList.add("has-video");
        el.addEventListener("playing", onPlaying, { once: true });
        ScrollTrigger.create({
          trigger: host,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (!self.isActive) return el.pause();
            if (!el.src.endsWith(src)) el.src = src;
            el.play().catch(() => {});
          },
        });
        return () => el.removeEventListener("playing", onPlaying);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div aria-hidden className={`ribbon-bg ribbon-${position}`} ref={root}>
      {/* The video gets its file in the effect (desktop only); until then, and with reduced motion, the CSS poster shows. */}
      <span className="ribbon-still" />
      <video loop muted playsInline preload="metadata" ref={video} tabIndex={-1} />
    </div>
  );
}
