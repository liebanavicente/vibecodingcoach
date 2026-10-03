// «Palabra del día»: one glossary term explained in a vertical reel. Same scenes as media/palabras (hook, definition,
// example, call to action), but the definition is read word by word and every scene lasts as long as its text needs.
import { Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Easing,
  interpolate,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill, Wordmark } from "./brand";

export const palabraSchema = z.object({
  term: z.string(),
  alias: z.string(),
  topic: z.enum(["IA", "Herramientas", "Código", "Publicar"]),
  text: z.string(),
  example: z.string(),
  /** Number of terms in the glossary, for the call to action. */
  total: z.number(),
});

type Props = z.infer<typeof palabraSchema>;

export const FPS = 30;
const TRANSITION = 12;
/** Seconds per word when the text is revealed: a calm reading pace. */
const PER_WORD = 0.3;

const words = (text: string) => text.split(/\s+/).filter(Boolean);
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Length of each scene in frames, from how much there is to read. */
export function timing(p: Pick<Props, "text" | "example">) {
  const hook = Math.round(2.8 * FPS);
  const definition = Math.round(clamp(words(p.text).length * PER_WORD + 2.6, 6.5, 12) * FPS);
  const example = p.example ? Math.round(clamp(words(p.example).length * PER_WORD + 2.2, 4, 8) * FPS) : 0;
  const cta = Math.round(3.8 * FPS);
  const cuts = p.example ? 3 : 2;
  return { hook, definition, example, cta, total: hook + definition + example + cta - cuts * TRANSITION };
}

export const calculatePalabraMetadata: CalculateMetadataFunction<Props> = ({ props }) => ({
  durationInFrames: timing(props).total,
});

/** Big word size: long terms or long words need a smaller font to stay inside the frame. */
function wordSize(term: string) {
  const longestWord = Math.max(...term.split(" ").map((w) => w.length));
  const byWord = Math.floor(1700 / Math.max(longestWord, 4));
  const byTotal = term.length > 14 ? 150 : 400;
  return Math.max(110, Math.min(300, byWord, byTotal));
}

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** Fades and lifts an element in, starting `delay` seconds into its scene. */
function useRise(delay: number, distance = 50) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay * FPS, (delay + 0.6) * FPS], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return { opacity: t, translate: `0 ${(1 - t) * distance}px` };
}

/** Springy scale-in for pills, logos and the big word. */
function usePop(delay: number, damping = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay * fps, fps, config: { damping, stiffness: 140 } });
  return { opacity: Math.min(1, s * 2), scale: String(0.6 + 0.4 * s) };
}

const Scene: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top }) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: top ? "flex-start" : "center",
      padding: top ? `${top}px 80px 0` : "0 80px",
      textAlign: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);

const Background: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("fondo-burbujas.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Video src={staticFile("burbujas.mp4")} loop muted objectFit="cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
  </AbsoluteFill>
);

const Hook: React.FC<Props> = ({ term, alias }) => {
  const frame = useCurrentFrame();
  const word = usePop(0.45, 9);
  const aliasIn = useRise(1.1);
  return (
    <Scene>
      <div style={{ position: "absolute", top: 230, display: "flex", alignItems: "center", gap: 18, ...useRise(0, 0) }}>
        <MlLogo width={92} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
        <Wordmark size={38} />
      </div>
      <span style={{ ...pill, ...usePop(0.15) }}>Palabra del día</span>
      <p style={{ margin: "50px 0 0", fontSize: wordSize(term), fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.98, ...gradText, ...word }}>
        {term}
      </p>
      {alias ? <p style={{ margin: "26px 0 0", color: color.muted, fontSize: 44, fontWeight: 650, ...aliasIn }}>{alias}</p> : null}
      <p style={{ margin: "44px 0 0", color: color.muted, fontSize: 48, fontWeight: 500, ...useRise(1.4) }}>Te la explico en segundos.</p>
    </Scene>
  );
};

