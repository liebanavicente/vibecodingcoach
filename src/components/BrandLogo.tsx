import Image from "next/image";
import { Code } from "@phosphor-icons/react/dist/ssr";
import type { Logo } from "@/content/herramientas";

/** Brand mark shown next to its name, so it is decorative; app-icon images fill the box, the rest sit inside it. */
export function BrandLogo({ logo, size }: { logo: Logo; size: number }) {
  if ("generic" in logo) {
    return <Code aria-hidden className="brand-svg" color={logo.color} size={size} weight="bold" />;
  }
  if ("icon" in logo) {
    return (
      <svg aria-hidden className="brand-svg" fill={`#${logo.icon.hex}`} height={size} viewBox="0 0 24 24" width={size}>
        <path d={logo.icon.path} />
      </svg>
    );
  }
  return <Image alt="" className={logo.fill ? "brand-img is-fill" : "brand-img"} height={size} src={logo.src} width={size} />;
}
