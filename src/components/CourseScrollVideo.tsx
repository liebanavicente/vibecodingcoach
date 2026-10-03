"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SRC = "/videos/curso-scroll.mp4";
const FIRST_FRAME = "/videos/curso-scroll-inicio.webp";
const LAST_FRAME = "/videos/curso-scroll.webp";

/** A website building itself on a laptop, driven by scroll: the frame opens up as it enters and the video
 * advances with the page. With reduced motion it shows the finished frame only. */
export function CourseScrollVideo() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = video.current;
        const frame = root.current?.querySelector(".scroll-video-frame");
        if (!el || !frame) return;

        // iOS only paints seeked frames once the video has played: a muted play/pause unlocks it.
        let primed = false;
        const prime = () => {
          if (primed) return;
          primed = true;
          void el.play().then(() => el.pause()).catch(() => {});
        };

        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 14% round 48px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% round 28px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 35%", scrub: 0.6, onEnter: prime },
          },
        );

        const playhead = { t: 0 };
        gsap.to(playhead, {
          t: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
          onUpdate: () => {
            if (el.duration) el.currentTime = playhead.t * (el.duration - 0.05);
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="scroll-video" ref={root}>
      <div className="scroll-video-frame">
        <video aria-hidden className="scroll-video-media" muted playsInline poster={FIRST_FRAME} preload="auto" ref={video} src={SRC} tabIndex={-1} />
        {/* eslint-disable-next-line @next/next/no-img-element -- static still shown instead of the video with reduced motion */}
        <img alt="Una web terminada en la pantalla de un portátil" className="scroll-video-still" src={LAST_FRAME} />
      </div>
      <p className="scroll-video-caption">Paso a paso, de la pantalla en blanco a tu web publicada.</p>
    </div>
  );
}