/** Text that lights up word by word, like reading along. */
const ReadAlong: React.FC<{ text: string; start: number; size: number }> = ({ text, start, size }) => {
  const frame = useCurrentFrame();
  return (
    <p style={{ margin: 0, fontSize: size, fontWeight: 650, letterSpacing: "-0.02em", lineHeight: 1.36, textAlign: "left" }}>
      {words(text).map((w, i) => {
        const at = (start + i * PER_WORD) * FPS;
        const t = interpolate(frame, [at, at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span key={i} style={{ opacity: 0.18 + 0.82 * t }}>
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
};

const Definition: React.FC<Props> = ({ term, topic, text }) => {
  const size = text.length > 170 ? 46 : text.length > 110 ? 52 : 58;
  return (
    <Scene>
      <p style={{ margin: 0, fontSize: 84, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, ...useRise(0.1) }}>
        ¿Qué es <span style={gradText}>{term}</span>?
      </p>
      <div style={{ ...glass, marginTop: 50, borderRadius: 48, padding: "52px 54px", ...useRise(0.5) }}>
        <ReadAlong text={text} start={0.8} size={size} />
      </div>
      <span style={{ ...pill, marginTop: 40, ...usePop(1.4) }}>{topic}</span>
    </Scene>
  );
};

const Example: React.FC<Props> = ({ example }) => (
  <Scene>
    <p style={{ margin: 0, fontSize: 84, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, ...useRise(0.1) }}>
      Para que lo veas <span style={gradText}>claro</span>
    </p>
    <div style={{ ...glass, marginTop: 50, borderRadius: 48, padding: "48px 54px", textAlign: "left", ...useRise(0.5) }}>
      <span style={{ display: "block", marginBottom: 18, color: color.accentInk, fontSize: 36, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Ejemplo
      </span>
      <ReadAlong text={example} start={0.8} size={54} />
    </div>
  </Scene>
);

const Cta: React.FC<Props> = ({ total }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.035 * Math.max(0, Math.sin(((frame - 1.8 * FPS) / FPS) * Math.PI * 1.6));
  const button = usePop(1.1, 10);
  return (
    <Scene>
      <div style={usePop(0.15, 8)}>
        <MlLogo width={280} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
      </div>
      <div style={{ marginTop: 40, ...useRise(0.6) }}>
        <Wordmark size={92} />
      </div>
      <div
        style={{
          marginTop: 70,
          borderRadius: 999,
          background: grad,
          boxShadow: "0 30px 60px rgba(242, 69, 47, 0.35), 0 2px 0 rgba(255, 255, 255, 0.4) inset",
          color: "white",
          fontSize: 50,
          fontWeight: 750,
          padding: "36px 56px",
          opacity: button.opacity,
          scale: String(Number(button.scale) * pulse),
        }}
      >
        Todo el glosario, gratis
      </div>
      <p style={{ margin: "46px 0 0", color: color.muted, fontSize: 44, fontWeight: 600, ...useRise(1.6) }}>{total} palabras explicadas sin jerga en</p>
      <div style={{ ...glass, marginTop: 30, borderRadius: 999, fontSize: 40, fontWeight: 700, padding: "22px 42px", ...useRise(1.9) }}>
        vibecoding.miguelliebana.com
      </div>
    </Scene>
  );
};

/** Thin gradient bar at the bottom that fills up as the reel plays. */
const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 120, height: 10, borderRadius: 99, background: "rgba(20, 23, 34, 0.08)" }}>
      <div style={{ width: `${(frame / (durationInFrames - 1)) * 100}%`, height: "100%", borderRadius: 99, background: grad }} />
    </div>
  );
};

export const PalabraDelDia: React.FC<Props> = (props) => {
  const { fps } = useVideoConfig();
  const t = timing(props);
  const cut = linearTiming({ durationInFrames: TRANSITION });
  return (
    <AbsoluteFill style={{ fontFamily, color: color.ink, WebkitFontSmoothing: "antialiased" }}>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={t.hook} premountFor={fps} name="Gancho">
          <Hook {...props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={t.definition} premountFor={fps} name="Definición">
          <Definition {...props} />
        </TransitionSeries.Sequence>
        {props.example ? (
          <>
            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
            <TransitionSeries.Sequence durationInFrames={t.example} premountFor={fps} name="Ejemplo">
              <Example {...props} />
            </TransitionSeries.Sequence>
          </>
        ) : null}
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={t.cta} premountFor={fps} name="Cierre">
          <Cta {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Progress />
    </AbsoluteFill>
  );
};
