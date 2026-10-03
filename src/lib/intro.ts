export const INTRO_SEEN_KEY = "vcc:intro-visto";

/** Runs before first paint: first visit only, and never for people who asked for reduced motion. */
export const INTRO_SCRIPT = `(function(){try{if(!localStorage.getItem("${INTRO_SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="1"}catch(e){}})()`;

/** Before first paint: lets GSAP-animated blocks start hidden (html.gsap-on); never for reduced motion. */
export const GSAP_SCRIPT = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("gsap-on")}catch(e){}})()`;
