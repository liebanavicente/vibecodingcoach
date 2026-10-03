"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SRC = "/videos/curso-scroll.mp4";
const FIRST_FRAME = "/videos/curso-scroll-inicio.webp";
const LAST_FRAME = "/videos/curso-scroll.webp";

// Blurs over the made-up lettering in the clip (the site's menu bar and its button), as keyframes
// [second, x0, y0, x1, y1, opacity] in the clip's 1280x720 pixels; positions follow the camera move.
const W = 1280;
const H = 720;
const BLURS: number[][][] = [
  [
    [1.2, 525, 232, 745, 254, 0],
    [1.5, 525, 232, 745, 254, 1],
    [2.5, 428, 224, 772, 256, 1],
    [3.5, 405, 204, 782, 242, 1],
    [4.5, 378, 188, 802, 232, 1],
    [5.5, 326, 155, 844, 198, 1],
    [6.5, 276, 118, 894, 165, 1],
    [7.2, 236, 90, 944, 143, 1],
    [7.9, 216, 76, 964, 125, 1],
    [8, 214, 74, 966, 123, 1],
  ],
  [
    [6.0, 618, 575, 702, 607, 0],
    [6.4, 618, 575, 702, 607, 1],
    [7.2, 572, 598, 748, 634, 1],
    [7.9, 572, 612, 752, 652, 1],
    [8, 572, 613, 752, 653, 1],
  ],
];

function placeBlurs(boxes: HTMLElement[], time: number) {
  boxes.forEach((box, i) => {
    const keys = BLURS[i];
    let k = keys.findIndex((key) => key[0] > time);
    if (k === -1) k = keys.length - 1;
    const a = keys[Math.max(0, k - 1)];
    const b = keys[k];
    const p = b[0] === a[0] ? 1 : Math.min(1, Math.max(0, (time - a[0]) / (b[0] - a[0])));
    const [, x0, y0, x1, y1, o] = a.map((v, j) => v + (b[j] - v) * p);
    Object.assign(box.style, {
      left: `${(x0 / W) * 100}%`,
      top: `${(y0 / H) * 100}%`,
      width: `${((x1 - x0) / W) * 100}%`,
      height: `${((y1 - y0) / H) * 100}%`,
      opacity: time < keys[0][0] ? "0" : String(o),
    });
  });
}

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

        const boxes = gsap.utils.toArray<HTMLElement>(".scroll-video-blur", root.current);
        placeBlurs(boxes, 0);

        const playhead = { t: 0 };
        gsap.to(playhead, {
          t: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
          onUpdate: () => {
            if (!el.duration) return;
            el.currentTime = playhead.t * (el.duration - 0.05);
            placeBlurs(boxes, el.currentTime);
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
        {BLURS.map((_, i) => (
          <span aria-hidden className="scroll-video-blur" key={i} />
        ))}
        <video aria-hidden className="scroll-video-media" muted playsInline poster={FIRST_FRAME} preload="auto" ref={video} src={SRC} tabIndex={-1} />
        {/* eslint-disable-next-line @next/next/no-img-element -- static still shown instead of the video with reduced motion */}
        <img alt="Una web terminada en la pantalla de un portátil" className="scroll-video-still" src={LAST_FRAME} />
      </div>
      <p className="scroll-video-caption">Paso a paso, de la pantalla en blanco a tu web publicada.</p>
    </div>
  );
}
