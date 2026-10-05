// Reel for the Google Maps self-assessment (/comercios/google): hook, three questions answered with a tapping finger
// (the real questions from src/content/ficha-google.ts), the score counting up with the top improvements, and the link.
import { MapPin, Star } from "@phosphor-icons/react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { criterios, topImprovements, verdict } from "../../../src/content/ficha-google";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill } from "./brand";
import { Background, clamp, ease, Finger, FPS, Progress, Scene, useBlink, usePop, useProgress, useRise } from "./kit";

const T = 12;
const SCENES = { hook: 80, quiz: 240, result: 170, cta: 130 };
export const DURATION = Object.values(SCENES).reduce((a, b) => a + b, 0) - 3 * T;

/** The example shop of the demo: what it answers and what it scores. */
const DEMO_SCORES: Record<string, number> = { verificada: 2, categoria: 1, horario: 1, contacto: 0, fotos: 1, descripcion: 0, resenas: 1, respuestas: 2, productos: 0, novedades: 1 };
const TOTAL = Object.values(DEMO_SCORES).reduce((a, b) => a + b, 0);
const QUESTIONS = [0, 1, 2].map((i) => ({ c: criterios[i], pick: 2 - DEMO_SCORES[criterios[i].id] }));
const Q_LEN = 78;

const Hook: React.FC = () => {
  const blink = useBlink();
  return (
    <Scene>
      <div style={{ position: "absolute", top: 230, ...useRise(0, 0) }}>
        <MlLogo width={92} cursor={blink} />
      </div>
      <span style={{ ...pill, ...usePop(4) }}>
        <MapPin size={44} weight="bold" /> Test gratis para comercios
      </span>
      <p style={{ margin: "50px 0 0", fontSize: 124, fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.98, ...usePop(12, 9) }}>
        ¿Cómo está tu <span style={gradText}>ficha de Google</span>?
      </p>
      <p style={{ margin: "46px 0 0", color: color.muted, fontSize: 52, fontWeight: 600, lineHeight: 1.3, ...useRise(34) }}>
        Es lo primero que ven tus clientes cuando te buscan.
      </p>
    </Scene>
  );
};

