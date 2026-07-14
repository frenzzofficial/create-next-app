import type { NavItem, NavSection } from "@/types/navigation";
import { appConfig } from "./app.configs";

/**
 * navigation.config.ts
 * --------------------------------------------------------------
 * Centralized nav menu data — Header, Footer, and any future mobile
 * drawer/sidebar all read from here instead of hardcoding hrefs, so a
 * route rename is a one-file change. Hrefs are built from
 * `appConfig.routes` rather than repeated as string literals, so this
 * file and the route table can't silently drift apart.
 */

export const mainNav: NavItem[] = [
  { label: "Home", href: appConfig.routes.home },
  { label: "Blog", href: "/blogs" },
];

export const authNav: NavItem[] = [
  { label: "Sign in", href: appConfig.routes.signin },
  { label: "Sign up", href: appConfig.routes.signup },
];

export const footerNav: NavSection[] = [
  {
    title: "Product",
    items: [
      { label: "Home", href: appConfig.routes.home },
      { label: "Dashboard", href: appConfig.routes.dashboard },
    ],
  },
  {
    title: "Company",
    items: [{ label: "Blog", href: "/blogs" }],
  },
  {
    title: "Account",
    items: [
      { label: "Sign in", href: appConfig.routes.signin },
      { label: "Sign up", href: appConfig.routes.signup },
    ],
  },
];
