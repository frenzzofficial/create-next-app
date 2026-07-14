import { appConfig } from "@/packages/configs/app.configs";
import ImageComponent from "./ImageComponent";

type NavigationLogoProps = {
  /** Override the default site logo — useful for a dark/light variant swap. */
  src?: string;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * The site logo, pre-wired to `appConfig.site` and linked to home — drop
 * straight into Header without passing src/alt/href every time.
 */
const NavigationLogo = ({ src, width = 32, height = 32, className }: NavigationLogoProps) => (
  <ImageComponent
    id="navigation-logo"
    src={src ?? appConfig.site.logoUrl}
    alt={`${appConfig.site.name} logo`}
    href={appConfig.routes.home}
    width={width}
    height={height}
    className={className}
    priority
  />
);

NavigationLogo.displayName = "NavigationLogo";

export default NavigationLogo;
