import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle, Lightbulb, Warning, XCircle } from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "@/components/BrandLogo";
import { CopyButton } from "@/components/CopyButton";
import { logoFor } from "@/content/herramientas";
import { getPrompt } from "@/content/prompts";
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
    case "prompt": {
      const prompt = getPrompt(block.id);
      if (!prompt) return null;
      return (
        <div className="code-block">
          <div className="code-bar">
            <span>{block.title ?? prompt.title}</span>
            <CopyButton text={prompt.text} />
          </div>
          <pre>{prompt.text}</pre>
          <Link className="code-foot" href={`/curso/prompts#${prompt.id}`}>
            Ver más prompts como este <ArrowRight aria-hidden size={14} weight="bold" />
          </Link>
        </div>
      );
    }
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
    case "keys":
      return (
        <div className="block-keys">
          <h3>{block.title}</h3>
          <dl>
            {block.items.map((item) => (
              <div key={item.key}>
                <dt>
                  <kbd>{item.key}</kbd>
                </dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "dodont":
      return (
        <div className="block-dodont">
          <h3>{block.title}</h3>
          <div className="dodont-head" aria-hidden>
            <span className="is-bad">
              <XCircle size={16} weight="fill" /> {block.labels?.[0] ?? "Mal uso"}
            </span>
            <span className="is-good">
              <CheckCircle size={16} weight="fill" /> {block.labels?.[1] ?? "Buen uso"}
            </span>
          </div>
          <ul>
            {block.items.map((item) => (
              <li key={item.bad}>
                <p className="is-bad">
                  <span className="visually-hidden">{block.labels?.[0] ?? "Mal uso"}: </span>
                  {item.bad}
                </p>
                <p className="is-good">
                  <span className="visually-hidden">{block.labels?.[1] ?? "Buen uso"}: </span>
                  {item.good}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "code":
      return (
        <div className="code-block">
          <div className="code-bar">
            <span>{block.title}</span>
          </div>
          <pre>{block.text}</pre>
        </div>
      );
    case "links":
      return (
        <div className="block-links">
          <h3>{block.title}</h3>
          <ul>
            {block.items.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noreferrer" target="_blank">
                  <span>
                    <strong>{link.label}</strong>
                    <span>{link.note}</span>
                  </span>
                  <ArrowUpRight aria-hidden size={18} weight="bold" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div className="block-table">
          <h3>{block.title}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {block.head.map((cell, i) => (
                    <th key={i} scope="col">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
