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

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const easeBack = (p, s = 1.9) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2);

  const scenes = [...document.querySelectorAll(".scene")].map((el) => ({
    el,
    start: +el.dataset.start,
    end: +el.dataset.end,
    video: el.querySelector("video"),
    src: el.dataset.video,
  }));

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
      el.style.opacity = o;
      el.style.transform = tf;
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
      const fadeOut = i === scenes.length - 1 ? clamp((TOTAL - t) / 0.5) : 1;
      s.el.style.opacity = fadeIn * fadeOut;
      s.el.style.transform = s.video ? "" : `scale(${1.035 - 0.035 * easeOut(clamp(lt / 0.8))})`;
      applyFx(s.el, lt);
      if (s.video) waits.push(seek(s.video, Math.min(lt, s.video.duration - 0.05)));
    });
    await Promise.all(waits);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  };

  window.ready = (async () => {
    await Promise.all(
      scenes
        .filter((s) => s.video)
        .map(
          (s) =>
            new Promise((resolve) => {
              s.video.addEventListener("loadeddata", resolve, { once: true });
              s.video.src = s.src;
              s.video.load();
            }),
        ),
    );
    await document.fonts.ready;
    window.FRAMES = Math.round(TOTAL * FPS);
    window.FPS = FPS;
    await window.renderAt(0);
    return true;
  })();
})();
