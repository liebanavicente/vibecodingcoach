"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Course route on scroll: the dashed line fills with colour, each step lights up as it is reached
 * and its card slides in. Wraps the <ol className="route"> list. */
export function RouteAnimator({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        gsap.fromTo(
          q(".route-progress"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: q(".route")[0], start: "top 65%", end: "bottom 65%", scrub: 0.6 },
          },
        );

        // Sliding in from the side would widen the page on phones, so there the cards rise instead.
        const offset = window.matchMedia("(min-width: 1320px)").matches ? { x: 60 } : { y: 40 };
        q(".route-item").forEach((item) => {
          const node = item.querySelector(".route-node");
          const card = item.querySelector(".route-card");
          gsap.from(card, {
            ...offset,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
          ScrollTrigger.create({
            trigger: item,
            start: "top 65%",
            onEnter: () => {
              node?.classList.add("is-lit");
              gsap.fromTo(node, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
            },
            onLeaveBack: () => node?.classList.remove("is-lit"),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="route-wrap" ref={root}>
      <span aria-hidden className="route-progress" />
      {children}
    </div>
  );
}
