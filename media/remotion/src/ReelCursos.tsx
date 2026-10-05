// Reel announcing the free courses (cursos.miguelliebana.com): hook, three promises, the learning path told by the
// same morphing frame as the catalog hero (phone → code editor → website) with each course's card, and the link.
// The texts are props, so they can be changed in the Studio sidebar.
import { BookOpenText, Check, Code, DeviceMobile, Sparkle } from "@phosphor-icons/react";
import { Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill, Wordmark } from "./brand";

export const reelCursosSchema = z.object({
  hookSmall: z.string(),
  hookBig: z.string(),
  hookSub: z.string(),
  promises: z.array(z.object({ title: z.string(), text: z.string() })),
  url: z.string(),
  linkHint: z.string(),
});

type Props = z.infer<typeof reelCursosSchema>;

export const FPS = 30;
const T = 12;
const SCENES = { hook: 80, promises: 130, path: 270, cta: 130 };
export const DURATION = Object.values(SCENES).reduce((a, b) => a + b, 0) - 3 * T;

const COURSES = [
  { Icon: DeviceMobile, step: "Móvil", title: "Competencias digitales básicas", text: "Si el ordenador o el móvil todavía te imponen." },
  { Icon: Code, step: "Código", title: "HTML y CSS desde cero", text: "Para entender cómo está hecha una web por dentro." },
  { Icon: Sparkle, step: "Tu web", title: "Vibe Coding desde Cero", text: "Para construir tu propia web con IA." },
];
/** Frame where each step of the path starts, inside its scene. */
const STEP_AT = [0, 85, 175];
const CODE = ["<h1>Pastelería Ana</h1>", "<p>Tartas por encargo</p>", "h1 { color: coral; }"];

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function useProgress(from: number, to: number) {
  return interpolate(useCurrentFrame(), [from, to], [0, 1], { ...clamp, easing: ease });
}

function useRise(at: number, distance = 50) {
  const t = useProgress(at, at + 18);
  return { opacity: t, translate: `0 ${(1 - t) * distance}px` };
}

function usePop(at: number, damping = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping, stiffness: 140 } });
  return { opacity: Math.min(1, s * 2), scale: String(0.6 + 0.4 * s) };
}

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 80px", textAlign: "center" }}>{children}</AbsoluteFill>
);

// 1 · Hook
const Hook: React.FC<Props> = ({ hookSmall, hookBig, hookSub }) => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <div style={{ position: "absolute", top: 230, display: "flex", alignItems: "center", gap: 18, ...useRise(0, 0) }}>
        <MlLogo width={92} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
        <Wordmark size={38} />
      </div>
      <span style={{ ...pill, ...usePop(4) }}>
        <BookOpenText size={44} weight="bold" />
        {hookSmall}
      </span>
      <p style={{ margin: "46px 0 0", fontSize: 170, fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.95, ...usePop(12, 9) }}>
        <span style={gradText}>{hookBig}</span>
      </p>
      <p style={{ margin: "40px 0 0", fontSize: 66, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, ...useRise(30) }}>{hookSub}</p>
    </Scene>
  );
};

// 2 · Three promises, stamped one after another
const PromiseRow: React.FC<{ at: number; title: string; text: string }> = ({ at, title, text }) => {
  const frame = useCurrentFrame();
  const t = useProgress(at, at + 14);
  const stamp = interpolate(frame, [at + 6, at + 12, at + 18], [1.6, 0.9, 1], clamp);
  return (
    <div style={{ ...glass, display: "flex", alignItems: "center", gap: 30, borderRadius: 40, padding: "30px 36px", textAlign: "left", opacity: t, translate: `${(1 - t) * -90}px 0` }}>
      <span style={{ display: "grid", flex: "none", placeItems: "center", width: 92, height: 92, borderRadius: 28, background: grad, boxShadow: "0 14px 30px rgba(242,69,47,0.3)", color: "white", scale: String(frame >= at + 6 ? stamp : 0) }}>
        <Check size={56} weight="bold" />
      </span>
      <div>
        <span style={{ display: "block", fontSize: 62, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{title}</span>
        {text ? <span style={{ display: "block", marginTop: 6, color: color.muted, fontSize: 36, fontWeight: 600, lineHeight: 1.25 }}>{text}</span> : null}
      </div>
    </div>
  );
};

const Promises: React.FC<Props> = ({ promises }) => (
  <Scene>
    <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
      {promises.map((p, i) => (
        <PromiseRow at={8 + i * 26} key={p.title} text={p.text} title={p.title} />
      ))}
    </div>
  </Scene>
);

// 3 · The path: one frame that morphs phone → code editor → website, with the course of each step underneath
const Phone: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "auto 1fr auto", justifyItems: "center", padding: "26px 28px 20px" }}>
    <span style={{ width: "36%", height: 26, borderRadius: 999, background: color.ink }} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", alignContent: "start", gap: 26, width: "100%", marginTop: 44 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <AppIcon i={i} key={i} />
      ))}
    </div>
    <span style={{ width: "40%", height: 9, borderRadius: 999, background: "rgba(20,23,34,0.35)" }} />
  </div>
);

