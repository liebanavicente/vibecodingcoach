"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Flowing glass ribbons behind a section. Place it as the last child of an element with class "has-ribbon".
 * It only plays while on screen, fades in and drifts with scroll; with reduced motion it stays a still image.
 * Phones get a portrait still (fondo-cintas-movil.webp) that drifts slowly in CSS instead of the video;
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

        // Phones skip the video: several decoders at once made scrolling heavy. A still drifts in CSS instead,
        // and only while it is on screen.
        if (phone) {
          ScrollTrigger.create({
            trigger: host,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => root.current?.classList.toggle("is-on", self.isActive),
          });
          return;
        }

        if (!el.src.endsWith("/videos/fondo-cintas.mp4")) el.src = "/videos/fondo-cintas.mp4";
        gsap.fromTo(el, { yPercent: -6 }, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
        });
        ScrollTrigger.create({
          trigger: host,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? void el.play().catch(() => {}) : el.pause()),
        });
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
