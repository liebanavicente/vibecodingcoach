// «¿Qué imprime este código?»: a hook-first vertical reel. The question and the code are on screen from frame 0
// (the first second decides whether people stay), a countdown asks for a comment, and the answer only arrives at 6 s.
// Then the rule in two lines, an everyday comparison and the series outro. Content lives in retos.ts.
import { ChatCircleDots, CheckCircle } from "@phosphor-icons/react";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { color, fontFamily, glass, grad, gradText, MlLogo, pill } from "./brand";
import { Background, clamp, Progress, useBlink, usePop, useProgress, useRise } from "./kit";
import type { Reto } from "./retos";

const { fontFamily: mono } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });

/** Frames of each moment. The answer waits until REVEAL so people stay to see it. */
export const AT = { countdown: 30, reveal: 180, rule: 300, analogy: 380, outro: 480 };
export const DURATION = 600;

const KEYWORDS = new Set(["function", "const", "let", "return", "if", "else", "for", "of", "while", "true", "false", "undefined", "null"]);
const SYNTAX = { keyword: "#ff7ab2", fn: "#6bdfff", string: "#ffa657", number: "#d2a8ff", comment: "#8b949e", plain: "#e6edf3" };

/** A tiny highlighter: enough for the short snippets of the challenges. */
function tokens(line: string) {
  const parts: { text: string; kind: keyof typeof SYNTAX }[] = [];
  const re = /(\/\/.*$)|("[^"]*"|'[^']*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|(.)/g;
  for (const m of line.matchAll(re)) {
    const [text, comment, string, number, word] = m;
    if (comment) parts.push({ text, kind: "comment" });
    else if (string) parts.push({ text, kind: "string" });
    else if (number) parts.push({ text, kind: "number" });
    else if (word) {
      const next = line.slice((m.index ?? 0) + text.length).trimStart();
      parts.push({ text, kind: KEYWORDS.has(word) ? "keyword" : next.startsWith("(") ? "fn" : "plain" });
    } else parts.push({ text, kind: "plain" });
  }
  return parts;
}