const APP_COLORS = [grad, "linear-gradient(135deg, #8f6bff, #5b8cff)", "linear-gradient(135deg, #34d399, #0ea5a4)"];
const AppIcon: React.FC<{ i: number }> = ({ i }) => {
  const order = [3, 7, 1, 10, 5, 0, 8, 2, 11, 6, 4, 9][i];
  return <i style={{ aspectRatio: "1", borderRadius: "26%", background: APP_COLORS[(i * 7) % 3], ...usePop(8 + order * 2.5, 9) }} />;
};

const Editor: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const typed = (line: number) => {
    const from = start + 22 + line * 16;
    const chars = Math.floor(interpolate(frame, [from, from + 15], [0, CODE[line].length], clamp));
    return CODE[line].slice(0, chars);
  };
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1f1b26", color: "#f4ede8", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 40, padding: "0 40px" }}>
      <Bar url="index.html" dark />
      {CODE.map((_, i) => (
        <p key={i} style={{ margin: "26px 0 0", minHeight: 50, color: ["#ff9b7a", "#b9a4ff", "#7ee0c3"][i], whiteSpace: "nowrap" }}>
          {typed(i)}
        </p>
      ))}
      <span style={{ display: "inline-block", width: 18, height: 44, marginTop: 20, background: "#ff8a4c", opacity: Math.floor(frame / 15) % 2 }} />
    </div>
  );
};

const Bar: React.FC<{ url: string; dark?: boolean }> = ({ url, dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "28px 0 10px" }}>
    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
      <i key={c} style={{ width: 20, height: 20, borderRadius: "50%", background: c }} />
    ))}
    <span style={{ marginLeft: 14, flex: 1, borderRadius: 999, background: dark ? "rgba(255,255,255,0.08)" : "rgba(20,23,34,0.06)", color: dark ? "rgba(255,255,255,0.6)" : color.muted, fontFamily, fontSize: 28, fontWeight: 600, padding: "8px 24px" }}>
      {url}
    </span>
  </div>
);

