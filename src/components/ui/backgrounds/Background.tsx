import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

interface BackgroundProps {
  children: ReactNode;

  variant?: "gradient" | "color" | "image";

  className?: string;
  contentClassName?: string;

  image?: string;

  color?: string;

  gradient?: string;
}

const Background = ({
  children,
  variant = "gradient",
  className,
  contentClassName,
  image,
  color = "#000000",
  gradient = "linear-gradient(135deg, var(-primary) 0%, var(--secondary) 100%)",
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
      style.backgroundImage = `url(${image})`;
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

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
};

export default Background;
