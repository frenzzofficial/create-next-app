export { default as Button } from "./buttons/Button";
export { default as ImageComponent } from "./images/ImageComponent";
export { default as NavigationLogo } from "./images/NavigationLogo";
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

// NOTE: LucideIcon is intentionally NOT re-exported here. It directly
// imports "server-only", and this barrel is also imported by Client
// Components (app/error.tsx, app/dev/design-system). Re-exporting a
// server-only module from a barrel a Client Component imports breaks
// the build for every consumer of that barrel, not just the one that
// actually needed the server-only piece. Import it directly instead:
// "@/components/ui/images/LucideIcon" — safe from a Server Component.
//
// NavigationLogo used to be excluded here too (it read appConfig, which
// used to import the server-only app.env.ts) — that's fixed now:
// app.configs.ts sources from the client-safe client.env.ts instead,
// since none of appConfig's fields actually needed the server-only
// portion. See the note in packages/configs/app.configs.ts.