const Site: React.FC<{ start: number }> = ({ start }) => {
  const usePiece = (i: number) => useRise(start + 14 + i * 4, 24);
  const nav = usePiece(0);
  const art = usePiece(1);
  const title = usePiece(2);
  const text = usePiece(3);
  const button = usePiece(4);
  const cards = usePiece(5);
  return (
    <div style={{ position: "absolute", inset: 0, padding: "0 36px" }}>
      <Bar url="pasteleria-ana.com" />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14, ...nav }}>
        <b style={{ width: 44, height: 44, marginRight: "auto", borderRadius: 14, background: grad }} />
        {[0, 1, 2].map((k) => (
          <span key={k} style={{ width: 70, height: 12, borderRadius: 12, background: "rgba(20,23,34,0.14)" }} />
        ))}
      </div>
      <div style={{ position: "relative", height: 230, marginTop: 24, overflow: "hidden", borderRadius: 28, background: "linear-gradient(180deg, #ffe7da, #fff4ee)", ...art }}>
        <span style={{ position: "absolute", right: "16%", top: "16%", width: 70, height: 70, borderRadius: "50%", background: "#ffc46b" }} />
        <span style={{ position: "absolute", inset: "42% -10% -20% -10%", background: "linear-gradient(135deg, #ff9b7a, #ff6a8a)", clipPath: "polygon(0 100%, 30% 25%, 50% 70%, 72% 10%, 100% 100%)" }} />
      </div>
      <div style={{ width: "62%", height: 26, marginTop: 26, borderRadius: 14, background: color.ink, ...title }} />
      <div style={{ width: "82%", height: 12, marginTop: 18, borderRadius: 12, background: "rgba(20,23,34,0.14)", ...text }} />
      <div style={{ width: "32%", height: 40, marginTop: 24, borderRadius: 999, background: grad, ...button }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 26, ...cards }}>
        {[0, 1, 2].map((k) => (
          <span key={k} style={{ height: 76, borderRadius: 20, background: "white", boxShadow: "0 10px 24px rgba(210,90,40,0.1)" }} />
        ))}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ index: number; from: number; to: number }> = ({ index, from, to }) => {
  const frame = useCurrentFrame();
  const inT = interpolate(frame, [from, from + 16], [0, 1], { ...clamp, easing: ease });
  const outT = interpolate(frame, [to - 10, to], [0, 1], { ...clamp, easing: ease });
  const { Icon, title, text } = COURSES[index];
  return (
    <div style={{ ...glass, position: "absolute", left: 0, right: 0, display: "flex", alignItems: "center", gap: 30, borderRadius: 44, padding: "34px 38px", textAlign: "left", opacity: inT * (1 - outT), translate: `${(1 - inT) * 120 - outT * 120}px 0` }}>
      <span style={{ display: "grid", flex: "none", placeItems: "center", width: 104, height: 104, borderRadius: 32, background: grad, boxShadow: "0 14px 30px rgba(242,69,47,0.3)", color: "white" }}>
        <Icon size={58} weight="bold" />
      </span>
      <div>
        <span style={{ display: "block", color: color.accentInk, fontSize: 30, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>Curso {index + 1}</span>
        <span style={{ display: "block", marginTop: 4, fontSize: 52, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05 }}>{title}</span>
        <span style={{ display: "block", marginTop: 8, color: color.muted, fontSize: 34, fontWeight: 600, lineHeight: 1.25 }}>{text}</span>
      </div>
    </div>
  );
};

const Path: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const step = STEP_AT.filter((s) => frame >= s).length - 1;
  // Frame shape: phone, then editor, then website.
  const toEditor = interpolate(frame, [STEP_AT[1], STEP_AT[1] + 22], [0, 1], { ...clamp, easing: ease });
  const toSite = interpolate(frame, [STEP_AT[2], STEP_AT[2] + 22], [0, 1], { ...clamp, easing: ease });
  const width = interpolate(toEditor, [0, 1], [400, 920]);
  const height = interpolate(toEditor, [0, 1], [800, 560]) + interpolate(toSite, [0, 1], [0, 300]);
  const radius = interpolate(toEditor, [0, 1], [70, 40]);
  const enter = usePop(0, 11);
  const show = (from: number, to: number) => interpolate(frame, [from, from + 8, to - 6, to], [0, 1, 1, 0], clamp);
  const promptIn = useRise(STEP_AT[2] - 22, 30);
  const done = usePop(STEP_AT[2] + 50, 8);
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <p style={{ position: "absolute", top: 210, margin: 0, fontSize: 76, fontWeight: 800, letterSpacing: "-0.045em", ...useRise(0) }}>
        De cero a <span style={gradText}>tu web</span>
      </p>
      <div style={{ position: "absolute", top: 330, left: 80, right: 80, display: "flex", justifyContent: "center", gap: 16 }}>
        {COURSES.map((c, i) => (
          <span
            key={c.step}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              borderRadius: 999,
              padding: "10px 26px 10px 10px",
              fontSize: 32,
              fontWeight: 800,
              background: i === step ? grad : "rgba(255,255,255,0.7)",
              color: i === step ? "white" : color.muted,
              border: "2px solid rgba(255,112,52,0.25)",
            }}
          >
            <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: "50%", background: i === step ? "rgba(255,255,255,0.25)" : "rgba(255,112,52,0.12)", color: i === step ? "white" : color.accentInk }}>{i + 1}</span>
            {c.step}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", top: 440, width: 920, height: 860, display: "grid", placeItems: "center" }}>
        <div style={{ ...glass, position: "relative", width, height, overflow: "hidden", borderRadius: radius, background: "rgba(255,255,255,0.72)", ...enter }}>
          <div style={{ opacity: show(0, STEP_AT[1] + 6) }}>
            <Phone />
          </div>
          <div style={{ opacity: show(STEP_AT[1] + 10, STEP_AT[2] + 6) }}>
            <Editor start={STEP_AT[1]} />
          </div>
          <div style={{ opacity: show(STEP_AT[2] + 10, durationInFrames + 20) }}>
            <Site start={STEP_AT[2]} />
          </div>
        </div>
        <div style={{ ...glass, position: "absolute", left: -10, bottom: 10 + toSite * -30, display: "flex", alignItems: "center", gap: 14, borderRadius: 999, padding: "18px 30px", fontSize: 34, fontWeight: 700, background: "rgba(255,255,255,0.92)", ...promptIn }}>
          <Sparkle size={38} weight="fill" color={color.orange} /> Hazme una web para mi pastelería
        </div>
        <div style={{ ...glass, position: "absolute", right: -10, top: 0 + toSite * -10, display: "flex", alignItems: "center", gap: 12, borderRadius: 999, padding: "16px 28px", color: "#0d7a52", fontSize: 34, fontWeight: 800, background: "rgba(255,255,255,0.92)", ...done }}>
          <Check size={36} weight="bold" /> ¡Publicada!
        </div>
      </div>
      <div style={{ position: "absolute", top: 1360, left: 80, right: 80, height: 260 }}>
        {COURSES.map((_, i) => (
          <CourseCard from={STEP_AT[i] + 6} index={i} key={i} to={i < 2 ? STEP_AT[i + 1] + 4 : durationInFrames + 30} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 4 · Call to action
const Cta: React.FC<Props> = ({ url, linkHint }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.035 * Math.max(0, Math.sin(((frame - 50) / FPS) * Math.PI * 1.6));
  const button = usePop(30, 10);
  return (
    <Scene>
      <div style={usePop(4, 8)}>
        <MlLogo width={260} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
      </div>
      <p style={{ margin: "40px 0 0", fontSize: 92, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.02, ...useRise(14) }}>
        Empieza <span style={gradText}>hoy</span>, gratis
      </p>
      <div
        style={{
          marginTop: 60,
          borderRadius: 999,
          background: grad,
          boxShadow: "0 30px 60px rgba(242, 69, 47, 0.35), 0 2px 0 rgba(255, 255, 255, 0.4) inset",
          color: "white",
          fontSize: 52,
          fontWeight: 800,
          padding: "36px 56px",
          opacity: button.opacity,
          scale: String(Number(button.scale) * pulse),
        }}
      >
        {url}
      </div>
      <p style={{ margin: "44px 0 0", color: color.muted, fontSize: 46, fontWeight: 650, ...useRise(48) }}>{linkHint}</p>
    </Scene>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 120, height: 10, borderRadius: 99, background: "rgba(20, 23, 34, 0.08)" }}>
      <div style={{ width: `${(frame / (DURATION - 1)) * 100}%`, height: "100%", borderRadius: 99, background: grad }} />
    </div>
  );
};

export const ReelCursos: React.FC<Props> = (props) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: T });
  const next = slide({ direction: "from-right" });
  return (
    <AbsoluteFill style={{ fontFamily, color: color.ink, WebkitFontSmoothing: "antialiased" }}>
      <AbsoluteFill>
        <Img src={staticFile("fondo-burbujas.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Video src={staticFile("burbujas.mp4")} loop muted objectFit="cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.hook} premountFor={fps} name="Gancho">
          <Hook {...props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.promises} premountFor={fps} name="Promesas">
          <Promises {...props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.path} premountFor={fps} name="La ruta">
          <Path />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cta} premountFor={fps} name="Cierre">
          <Cta {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Progress />
    </AbsoluteFill>
  );
};
