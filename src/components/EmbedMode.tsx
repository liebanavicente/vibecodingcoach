"use client";

import { useEffect } from "react";

/** When a page is shown inside another site (an iframe), hide this site's header, footer, background and assistant. */
export function EmbedMode() {
  useEffect(() => {
    document.documentElement.classList.add("embed");
    return () => document.documentElement.classList.remove("embed");
  }, []);
  return null;
}
