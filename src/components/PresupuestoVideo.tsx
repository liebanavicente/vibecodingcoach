// Remotion composition for the budget calculator: the visitor's website builds itself in a browser window (pages,
// then features) and the estimate counts up underneath. It plays in the page through @remotion/player, so every
// answer changes the video without rendering a file. Fonts and colours come from the page's CSS.
import {
  CalendarCheck,
  EnvelopeSimple,
  LockKey,
  Newspaper,
  Robot,
  ShoppingCart,
  Translate,
} from "@phosphor-icons/react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { type Answers, type Estimate, type Feature, RATE, REVISIONS, webTypes } from "@/content/presupuesto";

export type PresupuestoVideoProps = { answers: Answers; estimate: Estimate };

export const VIDEO = {
  fps: 30,
  width: 1080,
  height: 1350,
  durationInFrames: 360,
};

const grad = "linear-gradient(120deg, #ff9440 0%, #ff6a2c 45%, #f2452f 100%)";
const ink = "#141722";
const muted = "#5d6272";
const accentInk = "#df4f1c";
const glass = {
  border: "2px solid rgba(255, 255, 255, 0.92)",
  background: "rgba(255, 255, 255, 0.72)",
  boxShadow:
    "0 2px 0 rgba(255, 255, 255, 0.9) inset, 0 40px 90px rgba(210, 90, 40, 0.16), 0 6px 18px rgba(20, 23, 34, 0.06)",
};

const WINDOW_TOP = 220;

const PAGE_NAMES = ["Inicio", "Servicios", "Sobre mí", "Galería", "Contacto", "Precios", "Opiniones", "Blog"];
const FEATURES: Record<Feature, { label: string; Icon: typeof Robot }> = {
  contacto: { label: "Contacto", Icon: EnvelopeSimple },
  reservas: { label: "Reservas", Icon: CalendarCheck },
  tienda: { label: "Tienda", Icon: ShoppingCart },
  privada: { label: "Área privada", Icon: LockKey },
  blog: { label: "Blog", Icon: Newspaper },
  idiomas: { label: "Idiomas", Icon: Translate },
  ia: { label: "Asistente IA", Icon: Robot },
};

const ease = Easing.bezier(0.22, 1, 0.36, 1);
// Spanish formatting leaves 4-digit numbers ungrouped (1450); prices read better as 1.450.
const eur = (n: number) => new Intl.NumberFormat("es-ES", { useGrouping: "always" }).format(n);

/** 0 → 1 between two frames, eased. */
function useProgress(from: number, to: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

/** Springy entrance starting at a frame. */
function usePop(at: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - at,
    fps,
    config: { damping: 13, stiffness: 150 },
  });
  return { opacity: Math.min(1, s * 2), scale: String(0.7 + 0.3 * s) };
}

function useRise(at: number) {
  const t = useProgress(at, at + 18);
  return { opacity: t, translate: `0 ${(1 - t) * 40}px` };
}

/** Soft warm blobs drifting behind everything, like the site's bubbles. */
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 40;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #fff6ef 0%, #ffe9dc 55%, #ffd9c6 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: -200 + drift,
          top: -160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,148,64,0.35), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          right: -260,
          bottom: -200 - drift,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,69,47,0.22), transparent 65%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Tab: React.FC<{ label: string; at: number }> = ({ label, at }) => (
  <span
    style={{
      borderRadius: 999,
      background: "rgba(20, 23, 34, 0.06)",
      color: ink,
      fontSize: 24,
      fontWeight: 650,
      padding: "8px 18px",
      ...usePop(at),
    }}
  >
    {label}
  </span>
);

const Block: React.FC<{ id: Feature; at: number }> = ({ id, at }) => {
  const { label, Icon } = FEATURES[id];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderRadius: 22,
        background: "white",
        boxShadow: "0 10px 26px rgba(20,23,34,0.07)",
        padding: "16px 18px",
        fontSize: 26,
        fontWeight: 700,
        ...usePop(at),
      }}
    >
      <span
        style={{
          display: "grid",
          flex: "none",
          placeItems: "center",
          width: 52,
          height: 52,
          borderRadius: 16,
          background: grad,
          color: "white",
        }}
      >
        <Icon size={30} weight="bold" />
      </span>
      {label}
    </div>
  );
};

/** The visitor's website, assembling itself: window, menu with its pages, a hero and one block per feature. */
const Browser: React.FC<{ answers: Answers; height: number }> = ({ answers, height }) => {
  const win = usePop(8);
  const heroLine = useProgress(40, 70);
  const pages = Math.min(answers.pages, 6);
  const tabs = PAGE_NAMES.slice(0, pages);
  const more = answers.pages - pages;
  const feats = answers.features;
  const featStart = 70 + tabs.length * 5;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: WINDOW_TOP,
        height,
        borderRadius: 36,
        overflow: "hidden",
        ...glass,
        ...win,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 22px",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <i
            key={c}
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 16,
            flex: 1,
            borderRadius: 999,
            background: "rgba(20,23,34,0.06)",
            color: muted,
            fontSize: 22,
            fontWeight: 600,
            padding: "8px 20px",
          }}
        >
          tu-web.com
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          padding: "6px 26px 0",
        }}
      >
        {tabs.map((t, i) => (
          <Tab at={26 + i * 5} key={t} label={t} />
        ))}
        {more > 0 ? <Tab at={26 + tabs.length * 5} label={`+${more}`} /> : null}
      </div>
      <div
        style={{
          margin: "22px 26px 0",
          borderRadius: 26,
          background: grad,
          padding: "28px 30px",
          opacity: heroLine,
        }}
      >
        <div
          style={{
            width: `${heroLine * 62}%`,
            height: 26,
            borderRadius: 13,
            background: "rgba(255,255,255,0.95)",
          }}
        />
        <div
          style={{
            width: `${heroLine * 40}%`,
            height: 18,
            marginTop: 14,
            borderRadius: 9,
            background: "rgba(255,255,255,0.6)",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 14,
          padding: "20px 26px",
        }}
      >
        {feats.length
          ? feats.map((id, i) => <Block at={featStart + i * 9} id={id} key={id} />)
          : [0, 1, 2].map((i) => <Placeholder at={featStart + i * 9} key={i} />)}
      </div>
    </div>
  );
};

