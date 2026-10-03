"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowsOut, VideoCamera } from "@phosphor-icons/react";
import type { Module, Slide } from "@/content/curso";

/** hideVideoNote: the lesson already has its video elsewhere on the page (YouTube), so skip "coming soon". */
type Props = { slides: Slide[]; video?: Module["video"]; hideVideoNote?: boolean };

/** Lesson as slides, optionally driven by a recorded video: the video moves the slides, picking a slide seeks the video. */
export function LessonPlayer({ slides, video, hideVideoNote }: Props) {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = slides[index];

  function go(next: number) {
    const target = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(target);
    const cue = video?.cues[target];
    if (videoRef.current && cue !== undefined) videoRef.current.currentTime = cue;
  }

  function syncToVideo() {
    if (!video || !videoRef.current) return;
    const time = videoRef.current.currentTime;
    let current = 0;
    video.cues.forEach((cue, i) => {
      if (time >= cue) current = i;
    });
    if (current !== index) setIndex(Math.min(current, slides.length - 1));
  }

  function onKey(event: KeyboardEvent) {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  }

  function fullscreen() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen().catch(() => {});
  }

  return (
    <section
      aria-label="Lección en diapositivas"
      aria-roledescription="presentación"
      className={`player${video ? " has-video" : ""}`}
      onKeyDown={onKey}
      ref={root}
      tabIndex={0}
    >
      <div className="player-stage">
        <div aria-live="polite" className={`slide${slide.kind === "cover" ? " is-cover" : ""}`} key={index}>
          <span className="slide-count">
            {index + 1} / {slides.length}
          </span>
          {slide.eyebrow ? <p className="eyebrow">{slide.eyebrow}</p> : null}
          <h2>{slide.title}</h2>
          {slide.kind === "cover" && slide.text ? <p className="page-intro">{slide.text}</p> : null}
          {slide.items?.length ? (
            <ul>
              {slide.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {slide.kind === "prompt" && slide.prompt ? <p className="slide-prompt">{slide.prompt}</p> : null}
          {slide.kind === "list" && slide.text ? <p className="slide-tip">{slide.text}</p> : null}
        </div>
        {video ? (
          <div className="player-video">
            <video controls onTimeUpdate={syncToVideo} playsInline poster={video.poster} preload="metadata" ref={videoRef} src={video.src} />
          </div>
        ) : null}
      </div>
      <div className="player-controls">
        <button aria-label="Diapositiva anterior" className="button" disabled={index === 0} onClick={() => go(index - 1)} type="button">
          <ArrowLeft aria-hidden size={18} weight="bold" />
        </button>
        <button aria-label="Diapositiva siguiente" className="button primary" disabled={index === slides.length - 1} onClick={() => go(index + 1)} type="button">
          <ArrowRight aria-hidden size={18} weight="bold" />
        </button>
        <div className="player-dots">
          {slides.map((s, i) => (
            <button aria-current={i === index} aria-label={`Ir a la diapositiva ${i + 1}: ${s.title}`} key={i} onClick={() => go(i)} type="button" />
          ))}
        </div>
        <span className="spacer" />
        {video || hideVideoNote ? null : (
          <span className="player-note">
            <VideoCamera aria-hidden size={14} weight="bold" /> Vídeo de la lección próximamente
          </span>
        )}
        <button aria-label="Pantalla completa" className="button" onClick={fullscreen} type="button">
          <ArrowsOut aria-hidden size={18} weight="bold" />
        </button>
      </div>
    </section>
  );
}
