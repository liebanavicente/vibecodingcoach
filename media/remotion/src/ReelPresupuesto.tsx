// Reel «¿Cuánto costaría tu web?»: someone fills in the budget calculator, their website builds itself and the
// estimate counts up, then the call to action sends people to /presupuesto. The numbers come from the real
// calculator (src/content/presupuesto.ts), so the reel never shows a price the website wouldn't.
import { CalendarCheck, Check, EnvelopeSimple, HandPointing } from "@phosphor-icons/react";
import { Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { type Answers, estimate, features, RATE, REVISIONS, webTypes } from "../../../src/content/presupuesto";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill, Wordmark } from "./brand";

export const FPS = 30;
const T = 12;
const SCENES = { hook: 80, calc: 200, build: 180, why: 110, cta: 130 };
export const DURATION = Object.values(SCENES).reduce((a, b) => a + b, 0) - 4 * T;

const START: Answers = { type: "landing", pages: 1, features: [], content: "parte", urgent: false };
/** Taps in the calculator scene: frame and what the answers become. */
const TAPS: { at: number; answers: Answers }[] = [
  { at: 50, answers: { ...START, type: "negocio", pages: 5 } },
  { at: 95, answers: { ...START, type: "negocio", pages: 5, features: ["contacto"] } },
  { at: 135, answers: { ...START, type: "negocio", pages: 5, features: ["contacto", "reservas"] } },
];
const FINAL = TAPS[TAPS.length - 1].answers;
const FINAL_FEATURES = ["contacto", "reservas"] as const;

const ease = Easing.bezier(0.22, 1, 0.36, 1);
// Thousands with a dot, also for 4-digit numbers (1.450), which Spanish formatting would leave ungrouped.
const eur = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function useProgress(from: number, to: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
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

const Headline: React.FC<{ children: React.ReactNode; at?: number; size?: number }> = ({ children, at = 0, size = 84 }) => (
  <p style={{ margin: 0, fontSize: size, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.04, ...useRise(at) }}>{children}</p>
);

// 1 · Hook
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <div style={{ position: "absolute", top: 230, display: "flex", alignItems: "center", gap: 18, ...useRise(0, 0) }}>
        <MlLogo width={92} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
        <Wordmark size={38} />
      </div>
      <span style={{ ...pill, ...usePop(4) }}>Te la hago yo</span>
      <p style={{ margin: "50px 0 0", fontSize: 150, fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.98, ...usePop(12, 9) }}>
        ¿Cuánto costaría <span style={gradText}>tu web</span>?
      </p>
      <p style={{ margin: "50px 0 0", color: color.muted, fontSize: 50, fontWeight: 550, lineHeight: 1.3, ...useRise(34) }}>Calcúlalo tú en un minuto. Gratis y sin dar tu email.</p>
    </Scene>
  );
};