/** Empty block when no feature is chosen, so the page still looks like a page. */
const Placeholder: React.FC<{ at: number }> = ({ at }) => (
  <div
    style={{
      height: 84,
      borderRadius: 22,
      background: "rgba(255,255,255,0.8)",
      ...usePop(at),
    }}
  />
);

const Stat: React.FC<{
  label: string;
  at: number;
  children: React.ReactNode;
  wide?: boolean;
}> = ({ label, at, children, wide }) => (
  <div
    style={{
      flex: wide ? 1.35 : 1,
      borderRadius: 32,
      padding: "26px 26px 24px",
      ...glass,
      ...useRise(at),
    }}
  >
    <span
      style={{
        display: "block",
        color: accentInk,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

/** Hours, price and weeks counting up to the estimate. */
const Numbers: React.FC<{
  estimate: Estimate;
  urgent: boolean;
  top: number;
}> = ({ estimate: e, urgent, top }) => {
  const frame = useCurrentFrame();
  const t = useProgress(175, 235);
  const count = (n: number, step = 1) => Math.round((n * t) / step) * step;
  const weeks = Math.min(e.weeks[1], 12);
  const big = {
    display: "block",
    marginTop: 8,
    fontSize: 46,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  } as const;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top,
        display: "flex",
        gap: 16,
      }}
    >
      <Stat at={165} label="Horas">
        <span style={big}>
          {count(e.hours[0])}–{count(e.hours[1])}
        </span>
        <span style={{ color: muted, fontSize: 22, fontWeight: 600 }}>a {RATE} €/h</span>
      </Stat>
      <Stat at={175} label="Precio" wide>
        <span
          style={{
            ...big,
            fontSize: e.price[1] >= 1000 ? 40 : 46,
            backgroundImage: grad,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {eur(count(e.price[0], 25))}–{eur(count(e.price[1], 25))} €
        </span>
        <span style={{ color: muted, fontSize: 22, fontWeight: 600 }}>
          {urgent ? "con urgencia (+15 %)" : "precio de lanzamiento"}
        </span>
      </Stat>
      <Stat at={185} label="Entrega">
        <span style={big}>{e.weeks[0] === e.weeks[1] ? e.weeks[0] : `${e.weeks[0]}–${e.weeks[1]}`} sem.</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {Array.from({ length: weeks }, (_, i) => {
            const on = frame >= 200 + i * 5;
            return (
              <i
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: on ? (i < e.weeks[0] ? "#ff6a2c" : "rgba(255,106,44,0.35)") : "rgba(20,23,34,0.08)",
                }}
              />
            );
          })}
        </div>
      </Stat>
    </div>
  );
};

export const PresupuestoVideo: React.FC<PresupuestoVideoProps> = ({ answers, estimate }) => {
  const type = webTypes.find((t) => t.id === answers.type)?.label ?? "Tu web";
  // The window grows with the rows of features (three per row) and everything below follows it.
  const rows = Math.max(1, Math.ceil(answers.features.length / 3));
  const windowHeight = 300 + rows * 98;
  const statsTop = WINDOW_TOP + windowHeight + 26;
  // Centre the whole block above the player controls (bottom ~170 px) when there are few rows.
  const shift = Math.max(0, (1180 - (statsTop + 272)) / 2);
  return (
    <AbsoluteFill style={{ color: ink, fontFamily: "inherit" }}>
      <Background />
      <AbsoluteFill style={{ top: shift }}>
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            top: 64,
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              border: "2px solid rgba(255,112,52,0.25)",
              borderRadius: 999,
              background: "rgba(255,112,52,0.12)",
              color: accentInk,
              fontSize: 26,
              fontWeight: 750,
              padding: "10px 24px",
              ...usePop(0),
            }}
          >
            Tu web, en una estimación
          </span>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              ...useRise(6),
            }}
          >
            {type}
          </p>
        </div>
        <Browser answers={answers} height={windowHeight} />
        <Numbers estimate={estimate} top={statsTop} urgent={answers.urgent} />
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            top: statsTop + 232,
            textAlign: "center",
            ...useRise(265),
          }}
        >
          <p style={{ margin: 0, fontSize: 30, fontWeight: 700 }}>
            {REVISIONS} rondas de cambios incluidas ·{" "}
            <span style={{ color: accentInk }}>se cierra en una llamada gratis</span>
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
