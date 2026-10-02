"use client";

import { useRef, useState } from "react";
import { Play, X } from "@phosphor-icons/react";

/** "Mira cómo funciona": the 30-second reel in a dialog. Nothing downloads until someone asks for it. */
export function HowItWorks() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);

  function open() {
    setRequested(true);
    dialog.current?.showModal();
    requestAnimationFrame(() => void video.current?.play().catch(() => {}));
  }

  function close() {
    video.current?.pause();
    dialog.current?.close();
  }

  return (
    <>
      <button className="play-pill" onClick={open} type="button">
        <span className="play-icon">
          <Play aria-hidden size={18} weight="fill" />
        </span>
        Mira cómo funciona <span className="play-time">30 s</span>
      </button>
      <dialog
        aria-label="Vídeo: cómo funciona vibecodingcoach"
        className="video-dialog"
        onClick={(event) => event.target === dialog.current && close()}
        onClose={() => video.current?.pause()}
        ref={dialog}
      >
        <button aria-label="Cerrar el vídeo" className="video-close" onClick={close} type="button">
          <X aria-hidden size={20} weight="bold" />
        </button>
        {requested ? (
          <video controls playsInline poster="/videos/como-funciona.webp" preload="metadata" ref={video} src="/videos/como-funciona.mp4" />
        ) : null}
      </dialog>
    </>
  );
}