/** A finger that comes in and taps the element it sits in, at frame `at`. */
const Finger: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const show = interpolate(frame, [at - 16, at - 6, at + 8, at + 16], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const press = interpolate(frame, [at - 3, at, at + 4], [1, 0.82, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const travel = interpolate(frame, [at - 16, at - 3], [90, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const ring = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <span style={{ position: "absolute", right: 24, bottom: -34, pointerEvents: "none", opacity: show }}>
      <span style={{ position: "absolute", left: 6, top: -6, width: 60, height: 60, borderRadius: "50%", border: "4px solid #ff6a2c", opacity: frame >= at ? 1 - ring : 0, scale: String(0.5 + ring) }} />
      <HandPointing size={84} weight="fill" color={color.ink} style={{ display: "block", translate: `${travel}px ${travel}px`, scale: String(press), filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.25))" }} />
    </span>
  );
};

// 2 · Filling in the calculator, with the live estimate in a bar at the bottom
const Calculator: React.FC = () => {
  const frame = useCurrentFrame();
  const done = TAPS.filter((t) => frame >= t.at);
  const answers = done.length ? done[done.length - 1].answers : START;
  const e = estimate(answers);
  const bump = done.length ? interpolate(frame - done[done.length - 1].at, [0, 5, 12], [1, 1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const option = (selected: boolean) =>
    ({
      position: "relative",
      border: `3px solid ${selected ? "#ff6a2c" : "rgba(20,23,34,0.1)"}`,
      background: selected ? "rgba(255,112,52,0.12)" : "rgba(255,255,255,0.8)",
      boxShadow: selected ? "0 0 0 6px rgba(255,112,52,0.15)" : "none",
    }) as const;
  return (
    <AbsoluteFill style={{ padding: "250px 70px 0" }}>
      <div style={{ textAlign: "center" }}>
        <Headline size={76}>
          Elige lo que <span style={gradText}>necesitas</span>
        </Headline>
      </div>
      <div style={{ ...glass, marginTop: 60, borderRadius: 48, padding: "44px 40px", ...useRise(8) }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>¿Qué tipo de web necesitas?</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 26 }}>
          {webTypes.map((t) => (
            <div key={t.id} style={{ ...option(answers.type === t.id), borderRadius: 28, padding: "24px 24px", fontSize: 32, fontWeight: 750, lineHeight: 1.2 }}>
              {t.label}
              {t.id === TAPS[0].answers.type ? <Finger at={TAPS[0].at} /> : null}
            </div>
          ))}
        </div>
        <p style={{ margin: "44px 0 0", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>¿Qué tiene que hacer?</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 24 }}>
          {features.map((f) => {
            const tap = TAPS.find((t) => t.answers.features[t.answers.features.length - 1] === f.id);
            return (
              <span key={f.id} style={{ ...option(answers.features.includes(f.id)), borderRadius: 999, padding: "14px 24px", color: answers.features.includes(f.id) ? color.accentInk : color.ink, fontSize: 29, fontWeight: 700 }}>
                {f.label}
                {tap ? <Finger at={tap.at} /> : null}
              </span>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 1440,
          borderRadius: 36,
          background: color.ink,
          boxShadow: "0 30px 60px rgba(20,23,34,0.3)",
          color: "white",
          padding: "30px 40px",
          ...useRise(20),
        }}
      >
        <span style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 28, fontWeight: 700 }}>Estimación al momento</span>
        <span style={{ display: "inline-block", marginTop: 6, fontSize: 70, fontWeight: 800, letterSpacing: "-0.04em", scale: String(bump), transformOrigin: "left center" }}>
          {eur(e.price[0])}–{eur(e.price[1])} €
        </span>
        <span style={{ display: "block", marginTop: 4, color: "rgba(255,255,255,0.7)", fontSize: 30, fontWeight: 600 }}>
          {e.hours[0]}–{e.hours[1]} h · {e.weeks[0]}–{e.weeks[1]} semanas
        </span>
      </div>
    </AbsoluteFill>
  );
};

const FEATURE_ICON = { contacto: EnvelopeSimple, reservas: CalendarCheck } as const;
const PAGE_NAMES = ["Inicio", "Servicios", "Sobre mí", "Galería", "Contacto"];

const PageTab: React.FC<{ at: number; label: string }> = ({ at, label }) => (
  <span style={{ borderRadius: 999, background: "rgba(20,23,34,0.06)", fontSize: 28, fontWeight: 650, padding: "10px 22px", ...usePop(at) }}>{label}</span>
);

const FeatureCard: React.FC<{ at: number; id: keyof typeof FEATURE_ICON }> = ({ at, id }) => {
  const Icon = FEATURE_ICON[id];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, borderRadius: 26, background: "white", boxShadow: "0 10px 26px rgba(20,23,34,0.07)", padding: "20px 22px", fontSize: 34, fontWeight: 750, ...usePop(at) }}>
      <span style={{ display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: 20, background: grad, color: "white" }}>
        <Icon size={38} weight="bold" />
      </span>
      {id === "contacto" ? "Contacto" : "Reservas"}
    </div>
  );
};

// 3 · The website assembles and the estimate counts up
const Build: React.FC = () => {
  const e = estimate(FINAL);
  const win = usePop(6);
  const hero = useProgress(36, 62);
  const t = useProgress(95, 150);
  const frame = useCurrentFrame();
  const count = (n: number, step = 1) => Math.round((n * t) / step) * step;
  const stat = { ...glass, flex: 1, borderRadius: 34, padding: "28px 28px 26px", textAlign: "left" } as const;
  const label = { display: "block", color: color.accentInk, fontSize: 26, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase" } as const;
  const big = { display: "block", marginTop: 8, fontSize: 56, fontWeight: 800, letterSpacing: "-0.04em", whiteSpace: "nowrap" } as const;
  return (
    <AbsoluteFill style={{ padding: "250px 70px 0", textAlign: "center" }}>
      <Headline size={76}>
        Y ves <span style={gradText}>tu web</span>
      </Headline>
      <div style={{ ...glass, marginTop: 60, borderRadius: 44, overflow: "hidden", textAlign: "left", ...win }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "22px 26px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <i key={c} style={{ width: 20, height: 20, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ marginLeft: 16, flex: 1, borderRadius: 999, background: "rgba(20,23,34,0.06)", color: color.muted, fontSize: 28, fontWeight: 600, padding: "10px 24px" }}>tu-negocio.com</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "4px 30px 0" }}>
          {PAGE_NAMES.map((p, i) => (
            <PageTab at={18 + i * 5} key={p} label={p} />
          ))}
        </div>
        <div style={{ margin: "26px 30px 0", borderRadius: 30, background: grad, padding: "34px 34px", opacity: hero }}>
          <div style={{ width: `${hero * 64}%`, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.95)" }} />
          <div style={{ width: `${hero * 42}%`, height: 22, marginTop: 16, borderRadius: 11, background: "rgba(255,255,255,0.6)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: "24px 30px 32px" }}>
          {FINAL_FEATURES.map((id, i) => (
            <FeatureCard at={62 + i * 10} id={id} key={id} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
        <div style={{ ...stat, ...useRise(88) }}>
          <span style={label}>Horas</span>
          <span style={big}>
            {count(e.hours[0])}–{count(e.hours[1])}
          </span>
          <span style={{ color: color.muted, fontSize: 26, fontWeight: 600 }}>a {RATE} €/h</span>
        </div>
        <div style={{ ...stat, flex: 1.5, ...useRise(96) }}>
          <span style={label}>Precio</span>
          <span style={{ ...big, ...gradText }}>
            {eur(count(e.price[0], 25))}–{eur(count(e.price[1], 25))} €
          </span>
          <span style={{ color: color.muted, fontSize: 26, fontWeight: 600 }}>precio de lanzamiento</span>
        </div>
      </div>
      <div style={{ ...stat, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, ...useRise(104) }}>
        <div>
          <span style={label}>Entrega</span>
          <span style={big}>
            {e.weeks[0]}–{e.weeks[1]} semanas
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {Array.from({ length: e.weeks[1] }, (_, i) => (
            <i key={i} style={{ width: 34, height: 34, borderRadius: 10, background: frame >= 120 + i * 6 ? (i < e.weeks[0] ? "#ff6a2c" : "rgba(255,106,44,0.35)") : "rgba(20,23,34,0.08)" }} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 4 · Why it's honest
const Why: React.FC = () => {
  const items = [`Por horas, a ${RATE} €/h como mis clases`, `${REVISIONS} rondas de cambios incluidas`, "El precio final, en una llamada gratis"];
  return (
    <Scene>
      <Headline>
        Sin <span style={gradText}>sorpresas</span>
      </Headline>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", marginTop: 70, textAlign: "left" }}>
        {items.map((text, i) => (
          <Item key={text} at={14 + i * 12} text={text} />
        ))}
      </div>
    </Scene>
  );
};

const Item: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const t = useProgress(at, at + 16);
  return (
    <div style={{ ...glass, display: "flex", alignItems: "center", gap: 28, borderRadius: 40, padding: "30px 36px", fontSize: 46, fontWeight: 700, letterSpacing: "-0.02em", opacity: t, translate: `${(1 - t) * -80}px 0` }}>
      <span style={{ display: "grid", flex: "none", placeItems: "center", width: 78, height: 78, borderRadius: 24, background: "rgba(40,180,120,0.14)", color: "#0d7a52" }}>
        <Check size={46} weight="bold" />
      </span>
      {text}
    </div>
  );
};

// 5 · Call to action
const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.035 * Math.max(0, Math.sin(((frame - 50) / FPS) * Math.PI * 1.6));
  const button = usePop(30, 10);
  return (
    <Scene>
      <div style={usePop(4, 8)}>
        <MlLogo width={260} cursor={Math.floor(frame / 15) % 2 ? 0 : 1} />
      </div>
      <div style={{ marginTop: 36, ...useRise(16) }}>
        <Wordmark size={88} />
      </div>
      <div
        style={{
          marginTop: 70,
          borderRadius: 999,
          background: grad,
          boxShadow: "0 30px 60px rgba(242, 69, 47, 0.35), 0 2px 0 rgba(255, 255, 255, 0.4) inset",
          color: "white",
          fontSize: 54,
          fontWeight: 800,
          padding: "38px 60px",
          opacity: button.opacity,
          scale: String(Number(button.scale) * pulse),
        }}
      >
        Calcula tu presupuesto
      </div>
      <div style={{ ...glass, marginTop: 46, borderRadius: 999, fontSize: 38, fontWeight: 700, padding: "22px 40px", ...useRise(44) }}>
        vibecoding.miguelliebana.com/presupuesto
      </div>
      <p style={{ margin: "44px 0 0", color: color.muted, fontSize: 44, fontWeight: 650, ...useRise(56) }}>Enlace en mis stories y en el perfil</p>
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

export const ReelPresupuesto: React.FC = () => {
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
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.calc} premountFor={fps} name="Calculadora">
          <Calculator />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.build} premountFor={fps} name="Tu web">
          <Build />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.why} premountFor={fps} name="Sin sorpresas">
          <Why />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cta} premountFor={fps} name="Cierre">
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Progress />
    </AbsoluteFill>
  );
};
