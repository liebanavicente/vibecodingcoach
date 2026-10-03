"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Flowing glass ribbons behind a section. Place it as the last child of an element with class "has-ribbon".
 * It only plays while on screen, fades in and drifts with scroll; with reduced motion it stays a still image.
 * On phones it runs slower and softer (the blur lives in globals.css); "hero" only shows on phones. */
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
        el.playbackRate = phone ? 0.55 : 1;

        gsap.fromTo(root.current, { autoAlpha: 0 }, {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: host, start: "top 85%", once: true },
        });
        // The phone blur needs the zoom so its soft edges stay off screen.
        gsap.fromTo(el, { yPercent: -6, scale: phone ? 1.2 : 1 }, {
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
      <video loop muted playsInline poster="/videos/fondo-cintas.webp" preload="metadata" ref={video} src="/videos/fondo-cintas.mp4" tabIndex={-1} />
    </div>
  );
}
