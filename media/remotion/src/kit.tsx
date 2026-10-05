// Shared pieces for the vertical reels: timing helpers, the animated background, a tapping finger and the progress bar.
import { HandPointing } from "@phosphor-icons/react";
import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, grad } from "./brand";

export const FPS = 30;
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 between two frames of the current sequence, eased. */
export function useProgress(from: number, to: number) {
  return interpolate(useCurrentFrame(), [from, to], [0, 1], { ...clamp, easing: ease });
}

/** Fade and lift in, starting at a frame. */
export function useRise(at: number, distance = 50) {
  const t = useProgress(at, at + 18);
  return { opacity: t, translate: `0 ${(1 - t) * distance}px` };
}

/** Springy scale-in, starting at a frame. */
export function usePop(at: number, damping = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping, stiffness: 140 } });
  return { opacity: Math.min(1, s * 2), scale: String(0.6 + 0.4 * s) };
}

/** Blinking cursor of the ML logo. */
export const useBlink = () => (Math.floor(useCurrentFrame() / 15) % 2 ? 0 : 1);

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 80px", textAlign: "center" }}>{children}</AbsoluteFill>
);

const BACKGROUNDS = {
  burbujas: { still: "fondo-burbujas.webp", video: "burbujas.mp4" },
  // Soft silk at the top and bottom with a free centre: calmer, and text reads better.
  seda: { still: "seda.jpg", video: "seda.mp4" },
};

export const Background: React.FC<{ kind?: keyof typeof BACKGROUNDS }> = ({ kind = "seda" }) => (
  <AbsoluteFill>
    <Img src={staticFile(BACKGROUNDS[kind].still)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Video src={staticFile(BACKGROUNDS[kind].video)} loop muted objectFit="cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    {kind === "seda" ? (
      // A light veil, thicker where the orange silk is, so gradient text reads on top of it and the motion stays soft.
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(255,249,244,0.78) 0%, rgba(255,249,244,0.45) 22%, rgba(255,249,244,0.3) 50%, rgba(255,249,244,0.45) 76%, rgba(255,249,244,0.8) 100%)" }} />
    ) : null}
  </AbsoluteFill>
);

/** Thin gradient bar at the bottom that fills up as the reel plays. */
export const Progress: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 120, height: 10, borderRadius: 99, background: "rgba(20, 23, 34, 0.08)" }}>
      <div style={{ width: `${(frame / (duration - 1)) * 100}%`, height: "100%", borderRadius: 99, background: grad }} />
    </div>
  );
};

/** A finger that comes in and taps the element it sits in, at frame `at`. */
export const Finger: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [at - 16, at - 6, at + 8, at + 16], [0, 1, 1, 0], clamp);
  const press = interpolate(frame, [at - 3, at, at + 4], [1, 0.82, 1], clamp);
  const travel = interpolate(frame, [at - 16, at - 3], [90, 0], { ...clamp, easing: ease });
  const ring = interpolate(frame, [at, at + 14], [0, 1], clamp);
  return (
    <span style={{ position: "absolute", right: 24, bottom: -34, pointerEvents: "none", opacity: show }}>
      <span style={{ position: "absolute", left: 6, top: -6, width: 60, height: 60, borderRadius: "50%", border: `4px solid ${color.orange}`, opacity: frame >= at ? 1 - ring : 0, scale: String(0.5 + ring) }} />
      <HandPointing size={84} weight="fill" color={color.ink} style={{ display: "block", translate: `${travel}px ${travel}px`, scale: String(press), filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.25))" }} />
    </span>
  );
};
