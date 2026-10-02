"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, TextPlugin);

/** Before first paint: hide the hero so it can animate in; never for reduced motion. */
export const HERO_SCRIPT = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("gsap-on")}catch(e){}})()`;

/** The hero: the headline rises word by word, then the illustration builds itself piece by piece and drifts on scroll. */
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
        // The headline splits into words (SplitText keeps an aria-label with the full sentence).
        const title = q(".hero-copy h1")[0];
        const split = title ? SplitText.create(title, { type: "words", wordsClass: "split-word" }) : null;

        const text = gsap.timeline({ defaults: { ease: "power3.out" } });
        text.from(q(".hero-copy .eyebrow"), { y: 16, autoAlpha: 0, duration: 0.45, clearProps: "transform" });
        if (split) {
          text.from(split.words, { yPercent: 60, rotate: 4, autoAlpha: 0, stagger: 0.055, duration: 0.6, ease: "back.out(1.7)" }, "-=0.2");
        }
        text
          .from(q(".hero-copy .page-intro"), { y: 20, autoAlpha: 0, duration: 0.5, clearProps: "transform" }, "-=0.35")
          .from(q(".hero-copy .actions > *"), { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5, clearProps: "transform" }, "-=0.3");

        const visual = gsap.timeline({ defaults: { ease: "power3.out" } });
        visual
          .from(q(".mock-window"), { autoAlpha: 0, duration: 0.45 })
          .from(q(".mock-bar i"), { scale: 0, stagger: 0.05, duration: 0.25, ease: "back.out(3)" }, "-=0.2")
          .from(q(".mock-side > *"), { x: -18, autoAlpha: 0, stagger: 0.05, duration: 0.3 }, "<")
          .from(q(".mock-prompt"), { y: 18, autoAlpha: 0, duration: 0.35 }, "-=0.15");
        if (prompt) visual.fromTo(prompt, { text: "" }, { text: promptText, duration: 0.6, ease: "none" });
        visual
          .from(q(".mock-send"), { scale: 0, duration: 0.3, ease: "back.out(3)", clearProps: "transform" })
          .from(q(".mock-code"), { y: 24, autoAlpha: 0, duration: 0.4, clearProps: "transform" }, "-=0.1")
          .from(q(".mock-preview"), { y: 40, scale: 0.9, autoAlpha: 0, duration: 0.5, ease: "back.out(1.6)", clearProps: "transform" }, "-=0.2")
          .from(q(".float-tile"), { scale: 0, autoAlpha: 0, stagger: 0.07, duration: 0.45, ease: "back.out(2.2)", clearProps: "transform" }, "-=0.3")
          .from(q(".float-cursor"), { x: -40, y: 50, autoAlpha: 0, duration: 0.45, clearProps: "transform" }, "-=0.3")
          .from(q(".play-pill"), { autoAlpha: 0, duration: 0.35 }, "-=0.2");

        // Text and illustration play side by side; the illustration starts half a second in.
        const tl = gsap.timeline({ paused: true });
        tl.set(q(".hero-copy, .hero-visual"), { autoAlpha: 1 }).add(text, 0).add(visual, 0.5);

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
          scrollTrigger: { trigger: q(".hero-media")[0], start: "top 20%", end: "bottom top", scrub: true },
        });

        return () => observer?.disconnect();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="hero" ref={root}>
      {children}
    </section>
  );
}