const Question: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const start = index * Q_LEN;
  const tap = start + 46;
  const inT = interpolate(frame, [start, start + 14], [0, 1], { ...clamp, easing: ease });
  const outT = index < QUESTIONS.length - 1 ? interpolate(frame, [start + Q_LEN - 10, start + Q_LEN], [0, 1], { ...clamp, easing: ease }) : 0;
  if (frame < start - 2 || (outT >= 1 && index < QUESTIONS.length - 1)) return null;
  const { c, pick } = QUESTIONS[index];
  return (
    <div style={{ ...glass, position: "absolute", left: 0, right: 0, top: 0, borderRadius: 48, padding: "44px 44px 50px", textAlign: "left", opacity: inT * (1 - outT), translate: `${(1 - inT) * 140 - outT * 140}px 0` }}>
      <span style={{ display: "block", color: color.accentInk, fontSize: 32, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>Pregunta {index + 1} de 10</span>
      <p style={{ margin: "16px 0 0", fontSize: 54, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>{c.pregunta}</p>
      <div style={{ display: "grid", gap: 18, marginTop: 34 }}>
        {c.opciones.map((o, k) => {
          const chosen = k === pick && frame >= tap;
          return (
            <span
              key={o}
              style={{
                position: "relative",
                borderRadius: 999,
                border: `3px solid ${chosen ? color.orange : "rgba(20,23,34,0.12)"}`,
                background: chosen ? "rgba(255,112,52,0.12)" : "rgba(255,255,255,0.8)",
                color: chosen ? color.accentInk : color.ink,
                padding: "22px 32px",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              {o}
              {k === pick ? <Finger at={tap} /> : null}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Quiz: React.FC = () => {
  const frame = useCurrentFrame();
  const answered = Math.min(QUESTIONS.length, Math.floor((frame - 46) / Q_LEN) + 1);
  return (
    <AbsoluteFill>
      <p style={{ position: "absolute", top: 220, width: "100%", margin: 0, textAlign: "center", fontSize: 76, fontWeight: 800, letterSpacing: "-0.045em", ...useRise(0) }}>
        10 preguntas, <span style={gradText}>2 minutos</span>
      </p>
      <div style={{ position: "absolute", top: 360, left: 120, right: 120, height: 14, borderRadius: 99, background: "rgba(20,23,34,0.08)" }}>
        <div style={{ width: `${(Math.max(0, answered) / 10) * 100}%`, height: "100%", borderRadius: 99, background: grad }} />
      </div>
      <div style={{ position: "absolute", top: 460, left: 80, right: 80 }}>
        {QUESTIONS.map((_, i) => (
          <Question index={i} key={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Result: React.FC = () => {
  const t = useProgress(8, 50);
  const score = Math.round(TOTAL * t);
  const [title, text] = verdict(TOTAL);
  const tips = topImprovements(DEMO_SCORES);
  return (
    <AbsoluteFill style={{ alignItems: "center", padding: "220px 80px 0", textAlign: "center" }}>
      <div style={{ display: "grid", placeItems: "center", width: 420, height: 420, borderRadius: "50%", background: `conic-gradient(${color.orange} ${(score / 20) * 360}deg, rgba(20,23,34,0.08) 0)`, ...usePop(0, 11) }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", width: 330, height: 330, paddingTop: 100, borderRadius: "50%", background: "white" }}>
          <span style={{ fontSize: 170, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1 }}>{score}</span>
          <span style={{ color: color.muted, fontSize: 56, fontWeight: 700 }}>/20</span>
        </div>
      </div>
      <p style={{ margin: "44px 0 0", fontSize: 70, fontWeight: 800, letterSpacing: "-0.04em", ...useRise(50) }}>{title}</p>
      <p style={{ margin: "14px 0 0", color: color.muted, fontSize: 38, fontWeight: 600, lineHeight: 1.35, ...useRise(58) }}>{text}</p>
      <div style={{ display: "grid", gap: 18, width: "100%", marginTop: 44, textAlign: "left" }}>
        {tips.map((c, i) => (
          <Tip at={78 + i * 12} index={i} key={c.id} title={c.titulo} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Tip: React.FC<{ at: number; index: number; title: string }> = ({ at, index, title }) => (
  <div style={{ ...glass, display: "flex", alignItems: "center", gap: 24, borderRadius: 32, padding: "22px 30px", fontSize: 42, fontWeight: 750, ...useRise(at, 30) }}>
    <span style={{ display: "grid", placeItems: "center", width: 60, height: 60, borderRadius: 18, background: grad, color: "white", fontSize: 34, fontWeight: 800 }}>{index + 1}</span>
    {title}
  </div>
);

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.03 * Math.max(0, Math.sin(((frame - 50) / FPS) * Math.PI * 1.6));
  const button = usePop(30, 10);
  const blink = useBlink();
  return (
    <Scene>
      <span style={{ display: "flex", gap: 10, color: "#f5a524", ...usePop(4) }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={64} weight="fill" />
        ))}
      </span>
      <p style={{ margin: "36px 0 0", fontSize: 96, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.02, ...useRise(10) }}>
        Haz el test <span style={gradText}>gratis</span>
      </p>
      <p style={{ margin: "24px 0 0", color: color.muted, fontSize: 46, fontWeight: 600, ...useRise(20) }}>2 minutos · sin registro · con consejos</p>
      <div style={{ marginTop: 50, borderRadius: 999, background: grad, boxShadow: "0 30px 60px rgba(242,69,47,0.35)", color: "white", fontSize: 36, fontWeight: 800, padding: "30px 46px", opacity: button.opacity, scale: String(Number(button.scale) * pulse) }}>
        vibecoding.miguelliebana.com/comercios/google
      </div>
      <p style={{ margin: "36px 0 0", color: color.muted, fontSize: 44, fontWeight: 650, ...useRise(46) }}>Enlace en el perfil</p>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 70, fontSize: 36, fontWeight: 700, ...useRise(60) }}>
        <MlLogo width={90} cursor={blink} /> Miguel, tu vecino que hace webs
      </div>
    </Scene>
  );
};

export const ReelFichaGoogle: React.FC = () => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: T });
  const next = slide({ direction: "from-right" });
  return (
    <AbsoluteFill style={{ fontFamily, color: color.ink, WebkitFontSmoothing: "antialiased" }}>
      <Background kind="seda" />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.hook} premountFor={fps} name="Gancho">
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.quiz} premountFor={fps} name="Preguntas">
          <Quiz />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.result} premountFor={fps} name="Resultado">
          <Result />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cta} premountFor={fps} name="Cierre">
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Progress duration={DURATION} />
    </AbsoluteFill>
  );
};