const CodeCard: React.FC<{ code: string; scale: number }> = ({ code, scale }) => (
  <div
    style={{
      width: 920,
      borderRadius: 34,
      background: "#0d1117",
      boxShadow: "0 40px 90px rgba(20, 23, 34, 0.35)",
      overflow: "hidden",
      scale: String(scale),
      transformOrigin: "top center",
    }}
  >
    <div style={{ display: "flex", gap: 14, padding: "26px 32px", background: "#161b22" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <span key={c} style={{ width: 22, height: 22, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ marginLeft: 18, color: "#8b949e", fontFamily: mono, fontSize: 28 }}>reto.js</span>
    </div>
    <pre style={{ margin: 0, padding: "34px 40px 40px", fontFamily: mono, fontSize: 46, lineHeight: 1.5, textAlign: "left", whiteSpace: "pre" }}>
      {code.split("\n").map((line, i) => (
        <div key={i} style={{ minHeight: "1.5em" }}>
          {tokens(line).map((t, j) => (
            <span key={j} style={{ color: SYNTAX[t.kind] }}>
              {t.text}
            </span>
          ))}
        </div>
      ))}
    </pre>
  </div>
);

const Option: React.FC<{ letter: string; text: string; state: "idle" | "right" | "wrong"; at: number }> = ({ letter, text, state, at }) => {
  const pop = usePop(at, 14);
  const right = state === "right";
  return (
    <div
      style={{
        ...glass,
        display: "flex",
        alignItems: "center",
        gap: 22,
        borderRadius: 26,
        padding: "22px 28px",
        fontSize: 42,
        fontWeight: 700,
        color: color.ink,
        opacity: state === "wrong" ? 0.35 * pop.opacity : pop.opacity,
        scale: right ? "1.06" : pop.scale,
        background: right ? "#dcfce7" : glass.background,
        border: right ? "4px solid #16a34a" : glass.border,
        transition: "none",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 62,
          height: 62,
          flex: "none",
          borderRadius: 18,
          background: right ? "#16a34a" : grad,
          color: "white",
          fontSize: 36,
          fontWeight: 800,
        }}
      >
        {right ? <CheckCircle size={40} weight="fill" /> : letter}
      </span>
      <span style={{ fontFamily: mono, fontSize: 38 }}>{text}</span>
    </div>
  );
};

/** «Piensa… 3, 2, 1» with a shrinking bar, ending on the reveal. */
const Countdown: React.FC = () => {
  const frame = useCurrentFrame();
  const left = interpolate(frame, [AT.countdown, AT.reveal], [1, 0], clamp);
  const seconds = Math.max(1, Math.ceil(((AT.reveal - frame) / 30) * (3 / 5)));
  const shown = frame >= AT.countdown && frame < AT.reveal;
  return (
    <div style={{ opacity: shown ? 1 : 0, display: "grid", gap: 18, justifyItems: "center" }}>
      <div style={{ ...pill, fontSize: 40 }}>
        <ChatCircleDots size={44} weight="fill" /> Comenta tu respuesta · {seconds}
      </div>
      <div style={{ width: 600, height: 14, borderRadius: 99, background: "rgba(20,23,34,0.1)" }}>
        <div style={{ width: `${left * 100}%`, height: "100%", borderRadius: 99, background: grad }} />
      </div>
    </div>
  );
};

/** The console, printing the output one line at a time after the reveal. */
const Console: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const rise = useRise(AT.reveal, 40);
  return (
    <div style={{ width: 920, borderRadius: 30, background: "#161b22", padding: "26px 38px", textAlign: "left", opacity: rise.opacity, translate: rise.translate }}>
      <div style={{ color: "#8b949e", fontFamily: mono, fontSize: 28, marginBottom: 10 }}>CONSOLA</div>
      {lines.map((line, i) => (
        <div key={i} style={{ fontFamily: mono, fontSize: 46, color: "#e6edf3", opacity: frame >= AT.reveal + 14 + i * 16 ? 1 : 0 }}>
          <span style={{ color: "#8b949e" }}>› </span>
          {line}
        </div>
      ))}
    </div>
  );
};

export const RetoJS: React.FC<Reto> = (reto) => {
  const frame = useCurrentFrame();
  const blink = useBlink();
  const revealed = frame >= AT.reveal;
  // After the reveal the code shrinks and slides up to make room for the console and the explanation.
  const shrink = useProgress(AT.rule - 20, AT.rule + 10);
  const outro = useProgress(AT.outro, AT.outro + 20);
  const ruleA = useRise(AT.rule, 40);
  const ruleB = useRise(AT.rule + 14, 40);
  const analogy = useRise(AT.analogy, 40);
  const outroText = useRise(AT.outro + 8, 50);
  const outroLogo = usePop(AT.outro + 24);

  return (
    <AbsoluteFill style={{ fontFamily, color: color.ink }}>
      <Background kind="seda" />

      {/* Main stage: fades out for the outro. */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "100px 80px 340px", gap: 34, opacity: 1 - outro }}>
        {/* The hook: readable at frame 0, no animation in. */}
        <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
          <div style={{ ...pill, fontSize: 34, padding: "10px 24px" }}>
            Reto JavaScript #{reto.number} · {reto.topic}
          </div>
          <div style={{ fontSize: revealed ? 0 : 104, height: revealed ? 0 : "auto", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, ...gradText }}>
            ¿Qué imprime?
          </div>
        </div>

        <div style={{ marginTop: interpolate(shrink, [0, 1], [0, -40]) }}>
          <CodeCard code={reto.code} scale={interpolate(shrink, [0, 1], [1, 0.78])} />
        </div>

        {frame < AT.rule ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, width: 920 }}>
            {reto.options.map((text, i) => (
              <Option
                key={text}
                at={8 + i * 4}
                letter={"ABCD"[i]}
                state={!revealed ? "idle" : i === reto.correct ? "right" : "wrong"}
                text={text}
              />
            ))}
          </div>
        ) : null}

        {frame < AT.reveal ? <Countdown /> : null}

        {revealed ? (
          <div style={{ display: "grid", gap: 30, justifyItems: "center", marginTop: frame >= AT.rule ? interpolate(shrink, [0, 1], [0, -150]) : 0 }}>
            <Console lines={reto.output} />
            {frame >= AT.rule ? (
              <div style={{ display: "grid", gap: 6, textAlign: "center" }}>
                <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-0.03em", opacity: ruleA.opacity, translate: ruleA.translate }}>{reto.rule[0]}</div>
                <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-0.03em", opacity: ruleB.opacity, translate: ruleB.translate, ...gradText }}>{reto.rule[1]}</div>
              </div>
            ) : null}
            {frame >= AT.analogy ? (
              <div style={{ ...glass, borderRadius: 30, padding: "28px 36px", maxWidth: 900, fontSize: 46, fontWeight: 600, lineHeight: 1.3, opacity: analogy.opacity, translate: analogy.translate }}>
                {reto.analogy}
              </div>
            ) : null}
          </div>
        ) : null}
      </AbsoluteFill>

      {/* Outro: the story behind the series, then the mark. */}
      {frame >= AT.outro ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 90px", textAlign: "center", gap: 46 }}>
          <div style={{ display: "grid", gap: 20, opacity: outroText.opacity, translate: outroText.translate }}>
            <div style={{ fontSize: 58, fontWeight: 700, color: color.muted, lineHeight: 1.25 }}>Fui maestro 14 años.</div>
            <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Ahora aprendo a programar <span style={gradText}>a los 40</span>
            </div>
            <div style={{ fontSize: 50, fontWeight: 600, color: color.muted, lineHeight: 1.3 }}>y te lo explico como a un niño de 10.</div>
          </div>
          <div style={{ display: "grid", gap: 22, justifyItems: "center", opacity: outroLogo.opacity, scale: outroLogo.scale }}>
            <div style={{ ...pill }}>Sígueme para el reto #{reto.number + 1} →</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
              <MlLogo width={110} cursor={blink} /> @vibecodingcoach_ml
            </div>
          </div>
        </AbsoluteFill>
      ) : null}

      <Progress duration={DURATION} />
    </AbsoluteFill>
  );
};

