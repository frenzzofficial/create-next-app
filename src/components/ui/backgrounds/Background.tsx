import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

type BackgroundVariant = "gradient" | "color" | "image";

type BackgroundProps = {
  children: ReactNode;
  variant?: BackgroundVariant;
  className?: string;
  contentClassName?: string;
  /** Required when variant="image". */
  image?: string;
  /** Required when variant="color". Accepts any valid CSS color, including a token like "var(--muted)". */
  color?: string;
  /** Required when variant="gradient". */
  gradient?: string;
  /**
   * Dark scrim over an image variant, for text legibility on top of a
   * photo — 0 disables it. Ignored for "color"/"gradient" variants.
   */
  overlayOpacity?: number;
};

/**
 * Background.tsx
 * --------------------------------------------------------------
 * Scopes a background (color/gradient/image) to whatever it wraps,
 * instead of bleeding across the whole page. Wrap just a `<Hero />`
 * and only the Hero gets the background — the rest of the page stays
 * on the default `--background` token underneath, and nothing later
 * in the page can end up rendering on top of (or getting visually cut
 * off by) a page-wide background layer.
 *
 *   <Background variant="gradient">
 *     <Hero />
 *   </Background>
 *
 * How it works: the wrapper is `position: relative` with no explicit
 * height of its own — its height comes entirely from `children`
 * (rendered in-flow in the `z-10` layer). The background itself is a
 * separate `position: absolute; inset: 0` layer underneath, which
 * stretches to exactly match that height and gets clipped by
 * `overflow: hidden` — it can't leak past whatever `children` occupies.
 */
const Background = ({
  children,
  variant = "gradient",
  className,
  contentClassName,
  image,
  color = "var(--muted)",
  gradient = "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
  overlayOpacity = 0.35,
}: BackgroundProps) => {
  const style: CSSProperties = {};

  switch (variant) {
    case "color":
      style.backgroundColor = color;
      break;

    case "gradient":
      style.backgroundImage = gradient;
      break;

    case "image":
      if (!image && process.env.NODE_ENV !== "production") {
        console.warn('Background: variant="image" was used without an `image` prop.');
      }
      style.backgroundImage = image ? `url(${image})` : undefined;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
      break;
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={cn("absolute inset-0 z-0", variant === "image" && "animate-background-fade")}
        style={style}
      />

      {variant === "image" && overlayOpacity > 0 && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: `oklch(0 0 0 / ${overlayOpacity})` }}
        />
      )}

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
};

export default Background;
