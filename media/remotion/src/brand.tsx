// Brand look shared with the website and the HTML reel kit (media/kit/kit.css): Inter, orange-coral gradient, glass, ML logo.
import { loadFont } from "@remotion/google-fonts/Inter";
import type { CSSProperties } from "react";

export const { fontFamily } = loadFont("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin"] });

export const color = {
  ink: "#141722",
  muted: "#5d6272",
  orange: "#ff6a2c",
  accentInk: "#df4f1c",
  mlBlue: "#1f66ff",
  mlInk: "#111",
};

export const grad = "linear-gradient(120deg, #ff9440 0%, #ff6a2c 45%, #f2452f 100%)";

/** Text painted with the brand gradient. */
export const gradText: CSSProperties = {
  backgroundImage: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const glass: CSSProperties = {
  border: "2px solid rgba(255, 255, 255, 0.92)",
  background: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0 2px 0 rgba(255, 255, 255, 0.9) inset, 0 40px 90px rgba(60, 80, 140, 0.16), 0 6px 18px rgba(20, 23, 34, 0.06)",
  backdropFilter: "blur(26px) saturate(160%)",
};

export const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  border: "2px solid rgba(255, 112, 52, 0.25)",
  borderRadius: 999,
  background: "rgba(255, 112, 52, 0.12)",
  color: color.accentInk,
  fontSize: 40,
  fontWeight: 700,
  padding: "16px 30px",
};

/** «vibecodingcoach» with "coding" in orange. */
export const Wordmark: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.03em" }}>
    vibe<span style={{ color: color.orange }}>coding</span>coach
  </span>
);

/** Miguel's mark: "ml_" on a white key with a blue offset shadow. `cursor` sets the cursor opacity (it blinks). */
export const MlLogo: React.FC<{ width: number; cursor?: number }> = ({ width, cursor = 1 }) => (
  <svg viewBox="0 0 132 86" width={width} height={(width * 86) / 132}>
    <rect fill={color.mlBlue} height="74" rx="14" width="118" x="11.5" y="10.5" />
    <rect fill="white" height="74" rx="14" stroke={color.mlInk} strokeWidth="3" width="118" x="1.5" y="1.5" />
    <g fill="none" stroke={color.mlInk} strokeWidth="5.2">
      <path d="M19.6 59V36" />
      <path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59" />
      <path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59" />
      <path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3" />
    </g>
    <rect fill={color.mlBlue} height="4.6" opacity={cursor} width="25.3" x="79.3" y="54.3" />
  </svg>
);
