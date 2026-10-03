"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Rises a heading's words out of their lines, then restores the plain text so it reflows on resize. */
function riseWords(heading: Element, vars: gsap.TweenVars) {
  const split = SplitText.create(heading, { type: "words,lines", mask: "lines", wordsClass: "split-word" });
  return gsap.from(split.words, {
    yPercent: 110,
    rotate: 3,
    stagger: 0.06,
    duration: 0.75,
    ease: "power4.out",
    onComplete: () => split.revert(),
    ...vars,
  });
}

/** Course pages: the page head animates in on arrival and each section heading reveals as it scrolls into view.
 * Renders the page's .container. */
export function CourseAnimator({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const head = q("[data-anim='head']")[0];

        if (head) {
          const h = gsap.utils.selector(head);
          const wide = window.matchMedia("(min-width: 961px)").matches;
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.set(head, { autoAlpha: 1 })
            .from(h(".eyebrow"), { y: 16, autoAlpha: 0, duration: 0.45, clearProps: "transform" });
          const title = h("h1")[0];
          if (title) tl.add(riseWords(title, {}), "-=0.2");
          tl.from(h(".page-intro"), { y: 20, autoAlpha: 0, duration: 0.5, clearProps: "transform" }, "-=0.45")
            .from(h(".actions > *"), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.45, clearProps: "transform" }, "-=0.3")
            .from(h(".course-stats"), { ...(wide ? { x: 50 } : { y: 30 }), autoAlpha: 0, duration: 0.7, clearProps: "transform" }, 0.35);
        }

        q(".section-head").forEach((section) => {
          const s = gsap.utils.selector(section);
          const title = s(".section-title")[0];
          const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 85%", once: true } });
          tl.from(s(".label"), { y: 12, autoAlpha: 0, duration: 0.4, ease: "power3.out", clearProps: "transform" });
          if (title) tl.add(riseWords(title, {}), "-=0.15");
          tl.from(s(".section-sub, .button"), { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.45, ease: "power3.out", clearProps: "transform" }, "-=0.4");
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="container" ref={root}>
      {children}
    </div>
  );
}
