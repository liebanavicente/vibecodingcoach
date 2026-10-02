"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A number that counts up from 0 when it scrolls into view. The final value is in the HTML from the start. */
export function CountUp({ value, prefix = "", className }: { value: number; prefix?: string; className?: string }) {
  const el = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { n: 0 };
      const render = () => {
        if (el.current) el.current.textContent = `${prefix}${Math.round(counter.n)}`;
      };
      render();
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: render,
        scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <strong className={className} ref={el}>
      {prefix}
      {value}
    </strong>
  );
}
