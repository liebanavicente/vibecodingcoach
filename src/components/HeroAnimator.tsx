"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

/** Before first paint: hide the hero illustration so it can assemble itself; never for reduced motion. */
export const HERO_SCRIPT = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("gsap-on")}catch(e){}})()`;

/** Wraps the hero illustration: it builds itself piece by piece on arrival and drifts gently on scroll. */
export function HeroAnimator({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const prompt = q(".mock-prompt p")[0];
        const promptText = prompt?.textContent ?? "";

        // Transforms are cleared at the end so the CSS hover and floating effects take over again.
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        tl.set(q(".hero-visual"), { autoAlpha: 1 })
          .from(q(".mock-window"), { autoAlpha: 0, duration: 0.5 })
          .from(q(".mock-bar i"), { scale: 0, stagger: 0.06, duration: 0.3, ease: "back.out(3)" }, "-=0.2")
          .from(q(".mock-side > *"), { x: -18, autoAlpha: 0, stagger: 0.06, duration: 0.35 }, "<")
          .from(q(".mock-prompt"), { y: 18, autoAlpha: 0, duration: 0.4 }, "-=0.15");
        if (prompt) tl.fromTo(prompt, { text: "" }, { text: promptText, duration: 0.9, ease: "none" });
        tl.from(q(".mock-send"), { scale: 0, duration: 0.35, ease: "back.out(3)", clearProps: "transform" })
          .from(q(".mock-code"), { y: 24, autoAlpha: 0, duration: 0.45, clearProps: "transform" }, "-=0.1")
          .from(q(".mock-preview"), { y: 40, scale: 0.9, autoAlpha: 0, duration: 0.55, ease: "back.out(1.6)", clearProps: "transform" }, "-=0.2")
          .from(q(".float-tile"), { scale: 0, autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: "back.out(2.2)", clearProps: "transform" }, "-=0.3")
          .from(q(".float-cursor"), { x: -40, y: 50, autoAlpha: 0, duration: 0.5, clearProps: "transform" }, "-=0.3")
          .from(q(".play-pill"), { autoAlpha: 0, duration: 0.4 }, "-=0.2");

        // On a first visit the intro video covers the page: wait until it closes.
        const html = document.documentElement;
        let observer: MutationObserver | undefined;
        if (html.dataset.intro === "1") {
          observer = new MutationObserver(() => {
            if (html.dataset.intro !== "1") {
              observer?.disconnect();
              tl.play();
            }
          });
          observer.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
        } else {
          tl.play();
        }

        gsap.to(q(".hero-visual"), {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 20%", end: "bottom top", scrub: true },
        });

        return () => observer?.disconnect();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="hero-media" ref={root}>
      {children}
    </div>
  );
}
