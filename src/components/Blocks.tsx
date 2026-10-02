import { CheckCircle, Lightbulb, Warning, XCircle } from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "@/components/BrandLogo";
import { CopyButton } from "@/components/CopyButton";
import { logoFor } from "@/content/herramientas";
import type { Block } from "@/content/recursos";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="block-text">{block.text}</p>;
    case "steps":
      return (
        <div className="block-steps">
          <h3>{block.title}</h3>
          <ol>
            {block.items.map((item, i) => (
              <li key={item}>
                <span className="step-num">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "prompt":
      return (
        <div className="code-block">
          <div className="code-bar">
            <span>{block.title}</span>
            <CopyButton text={block.text} />
          </div>
          <pre>{block.text}</pre>
        </div>
      );
    case "tip":
      return (
        <div className="note note-tip">
          <Lightbulb aria-hidden size={22} weight="fill" />
          <p>
            <strong>Consejo. </strong>
            {block.text}
          </p>
        </div>
      );
    case "warning":
      return (
        <div className="note note-warn">
          <Warning aria-hidden size={22} weight="fill" />
          <p>
            <strong>Ojo. </strong>
            {block.text}
          </p>
        </div>
      );
    case "tools":
      return (
        <div className="block-tools">
          <span className="label">{block.title}</span>
          <ul>
            {block.items.map((name) => {
              const logo = logoFor(name);
              return (
                <li key={name}>
                  {logo ? <BrandLogo logo={logo} size={20} /> : null}
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    case "compare":
      return (
        <div className="block-compare">
          <div className="compare-bad">
            <span className="label">
              <XCircle aria-hidden size={16} weight="fill" /> Así no
            </span>
            <p>«{block.bad}»</p>
          </div>
          <div className="compare-good">
            <span className="label">
              <CheckCircle aria-hidden size={16} weight="fill" /> Así sí
            </span>
            <p>«{block.good}»</p>
          </div>
        </div>
      );
    case "cards":
      return (
        <ul className="block-cards">
          {block.items.map((card, i) => (
            <li key={card.title}>
              <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((block, i) => (
        <BlockView block={block} key={i} />
      ))}
    </div>
  );
}
