"use client";

import { useEffect, useRef, useState } from "react";
import { SkipForward } from "@phosphor-icons/react";

import { INTRO_SEEN_KEY } from "@/lib/intro";

export function IntroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const closeRef = useRef<() => void>(undefined);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const element = video.current;
    if (root.dataset.intro !== "1" || !element) return;

    const close = () => {
      try {
        localStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}
      element.pause();
      setClosing(true);
      setTimeout(() => delete root.dataset.intro, 450);
    };
    closeRef.current = close;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    const onTime = () => {
      if (bar.current && element.duration) bar.current.style.width = `${(element.currentTime / element.duration) * 100}%`;
    };

    element.src = "/videos/como-funciona.mp4";
    void element.play().catch(close);
    element.addEventListener("ended", close);
    element.addEventListener("timeupdate", onTime);
    window.addEventListener("keydown", onKey);
    return () => {
      element.removeEventListener("ended", close);
      element.removeEventListener("timeupdate", onTime);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div aria-label="Vídeo de presentación" className={`intro${closing ? " is-closing" : ""}`} role="dialog">
      <div className="intro-frame">
        <video muted playsInline poster="/videos/como-funciona.webp" preload="none" ref={video} />
        <span className="intro-progress">
          <span ref={bar} />
        </span>
      </div>
      <button className="intro-skip" onClick={() => closeRef.current?.()} type="button">
        Saltar <SkipForward aria-hidden size={18} weight="fill" />
      </button>
    </div>
  );
}
