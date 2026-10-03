// Shared timeline engine for vertical reels (1080x1920). A reel is a #stage with data-total (seconds) and
// .scene sections with data-start / data-end; elements animate with data-fx + data-in (seconds into their scene).
// render.mjs calls window.renderAt(t) for every frame, so everything here is deterministic.
(() => {
  const FPS = 30;
  const FADE = 0.35;
  const stage = document.getElementById("stage");
  const TOTAL = +stage.dataset.total;
  const ML = `<rect fill="var(--ml-blue)" height="74" rx="14" width="118" x="11.5" y="10.5"/><rect fill="white" height="74" rx="14" stroke="var(--ml-ink)" stroke-width="3" width="118" x="1.5" y="1.5"/><g fill="none" stroke="var(--ml-ink)" stroke-width="5.2"><path d="M19.6 59V36"/><path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59"/><path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3"/></g><rect data-blink fill="var(--ml-blue)" height="4.6" width="25.3" x="79.3" y="54.3"/>`;

  document.querySelectorAll("[data-ml]").forEach((svg) => {
    svg.setAttribute("viewBox", "0 0 132 86");
    svg.innerHTML = ML;
  });
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = window.ICONS[el.dataset.icon];
  });
  document.querySelectorAll("[data-logo]").forEach((el) => {
    el.innerHTML = window.LOGOS?.[el.dataset.logo] ?? "";
  });

  // Karaoke captions: data-words="text" becomes one span per word, lit in turn between data-in and data-in + data-dur.
  document.querySelectorAll("[data-words]").forEach((el) => {
    el.innerHTML = el.dataset.words
      .split(" ")
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
  });

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const easeBack = (p, s = 1.9) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2);

  const scenes = [...document.querySelectorAll(".scene")].map((el) => ({
    el,
    start: +el.dataset.start,
    end: +el.dataset.end,
    video: el.querySelector("video"),
    src: el.dataset.video,
    rate: +(el.dataset.rate || 1),
    zoom: +(el.dataset.zoom || 0),
  }));
  // Animated background: <video class="bg-loop" data-video="…"> as the first child of #stage loops under every
  // scene for the whole reel; slides then drop their still background (kit.css) and fade out as the next fades in.
  const loop = document.querySelector("#stage > video.bg-loop");
  if (loop) stage.classList.add("has-loop");
  // Overlays outside the scenes (progress bar, corner logo) run on the reel's global time.
  const huds = [...document.querySelectorAll("#stage > .hud")];

  function applyFx(root, lt) {
    root.querySelectorAll("[data-fx]").forEach((el) => {
      const p = clamp((lt - +el.dataset.in) / +(el.dataset.dur || 0.6));
      const fx = el.dataset.fx;
      let o = easeOut(p);
      let tf = "";
      if (fx === "up") tf = `translateY(${(1 - easeOut(p)) * 50}px)`;
      if (fx === "left") tf = `translateX(${(1 - easeOut(p)) * -80}px)`;
      if (fx === "pop") tf = `scale(${0.7 + 0.3 * easeBack(p, 1.6)})`;
      if (fx === "bounce") {
        o = clamp(p * 3);
        tf = `scale(${0.35 + 0.65 * easeBack(p, 2.6)}) rotate(${(1 - easeOut(p)) * -10}deg)`;
      }
      if (fx === "stamp") {
        o = clamp(p * 4);
        tf = `scale(${2.2 - 1.2 * easeOut(p)}) rotate(${-14 + 6 * easeOut(p)}deg)`;
      }
      if (fx === "grow") tf = `scaleX(${easeOut(p)})`;
      let filter = "";
      if (fx === "slam") {
        o = clamp(p * 3);
        tf = `scale(${1.55 - 0.55 * easeOut(p)})`;
        filter = `blur(${(1 - easeOut(p)) * 16}px)`;
      }
      if (fx === "wipe") {
        o = 1;
        el.style.clipPath = `inset(0 ${(1 - easeOut(p)) * 100}% 0 0)`;
      }
      el.style.opacity = o;
      el.style.transform = tf;
      el.style.filter = filter;
    });
    root.querySelectorAll("[data-out]").forEach((el) => {
      const p = clamp((lt - +el.dataset.out) / 0.4);
      if (p > 0) el.style.opacity = String(+el.style.opacity * (1 - easeOut(p)));
    });
    root.querySelectorAll("[data-float]").forEach((el) => {
      el.style.transform = `translateY(${Math.sin((lt + +el.dataset.float) * 1.6) * 10}px)`;
    });
    root.querySelectorAll("[data-blink]").forEach((el) => {
      el.style.opacity = Math.floor(lt / 0.55) % 2 === 0 ? 1 : 0;
    });
    root.querySelectorAll("[data-type]").forEach((el) => {
      const text = el.dataset.type;
      const p = clamp((lt - +el.dataset.in) / +el.dataset.dur);
      el.textContent = text.slice(0, Math.round(p * text.length));
    });
    root.querySelectorAll("[data-words]").forEach((el) => {
      const words = el.querySelectorAll(".w");
      const p = (lt - +el.dataset.in) / +el.dataset.dur;
      const now = Math.floor(clamp(p, 0, 0.9999) * words.length);
      words.forEach((w, i) => {
        w.classList.toggle("on", p >= 0 && i <= now);
        w.classList.toggle("now", p >= 0 && p < 1 && i === now);
      });
    });
    // Story-style progress: data-segments="0,5,10.5" are the chapter starts; each .seg fills during its chapter.
    root.querySelectorAll("[data-segments]").forEach((el) => {
      const marks = [...el.dataset.segments.split(",").map(Number), TOTAL];
      el.querySelectorAll(".seg i").forEach((bar, i) => {
        bar.style.transform = `scaleX(${clamp((lt - marks[i]) / (marks[i + 1] - marks[i]))})`;
      });
    });
    root.querySelectorAll("[data-count]").forEach((el) => {
      const [from, to] = el.dataset.count.split(",").map(Number);
      const p = clamp((lt - +el.dataset.in) / +el.dataset.dur);
      el.textContent = (from + (to - from) * p).toFixed(+(el.dataset.decimals ?? 2)).replace(".", ",");
    });
    root.querySelectorAll("[data-hold]").forEach((el) => {
      const [from, to, fade] = el.dataset.hold.split(",").map(Number);
      el.style.opacity = lt < from - fade ? 0 : lt < from ? (lt - from + fade) / fade : lt <= to ? 1 : clamp(1 - (lt - to) / fade);
    });
    // Moving box (e.g. a blur over a logo): keys [time, x, y, width, height, opacity], interpolated.
    root.querySelectorAll("[data-box]").forEach((el) => {
      const keys = JSON.parse(el.dataset.box);
      let k = keys.findIndex((key) => key[0] > lt);
      if (k === -1) k = keys.length - 1;
      const a = keys[Math.max(0, k - 1)];
      const b = keys[k];
      const p = b[0] === a[0] ? 1 : clamp((lt - a[0]) / (b[0] - a[0]));
      const [, x, y, w, h, o] = a.map((v, i) => v + (b[i] - v) * p);
      Object.assign(el.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, opacity: String(o) });
    });
    root.querySelectorAll("[data-pulse]").forEach((el) => {
      const since = lt - +el.dataset.pulse;
      el.style.transform = since > 0 ? `scale(${1 + Math.sin(since * 4.2) * 0.025})` : "";
    });
  }

  function seek(video, time) {
    return new Promise((resolve) => {
      if (Math.abs(video.currentTime - time) < 0.001) return resolve();
      video.addEventListener("seeked", () => resolve(), { once: true });
      video.currentTime = time;
    });
  }

  window.renderAt = async (t) => {
    const waits = [];
    scenes.forEach((s, i) => {
      const visible = t >= s.start && t < s.end + FADE;
      s.el.style.visibility = visible ? "visible" : "hidden";
      if (!visible) return;
      const lt = t - s.start;
      const fadeIn = i === 0 ? 1 : easeOut(clamp(lt / FADE));
      const fadeOut = i === scenes.length - 1 ? clamp((TOTAL - t) / 0.5) : loop ? 1 - easeOut(clamp((t - s.end) / FADE)) : 1;
      s.el.style.opacity = fadeIn * fadeOut;
      s.el.style.transform = s.video ? "" : `scale(${1.035 - 0.035 * easeOut(clamp(lt / 0.8))})`;
      // data-zoom: slow push-in on the clip across the scene (Ken Burns).
      if (s.video && s.zoom) s.video.style.transform = `scale(${1 + (s.zoom - 1) * clamp(lt / (s.end - s.start + FADE))})`;
      applyFx(s.el, lt);
      // data-rate: < 1 slows the clip down so a short Flow take can fill a longer scene.
      if (s.video) waits.push(seek(s.video, Math.min(lt * s.rate, s.video.duration - 0.05)));
    });
    if (loop) waits.push(seek(loop, t % (loop.duration - 0.04)));
    huds.forEach((el) => {
      el.style.opacity = clamp(Math.min(t / 0.4, (TOTAL - t) / 0.5));
      applyFx(el, t);
    });
    await Promise.all(waits);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  };

  window.ready = (async () => {
    const load = (video, src) =>
      new Promise((resolve) => {
        video.addEventListener("loadeddata", resolve, { once: true });
        video.src = src;
        video.load();
      });
    await Promise.all([...scenes.filter((s) => s.video).map((s) => load(s.video, s.src)), ...(loop ? [load(loop, loop.dataset.video)] : [])]);
    await document.fonts.ready;
    window.FRAMES = Math.round(TOTAL * FPS);
    window.FPS = FPS;
    await window.renderAt(0);
    return true;
  })();
})();
