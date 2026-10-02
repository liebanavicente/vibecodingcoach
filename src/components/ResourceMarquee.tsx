import { resources } from "@/content/herramientas";

/** Endless strip of resources; the second copy is only there to close the loop. */
export function ResourceMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-row">
      {resources.map((r) => (
        <li className="marquee-pill" key={r.name}>
          <strong>{r.name}</strong>
          <span>{r.kind}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
