// Reel for neighbourhood shops: hook, a shop website building itself on a phone while what it includes is ticked off,
// the price (from the calculator rules) and the link to /comercios.
import { Check, Clock, DeviceMobile, ForkKnife, Globe, MapPin, Phone, Storefront } from "@phosphor-icons/react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { estimate, REVISIONS } from "../../../src/content/presupuesto";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill, Wordmark } from "./brand";
import { Background, clamp, ease, FPS, Progress, Scene, useBlink, usePop, useRise } from "./kit";

const T = 12;
const SCENES = { hook: 80, build: 240, price: 110, cta: 140 };
export const DURATION = Object.values(SCENES).reduce((a, b) => a + b, 0) - 3 * T;

const simple = estimate({ type: "landing", pages: 1, features: [], content: "todo", urgent: false });
/** Each item appears at its frame, together with its piece of the website on the phone. */
const INCLUDES = [
  { at: 30, Icon: DeviceMobile, text: "Se ve bien en el móvil" },
  { at: 70, Icon: Clock, text: "Horarios y cómo llegar" },
  { at: 105, Icon: Phone, text: "Botón de llamar o WhatsApp" },
  { at: 140, Icon: ForkKnife, text: "Tu carta o tus productos" },
  { at: 175, Icon: Globe, text: "Tu propio dominio" },
];

const Hook: React.FC = () => {
  const blink = useBlink();
  return (
    <Scene>
      <div style={{ position: "absolute", top: 230, display: "flex", alignItems: "center", gap: 18, ...useRise(0, 0) }}>
        <MlLogo width={92} cursor={blink} />
        <Wordmark size={38} />
      </div>
      <span style={{ ...pill, ...usePop(4) }}>
        <Storefront size={44} weight="bold" /> Para comercios del barrio
      </span>
      <p style={{ margin: "50px 0 0", fontSize: 128, fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.98, ...usePop(12, 9) }}>
        ¿Tu comercio aún no tiene <span style={gradText}>web</span>?
      </p>
      <p style={{ margin: "46px 0 0", color: color.muted, fontSize: 52, fontWeight: 600, lineHeight: 1.3, ...useRise(34) }}>Tus clientes te buscan en el móvil.</p>
    </Scene>
  );
};

/** One piece of the phone website, shown from a frame on. */
const Piece: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => (
  <div style={{ ...style, ...useRise(at, 24) }}>{children}</div>
);

const PhoneSite: React.FC = () => (
  <div style={{ position: "absolute", top: 280, left: "50%", width: 470, height: 860, translate: "-50% 0", borderRadius: 64, border: "14px solid #141722", background: "#fffaf6", overflow: "hidden", boxShadow: "0 40px 90px rgba(120,60,30,0.28)", ...usePop(0, 11) }}>
    <span style={{ position: "absolute", top: 14, left: "50%", width: 120, height: 30, translate: "-50% 0", borderRadius: 99, background: "#141722" }} />
    <div style={{ padding: "64px 26px 0", display: "grid", gap: 18 }}>
      <Piece at={14} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <b style={{ width: 44, height: 44, borderRadius: 14, background: grad }} />
        <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em" }}>Pastelería Ana</span>
      </Piece>
      <Piece at={30} style={{ position: "relative", height: 210, borderRadius: 26, overflow: "hidden", background: "linear-gradient(180deg, #ffe7da, #fff4ee)" }}>
        <span style={{ position: "absolute", right: "16%", top: "16%", width: 60, height: 60, borderRadius: "50%", background: "#ffc46b" }} />
        <span style={{ position: "absolute", inset: "42% -10% -20% -10%", background: "linear-gradient(135deg, #ff9b7a, #ff6a8a)", clipPath: "polygon(0 100%, 30% 25%, 50% 70%, 72% 10%, 100% 100%)" }} />
      </Piece>
      <Piece at={70} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 20, background: "white", padding: "16px 18px", boxShadow: "0 8px 20px rgba(210,90,40,0.1)", fontSize: 25, fontWeight: 700 }}>
        <Clock size={32} weight="bold" color="#0d7a52" /> Abierto · 8:00–20:00
        <MapPin size={32} weight="bold" color={color.orange} style={{ marginLeft: "auto" }} />
      </Piece>
      <Piece at={105} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 999, background: grad, color: "white", padding: "16px 0", fontSize: 26, fontWeight: 800 }}>
          <Phone size={30} weight="fill" /> Llamar
        </span>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 999, background: "#25d366", color: "white", padding: "16px 0", fontSize: 26, fontWeight: 800 }}>WhatsApp</span>
      </Piece>
      <Piece at={140} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {["#ffd2bd", "#ffe6a8", "#f9c4d2"].map((c) => (
          <span key={c} style={{ height: 120, borderRadius: 18, background: `linear-gradient(160deg, ${c}, white)`, boxShadow: "0 6px 16px rgba(210,90,40,0.1)" }} />
        ))}
      </Piece>
      <Piece at={175} style={{ alignSelf: "center", justifySelf: "center", borderRadius: 999, background: "rgba(20,23,34,0.06)", color: color.muted, padding: "10px 22px", fontSize: 24, fontWeight: 700 }}>
        pasteleriaana.com
      </Piece>
    </div>
  </div>
);

