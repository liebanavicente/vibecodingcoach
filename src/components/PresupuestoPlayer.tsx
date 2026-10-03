"use client";

import { Player } from "@remotion/player";
import { PresupuestoVideo, type PresupuestoVideoProps, VIDEO } from "./PresupuestoVideo";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The estimate video, played live in the page. Loaded on demand (next/dynamic) so the calculator stays light. */
export default function PresupuestoPlayer(props: PresupuestoVideoProps) {
  const still = reduceMotion();
  return (
    <Player
      acknowledgeRemotionLicense
      autoPlay={!still}
      component={PresupuestoVideo}
      compositionHeight={VIDEO.height}
      compositionWidth={VIDEO.width}
      controls
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      initialFrame={still ? VIDEO.durationInFrames - 1 : 0}
      inputProps={props}
      moveToBeginningWhenEnded={false}
      style={{ width: "100%", aspectRatio: `${VIDEO.width} / ${VIDEO.height}` }}
    />
  );
}
