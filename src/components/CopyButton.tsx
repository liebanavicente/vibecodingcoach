"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <button onClick={copy} type="button">
      {copied ? <Check aria-hidden size={14} weight="bold" /> : <Copy aria-hidden size={14} weight="bold" />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}