const Include: React.FC<{ at: number; Icon: typeof Check; text: string }> = ({ at, Icon, text }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 14], [0, 1], { ...clamp, easing: ease });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: t, translate: `${(1 - t) * -60}px 0`, fontSize: 44, fontWeight: 750, letterSpacing: "-0.02em" }}>
      <span style={{ display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: 20, background: grad, color: "white" }}>
        <Icon size={36} weight="bold" />
      </span>
      {text}
    </div>
  );
};

const Build: React.FC = () => (
  <AbsoluteFill>
    <p style={{ position: "absolute", top: 170, width: "100%", margin: 0, textAlign: "center", fontSize: 76, fontWeight: 800, letterSpacing: "-0.045em", ...useRise(0) }}>
      Tu web, <span style={gradText}>lista para vender</span>
    </p>
    <PhoneSite />
    <div style={{ position: "absolute", top: 1190, left: 130, display: "grid", gap: 22 }}>
      {INCLUDES.map((i) => (
        <Include at={i.at} Icon={i.Icon} key={i.text} text={i.text} />
      ))}
    </div>
  </AbsoluteFill>
);

const Price: React.FC = () => {
  const chips = [`Lista en ${simple.weeks[0]}–${simple.weeks[1]} semanas`, `${REVISIONS} rondas de cambios`, "Precio cerrado, por escrito"];
  return (
    <Scene>
      <p style={{ margin: 0, fontSize: 84, fontWeight: 800, letterSpacing: "-0.045em", ...useRise(0) }}>¿Cuánto cuesta?</p>
      <div style={{ ...glass, marginTop: 50, borderRadius: 56, padding: "44px 90px 50px", ...usePop(10, 10) }}>
        <span style={{ display: "block", color: color.muted, fontSize: 48, fontWeight: 700 }}>desde</span>
        <span style={{ display: "block", fontSize: 230, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1, ...gradText }}>{simple.price[0]} €</span>
      </div>
      <div style={{ display: "grid", gap: 18, marginTop: 50 }}>
        {chips.map((c, i) => (
          <Chip at={30 + i * 10} key={c} text={c} />
        ))}
      </div>
    </Scene>
  );
};

const Chip: React.FC<{ at: number; text: string }> = ({ at, text }) => (
  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 14, fontSize: 44, fontWeight: 700, ...useRise(at, 30) }}>
    <Check size={44} weight="bold" color="#0d7a52" /> {text}
  </span>
);

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.03 * Math.max(0, Math.sin(((frame - 50) / FPS) * Math.PI * 1.6));
  const button = usePop(34, 10);
  const blink = useBlink();
  return (
    <Scene>
      <div style={usePop(4, 8)}>
        <MlLogo width={240} cursor={blink} />
      </div>
      <p style={{ margin: "40px 0 0", fontSize: 80, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.05, ...useRise(14) }}>
        Soy Miguel, tu vecino <span style={gradText}>que hace webs</span>
      </p>
      <p style={{ margin: "30px 0 0", color: color.muted, fontSize: 44, fontWeight: 600, ...useRise(24) }}>Mira qué incluye y calcula tu precio:</p>
      <div style={{ marginTop: 40, borderRadius: 999, background: grad, boxShadow: "0 30px 60px rgba(242,69,47,0.35)", color: "white", fontSize: 40, fontWeight: 800, padding: "32px 50px", opacity: button.opacity, scale: String(Number(button.scale) * pulse) }}>
        vibecoding.miguelliebana.com/comercios
      </div>
      <p style={{ margin: "40px 0 0", color: color.muted, fontSize: 44, fontWeight: 650, ...useRise(50) }}>Enlace en el perfil</p>
    </Scene>
  );
};

export const ReelComercios: React.FC = () => {
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
        <TransitionSeries.Sequence durationInFrames={SCENES.build} premountFor={fps} name="Tu web">
          <Build />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={next} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENES.price} premountFor={fps} name="Precio">
          <Price />
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
