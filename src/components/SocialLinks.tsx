import { ArrowUpRight, InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

const networks = [
  { key: "instagram", name: "Instagram", href: site.instagram, handle: site.instagramHandle, Icon: InstagramLogo, text: "Reels cortos: trucos, palabras del día y errores típicos." },
  { key: "tiktok", name: "TikTok", href: site.tiktok, handle: site.tiktokHandle, Icon: TiktokLogo, text: "Los mismos vídeos, en formato TikTok." },
];

/** Instagram and TikTok links: big cards for a page section, or a row of round icons for the footer. */
export function SocialLinks({ variant = "cards" }: { variant?: "cards" | "icons" }) {
  if (variant === "icons") {
    return (
      <span className="social-icons">
        {networks.map(({ key, name, href, handle, Icon }) => (
          <a aria-label={`${name} ${handle}`} className={`social-icon social-${key}`} href={href} key={key} rel="noreferrer" target="_blank" title={`${name} ${handle}`}>
            <Icon aria-hidden size={20} weight="bold" />
          </a>
        ))}
      </span>
    );
  }

  return (
    <div className="social-cards">
      {networks.map(({ key, name, href, handle, Icon, text }) => (
        <a className={`social-card glass social-${key}`} href={href} key={key} rel="noreferrer" target="_blank">
          <span className="social-card-icon">
            <Icon aria-hidden size={30} weight="bold" />
          </span>
          <span className="social-card-copy">
            <strong>{name}</strong>
            <span className="social-card-handle">{handle}</span>
            <span className="social-card-text">{text}</span>
          </span>
          <ArrowUpRight aria-hidden className="social-card-arrow" size={22} weight="bold" />
        </a>
      ))}
    </div>
  );
}
