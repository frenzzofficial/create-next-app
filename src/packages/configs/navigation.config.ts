import type { NavItem, NavSection, NavTab } from "@/types/navigation";
import { appConfig } from "./app.configs";

/**
 * navigation.config.ts
 * --------------------------------------------------------------
 * Centralized nav menu data — Header, Footer, and the mobile drawer all
 * read from here instead of hardcoding hrefs, so a route rename is a
 * one-file change. Hrefs are built from `appConfig.routes` rather than
 * repeated as string literals, so this file and the route table can't
 * silently drift apart.
 *
 * `mainNav` is `NavTab[]`, not `NavItem[]` — the header's desktop mega-
 * dropdown / mobile accordion (components/layouts/navbar) need an `id`
 * to key open/closed state by, and a `dropdown` column structure that
 * `NavItem.children` (flat, one level) doesn't have. `footerNav` stays
 * `NavSection[]` — the footer is a flat two-level list, no dropdown
 * behavior to key.
 */

export const mainNav: NavTab[] = [
  { id: "home", title: "Home", href: appConfig.routes.home },
  { id: "blog", title: "Blogs", href: appConfig.routes.blogs },
  {
    id: "company",
    title: "Company",
    dropdown: [
      {
        category: "Company",
        items: [
          { label: "About Us", href: appConfig.routes.about },
          { label: "Careers", href: appConfig.routes.careers },
          { label: "Contact", href: appConfig.routes.contact },
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    dropdown: [
      {
        category: "services",
        items: [
          { label: "Web Design", href: "/web-design" },
          { label: "Web Development", href: "/web-development" },
          { label: "Mobile Development", href: "/mobile-development" },
        ],
      },
    ],
  },
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
    items: [
      { label: "Blog", href: appConfig.routes.blogs },
      { label: "About Us", href: appConfig.routes.about },
      { label: "Careers", href: appConfig.routes.careers },
      { label: "Contact", href: appConfig.routes.contact },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Sign in", href: appConfig.routes.signin },
      { label: "Sign up", href: appConfig.routes.signup },
    ],
  },
];
