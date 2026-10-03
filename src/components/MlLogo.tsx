import { site } from "@/lib/site";

/** Miguel Liébana's mark: "ml_" on a white key with a blue offset shadow and a blinking blue cursor. */
export function MlLogo({ className = "", title = "ML" }: { className?: string; title?: string }) {
  return (
    <svg aria-label={title} className={`ml-logo ${className}`.trim()} role="img" viewBox="0 0 132 86">
      <rect fill="var(--ml-blue)" height="74" rx="14" width="118" x="11.5" y="10.5" />
      <rect fill="white" height="74" rx="14" stroke="var(--ml-ink)" strokeWidth="3" width="118" x="1.5" y="1.5" />
      <g fill="none" stroke="var(--ml-ink)" strokeWidth="5.2">
        <path d="M19.6 59V36" />
        <path d="M19.6 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59" />
        <path d="M30.5 38.5c0-3.2 2.4-4.9 5.45-4.9s5.45 1.7 5.45 4.9V59" />
        <path d="M46.8 23.9h13.6v28.5a4 4 0 0 0 4 4h11.3" />
      </g>
      <rect className="ml-cursor" fill="var(--ml-blue)" height="4.6" width="25.3" x="79.3" y="54.3" />
    </svg>
  );
}

/** The ML mark as a link to Miguel's personal site (opens in a new tab so the visit here isn't lost). */
export function MlLink({ className }: { className?: string }) {
  return (
    <a aria-label="Miguel Liébana, web personal (miguelliebana.com)" className="ml-link" href={site.web} rel="noreferrer" target="_blank" title="miguelliebana.com">
      <MlLogo className={className} title="Miguel Liébana" />
    </a>
  );
}
