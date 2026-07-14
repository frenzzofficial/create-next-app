export { default as Button } from "./buttons/Button";
export { default as ImageComponent } from "./images/ImageComponent";
export { default as Checkbox } from "./inputs/Checkbox";
export { default as Input } from "./inputs/Input";

export {
  type BaseInputProps,
  default as InputFactory,
} from "./inputs/InputFactory";
export { default as PasswordInput } from "./inputs/PasswordInput";
export { default as Select } from "./inputs/Select";
// Links, Icons, Images
export { default as Link } from "./links/Link";
export { default as EyeClose } from "./svg/EyeClose";
export { default as EyeOpen } from "./svg/EyeOpen";

// NOTE: LucideIcon and NavigationLogo are intentionally NOT re-exported
// here. Both transitively import "server-only" (LucideIcon directly;
// NavigationLogo via appConfig -> app.env.ts), and this barrel is also
// imported by Client Components (app/error.tsx, app/dev/design-system).
// Re-exporting a server-only module from a barrel a Client Component
// imports breaks the build for every consumer of that barrel, not just
// the one that actually needed the server-only piece. Import them
// directly instead: "@/components/ui/images/LucideIcon",
// "@/components/ui/images/NavigationLogo" — both are safe from a Server
// Component (e.g. Header.tsx).
