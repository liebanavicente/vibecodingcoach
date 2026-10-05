"use client";

import { type ReactNode, useRef } from "react";
import { CheckCircle, Sparkle } from "@phosphor-icons/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText, TextPlugin);

const CODE = ["<h1>Pastelería Ana</h1>", "<p>Tartas por encargo</p>", "h1 { color: coral; }"];
const STEPS = ["Móvil", "Código", "Tu web"];

/** The catalog's illustration: one frame that turns from a phone into a code editor and then into a finished
 * website, the same path as the three courses. Loops while on screen; static on the final website without motion. */
function MorphVisual() {
  return (
    <div aria-hidden className="hero-visual morph-visual" data-step="3">
      <div className="morph-stage">
        <div className="morph">
          <div className="m-phone">
            <span className="m-notch" />
            <div className="m-apps">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <span className="m-dock" />
          </div>
          <div className="m-code">
            <div className="m-bar">
              <i />
              <i />
              <i />
              <span>index.html</span>
            </div>
            {CODE.map((line) => (
              <p data-text={line} key={line}>
                {line}
              </p>
            ))}
            <span className="m-caret" />
          </div>
          <div className="m-site">
            <div className="m-bar">
              <i />
              <i />
              <i />
              <span>pasteleria-ana.com</span>
            </div>
            <div className="m-nav">
              <b />
              <span />
              <span />
              <span />
            </div>
            <div className="m-art" />
            <div className="m-title" />
            <div className="m-text" />
            <div className="m-btn" />
            <div className="m-cards">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <div className="m-prompt">
          <Sparkle size={16} weight="fill" />
          Hazme una web para mi pastelería
        </div>
        <div className="m-done">
          <CheckCircle size={18} weight="fill" /> ¡Publicada!
        </div>
      </div>
      <ol className="morph-steps">
        {STEPS.map((s, i) => (
          <li className={`s${i + 1}`} key={s}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Hero of cursos.miguelliebana.com: the headline rises word by word while the illustration plays its loop. */
export function CursosHero({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const visual = q(".morph-visual")[0] as HTMLElement;
        const step = (n: number) => () => (visual.dataset.step = String(n));

        const title = q(".hero-copy h1")[0];
        const split = title ? SplitText.create(title, { type: "words", wordsClass: "split-word" }) : null;
        const text = gsap.timeline({ defaults: { ease: "power3.out" } });
        text.from(q(".hero-copy .eyebrow"), { y: 16, autoAlpha: 0, duration: 0.45, clearProps: "transform" });
        if (split)
          text.from(
            split.words,
            { yPercent: 60, rotate: 4, autoAlpha: 0, stagger: 0.055, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.2",
          );
        text
          .from(q(".hero-copy .page-intro"), { y: 20, autoAlpha: 0, duration: 0.5, clearProps: "transform" }, "-=0.35")
          .from(
            q(".hero-copy .actions > *"),
            { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5, clearProps: "transform" },
            "-=0.3",
          );

        // Shapes of the frame, as a share of the stage.
        const phone = { width: "38%", height: "86%", borderRadius: 34 };
        const editor = { width: "94%", height: "62%", borderRadius: 22 };
        const site = { width: "94%", height: "82%", borderRadius: 22 };
        const lines = q(".m-code p");

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power3.inOut" } });
        loop
          // 1 · Phone: the apps pop in.
          .call(step(1))
          .set(q(".morph"), phone)
          .set(q(".m-phone"), { autoAlpha: 1 })
          .set(q(".m-code, .m-site, .m-prompt, .m-done"), { autoAlpha: 0 })
          .set(lines, { text: "" })
          .fromTo(
            q(".morph"),
            { scale: 0.85, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.6)" },
          )
          .from(
            q(".m-apps i"),
            { scale: 0, stagger: { each: 0.04, from: "random" }, duration: 0.3, ease: "back.out(3)" },
            "-=0.2",
          )
          .to({}, { duration: 0.7 })
          // 2 · The phone widens into a code editor and the code types itself.
          .call(step(2))
          .to(q(".m-phone"), { autoAlpha: 0, duration: 0.25 })
          .to(q(".morph"), { ...editor, duration: 0.8 }, "<")
          .to(q(".m-code"), { autoAlpha: 1, duration: 0.3 }, "-=0.25");
        lines.forEach((line) => {
          // TextPlugin writes HTML, so the tags are escaped to show up as code.
          const code = ((line as HTMLElement).dataset.text ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          loop.to(line, { text: code, duration: 0.55, ease: "none" });
        });
        loop
          .to({}, { duration: 0.6 })
          // 3 · The editor turns into the website, built with an AI prompt.
          .call(step(3))
          .fromTo(q(".m-prompt"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(2)" })
          .to(q(".m-code"), { autoAlpha: 0, duration: 0.25 }, "+=0.3")
          .to(q(".morph"), { ...site, duration: 0.8 }, "<")
          .to(q(".m-site"), { autoAlpha: 1, duration: 0.3 }, "-=0.3")
          .from(q(".m-site > *"), { y: 14, autoAlpha: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" }, "-=0.15")
          .fromTo(
            q(".m-done"),
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(3)" },
          )
          .to({}, { duration: 2.2 })
          .to(q(".morph, .m-prompt, .m-done"), { autoAlpha: 0, scale: 0.92, duration: 0.4, ease: "power2.in" })
          .set(q(".morph, .m-prompt, .m-done"), { scale: 1 });

        const tl = gsap.timeline();
        tl.set(q(".hero-copy, .hero-visual"), { autoAlpha: 1 }).add(text, 0).add(loop, 0.4);
        return () => {
          tl.kill();
          visual.dataset.step = "3";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="catalog-hero has-ribbon" ref={root}>
      {children}
      <MorphVisual />
    </section>
  );
}
